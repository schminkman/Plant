import React from "react";
import { ImageBackground, StyleSheet, Image } from "react-native";

import routes from "../navigation/routes";

import AppButton from "../components/AppButton";

// screen component which serves as the landing screen for the application
// here, the user can choose to either log in or sign up
// originally built with the help of: https://codewithmosh.com/courses/the-ultimate-react-native-course-part1/lectures/16762478
function WelcomeScreen({ navigation }) {
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
