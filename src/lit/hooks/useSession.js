import { useCallback, useState } from 'react';
import { getSessionSigsForDistributor } from '../utils/lit';
import { LitAbility, LitActionResource } from '@lit-protocol/auth-helpers';

export default function useSession() {
  const [sessionSigs, setSessionSigs] = useState();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState();

  const initSession = useCallback(
    async (authMethod, pkp)=> {
      setLoading(true);
      setError(undefined);
      try {
        const chain = 'ethereum';
     
        const expiration = new Date(
          Date.now() + 1000 * 60 * 60 * 24 * 7
        ).toISOString();
        console.log("pkp public key is ",pkp.publicKey, "and pkp is ", pkp);

        localStorage.setItem("pkp",JSON.stringify(pkp));
        localStorage.setItem("authMethod",JSON.stringify(authMethod));
        const sessionSigs = await getSessionSigsForDistributor({
          pkpPublicKey: pkp.publicKey,
          authMethod,
        });
        setSessionSigs(sessionSigs);
        console.log("session signs ares",sessionSigs);
      } catch (err) {
        setError(err);
      } finally {
        setLoading(false);
      }
    },
    []
  );

  return {
    initSession,
    sessionSigs,
    loading,
    error,
  };
}
