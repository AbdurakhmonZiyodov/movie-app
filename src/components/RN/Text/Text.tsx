import React from "react";
import { Text as RNText } from "react-native";

const Text = ({ ...resOfProps }) => {
  return <RNText {...resOfProps} />;
};

export default Text;
