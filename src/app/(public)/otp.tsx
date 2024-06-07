import { Button } from '@/components/Button';
import Container from '@/components/Container';
import AnimatedNumCodeInput from '@/components/Inputs/NumCodeInput/AnimatedNumCodeInput';
import RN from '@/components/RN';
import { PoppinsFonts } from '@/shared/assets/fonts/poppins.fonts';
import { COLORS } from '@/shared/constants/colors';
import { normalizeHeight } from '@/shared/constants/dimensions';
import { CoreStyle } from '@/shared/styles/globalStyles';
import { onUpdateNewUser, onUpdateTokens } from '@/store/LocalStore';
import { useAppDispatch } from '@/store/hooks';
import { useLoginPhoneVerifyMutation } from '@/store/services/features/AuthApi';
import { Ionicons } from '@expo/vector-icons';
import { router, useLocalSearchParams } from 'expo-router';
import React, { useCallback, useMemo, useState } from 'react';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { PRIVATE_STACK, PUBLIC_STACK } from '../../shared/routes';

export default function OtpScreen() {
  const dispatch = useAppDispatch();

  const params = useLocalSearchParams();
  const phone = useMemo(() => params?.phone ?? '', [params]) as string;
  const [code, setCode] = useState('');

  const [verificationCode, { isLoading }] = useLoginPhoneVerifyMutation();

  const onVerificationCode = useCallback(async () => {
    const response = await verificationCode({ code, phone: +phone });
    if (response.data && response.data.success) {
      if (response.data.data?.user?.is_success) {
        setTimeout(() => {
          dispatch(onUpdateNewUser(false));
          dispatch(onUpdateTokens({ tokens: response.data?.data }));
          router.push(PRIVATE_STACK.tab);
        }, 100);
      } else {
        dispatch(onUpdateNewUser(true));
        setTimeout(() => {
          router.push(PUBLIC_STACK.profile);
          dispatch(onUpdateTokens({ tokens: response.data?.data }));
        }, 100);
      }
    }
  }, [code, dispatch, phone, verificationCode]);
  return (
    <KeyboardAwareScrollView
      bounces={false}
      contentContainerStyle={CoreStyle.flexGrow1}
    >
      <Container mainStyle={styles.container}>
        <AnimatedNumCodeInput
          phone={phone as string}
          value={code}
          setValue={setCode}
        />

        <Button
          title={'Oldinga'}
          loading={isLoading}
          onPress={onVerificationCode}
          style={{ flexDirection: 'row', alignItems: 'center' }}
          RightSection={
            <RN.View pl={6}>
              <Ionicons name={'arrow-forward'} size={24} color={COLORS.white} />
            </RN.View>
          }
        />
      </Container>
    </KeyboardAwareScrollView>
  );
}

const styles = RN.StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
  },
  warningText: {
    fontSize: normalizeHeight(16),
    fontFamily: PoppinsFonts.Poppins_300,
    textAlign: 'center',
    color: COLORS.white,
  },
  signUpText: {
    color: COLORS.orange,
  },
});
