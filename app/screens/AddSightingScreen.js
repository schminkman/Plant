import React, { useState } from "react";
import { StyleSheet, View, Button, TouchableOpacity } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { Navigation, NavigationContainer } from "@react-navigation/native";

import Screen from "../components/Screen";
import AppTextInput from "../components/AppTextInput";
import AppPicker from "../components/AppPicker";
import AppButton from "../components/AppButton";
import colors from "../config/colors";
import AppImagePicker from "../components/AppImagePicker";

const statusCats = [
  { label: "Succeeding", value: 1 },
  { label: "Failing", value: 2 },
];

function AddSightingScreen({ navigation }) {
  const [status, setStatus] = useState();
  return (
    <View>
      <View style={styles.container}>
        <AppTextInput icon="barley" placeholder="Species Name" />
        {/* <AppPicker
          selectedItem={status}
          onSelectItem={(item) => setStatus(item)}
          items={statusCats}
          icon="battery-70"
          placeholder="Status"
        /> */}
        <AppImagePicker />
        <AppTextInput icon="square-edit-outline" placeholder="Notes..." />
      </View>
      <View style={styles.container}>
        <AppButton
          title="Add to Logbook!"
          onPress={() => navigation.navigate("Logbook")}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    padding: 15,
    marginTop: 10,
  },
});

export default AddSightingScreen;
