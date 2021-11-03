import React from "react";
import { Text, StyleSheet, TouchableOpacity, View, Button } from "react-native";
import { launchCamera, launchImageLibrary } from "react-native-image-picker";

import AppText from "./AppText";
import colors from "../config/colors";
import AppButton from "./AppButton";

function AppImagePicker(props) {
  return (
    <React.Fragment>
      <TouchableOpacity>
        <View style={styles.container}>
          <AppText style={styles.text}>Upload Image</AppText>
          <Button title="+" onPress={() => console.log("pressed")} />
        </View>
      </TouchableOpacity>
    </React.Fragment>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.grey,
    borderRadius: 25,
    flexDirection: "row",
    width: "80%",
    padding: 15,
    marginVertical: 10,
    alignItems: "center",
  },
  text: {
    fontWeight: "normal",
    fontSize: 18,
    color: colors.black,
    flex: 1,
  },
});

export default AppImagePicker;
