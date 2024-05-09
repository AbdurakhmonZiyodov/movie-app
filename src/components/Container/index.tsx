import { COLORS } from '@/shared/constants/colors';
import RN from '../RN';
import {
  SafeAreaView,
  SafeAreaViewProps,
} from 'react-native-safe-area-context';
import { FC, ReactNode } from 'react';
import { normalizeWidth } from '@/shared/constants/dimensions';

interface ContainerProps extends SafeAreaViewProps {
  backgroundColor?: string;
  Header?: ReactNode;
  isScroll?: boolean;
}

const Container: FC<ContainerProps> = ({
  backgroundColor = COLORS.black,
  isScroll = false,
  Header,
  children,
  ...resOfProps
}) => {
  const Main = isScroll ? RN.ScrollView : RN.View;
  return (
    <SafeAreaView
      {...resOfProps}
      style={[styles.container, resOfProps.style, { backgroundColor }]}
    >
      {Header}
      <Main showsVerticalScrollIndicator={false} nestedScrollEnabled={true}>
        {children}
      </Main>
    </SafeAreaView>
  );
};

const styles = RN.StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: normalizeWidth(16),
  },
});

export default Container;
