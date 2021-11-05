import React from "react";
import {
  Text,
  StyleSheet,
  TouchableOpacity,
  View,
  Button,
  TouchableHighlight,
} from "react-native";
import { launchCamera, launchImageLibrary } from "react-native-image-picker";
import { IconButton, Colors } from "react-native-paper";

import AppText from "./AppText";
import colors from "../config/colors";
import AppButton from "./AppButton";

function AppImagePicker({ children }) {
  return (
    <React.Fragment>
      <View style={styles.container}>
        <AppText style={styles.text}>Upload Image</AppText>
        {/* <Button title="+" onPress={() => console.log("pressed")} /> */}
        <TouchableOpacity>{children}</TouchableOpacity>
      </View>
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
    paddingLeft: 10,
    fontWeight: "normal",
    fontSize: 18,
    color: colors.black,
    flex: 1,
  },
});

export default AppImagePicker;
