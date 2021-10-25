import React from "react";
import { View, SafeAreaView, StyleSheet, Image } from "react-native";
import AppText from "../components/AppText";

import colors from "../config/colors";

function MapScreen(props) {
  return (
    <SafeAreaView style={styles.background}>
      <AppText style={styles.header}>Interactive Map</AppText>
      <View style={styles.container}>
        <Image
          style={styles.image}
          source={require("../assets/plantzonemap.png")}
        />
      </View>
      <View style={styles.textContainer}>
        <AppText style={styles.subtext}>
          Tap any markers to reveal additional information
        </AppText>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
    backgroundColor: colors.grey,
  },
  container: {
    flexDirection: "column",
    flex: 1,
    padding: 10,
    paddingTop: 100,
  },
  header: {
    fontWeight: "bold",
    fontSize: 30,
    alignSelf: "center",
    margin: 10,
    top: 40,
  },
  image: {
    width: "100%",
    height: 200,
    borderRadius: 30,
  },
  textContainer: {
    flex: 2,
    padding: 30,
  },
  subtext: {
    fontWeight: "normal",
    fontSize: 15,
  },
});

export default MapScreen;
