import BottomSheet, { BottomSheetRef } from '@/components/BottomSheet';
import { Button } from '@/components/Button';
import { FormInput } from '@/components/FormController/FormController';
import RN from '@/components/RN';
import { Spacing } from '@/components/Spacing';
import { UserSvg } from '@/shared/assets/images/svg';
import { COLORS } from '@/shared/constants/colors';
import useImageUpload from '@/shared/hooks/useImageUpload';
import { CoreStyle } from '@/shared/styles/globalStyles';
import { Entypo } from '@expo/vector-icons';
import { Portal } from '@gorhom/portal';
import { useIsFocused } from '@react-navigation/native';
import { ReactNode, RefObject, useCallback, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import appConfig from '@/config';
import { useUpdateProfileInfoMutation } from '@/store/services/features/AuthApi';

const config: any = {
  holderColor: 'white',
  fromZero: true,
  backgroundColor: 'dark',
};

const ProfileEditBottomSheet = ({
  bottomSheetRef,
  imageUrl,
  name,
  isDrag = true,
  callbackAfterSave,
}: {
  bottomSheetRef?: RefObject<BottomSheetRef>;
  imageUrl: string | null;
  name: string;
  isDrag?: boolean;
  callbackAfterSave?: () => void;
}) => {
  const isFocused = useIsFocused();
  const [updateProfile, { isLoading }] = useUpdateProfileInfoMutation();
  const { control, setValue, watch, reset } = useForm({
    defaultValues: {
      name,
      imageUrl,
    },
  });

  const onFocus = useCallback(() => {
    setValue('name', name);
    setValue('imageUrl', imageUrl);
  }, [imageUrl, name, setValue]);

  useEffect(() => {
    if (isFocused || name) {
      onFocus();
    }
  }, [imageUrl, isFocused, name, onFocus, setValue]);

  const profileImageUploader = useImageUpload({
    height: 500,
    width: 500,
    withCircleOverlay: true,
  });

  useEffect(() => {
    if (profileImageUploader.data) {
      setValue('imageUrl', profileImageUploader.data.filename);
    }
  }, [profileImageUploader.data, setValue]);

  const watchedName = watch('name');
  const watchedImageUrl = watch('imageUrl');
  const buttonDisabled = !watchedName;

  const onSave = useCallback(async () => {
    try {
      await updateProfile({
        name: watchedName,
        image: watchedImageUrl!,
      }).then(() => {
        callbackAfterSave?.();
      });
    } catch (err) {
      console.log(err);
    }
  }, [callbackAfterSave, updateProfile, watchedImageUrl, watchedName]);

  const renderChild = useCallback(
    (child: ReactNode) => (
      <KeyboardAwareScrollView
        bounces={false}
        contentContainerStyle={CoreStyle.flexGrow1}
      >
        <RN.View style={styles.wrapper}>
          {child}
          <RN.View pt={20}>
            {watchedImageUrl ? (
              <RN.Image
                source={{
                  uri: profileImageUploader.data?.url
                    ? profileImageUploader.data?.url
                    : `${appConfig.IMAGE_URL}/${watchedImageUrl}`,
                }}
                style={styles.image}
              />
            ) : (
              <UserSvg />
            )}
            <RN.TouchableOpacity
              style={styles.icon}
              activeOpacity={0.5}
              onPress={profileImageUploader.uploadImage}
            >
              <Entypo name={'pencil'} size={22} color={COLORS.white} />
            </RN.TouchableOpacity>
          </RN.View>

          <Spacing steps={4} />
          <FormInput
            control={control}
            name={'name'}
            placeholder={'Enter name'}
            style={{ width: '100%', color: COLORS.white }}
          />

          <RN.View style={CoreStyle.flex1} />
          <Button
            title={'Saqlash'}
            disabled={buttonDisabled}
            loading={isLoading}
            onPress={onSave}
          />
        </RN.View>
      </KeyboardAwareScrollView>
    ),
    [
      buttonDisabled,
      control,
      isLoading,
      profileImageUploader,
      watchedImageUrl,
      onSave,
    ],
  );

  return (
    <Portal>
      <BottomSheet
        {...config}
        isDrag={isDrag}
        bottomSheetRef={bottomSheetRef}
        onClose={() => {
          reset();
          onFocus();
          profileImageUploader.clear();
        }}
      >
        {renderChild}
      </BottomSheet>
    </Portal>
  );
};

const styles = RN.StyleSheet.create({
  wrapper: {
    paddingHorizontal: 20,
    backgroundColor: COLORS.dark,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    flex: 1,
    borderWidth: 1,
    borderColor: 'transparent',
    alignItems: 'center',
  },
  icon: {
    width: 30,
    height: 30,
    borderRadius: 30,
    backgroundColor: COLORS.dark,
    alignItems: 'center',
    justifyContent: 'center',
    position: 'absolute',
    right: -15,
    top: 20,
  },
  image: {
    width: 81,
    height: 81,
    borderRadius: 81,
  },
});

export default ProfileEditBottomSheet;
