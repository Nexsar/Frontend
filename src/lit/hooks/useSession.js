import { useCallback, useState } from 'react';
import { AuthMethod } from '@lit-protocol/types';
import { getSessionSigs } from '../utils/lit';
import { LitAbility, LitActionResource } from '@lit-protocol/auth-helpers';
import { IRelayPKP } from '@lit-protocol/types';
import { SessionSigs } from '@lit-protocol/types';

export default function useSession() {
  const [sessionSigs, setSessionSigs] = useState();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState();

  /**
   * Generate session sigs and store new session data
   */
  const initSession = useCallback(
    async (authMethod, pkp) => {
      setLoading(true);
      setError(undefined);
      try {
        // Prepare session sigs params
        const chain = 'ethereum';
        const resourceAbilities = [
          {
            resource: new LitActionResource('*'),
            ability: LitAbility.PKPSigning,
          },
        ];
        const expiration = new Date(
          Date.now() + 1000 * 60 * 60 * 24 * 7
        ).toISOString(); // 1 week

        localStorage.setItem("pkp", JSON.stringify(pkp));
        localStorage.setItem("authMethod", JSON.stringify(authMethod));

        // Generate session sigs
        const sessionSigs = await getSessionSigs({
          pkpPublicKey: pkp.publicKey,
          authMethod,
          //@ts-ignore
          sessionSigsParams: {
            chain,
            expiration,
            resourceAbilityRequests: resourceAbilities,
          },
        });

        setSessionSigs(sessionSigs);
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
