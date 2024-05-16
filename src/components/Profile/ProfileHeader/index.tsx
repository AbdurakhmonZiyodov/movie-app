import RN from '@/components/RN';
import { Spacing } from '@/components/Spacing';
import { MontserratFonts } from '@/shared/assets/fonts/montserrat.fonts';
import { PoppinsFonts } from '@/shared/assets/fonts/poppins.fonts';
import { UserSvg } from '@/shared/assets/images/svg';
import { COLORS } from '@/shared/constants/colors';
import { normalizeHeight } from '@/shared/constants/dimensions';
import { useCallback } from 'react';

const ProfileHeader = ({
  name,
  email,
  isLoading,
}: {
  name?: string;
  email?: string;
  isLoading: boolean;
}) => {
  const renderChildren = useCallback(
    () => (
      <>
        <UserSvg />
        <Spacing height={10} />
        <RN.Text style={styles.preModalPaymentButtonTitle}>{name}</RN.Text>
        <RN.Text style={styles.headerSubTitle}>{email}</RN.Text>
      </>
    ),
    [email, name],
  );
  return (
    <RN.View as={'center'} ai={'center'} minH={180} jc={'center'}>
      {isLoading ? (
        <RN.ActivityIndicator color={COLORS.orange} />
      ) : (
        renderChildren()
      )}
    </RN.View>
  );
};

const styles = RN.StyleSheet.create({
  preModalPaymentButtonTitle: {
    fontSize: normalizeHeight(20),
    fontFamily: PoppinsFonts.Poppins_600,
    color: COLORS.white,
    textAlign: 'center',
  },
  headerSubTitle: {
    fontSize: normalizeHeight(14),
    fontFamily: MontserratFonts.Montserrat_500,
    color: COLORS.white,
  },
});

export default ProfileHeader;
