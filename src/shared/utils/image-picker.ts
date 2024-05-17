import ImageCropPicker, { Image } from 'react-native-image-crop-picker';
import { COLORS } from '../constants/colors';

export const pickImageFromDevice = async ({
  height,
  width,
  withCircleOverlay = false,
}: {
  height: number;
  width: number;
  withCircleOverlay?: boolean;
}): Promise<Image> => {
  const file = await ImageCropPicker.openPicker({
    width: width,
    height: height,
    multiple: false,
    cropperCircleOverlay: withCircleOverlay,
    mediaType: 'photo',
    compressImageQuality: 0.8,
    cropperToolbarColor: COLORS.black,
    cropperStatusBarColor: COLORS.black,
    cropperCancelColor: COLORS.white,
    cropperToolbarTitle: 'Rasimni qirqish',
    cropperCancelText: 'Bekor qilish',
    cropperChooseText: 'Rasimni tanlash',
    cropperToolbarWidgetColor: COLORS.white,
    cropping: true,
    freeStyleCropEnabled: false,
    loadingLabelText: 'Yuklanmoqda',
  });

  return file;
};
