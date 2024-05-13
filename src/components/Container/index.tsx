import { COLORS } from '@/shared/constants/colors';
import RN from '../RN';
import {
  SafeAreaView,
  SafeAreaViewProps,
} from 'react-native-safe-area-context';
import { FC, ReactNode } from 'react';
import { normalizeHeight, normalizeWidth } from '@/shared/constants/dimensions';
import { StyleProp, ViewStyle } from 'react-native';

interface ContainerProps extends SafeAreaViewProps {
  backgroundColor?: string;
  Header?: ReactNode;
  Footer?: ReactNode;
  isScroll?: boolean;
  mainStyle?: StyleProp<ViewStyle>;
}

const Container: FC<ContainerProps> = ({
  backgroundColor = COLORS.black,
  isScroll = false,
  Header,
  Footer,
  children,
  mainStyle,
  ...resOfProps
}) => {
  const Main = isScroll ? RN.ScrollView : RN.View;
  return (
    <SafeAreaView
      {...resOfProps}
      style={[styles.container, resOfProps.style, { backgroundColor }]}
    >
      {Header}
      <Main
        showsVerticalScrollIndicator={false}
        nestedScrollEnabled={true}
        style={mainStyle}
      >
        {children}
      </Main>
      {Footer}
    </SafeAreaView>
  );
};

const styles = RN.StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: normalizeWidth(16),
    paddingVertical: normalizeHeight(10),
  },
});

export default Container;
