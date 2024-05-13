import {
  View,
  StyleSheet,
  Text,
  StyleProp,
  ViewStyle,
  TextStyle,
} from 'react-native';
import React from 'react';

import {
  CodeField,
  Cursor,
  useBlurOnFulfill,
  useClearByFocusCell,
} from 'react-native-confirmation-code-field';
import { COLORS } from '@/shared/constants/colors';

const CELL_COUNT = 6;

export default function DefaultNumCodeInput({
  code,
  changeCode,
  focus,
  cellCount,
  cellStyle,
  cellTextStyle,
}: {
  code: string;
  changeCode: (value: string) => void;
  focus?: boolean;
  cellCount?: number;
  cellStyle?: StyleProp<ViewStyle>;
  cellTextStyle?: StyleProp<TextStyle>;
}) {
  const ref = useBlurOnFulfill({
    value: code,
    cellCount: cellCount || CELL_COUNT,
  });
  const [props, getCellOnLayoutHandler] = useClearByFocusCell({
    value: code,
    setValue: changeCode,
  });

  return (
    <CodeField
      ref={ref}
      {...props}
      // Use `caretHidden={false}` when users can't paste a text value, because context menu doesn't appear
      value={code}
      onChangeText={changeCode}
      cellCount={cellCount || CELL_COUNT}
      rootStyle={styles.codeFieldRoot}
      keyboardType={'number-pad'}
      textContentType={'oneTimeCode'}
      autoFocus={focus}
      renderCell={({ index, symbol, isFocused }) => (
        <View
          key={index}
          style={[styles.cell, isFocused && styles.focusCell, cellStyle]}
        >
          <Text
            style={[styles.numInput, cellTextStyle]}
            onLayout={getCellOnLayoutHandler(index)}
          >
            {symbol || (isFocused ? <Cursor /> : null)}
          </Text>
        </View>
      )}
    />
  );
}

const styles = StyleSheet.create({
  root: { flex: 1, padding: 20 },
  title: { textAlign: 'center', fontSize: 30 },
  codeFieldRoot: { marginTop: 20, columnGap: 8 },
  cell: {
    flex: 1,
    backgroundColor: COLORS.white,
    aspectRatio: 1,
    borderRadius: 8,
    justifyContent: 'center',
    alignContent: 'center',
    borderWidth: 1,
    borderColor: COLORS.black,
  },
  focusCell: {
    borderColor: COLORS.black,
  },
  numInput: {
    color: COLORS.black,
    fontSize: 22,
    textAlign: 'center',
    fontFamily: 'Exo-SemiBold',
    pointerEvents: 'none',
  },
});
