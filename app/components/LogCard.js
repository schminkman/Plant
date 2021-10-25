import React from "react";
import { View, StyleSheet, SafeAreaView, Text, Image } from "react-native";

import colors from "../config/colors";
import AppText from "./AppText";

function Card({ title, subtitle, status, caption }) {
  return (
    <View style={styles.card}>
      <View style={styles.rowContainer}>
        <View style={styles.leftColumnContainer}>
          <AppText style={styles.title}>{title}</AppText>
          <AppText style={styles.status}>{status}</AppText>
        </View>
        <View style={styles.rightColumnContainer}>
          <AppText style={styles.subtitle}>{subtitle}</AppText>
        </View>
      </View>
      <AppText style={styles.caption}>{caption}</AppText>
    </View>
  );
}

const styles = StyleSheet.create({
  caption: {
    color: colors.steel,
    fontSize: 12,
    fontWeight: "normal",
    paddingLeft: 20,
    paddingBottom: 10,
  },
  card: {
    backgroundColor: colors.white,
    borderRadius: 10,
    marginBottom: 10,
    overflow: "hidden",
  },
  leftColumnContainer: {
    flexDirection: "column",
  },
  rightColumnContainer: {
    flexDirection: "column",
    paddingLeft: 110,
  },
  rowContainer: {
    flexDirection: "row",
    padding: 20,
  },
  status: {
    color: colors.green,
    fontSize: 15,
    fontWeight: "bold",
  },
  subtitle: {
    color: colors.primary,
    fontSize: 15,
    fontWeight: "bold",
  },
  title: {
    fontSize: 20,
    marginBottom: 0,
  },
});

export default Card;
