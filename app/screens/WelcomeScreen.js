import React from "react";
import { ImageBackground, View, StyleSheet, Image } from "react-native";
import {
  NavigationHelpersContext,
  useNavigation,
} from "@react-navigation/core";

import AppButton from "../components/AppButton";
import colors from "../config/colors";
import routes from "../navigation/routes";

function WelcomeScreen({ navigation }) {
  // const navigation = useNavigation;

  return (
    <ImageBackground
      blurRadius={3}
      style={styles.background}
      source={require("../assets/background.jpg")}
    >
      <Image style={styles.logo} source={require("../assets/logo.jpeg")} />
      <AppButton
        title="Log In"
        color={"secondary"}
        onPress={() => navigation.navigate(routes.LOGIN)}
      />
      <AppButton
        title="Sign Up"
        color={"primary"}
        onPress={() => navigation.navigate(routes.SIGNUP)}
      />
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
    width: 150,
    height: 150,
    position: "absolute",
    top: 105,
    borderRadius: 50,
  },
});

export default WelcomeScreen;
