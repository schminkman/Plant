import React from "react";
import { StyleSheet, View } from "react-native";
import SightingList from "../components/SightingList";
import TextCard from "../components/TextCard";

function A_SightingList(props) {
  return (
    <View style={styles.container}>
      <TextCard caption="Will contain list of all sightings from database, with delete buttons and ability to view the image inside a modal" />
      <SightingList />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
  },
});

export default A_SightingList;
