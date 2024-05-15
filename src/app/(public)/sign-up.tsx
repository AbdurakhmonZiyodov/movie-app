import BackButton from '@/components/BackButton';
import { Button } from '@/components/Button';
import Container from '@/components/Container';
import { FormInput } from '@/components/FormController/FormController';
import RN from '@/components/RN';
import { PoppinsFonts } from '@/shared/assets/fonts/poppins.fonts';
import { COLORS } from '@/shared/constants/colors';
import { normalizeHeight } from '@/shared/constants/dimensions';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import {
  emailFieldSchema,
  nameFieldSchema,
  passwordFieldSchema,
} from '@/shared/utils/validation';
import { useRegisterEmailMutation } from '@/store/services/features/AuthApi';
import { yupResolver } from '@hookform/resolvers/yup';
import { router } from 'expo-router';
import React, { useCallback, useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import { PUBLIC_STACK } from '../(private)/(tabs)/routes';
import { CoreStyle } from '@/shared/styles/globalStyles';

const schema = yup.object({
  name: nameFieldSchema,
  email: emailFieldSchema,
  password: passwordFieldSchema,
});

const initialValues = {
  name: '',
  email: '',
  password: '',
};

export default function SignUp() {
  const [registerWithEmailSendCode, { isLoading }] = useRegisterEmailMutation();
  const [shouldTriggerError, setShouldTriggerError] = useState(false);
  const { control, handleSubmit, clearErrors, reset } = useForm({
    defaultValues: initialValues,
    mode: 'all',
    reValidateMode: 'onBlur',
    resolver: yupResolver(schema),
  });

  const allClear = useCallback(() => {
    clearErrors();
    reset();
  }, [clearErrors, reset]);

  const onSubmit = handleSubmit(
    async (_data) => {
      const response = await registerWithEmailSendCode(_data);
      if (response.data?.success) {
        router.push({
          pathname: PUBLIC_STACK.otp,
          params: {
            email: _data.email,
          },
        });
      }
    },
    async (_error) => setShouldTriggerError(true),
  );

  useEffect(() => () => allClear(), [allClear]);

  return (
    <KeyboardAwareScrollView
      bounces={false}
      contentContainerStyle={CoreStyle.flexGrow1}
    >
      <Container mainStyle={styles.container} Header={<BackButton />}>
        <RN.View g={16}>
          <FormInput
            name={'name'}
            control={control}
            placeholder={'Ism'}
            shouldTriggerError={shouldTriggerError}
          />
          <FormInput
            name={'email'}
            control={control}
            placeholder={'Email'}
            shouldTriggerError={shouldTriggerError}
          />
          <FormInput
            name={'password'}
            control={control}
            placeholder={'Parol'}
            shouldTriggerError={shouldTriggerError}
          />
          <Button
            title={'Ro’yxatdan o’tish'}
            onPress={onSubmit}
            loading={isLoading}
          />

          <RN.View fd={'row'} jc={'center'} g={5}>
            <RN.Text style={styles.warningText}>{'Hisobingiz bormi?'}</RN.Text>
            <RN.TouchableOpacity
              activeOpacity={0.5}
              onPress={() => router.back()}
            >
              <RN.Text style={[styles.warningText, styles.signUpText]}>
                {'Kirish!'}
              </RN.Text>
            </RN.TouchableOpacity>
          </RN.View>
        </RN.View>
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
