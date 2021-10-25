import React from "react";
import { View, StyleSheet, SafeAreaView, Text, Image } from "react-native";

import colors from "../config/colors";
import AppText from "./AppText";

function Card({ title, subtitle, caption, image }) {
  return (
    <View style={styles.card}>
      <Image style={styles.image} source={image} />
      <View style={styles.container}>
        <AppText style={styles.title}>{title}</AppText>
        <AppText style={styles.subtitle}>{subtitle}</AppText>
        <AppText style={styles.caption}>{caption}</AppText>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  caption: {
    color: colors.secondary,
    fontSize: 12,
    fontWeight: "normal",
  },
  card: {
    backgroundColor: colors.white,
    borderRadius: 10,
    marginBottom: 10,
    overflow: "hidden",
  },
  container: {
    padding: 20,
  },
  image: {
    width: "100%",
    height: 150,
  },
  subtitle: {
    color: colors.primary,
    fontSize: 15,
    fontWeight: "bold",
    marginBottom: 10,
  },
  title: {
    fontSize: 20,
    marginBottom: 5,
  },
});

export default Card;
