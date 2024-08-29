import { useCallback } from "react";
import { React } from "react";
import { useConnect } from "wagmi";
import { authenticateWithEthWallet } from "../utils/lit";

export default function useAuthenticate(redirectUri) {
  // wagmi hook
  const { connectAsync } = useConnect({
    onError: (err) => {
      console.log("error on connect async....");
    },
  });

  const authWithEthWallet = async (connector) => {
    console.log("here in auth with eth wallet, useauthenticate.js");
    try {
      const { account, connector: activeConnector } =
        await connectAsync(connector);
      const signer = await activeConnector.getSigner();
      const signMessage = async (message) => {
        const sig = await signer.signMessage(message);
        return sig;
      };
      const result = await authenticateWithEthWallet(account, signMessage);
    } catch (err) {
      console.log(err);
    }
  };

  return {
    authWithEthWallet,
  };
}
