import React from "react";
import { View, SafeAreaView, StyleSheet, Image } from "react-native";
import MapView from "react-native-maps";

import AppText from "../components/AppText";
import Card from "../components/Card";
import TextCard from "../components/TextCard";
import colors from "../config/colors";
// import mapStyle from "../config/mapStyle";

function MapScreen(props) {
  return (
    <SafeAreaView style={styles.background}>
      <AppText style={styles.header}>Interactive Map</AppText>
      <MapView
        style={styles.map}
        initialRegion={{
          latitude: 37.78825,
          longitude: -122.4324,
          // latitudeDelta: 0.0922,
          // longitudeDelta: 0.0421,
          latitudeDelta: 2,
          longitudeDelta: 2,
        }}
      />
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
  map: {
    height: "100%",
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
