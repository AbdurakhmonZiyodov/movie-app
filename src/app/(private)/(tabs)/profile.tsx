import { BottomSheetRef } from '@/components/BottomSheet';
import Container from '@/components/Container';
import { Spacing } from '@/components/Spacing';
import { onUpdateTokens } from '@/store/LocalStore';
import { onChangeRedirectRootUrl } from '@/store/features/NavigationStore';
import { useAppDispatch } from '@/store/hooks';
import { useProfileInfoQuery } from '@/store/services/features/AuthApi';
import React, { useCallback, useRef } from 'react';
import { ROOT_STACK } from '../../../shared/routes';
import PremiumBottomSheet from '@/components/BottomSheets/PremiumBottomSheet';
import ProfileHeader from '@/components/Profile/ProfileHeader';
import ProfileMain from '@/components/Profile/ProfileMain';
import { Alert } from 'react-native';

export default function ProfileScreen() {
  const premiumBottomSheetRef = useRef<BottomSheetRef>(null);
  const dispatch = useAppDispatch();
  const { data, isLoading: profileInfoLoading } = useProfileInfoQuery();

  const onLogoutPress = useCallback(() => {
    Alert.alert(
      'Ogoxlantirish!',
      'Siz haqiqatan ham hisobingizdan chiqmoqchimisiz? 🥺',
      [
        {
          text: 'Yoq',
          style: 'cancel',
        },
        {
          text: 'Xa',
          style: 'destructive',
          onPress: () => {
            dispatch(onChangeRedirectRootUrl({ url: ROOT_STACK.private }));
            setTimeout(() => {
              dispatch(onUpdateTokens({ tokens: null }));
            }, 100);
          },
        },
      ],
    );
  }, [dispatch]);

  const onBuyPremiumPress = useCallback(() => {
    premiumBottomSheetRef.current?.onShow();
  }, []);

  return (
    <Container edges={['top']}>
      <ProfileHeader
        name={data?.data?.name}
        email={data?.data?.email}
        isLoading={profileInfoLoading}
      />
      <Spacing steps={4} />
      <ProfileMain onLogout={onLogoutPress} onBuyPremium={onBuyPremiumPress} />
      <PremiumBottomSheet bottomSheetRef={premiumBottomSheetRef} />
    </Container>
  );
}
