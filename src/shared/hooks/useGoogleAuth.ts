import config from '@/config';
import {
  GoogleSignin,
  statusCodes,
} from '@react-native-google-signin/google-signin';
import { useCallback, useState } from 'react';
import { DEBUG } from '../constants/global';
import useVisibility from './useVisibility';

GoogleSignin.configure({
  iosClientId: config.GOOGLE.ios,
  webClientId: config.GOOGLE.web,
  // @ts-expect-error
  androidClientId: config.GOOGLE.android,
  offlineAccess: true,
});

export const useGoogleAuth = () => {
  const loading = useVisibility();
  const [error, setError] = useState<string | null>(null);
  const [idToken, setIdToken] = useState<string | null>(null);

  const login = useCallback(async () => {
    loading.show();
    try {
      await GoogleSignin.hasPlayServices();
      const res = await GoogleSignin.signIn();
      setIdToken(res.idToken);
    } catch (err: any) {
      if (err.code === statusCodes.SIGN_IN_CANCELLED)
        setError('user cancelled the login flow');
      else if (err.code === statusCodes.IN_PROGRESS)
        setError('operation (e.g. sign in) is in progress already');
      else if (err.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE)
        setError('play services not available or outdated');
      else if (err.code === statusCodes.SIGN_IN_REQUIRED)
        setError('user has not signed in yet');
      else setError('some other error happened');

      if (DEBUG) {
        console.log(err);
      }
    } finally {
      setTimeout(loading.hide, 20);
    }
  }, [loading]);

  const logout = useCallback(async () => {
    try {
      await GoogleSignin.signOut();
    } catch (err) {
      setError(JSON.stringify({ err }, null, 2));
    }
  }, []);

  return {
    idToken,
    error,
    login,
    isLoading: loading.visible,
    logout,
  };
};
