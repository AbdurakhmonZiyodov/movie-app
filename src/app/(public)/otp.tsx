import React, { useCallback, useMemo, useState } from 'react';
import RN from '@/components/RN';
import Container from '@/components/Container';
import BackButton from '@/components/BackButton';
import { normalizeHeight } from '@/shared/constants/dimensions';
import { PoppinsFonts } from '@/shared/assets/fonts/poppins.fonts';
import { COLORS } from '@/shared/constants/colors';
import AnimatedNumCodeInput from '@/components/Inputs/NumCodeInput/AnimatedNumCodeInput';
import { Ionicons } from '@expo/vector-icons';
import { Button } from '@/components/Button';
import { useLocalSearchParams } from 'expo-router';
import { useRegisterEmailVerificationMutation } from '@/store/services/features/AuthApi';
import { useAppDispatch } from '@/store/hooks';
import { onUpdateTokens } from '@/store/LocalStore';
import { ROOT_STACK } from '../(private)/(tabs)/routes';
import { onChangeRedirectRootUrl } from '@/store/features/NavigationStore';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { CoreStyle } from '@/shared/styles/globalStyles';

export default function OtpScreen() {
  const dispatch = useAppDispatch();

  const params = useLocalSearchParams();
  const email = useMemo(() => params?.email ?? '', [params]) as string;
  const [code, setCode] = useState('');

  const [verificationCode, { isLoading }] =
    useRegisterEmailVerificationMutation();

  const onVerificationCode = useCallback(async () => {
    const response = await verificationCode({ code, email });
    if (response.data && response.data.success) {
      dispatch(onChangeRedirectRootUrl({ url: ROOT_STACK.public }));
      dispatch(onUpdateTokens({ tokens: response.data?.data }));
    }
  }, [code, dispatch, email, verificationCode]);
  return (
    <KeyboardAwareScrollView contentContainerStyle={CoreStyle.flexGrow1}>
      <Container mainStyle={styles.container} Header={<BackButton />}>
        <AnimatedNumCodeInput
          email={email as string}
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
