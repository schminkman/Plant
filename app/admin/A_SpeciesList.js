import React from "react";
import { StyleSheet, View } from "react-native";
import TextCard from "../components/TextCard";

function A_SpeciesList(props) {
  return (
    <View style={styles.container}>
      <TextCard
        style={styles.text}
        caption="Will contain list of all supported species from database, with add button, which brings up modal containing form to add species"
      />
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
  text: {
    alignItems: "center",
    justifyContent: "center",
  },
});

export default A_SpeciesList;
