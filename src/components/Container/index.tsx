import { COLORS } from '@/shared/constants/colors';
import { normalizeHeight, normalizeWidth } from '@/shared/constants/dimensions';
import { FC, ReactNode } from 'react';
import { ScrollViewProps, StyleProp, ViewStyle } from 'react-native';
import {
  SafeAreaView,
  SafeAreaViewProps,
} from 'react-native-safe-area-context';
import RN from '../RN';

interface ContainerProps extends SafeAreaViewProps {
  backgroundColor?: string;
  Header?: ReactNode;
  Footer?: ReactNode;
  isScroll?: boolean;
  mainStyle?: StyleProp<ViewStyle>;
  refreshControl?: ScrollViewProps['refreshControl'];
}

const Container: FC<ContainerProps> = ({
  backgroundColor = COLORS.black,
  isScroll = false,
  Header,
  Footer,
  children,
  mainStyle,
  refreshControl,
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
        refreshControl={refreshControl}
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
