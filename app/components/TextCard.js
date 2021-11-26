import React from "react";
import { View, StyleSheet, TouchableOpacity, Text } from "react-native";

import AppText from "./AppText";
import colors from "../config/colors";

function TextCard({ caption, style, button, action }) {
  return (
    <View style={styles.card}>
      <View style={styles.container}>
        <AppText style={[styles.caption, style]}>{caption}</AppText>
      </View>
      <View style={styles.buttonContainer}>
        <TouchableOpacity onPress={action} style={styles.button}>
          <Text style={styles.text}>{button}</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  button: {
    backgroundColor: colors.red,
    padding: 10,
    borderRadius: 10,
  },
  buttonContainer: {
    alignContent: "flex-end",
    margin: 10,
  },
  caption: {
    color: colors.black,
    fontSize: 12,
    fontWeight: "normal",
  },
  card: {
    backgroundColor: colors.white,
    borderRadius: 15,
    marginBottom: 10,
    overflow: "hidden",
    flexDirection: "row",
  },
  container: {
    // padding: 20,
    flexDirection: "row",
    padding: 12,
    alignItems: "center",
    flex: 1,
  },
  text: {
    fontSize: 15,
    fontWeight: "bold",
    color: "white",
  },
});

export default TextCard;
