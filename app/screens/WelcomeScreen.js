import React from "react";
import { ImageBackground, View, StyleSheet, Image } from "react-native";

import AppButton from "../components/AppButton";

function WelcomeScreen(props) {
  return (
    <ImageBackground
      blurRadius={3}
      style={styles.background}
      source={require("../assets/background.jpg")}
    >
      <Image
        style={styles.logo}
        source={require("../assets/Plant-logos.jpeg")}
      />
      <AppButton title="Continue" onPress={() => console.log("tapped")} />
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
    justifyContent: "flex-end",
    alignItems: "center",
  },
  logo: {
    width: 100,
    height: 100,
    position: "absolute",
    top: 105,
  },
});

export default WelcomeScreen;
