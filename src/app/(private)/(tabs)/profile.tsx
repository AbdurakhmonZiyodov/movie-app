import BottomSheet, { BottomSheetRef } from '@/components/BottomSheet';
import { Button } from '@/components/Button';
import Container from '@/components/Container';
import RN from '@/components/RN';
import { Spacing } from '@/components/Spacing';
import { PoppinsFonts } from '@/shared/assets/fonts/poppins.fonts';
import { PaymeSvg, PremiumCrownSvg, UserSvg } from '@/shared/assets/images/svg';
import { COLORS } from '@/shared/constants/colors';
import { normalizeHeight } from '@/shared/constants/dimensions';
import { CoreStyle } from '@/shared/styles/globalStyles';
import { MaterialIcons } from '@expo/vector-icons';
import { Portal } from '@gorhom/portal';
import Ripple from 'react-native-material-ripple';
import React, { ReactNode, RefObject, useCallback, useRef } from 'react';
import { ROOT_STACK } from './routes';
import { useAppDispatch } from '@/store/hooks';
import { onChangeRedirectRootUrl } from '@/store/features/NavigationStore';
import { useLocalStore } from '@/store/hooks/useLocalStore';
import { onUpdateTokens } from '@/store/LocalStore';
import { useProfileInfoQuery } from '@/store/services/features/AuthApi';
import { MontserratFonts } from '@/shared/assets/fonts/montserrat.fonts';

const config: any = {
  holderColor: 'white',
  fromZero: true,
  backgroundColor: 'dark',
};

export default function ProfileScreen() {
  const premiumBottomSheetRef = useRef<BottomSheetRef>(null);
  const dispatch = useAppDispatch();
  const { isAuthenticated } = useLocalStore();

  const { data } = useProfileInfoQuery();

  return (
    <Container
      edges={['top']}
      Footer={
        <>
          <RN.View style={CoreStyle.flex1} />
          <Button
            title={isAuthenticated ? 'Chiqish' : 'Kirish'}
            style={styles.loginButton}
            onPress={() => {
              dispatch(onUpdateTokens({ tokens: null }));
              dispatch(onChangeRedirectRootUrl({ url: ROOT_STACK.private }));
            }}
            RightSection={
              <RN.View pl={4}>
                <MaterialIcons
                  name={isAuthenticated ? 'logout' : 'login'}
                  size={24}
                  color={COLORS.white}
                />
              </RN.View>
            }
          />
        </>
      }
    >
      <ProfileHeader name={data?.data?.name} email={data?.data?.email} />

      <Spacing steps={4} />
      <Button
        title={'Premium sotib olish'}
        onPress={() => {
          premiumBottomSheetRef?.current?.onShow();
        }}
      />
      <PremiumBottomSheet bottomSheetRef={premiumBottomSheetRef} />
    </Container>
  );
}

const ProfileHeader = ({ name, email }: { name?: string; email?: string }) => (
  <RN.View as={'center'} ai={'center'}>
    <UserSvg />
    <Spacing height={10} />
    <RN.Text style={styles.preModalPaymentButtonTitle}>{name}</RN.Text>
    <RN.Text style={styles.headerSubTitle}>{email}</RN.Text>
  </RN.View>
);

export const PremiumBottomSheet = ({
  bottomSheetRef,
}: {
  bottomSheetRef?: RefObject<BottomSheetRef>;
}) => {
  const renderChild = useCallback(
    (child: ReactNode) => (
      <RN.View style={styles.wrapper}>
        {child}
        <RN.View ai={'center'} pr={10} pb={20}>
          <PremiumCrownSvg width={100} height={100} />
          <PaymeSvg width={70} height={30} />
        </RN.View>

        <RN.FlatList
          data={[1, 2, 3, 4, 5]}
          numColumns={2}
          columnWrapperStyle={{
            gap: 6,
            justifyContent: 'space-between',
          }}
          contentContainerStyle={{
            gap: 6,
          }}
          keyExtractor={(_, key) => key.toString()}
          renderItem={() => (
            <Ripple
              rippleColor={COLORS.orange}
              style={[
                styles.preModalPaymentButton,
                styles.activePreModalPaymentButton,
              ]}
            >
              <RN.Text style={styles.preModalPaymentButtonTitle}>
                {'Standart'}
              </RN.Text>
              <RN.Text style={styles.preModalPaymentButtonSubTitle}>
                {'20 kun'}
              </RN.Text>
            </Ripple>
          )}
        />

        <RN.View style={CoreStyle.flex1} />
        <Button title={'Premium sotib olish'} onPress={() => {}} />
      </RN.View>
    ),
    [],
  );

  return (
    <Portal>
      <BottomSheet
        {...config}
        maxYPosition={0}
        bottomSheetRef={bottomSheetRef}
        containerStyle={
          {
            // maxHeight: SIZES.height * 0.9,
          }
        }
      >
        {renderChild}
      </BottomSheet>
    </Portal>
  );
};

const styles = RN.StyleSheet.create({
  loginButton: {
    flexDirection: 'row',
  },
  wrapper: {
    paddingHorizontal: 20,
    backgroundColor: COLORS.dark,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    flex: 1,
    borderWidth: 1,
    borderColor: 'transparent',
  },
  title: {
    fontSize: normalizeHeight(28),
    fontFamily: PoppinsFonts.Poppins_600,
    textAlign: 'center',
    paddingTop: 10,
    color: COLORS.white,
  },
  preModalPaymentButton: {
    paddingVertical: 15,
    paddingHorizontal: 15,
    backgroundColor: COLORS.black2,
    width: '47%',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: COLORS.black2,
  },
  activePreModalPaymentButton: {
    borderColor: COLORS.orange,
  },
  preModalPaymentButtonTitle: {
    fontSize: normalizeHeight(20),
    fontFamily: PoppinsFonts.Poppins_600,
    color: COLORS.white,
    textAlign: 'center',
  },
  preModalPaymentButtonSubTitle: {
    fontSize: normalizeHeight(18),
    fontFamily: PoppinsFonts.Poppins_300,
    color: COLORS.white,
    textAlign: 'center',
  },
  headerSubTitle: {
    fontSize: normalizeHeight(14),
    fontFamily: MontserratFonts.Montserrat_500,
    color: COLORS.white,
  },
});
