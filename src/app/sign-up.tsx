import { Button } from "@/components/Button";
import Container from "@/components/Container";
import { TextInput } from "@/components/Inputs/TextInput";
import RN from "@/components/RN";
import { PoppinsFonts } from "@/shared/assets/fonts/poppins.fonts";
import { COLORS } from "@/shared/constants/colors";
import { normalizeHeight } from "@/shared/constants/dimensions";
import { router } from "expo-router";
import React, { useState } from "react";

export default function SignUp() {
  const [{ email, password }, setState] = useState({ email: "", password: "" });
  return (
    <Container style={styles.container}>
      <RN.View g={16}>
        <TextInput
          placeholder="Ism"
          value={email}
          onChangeText={(email) => setState((prev) => ({ ...prev, email }))}
        />
        <TextInput
          placeholder="Email"
          value={password}
          onChangeText={(password) =>
            setState((prev) => ({ ...prev, password }))
          }
        />
        <TextInput
          placeholder="Parol"
          value={password}
          onChangeText={(password) =>
            setState((prev) => ({ ...prev, password }))
          }
        />
        <Button title="Ro’yxatdan o’tish" />

        <RN.View fd={"row"} jc={"center"} g={5}>
          <RN.Text style={styles.warningText}>Hisobingiz bormi?</RN.Text>
          <RN.TouchableOpacity
            activeOpacity={0.5}
            onPress={() => router.back()}
          >
            <RN.Text style={[styles.warningText, styles.signUpText]}>
              Kirish!
            </RN.Text>
          </RN.TouchableOpacity>
        </RN.View>
      </RN.View>
    </Container>
  );
}

const styles = RN.StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
  },
  warningText: {
    fontSize: normalizeHeight(16),
    fontFamily: PoppinsFonts.Poppins_300,
    textAlign: "center",
    color: COLORS.white,
  },
  signUpText: {
    color: COLORS.orange,
  },
});
