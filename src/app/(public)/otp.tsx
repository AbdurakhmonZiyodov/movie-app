import React from 'react';
import RN from '@/components/RN';
import Container from '@/components/Container';
import BackButton from '@/components/BackButton';
import { normalizeHeight } from '@/shared/constants/dimensions';
import { PoppinsFonts } from '@/shared/assets/fonts/poppins.fonts';
import { COLORS } from '@/shared/constants/colors';

export default function OtpScreen() {
  return (
    <Container mainStyle={styles.container} Header={<BackButton />}>
      <RN.View g={16}>
        <RN.View fd={'row'} jc={'center'} g={5}>
          <RN.Text style={styles.warningText}>{'Hisobingiz bormi?'}</RN.Text>
          <RN.TouchableOpacity activeOpacity={0.5}>
            <RN.Text style={[styles.warningText, styles.signUpText]}>
              {'Kirish!'}
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
