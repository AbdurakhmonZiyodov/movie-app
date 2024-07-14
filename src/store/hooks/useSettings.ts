import { useCallback, useEffect } from 'react';
import {
  useDeleteMyAccountMutation,
  useGetSettingsQuery,
} from '../services/features/MovieApi';
import { Alert } from 'react-native';
import { useAppDispatch } from '../hooks';
import { onUpdateTokens } from '../LocalStore';
import { router } from 'expo-router';
import { PUBLIC_STACK } from '@/shared/routes';
import { useGoogleAuth } from '@/shared/hooks/useGoogleAuth';
import { DEBUG } from '@/shared/constants/global';
import useVisibility from '@/shared/hooks/useVisibility';

export const useUserSettings = () => {
  const dispatch = useAppDispatch();
  const googleAuth = useGoogleAuth();
  const { data: settingsData } = useGetSettingsQuery(undefined);
  const [removeUser, { isSuccess, data }] =
    useDeleteMyAccountMutation(undefined);
  const allowToRemoveUser = useVisibility();

  const onLogoutHandler = useCallback(async () => {
    try {
      setTimeout(() => {
        router.replace(PUBLIC_STACK.login);
        googleAuth.logout();
        dispatch(onUpdateTokens({ tokens: null }));
        allowToRemoveUser.hide();
      }, 100);
    } catch (err) {
      if (DEBUG) console.error(err);
    }
  }, [allowToRemoveUser, dispatch, googleAuth]);

  useEffect(() => {
    // @TODO: need to improve it
    if (allowToRemoveUser.visible && isSuccess && data.success) {
      (async () => {
        if (DEBUG) {
          console.log(JSON.stringify(data, null, 2));
        }
        await onLogoutHandler();
      })();
    }
  }, [allowToRemoveUser.visible, data, isSuccess, onLogoutHandler]);

  const deleteAccount = useCallback(async () => {
    allowToRemoveUser.show();
    await removeUser(undefined);
  }, [allowToRemoveUser, removeUser]);

  const deleteAccountHandler = useCallback(async () => {
    Alert.alert(
      'Iltimos shoshmang!',
      "Siz haqiqatan ham hisobingizdan o'chirib tashlamoqchimisiz? 🥺",
      [
        {
          text: 'Yoq',
          style: 'cancel',
        },
        {
          text: 'Xa',
          style: 'destructive',
          onPress: deleteAccount,
        },
      ],
    );
  }, [deleteAccount]);
  return {
    settings: {
      ...settingsData?.data,
    },
    deleteAccountHandler,
  };
};
