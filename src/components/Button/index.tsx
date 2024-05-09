import React from "react";
import { ActivityIndicator } from "react-native";
import RN from "../RN";
import { COLORS } from "@/shared/constants/colors";
import { InterFonts } from "@/shared/assets/fonts/inter.fonts";
import { normalizeHeight, normalizeWidth } from "@/shared/constants/dimensions";

export function Button({
  title,
  onPress,
  disabled = false,
  loading = false,
}: {
  title: string;
  onPress?: () => void;
  disabled?: boolean;
  loading?: boolean;
}) {
  return (
    <RN.TouchableOpacity
      disabled={disabled || loading}
      onPress={onPress}
      activeOpacity={0.5}
      style={[styles.button, disabled && styles.buttonDisabled]}
    >
      {loading ? (
        <ActivityIndicator size="small" color={COLORS.white} />
      ) : (
        <RN.Text style={styles.buttonText}>{title}</RN.Text>
      )}
    </RN.TouchableOpacity>
  );
}

const styles = RN.StyleSheet.create({
  button: {
    backgroundColor: COLORS.orange,
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
    paddingVertical: normalizeHeight(12),
    borderRadius: normalizeWidth(16),
    minHeight: normalizeHeight(52),
  },
  buttonDisabled: {
    opacity: 0.4,
  },
  buttonText: {
    fontSize: normalizeHeight(18),
    fontFamily: InterFonts.Inter_300,
    color: COLORS.white,
  },
});
