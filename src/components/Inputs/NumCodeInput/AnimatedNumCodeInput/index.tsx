/* eslint-disable @typescript-eslint/no-unused-vars */
/*

Concept: https://dribbble.com/shots/5476562-Forgot-Password-Verification/attachments

*/
import React from 'react';
import { Animated } from 'react-native';

import RN from '@/components/RN';
import { Spacing } from '@/components/Spacing';
import { CoreStyle } from '@/shared/styles/globalStyles';
import {
  CodeField,
  Cursor,
  RenderCellOptions,
  useBlurOnFulfill,
  useClearByFocusCell,
} from 'react-native-confirmation-code-field';
import styles, {
  ACTIVE_CELL_BG_COLOR,
  CELL_BORDER_RADIUS,
  CELL_SIZE,
  DEFAULT_CELL_BG_COLOR,
  NOT_EMPTY_CELL_BG_COLOR,
} from './styles';

const { Value } = Animated;

const CELL_COUNT = 4;

const animationsColor = [...new Array(CELL_COUNT)].map(() => new Value(0));
const animationsScale = [...new Array(CELL_COUNT)].map(() => new Value(1));
const animateCell = ({ hasValue, index, isFocused }: any) => {
  Animated.parallel([
    Animated.timing(animationsColor[index], {
      useNativeDriver: false,
      toValue: isFocused ? 1 : 0,
      duration: 250,
    }),
    Animated.spring(animationsScale[index], {
      useNativeDriver: false,
      toValue: hasValue ? 0 : 1,
      // @ts-expect-error
      duration: hasValue ? 300 : 250,
    }),
  ]).start();
};

const AnimatedNumCodeInput = ({
  phone,
  value,
  setValue,
}: {
  phone: string;
  value: string;
  setValue: (value: string) => void;
}) => {
  const ref = useBlurOnFulfill({ value, cellCount: CELL_COUNT });
  const [props, getCellOnLayoutHandler] = useClearByFocusCell({
    value,
    setValue,
  });

  const renderCell = ({ index, symbol, isFocused }: RenderCellOptions) => {
    const hasValue = Boolean(symbol);

    // Run animation on nex
    // Because we need first return new style prop and then animate this value
    setTimeout(() => {
      animateCell({ hasValue, index, isFocused });
    }, 0);

    return (
      <Animated.View key={index} style={[styles.cell]}>
        <Animated.Text
          style={styles.cellText}
          onLayout={getCellOnLayoutHandler(index)}
        >
          {symbol || (isFocused ? <Cursor /> : null)}
        </Animated.Text>
      </Animated.View>
    );
  };

  return (
    <RN.View flex={1}>
      <RN.Text style={styles.title}>{'Kodni tasdiqlash!'}</RN.Text>
      <Spacing steps={2} />
      <RN.Text style={styles.subTitle}>
        {'Tasdiqlash code '}
        <RN.Text style={styles.subBoldTitle}>{`+998${phone}`}</RN.Text>
        {' ga yuborildi'}
      </RN.Text>

      <RN.View style={CoreStyle.flex1} jc={'center'}>
        <CodeField
          ref={ref}
          {...props}
          value={value}
          onChangeText={setValue}
          cellCount={CELL_COUNT}
          rootStyle={styles.codeFiledRoot}
          keyboardType={'number-pad'}
          textContentType={'oneTimeCode'}
          renderCell={renderCell}
        />
      </RN.View>
    </RN.View>
  );
};

export default AnimatedNumCodeInput;
