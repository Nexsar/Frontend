import {
  EthWalletProvider,
  LitAuthClient,
  BaseProvider,
} from "@lit-protocol/lit-auth-client";
import { LitNodeClient } from "@lit-protocol/lit-node-client";
import {
  AuthMethodScope,
  AuthMethodType,
  LIT_NETWORK,
  ProviderType,
} from "@lit-protocol/constants";
import {
  AuthMethod,
  GetSessionSigsProps,
  IRelayPKP,
  SessionSigs,
  AuthCallbackParams,
  LitAbility,
  LIT_NETWORKS_KEYS,
} from "@lit-protocol/types";
import { LitPKPResource } from "@lit-protocol/auth-helpers";

export const DOMAIN = "localhost";
export const ORIGIN = "localhost:5173";

export const SELECTED_LIT_NETWORK = LIT_NETWORK.DatilDev;

export const litNodeClient = new LitNodeClient({
  alertWhenUnauthorized: false,
  litNetwork: SELECTED_LIT_NETWORK,
  debug: true,
});

litNodeClient.connect();

export const litAuthClient = new LitAuthClient({
  litRelayConfig: {
    relayApiKey: "6ts099ns-xy2h-kk7b-s2ve-ih5tf1wddk80_septo",
  },
  litNodeClient,
});

/**
 * Get auth method object by signing a message with an Ethereum wallet
 */
export async function authenticateWithEthWallet(address, signMessage) {
  const ethWalletProvider =
    litAuthClient.initProvider <
    EthWalletProvider >
    (ProviderType.EthWallet,
    {
      domain: DOMAIN,
      origin: ORIGIN,
    });
  const authMethod = await ethWalletProvider.authenticate({
    address,
    signMessage,
  });
  return authMethod;
}

/**
 * Generate session sigs for given params
 */
export async function getSessionSigs({
  pkpPublicKey,
  authMethod,
  sessionSigsParams,
}) {
  const provider = getProviderByAuthMethod(authMethod);
  if (provider) {
    await litNodeClient.connect();
    const sessionSigs = await litNodeClient.getPkpSessionSigs({
      pkpPublicKey,
      authMethods: [authMethod],
      resourceAbilityRequests: [
        {
          resource: new LitPKPResource("*"),
          ability: LitAbility.PKPSigning,
        },
      ],
    });

    return sessionSigs;
  } else {
    throw new Error(
      `Provider not found for auth method type ${authMethod.authMethodType}`,
    );
  }
}

export async function updateSessionSigs(params) {
  const sessionSigs = await litNodeClient.getSessionSigs(params);
  return sessionSigs;
}

/**
 * Fetch PKPs associated with given auth method
 */
export async function getPKPs(authMethod) {
  const provider = getProviderByAuthMethod(authMethod);
  const allPKPs = await provider.fetchPKPsThroughRelayer(authMethod);
  return allPKPs;
}

/**
 * Mint a new PKP for current auth method
 */
export async function mintPKP(authMethod) {
  const provider = getProviderByAuthMethod(authMethod);
  // Set scope of signing any data
  const options = {
    permittedAuthMethodScopes: [[AuthMethodScope.SignAnything]],
  };

  let txHash;

  if (authMethod.authMethodType === AuthMethodType.WebAuthn) {
    // Register new WebAuthn credential
    const webAuthnInfo = await provider.register();

    // Verify registration and mint PKP through relay server
    txHash = await provider.verifyAndMintPKPThroughRelayer(
      webAuthnInfo,
      options,
    );
  } else {
    // Mint PKP through relay server
    txHash = await provider.mintPKPThroughRelayer(authMethod, options);
  }

  let attempts = 3;
  let response = null;

  while (attempts > 0) {
    try {
      response = await provider.relay.pollRequestUntilTerminalState(txHash);
      break;
    } catch (err) {
      console.warn("Minting failed, retrying...", err);

      // give it a second before retrying
      await new Promise((resolve) => setTimeout(resolve, 1000));
      attempts--;
    }
  }

  if (!response || response.status !== "Succeeded") {
    throw new Error("Minting failed");
  }

  const newPKP = {
    tokenId: response.pkpTokenId,
    publicKey: response.pkpPublicKey,
    ethAddress: response.pkpEthAddress,
  };

  return newPKP;
}

/**
 * Get provider for given auth method
 */
function getProviderByAuthMethod(authMethod) {
  switch (authMethod.authMethodType) {
    case AuthMethodType.EthWallet:
      return litAuthClient.getProvider(ProviderType.EthWallet);
    default:
      return;
  }
}
