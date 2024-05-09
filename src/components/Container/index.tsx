import { COLORS } from "@/shared/constants/colors";
import RN from "../RN";
import {
  SafeAreaView,
  SafeAreaViewProps,
} from "react-native-safe-area-context";
import { FC } from "react";
import { normalizeWidth } from "@/shared/constants/dimensions";

interface ContainerProps extends SafeAreaViewProps {
  backgroundColor?: string;
}

const Container: FC<ContainerProps> = ({
  backgroundColor = COLORS.black,
  children,
  ...resOfProps
}) => {
  return (
    <SafeAreaView
      {...resOfProps}
      style={[styles.container, resOfProps.style, { backgroundColor }]}
    >
      {children}
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
