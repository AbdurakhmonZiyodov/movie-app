import RN from "@/components/RN";
import { PoppinsFonts } from "@/shared/assets/fonts/poppins.fonts";
import { COLORS } from "@/shared/constants/colors";
import { normalizeHeight, normalizeWidth } from "@/shared/constants/dimensions";
import React, { FC, ReactNode } from "react";
import { StyleProp, StyleSheet, TextStyle, ViewStyle } from "react-native";

interface Props {
  LeftElement?: ReactNode;
  RightElement?: ReactNode;
  numberOfLines?: number;
  value: string;
  placeholder?: string;
  onChangeText(value: string): void;
  containerStyle?: StyleProp<ViewStyle>;
  inputStyle?: StyleProp<TextStyle>;
  secureTextEntry?: boolean;
}

export const TextInput: FC<Props> = ({
  value,
  onChangeText,
  placeholder,
  containerStyle,
  inputStyle,
  LeftElement,
  RightElement,
  numberOfLines = 1,
  secureTextEntry,
}) => {
  return (
    <RN.View style={[styles.container, containerStyle]}>
      {LeftElement}
      <RN.TextInput
        placeholder={placeholder}
        value={value}
        onChangeText={onChangeText}
        placeholderTextColor={COLORS.black3}
        style={[styles.input, inputStyle]}
        autoCapitalize="none"
        autoCorrect={false}
        numberOfLines={numberOfLines}
        secureTextEntry={secureTextEntry}
      />
      {RightElement}
    </RN.View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: normalizeWidth(13),
    borderRadius: normalizeHeight(10),
    borderWidth: 1,
    borderColor: COLORS.black2,
    flexDirection: "row",
    alignItems: "center",
    height: normalizeHeight(50),
    backgroundColor: COLORS.black2,
  },
  input: {
    fontSize: normalizeHeight(16),
    color: COLORS.white,
    flex: 1,
    paddingVertical: normalizeHeight(14),
    fontFamily: PoppinsFonts.Poppins_300,
  },
});
