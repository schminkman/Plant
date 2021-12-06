import React from "react";
import { Text, StyleSheet, Platform } from "react-native";

// custom text component built with the help of https://codewithmosh.com/courses/the-ultimate-react-native-course-part1/lectures/16762478
function AppText({ children, style }) {
  return <Text style={[styles.text, style]}>{children}</Text>;
}

const styles = StyleSheet.create({
  text: {
    fontSize: 20,
    fontWeight: "bold",
    fontFamily: Platform.OS === "android" ? "Roboto" : "Avenir",
  },
});

export default AppText;
