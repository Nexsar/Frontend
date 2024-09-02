import { useCallback, useState } from 'react';
import { getPKPs, mintPKP } from '../utils/lit';

export default function useAccounts() {
  const [accounts, setAccounts] = useState([]);
  const [currentAccount, setCurrentAccount] = useState();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState();

  const fetchAccounts = useCallback(
    async (authMethod) => {
      setLoading(true);
      setError(undefined);
      try {
    
        const myPKPs = await getPKPs(authMethod);
        setAccounts(myPKPs);
        if (myPKPs.length === 1) {
          setCurrentAccount(myPKPs[0]);
        }
      } catch (err) {
        setError(err);
      } finally {
        setLoading(false);
      }
    },
    []
  );

  const createAccount = useCallback(
    async (authMethod)=> {
      setLoading(true);
      setError(undefined);
      try {
        const newPKP = await mintPKP(authMethod);
        setAccounts(prev => [...prev, newPKP]);
        setCurrentAccount(newPKP);
      } catch (err) {
        setError(err);
      } finally {
        setLoading(false);
      }
    },
    []
  );

  return {
    fetchAccounts,
    createAccount,
    setCurrentAccount,
    accounts,
    currentAccount,
    loading,
    error,
  };
}
