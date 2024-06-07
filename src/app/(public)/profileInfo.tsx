import { BottomSheetRef } from '@/components/BottomSheet';
import ProfileEditBottomSheet from '@/components/BottomSheets/ProfileEditBottomSheet';
import Container from '@/components/Container';
import RN from '@/components/RN';
import { PoppinsFonts } from '@/shared/assets/fonts/poppins.fonts';
import { COLORS } from '@/shared/constants/colors';
import { normalizeHeight } from '@/shared/constants/dimensions';
import { PRIVATE_STACK } from '@/shared/routes';
import { CoreStyle } from '@/shared/styles/globalStyles';
import { onUpdateNewUser } from '@/store/LocalStore';
import { useAppDispatch } from '@/store/hooks';
import { useIsFocused } from '@react-navigation/native';
import { router } from 'expo-router';
import React, { useCallback, useEffect, useRef } from 'react';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

export default function ProfileUpdateScreen() {
  const profileModalRef = useRef<BottomSheetRef>(null);
  const isFocused = useIsFocused();
  const dispatch = useAppDispatch();

  const onShow = useCallback(() => {
    setTimeout(() => {
      profileModalRef.current?.onShow();
    }, 0);
  }, []);

  const onHide = useCallback(() => {
    setTimeout(() => {
      profileModalRef.current?.onHide();
      router.push(PRIVATE_STACK.tab);
      dispatch(onUpdateNewUser(false));
    }, 0);
  }, [dispatch]);

  useEffect(() => {
    if (isFocused) {
      onShow();
    }
  }, [isFocused, onShow]);

  return (
    <>
      <KeyboardAwareScrollView
        bounces={false}
        contentContainerStyle={CoreStyle.flexGrow1}
      >
        <Container
          // Header={<BackButton onGoBack={goBack} />}
          mainStyle={styles.container}
          // Footer={
          //   <>
          //     <Button
          //       title={'Google orqali kirish'}
          //       loading={googleLoading}
          //       onPress={() => promptAsync()}
          //       loadingColor={COLORS.black}
          //       style={{
          //         backgroundColor: COLORS.white,
          //         flexDirection: 'row',
          //         alignItems: 'center',
          //         paddingVertical: 0,
          //       }}
          //       titleStyle={{
          //         color: COLORS.black,
          //       }}
          //       RightSection={
          //         <RN.Image
          //           source={GoogleImagePng}
          //           style={styles.googleImage}
          //           contentFit={'contain'}
          //         />
          //       }
          //     />
          //     <Spacing />
          //   </>
          // }
        >
          <RN.View g={16}>
            <ProfileEditBottomSheet
              name={''}
              imageUrl={null}
              isDrag={false}
              bottomSheetRef={profileModalRef}
              callbackAfterSave={onHide}
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
