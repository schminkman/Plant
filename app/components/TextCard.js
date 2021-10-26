import React from "react";
import { View, StyleSheet } from "react-native";

import AppText from "./AppText";
import colors from "../config/colors";

function TextCard({ caption, style }) {
  return (
    <View style={styles.card}>
      <View style={styles.container}>
        <AppText style={[styles.caption, style]}>{caption}</AppText>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
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
  },
  container: {
    padding: 20,
  },
});

export default TextCard;
