import { useEffect } from 'react';
import useAuthenticate from '../hooks/useAuthenticate';
import useSession from '../hooks/useSession';
import useAccounts from '../hooks/useAccounts';
import {
  ORIGIN,
} from '../utils/lit';
import SignUpMethods from '../components/SignUpMethods';
import Dashboard from '../components/Dashboard';
import Loading from '../components/Loading';

export default function SignUpView() {
  const redirectUri = ORIGIN;

  const {
    authMethod,
    authWithEthWallet,
    loading: authLoading,
    error: authError,
  } = useAuthenticate(redirectUri);
  const {
    createAccount,
    currentAccount,
    loading: accountsLoading,
    error: accountsError,
  } = useAccounts();
  const {
    initSession,
    sessionSigs,
    loading: sessionLoading,
    error: sessionError,
  } = useSession();

  const error = authError || accountsError || sessionError;

  if (error) {
    if (authError) {
      console.error('Auth error:', authError);
    }

    if (accountsError) {
      console.error('Accounts error:', accountsError);
    }

    if (sessionError) {
      console.error('Session error:', sessionError);
    }
  }

  useEffect(() => {
    if (authMethod != undefined) {
      createAccount(authMethod);
    }
  }, [createAccount, authMethod]);

  useEffect(() => {
    if (authMethod && currentAccount) {
      initSession(authMethod, currentAccount);
    }
  }, [authMethod, currentAccount, initSession]);


  if (authLoading) {
    return (
      <Loading copy={'Authenticating your credentials...'} error={error} />
    );
  }

  if (accountsLoading) {
    return <Loading copy={'Creating your account...'} error={error} />;
  }

  if (sessionLoading) {
    return <Loading copy={'Securing your session...'} error={error} />;
  }

  if (currentAccount && sessionSigs) {
    return (
      <Dashboard currentAccount={currentAccount} sessionSigs={sessionSigs} />
    );
  } else {
    return (
      <SignUpMethods
        authWithEthWallet={authWithEthWallet}
        error={error}
      />
    );
  }
}
