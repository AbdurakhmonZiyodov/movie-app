import { PoppinsFonts } from '@/shared/assets/fonts/poppins.fonts';
import { COLORS } from '@/shared/constants/colors';
import { normalizeHeight, normalizeWidth } from '@/shared/constants/dimensions';
import React, { ReactNode } from 'react';
import {
  ActivityIndicator,
  ViewStyle,
  StyleProp,
  TextStyle,
} from 'react-native';
import RN from '../RN';

export function Button({
  title,
  onPress,
  disabled = false,
  loading = false,
  RightSection,
  style,
  titleStyle,
  loadingColor = COLORS.white,
}: {
  title: string;
  onPress?: () => void;
  disabled?: boolean;
  loading?: boolean;
  RightSection?: ReactNode;
  style?: StyleProp<ViewStyle>;
  titleStyle?: StyleProp<TextStyle>;
  loadingColor?: string;
}) {
  return (
    <RN.TouchableOpacity
      disabled={disabled || loading}
      onPress={onPress}
      activeOpacity={0.5}
      style={[styles.button, disabled && styles.buttonDisabled, style]}
    >
      {loading ? (
        <ActivityIndicator size={'small'} color={loadingColor} />
      ) : (
        <>
          <RN.Text style={[styles.buttonText, titleStyle]}>{title}</RN.Text>
          {RightSection}
        </>
      )}
    </RN.TouchableOpacity>
  );
}

const styles = RN.StyleSheet.create({
  button: {
    backgroundColor: COLORS.orange,
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: normalizeHeight(12),
    borderRadius: normalizeWidth(16),
    minHeight: normalizeHeight(52),
  },
  buttonDisabled: {
    opacity: 0.4,
  },
  buttonText: {
    fontSize: normalizeHeight(18),
    fontFamily: PoppinsFonts.Poppins_500,
    color: COLORS.white,
  },
});
