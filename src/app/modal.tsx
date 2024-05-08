import RN from "@/components/RN";
import { StatusBar } from "expo-status-bar";
import { Platform, StyleSheet } from "react-native";

export default function ModalScreen() {
  return (
    <RN.View style={styles.container}>
      <RN.Text style={styles.title}>Modal</RN.Text>

      <StatusBar style={Platform.OS === "ios" ? "light" : "auto"} />
    </RN.View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: "80%",
  },
});
