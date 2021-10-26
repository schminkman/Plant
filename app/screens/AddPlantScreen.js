import React, { useState } from "react";
import { StyleSheet, View, Button, TouchableOpacity } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";

import Screen from "../components/Screen";
import AppTextInput from "../components/AppTextInput";
import AppPicker from "../components/AppPicker";
import AppButton from "../components/AppButton";
import colors from "../config/colors";
import { Navigation, NavigationContainer } from "@react-navigation/native";

const statusCats = [
  { label: "Succeeding", value: 1 },
  { label: "Failing", value: 2 },
];

function AddPlantScreen({ navigation }) {
  const [status, setStatus] = useState();
  return (
    <Screen>
      <View style={styles.container}>
        <AppTextInput icon="barley" placeholder="Plant name" />
        <AppPicker
          selectedItem={status}
          onSelectItem={(item) => setStatus(item)}
          items={statusCats}
          icon="battery-70"
          placeholder="Status"
        />
        <AppTextInput icon="square-edit-outline" placeholder="Notes..." />
      </View>
      <View style={styles.container}>
        <AppButton
          title="Add to Logbook!"
          onPress={() => navigation.navigate("Logbook")}
        />
      </View>
    </Screen>
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

export default AddPlantScreen;
