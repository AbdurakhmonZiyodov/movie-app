import { Button } from '@/components/Button';
import Container from '@/components/Container';
import { TextInput } from '@/components/Inputs/TextInput';
import RN from '@/components/RN';
import { PoppinsFonts } from '@/shared/assets/fonts/poppins.fonts';
import { COLORS } from '@/shared/constants/colors';
import { normalizeHeight } from '@/shared/constants/dimensions';
import React, { useState } from 'react';
import { Link } from 'expo-router';
import { ROOT_STACK } from './(tabs)/routes';

export default function SignIn() {
  const [{ email, password }, setState] = useState({ email: '', password: '' });

  return (
    <Container style={styles.container}>
      <RN.View g={16}>
        <TextInput
          placeholder={'Email'}
          value={email}
          onChangeText={(email) => setState((prev) => ({ ...prev, email }))}
        />
        <TextInput
          placeholder={'Parol'}
          value={password}
          secureTextEntry={true}
          onChangeText={(password) =>
            setState((prev) => ({ ...prev, password }))
          }
        />
        <Button title={'Kirish'} />

        <RN.View fd={'row'} jc={'center'} g={5}>
          <RN.Text style={styles.warningText}>{"Hisobingiz yo'qmi?"}</RN.Text>
          <Link href={ROOT_STACK.signUp} asChild={true}>
            <RN.TouchableOpacity activeOpacity={0.5}>
              <RN.Text style={[styles.warningText, styles.signUpText]}>
                {"Ro'yxatdan o'tish!"}
              </RN.Text>
            </RN.TouchableOpacity>
          </Link>
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
