import { useMemo } from 'react';
import { selectIsOnboardingViewed, selectTokens } from '../LocalStore';
import { selectRedirectRootUrl } from '../features/NavigationStore';
import { useAppSelector } from '../hooks';

export const useLocalStore = () => {
  const isOnboardingViewed = useAppSelector(selectIsOnboardingViewed);
  const redirectRootUrl = useAppSelector(selectRedirectRootUrl);
  const tokens = useAppSelector(selectTokens);

  const isAuthenticated = useMemo(() => {
    let visiblity = false;
    if (tokens && tokens?.access_token && tokens?.refresh_token) {
      visiblity = true;
    } else {
      visiblity = false;
    }
    return visiblity;
  }, [tokens]);

  return {
    isOnboardingViewed,
    redirectRootUrl,
    tokens,
    isAuthenticated,
  };
};
