import React from "react";
import { TouchableOpacity, StyleSheet, View, Text } from "react-native";
import AppText from "./AppText";
import TextCard from "./TextCard";

function PickerOption({ label, onPress }) {
  return (
    <TouchableOpacity onPress={onPress}>
      <View style={styles.container}>
        {/* <TextCard caption={label} style={styles.options} /> */}
        <Text style={styles.options}>{label}</Text>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    justifyContent: "center",
  },
  options: {
    fontWeight: "bold",
    fontSize: 30,
    padding: 20,
  },
  text: {
    padding: 20,
  },
});

export default PickerOption;
