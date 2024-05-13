import BackButton from '@/components/BackButton';
import { Button } from '@/components/Button';
import Container from '@/components/Container';
import { FormInput } from '@/components/FormController/FormController';
import RN from '@/components/RN';
import { PoppinsFonts } from '@/shared/assets/fonts/poppins.fonts';
import { COLORS } from '@/shared/constants/colors';
import { normalizeHeight } from '@/shared/constants/dimensions';
import {
  emailFieldSchema,
  passwordFieldSchema,
} from '@/shared/utils/validation';
import { onChangeRedirectRootUrl } from '@/store/features/NavigationStore';
import { useAppDispatch } from '@/store/hooks';
import { yupResolver } from '@hookform/resolvers/yup';
import React, { useCallback, useMemo, useState } from 'react';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import { PUBLIC_STACK, ROOT_STACK } from '../(private)/(tabs)/routes';
import { router } from 'expo-router';
import { useLoginMutation } from '@/store/services/features/AuthApi';
import { onUpdateTokens } from '@/store/LocalStore';

const schema = yup.object({
  email: emailFieldSchema,
  password: passwordFieldSchema,
});

const initialValues = {
  email: '',
  password: '',
};
export default function SignIn() {
  const dispatch = useAppDispatch();
  const [shouldTriggerError, setShouldTriggerError] = useState(false);
  const [login, { isLoading }] = useLoginMutation();
  const { handleSubmit, control, clearErrors, reset } = useForm({
    defaultValues: initialValues,
    mode: 'all',
    reValidateMode: 'onBlur',
    resolver: yupResolver(schema),
  });

  const goBack = useCallback(() => {
    dispatch(onChangeRedirectRootUrl({ url: ROOT_STACK.public }));
  }, [dispatch]);

  const onSubmitHandler = handleSubmit(
    async (formValues) => {
      await login(formValues).then(({ data }) => {
        if (data?.success) {
          goBack();
          dispatch(onUpdateTokens({ tokens: data?.data }));
        }
      });
    },
    (_error) => setShouldTriggerError(true),
  );

  const fieldProps = useMemo(
    () => ({
      shouldTriggerError,
    }),
    [shouldTriggerError],
  );

  return (
    <Container
      Header={<BackButton onGoBack={goBack} />}
      mainStyle={styles.container}
    >
      <RN.View g={16}>
        <FormInput
          control={control}
          name={'email'}
          placeholder={'Email'}
          {...fieldProps}
        />
        <FormInput
          control={control}
          name={'password'}
          placeholder={'Parol'}
          secureTextEntry={true}
          {...fieldProps}
        />
        <Button
          title={'Kirish'}
          loading={isLoading}
          onPress={onSubmitHandler}
        />

        <RN.View fd={'row'} jc={'center'} g={5}>
          <RN.Text style={styles.warningText}>{"Hisobingiz yo'qmi?"}</RN.Text>
          <RN.TouchableOpacity
            activeOpacity={0.5}
            onPress={() => {
              router.push(PUBLIC_STACK.sign_up);
              clearErrors();
              reset();
            }}
          >
            <RN.Text style={[styles.warningText, styles.signUpText]}>
              {"Ro'yxatdan o'tish!"}
            </RN.Text>
          </RN.TouchableOpacity>
        </RN.View>
      </RN.View>
    </Container>
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
