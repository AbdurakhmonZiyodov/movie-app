import { useMemo } from 'react';
import {
  selectIsNewUser,
  selectIsOnboardingViewed,
  selectTokens,
} from '../LocalStore';
import { selectRedirectRootUrl } from '../features/NavigationStore';
import { useAppSelector } from '../hooks';

export const useLocalStore = () => {
  const isOnboardingViewed = useAppSelector(selectIsOnboardingViewed);
  const redirectRootUrl = useAppSelector(selectRedirectRootUrl);
  const tokens = useAppSelector(selectTokens);
  const isNewUser = useAppSelector(selectIsNewUser);

  const isAuthenticated = useMemo(() => {
    let visiblity = false;
    if (tokens && tokens?.access_token && tokens?.refresh_token && !isNewUser) {
      visiblity = true;
    } else {
      visiblity = false;
    }
    return visiblity;
  }, [isNewUser, tokens]);

  return {
    isOnboardingViewed,
    redirectRootUrl,
    tokens,
    isAuthenticated,
  };
};
