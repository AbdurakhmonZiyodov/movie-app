/* eslint-disable @typescript-eslint/no-unused-vars */
import BackButton from '@/components/BackButton';
import { Button } from '@/components/Button';
import Container from '@/components/Container';
import { FormInput } from '@/components/FormController/FormController';
import RN from '@/components/RN';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { onChangeRedirectRootUrl } from '@/store/features/NavigationStore';
import { useAppDispatch } from '@/store/hooks';
import { yupResolver } from '@hookform/resolvers/yup';
import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { useForm } from 'react-hook-form';
import { PRIVATE_STACK, PUBLIC_STACK, ROOT_STACK } from '../../shared/routes';
import { router } from 'expo-router';
import {
  useLoginMutation,
  useLoginPhoneSendCodeMutation,
  useLoginWithGoogleMutation,
} from '@/store/services/features/AuthApi';
import { onUpdateNewUser, onUpdateTokens } from '@/store/LocalStore';
import { CoreStyle } from '@/shared/styles/globalStyles';
import * as Google from 'expo-auth-session/providers/google';
import config from '@/config';
import {
  emailFieldSchema,
  passwordFieldSchema,
} from '@/shared/utils/validation';
import * as yup from 'yup';
import { normalizeHeight } from '@/shared/constants/dimensions';
import { PoppinsFonts } from '@/shared/assets/fonts/poppins.fonts';
import { COLORS } from '@/shared/constants/colors';
import { GoogleImagePng } from '@/shared/assets/images';
import { Spacing } from '@/components/Spacing';
import * as WebBrowser from 'expo-web-browser';
import {
  phoneNumberSchema,
  uzbekistanPhoneNumberMask,
} from '@/components/Inputs/utils';

WebBrowser.maybeCompleteAuthSession();

const schema = yup.object({
  phone: phoneNumberSchema,
});

const initialValues = {
  phone: '',
};
export default function Login() {
  const dispatch = useAppDispatch();
  const [loginWithGoogle, { isLoading: googleLoading }] =
    useLoginWithGoogleMutation();

  const [_, response, promptAsync] = Google.useAuthRequest({
    androidClientId: config.GOOGLE.android,
    iosClientId: config.GOOGLE.ios,
  });

  const [shouldTriggerError, setShouldTriggerError] = useState(false);
  const [loginWithPhoneSendCode, { isLoading }] =
    useLoginPhoneSendCodeMutation();
  const { handleSubmit, control, clearErrors, reset } = useForm({
    defaultValues: initialValues,
    mode: 'all',
    reValidateMode: 'onBlur',
    resolver: yupResolver(schema),
  });

  const goBack = useCallback(() => {
    dispatch(onChangeRedirectRootUrl({ url: ROOT_STACK.public }));
  }, [dispatch]);

  const onGoogleAuth = useCallback(
    async (google_token: string) => {
      try {
        const response = await loginWithGoogle({ google_token });
        if (response.data) {
          setTimeout(() => {
            dispatch(onUpdateTokens({ tokens: response?.data.data }));
            dispatch(onUpdateNewUser(false));
            router.push(PRIVATE_STACK.tab);
          }, 100);
        }
      } catch (err) {
        console.error(err);
      }
    },
    [dispatch, loginWithGoogle],
  );

  const onSubmitHandler = handleSubmit(
    async (formValues) => {
      const phone = +formValues.phone.replace(/\D/g, '').slice(3);
      await loginWithPhoneSendCode({ phone })
        .then((response) => {
          if (response.data?.success) {
            router.push({
              pathname: PUBLIC_STACK.otp,
              params: {
                phone,
              },
            });
          }
        })
        .catch((err) => {
          console.log({ err });
        });
    },
    (_error) => setShouldTriggerError(true),
  );

  useEffect(() => {
    if (response?.type === 'success' && response?.authentication?.idToken) {
      onGoogleAuth(response.authentication.idToken);
    }
  }, [onGoogleAuth, response]);

  const fieldProps = useMemo(
    () => ({
      shouldTriggerError,
    }),
    [shouldTriggerError],
  );

  return (
    <>
      <KeyboardAwareScrollView
        bounces={false}
        contentContainerStyle={CoreStyle.flexGrow1}
      >
        <Container
          // Header={<BackButton onGoBack={goBack} />}
          mainStyle={styles.container}
          Footer={
            <>
              <Button
                title={'Google orqali kirish'}
                loading={googleLoading}
                onPress={() => promptAsync()}
                loadingColor={COLORS.black}
                style={{
                  backgroundColor: COLORS.white,
                  flexDirection: 'row',
                  alignItems: 'center',
                  paddingVertical: 0,
                }}
                titleStyle={{
                  color: COLORS.black,
                }}
                RightSection={
                  <RN.Image
                    source={GoogleImagePng}
                    style={styles.googleImage}
                    contentFit={'contain'}
                  />
                }
              />
              <Spacing />
            </>
          }
        >
          <RN.View g={16}>
            <FormInput
              control={control}
              name={'phone'}
              isMask={true}
              mask={uzbekistanPhoneNumberMask}
              placeholder={'+998-XX-XXX-XX-XX'}
              keyboardType={'number-pad'}
              {...fieldProps}
            />
            <Button
              title={'Kirish'}
              loading={isLoading}
              onPress={onSubmitHandler}
            />
          </RN.View>
        </Container>
      </KeyboardAwareScrollView>
    </>
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
  googleImage: {
    width: 50,
    height: 50,
  },
});
