/* eslint-disable react-hooks/exhaustive-deps */
import { BottomSheetRef } from '@/components/BottomSheet';
import Container from '@/components/Container';
import { Spacing } from '@/components/Spacing';
import { onUpdateTokens } from '@/store/LocalStore';
import { useAppDispatch } from '@/store/hooks';
import { useProfileInfoQuery } from '@/store/services/features/AuthApi';
import React, { useCallback, useEffect, useRef } from 'react';
import { PUBLIC_STACK } from '../../../shared/routes';
import PremiumBottomSheet from '@/components/BottomSheets/PremiumBottomSheet';
import ProfileEditBottomSheet from '@/components/BottomSheets/ProfileEditBottomSheet';
import ProfileHeader from '@/components/Profile/ProfileHeader';
import ProfileMain from '@/components/Profile/ProfileMain';
import { Alert, RefreshControl } from 'react-native';
import { useIsFocused } from '@react-navigation/native';
import { router } from 'expo-router';
import useVisibility from '@/shared/hooks/useVisibility';
import { COLORS } from '@/shared/constants/colors';
import { DEBUG } from '@/shared/constants/global';
import { useGoogleAuth } from '@/shared/hooks/useGoogleAuth';

export default function ProfileScreen() {
  const premiumBottomSheetRef = useRef<BottomSheetRef>(null);
  const profileEditBottomSheetRef = useRef<BottomSheetRef>(null);
  const isFocused = useIsFocused();
  const dispatch = useAppDispatch();
  const {
    data,
    isLoading: profileInfoLoading,
    refetch,
  } = useProfileInfoQuery();
  const refreshControlVisible = useVisibility();
  const googleAuth = useGoogleAuth();

  useEffect(() => {
    const intervalId = setInterval(async () => {
      await refetch();
    }, 5 * 1000);

    // Cleanup function to clear the interval on unmount
    return () => clearInterval(intervalId);
  }, []); // Empty dependency array to run only on mount

  const onLogoutHandler = useCallback(async () => {
    try {
      setTimeout(() => {
        router.replace(PUBLIC_STACK.login);
        googleAuth.logout();
        dispatch(onUpdateTokens({ tokens: null }));
      }, 100);
    } catch (err) {
      if (DEBUG) console.error(err);
    }
  }, [dispatch]);

  const onLogoutPress = useCallback(() => {
    Alert.alert(
      'Iltimos shoshmang!',
      'Siz haqiqatan ham hisobingizdan chiqmoqchimisiz? 🥺',
      [
        {
          text: 'Yoq',
          style: 'cancel',
        },
        {
          text: 'Xa',
          style: 'destructive',
          onPress: onLogoutHandler,
        },
      ],
    );
  }, [onLogoutHandler]);

  const onBuyPremiumPress = useCallback(() => {
    premiumBottomSheetRef.current?.onShow();
  }, []);

  const onEditProfilePress = useCallback(() => {
    profileEditBottomSheetRef.current?.onShow();
  }, []);

  const onHideProfileEditBottomSheetPress = useCallback(async () => {
    await refetch();
    setTimeout(() => {
      profileEditBottomSheetRef.current?.onHide();
    });
  }, [refetch]);

  const onRefresh = useCallback(async () => {
    try {
      refreshControlVisible.show();
      await refetch().then(() => {
        setTimeout(refreshControlVisible.hide, 400);
      });
    } catch (err) {
      if (DEBUG) console.error(err);
    }
  }, [refetch, refreshControlVisible]);
  useEffect(() => {
    if (isFocused) {
      refetch();
    }
  }, [isFocused, refetch]);

  return (
    <Container
      edges={['top']}
      isScroll={true}
      refreshControl={
        <RefreshControl
          refreshing={refreshControlVisible.visible}
          onRefresh={onRefresh}
          tintColor={COLORS.white}
          colors={[COLORS.black, COLORS.orange, COLORS.black]}
        />
      }
    >
      <ProfileHeader
        name={data?.data?.name}
        email={data?.data?.email}
        imageUrl={data?.data.image || null}
        isLoading={profileInfoLoading}
      />
      <Spacing steps={4} />
      <ProfileMain
        onLogout={onLogoutPress}
        onBuyPremium={onBuyPremiumPress}
        onProfileEdit={onEditProfilePress}
      />
      <PremiumBottomSheet bottomSheetRef={premiumBottomSheetRef} />
      <ProfileEditBottomSheet
        name={data?.data.name ?? ''}
        imageUrl={data?.data.image || null}
        bottomSheetRef={profileEditBottomSheetRef}
        callbackAfterSave={onHideProfileEditBottomSheetPress}
      />
    </Container>
  );
}
