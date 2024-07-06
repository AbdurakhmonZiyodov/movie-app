import RN from '@/components/RN';
import { Spacing } from '@/components/Spacing';
import config from '@/config';
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
  imageUrl,
  onRefresh,
}: {
  name?: string;
  email?: string;
  isLoading: boolean;
  imageUrl: string | null;
  onRefresh?: () => void;
}) => {
  const renderChildren = useCallback(
    () => (
      <>
        {imageUrl ? (
          <RN.Image
            source={{
              uri: config.IMAGE_URL + '/' + imageUrl,
            }}
            style={styles.image}
          />
        ) : (
          <UserSvg />
        )}
        <Spacing height={10} />
        <RN.Text style={styles.preModalPaymentButtonTitle}>{name}</RN.Text>
        <RN.Text style={styles.headerSubTitle}>{email}</RN.Text>
      </>
    ),
    [email, imageUrl, name],
  );
  return (
    <RN.View as={'center'} ai={'center'} minH={180} jc={'center'} w={'100%'}>
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
  refreshContainer: {
    position: 'absolute',
    right: 0,
    top: 0,
  },
  headerSubTitle: {
    fontSize: normalizeHeight(14),
    fontFamily: MontserratFonts.Montserrat_500,
    color: COLORS.white,
  },
  image: {
    width: 81,
    height: 81,
    borderRadius: 81,
  },
});

export default ProfileHeader;
