import React from "react";
import { TouchableOpacity, StyleSheet, View, Text } from "react-native";

// custom picker optioin component which is meant to be a child of the apppicker component
// built with the help of https://codewithmosh.com/courses/the-ultimate-react-native-course-part1/lectures/16762478
// and I believe I customized this for my app, though it may honestly be the same one that he implemented in that course ^
// ( I don't believe this is a problem, as the alternative would have been just using a picker from some UI library )
function PickerOption({ label, onPress }) {
  return (
    <TouchableOpacity onPress={onPress}>
      <View style={styles.container}>
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
});

export default PickerOption;
