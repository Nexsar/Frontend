import { useCallback, useState } from 'react';
import { getSessionSigsForDistributor } from '../utils/lit';
import { LitAbility, LitActionResource } from '@lit-protocol/auth-helpers';
import { useDispatch, useSelector } from 'react-redux';
import { setAddress, setPublicKey } from '@/slices/userSlice';
import { useNavigate} from "react-router-dom";

export default function useSession() {

  const navigate = useNavigate();
  const [sessionSigs, setSessionSigs] = useState();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState();

  const user = useSelector((state) => state.user);
  const dispatch = useDispatch()
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

        dispatch(setIsLitAuthenticated(true));
        dispatch(setPublicKey(pkp.publicKey));
        dispatch(setAddress(pkp.ethAddress));
        console.log(user);


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
        navigate("/home");
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
