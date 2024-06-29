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
import { Alert } from 'react-native';
import { useIsFocused } from '@react-navigation/native';
import { router } from 'expo-router';

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

  const onLogoutHandler = useCallback(async () => {
    try {
      setTimeout(() => {
        router.replace(PUBLIC_STACK.login);
        dispatch(onUpdateTokens({ tokens: null }));
      }, 100);
    } catch (err) {
      console.error(err);
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

  useEffect(() => {
    if (isFocused) {
      refetch();
    }
  }, [isFocused, refetch]);

  return (
    <Container edges={['top']}>
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
      />
    </Container>
  );
}
