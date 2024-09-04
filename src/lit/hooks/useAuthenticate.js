import { useCallback, useState, useEffect } from 'react';
import {
  authenticateWithEthWallet,
} from '../utils/lit';
import { useConnect } from 'wagmi';


export default function useAuthenticate(redirectUri) {
  const [authMethod, setAuthMethod] = useState();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState();

  const { connectAsync } = useConnect({
    onError: (err) => {
      setError(err);
    },
  });


  const authWithEthWallet = useCallback(
    async (connector) => {
      setLoading(true);
      setError(undefined);
      setAuthMethod(undefined);
      console.log("inside use autheticate authwithethwallet");

      try {
        const chainId = await window.ethereum.request({ method: 'eth_chainId' });
        console.log('Connected to chain:', chainId);

        const { account, connector: activeConnector } = await connectAsync(
          connector
        );
        const signer = await activeConnector.getSigner();
        console.log("signer is ", signer);
        const signMessage = async (message) => {
          const sig = await signer.signMessage(message);
          return sig;
        };
        const result = await authenticateWithEthWallet(
          account,
          signMessage
        );
        console.log("results are ", result);
        setAuthMethod(result);
        console.log("auth method is ", authMethod);
        localStorage.setItem("AuthMethod", result);
      } catch (err) {
        setError(err);
      } finally {
        setLoading(false);
      }
    },
    [connectAsync]
  );


  return {
    authWithEthWallet,
    authMethod,
    loading,
    error,
  };
}
