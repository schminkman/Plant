import React from "react";
import { StyleSheet, View, Text } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
// import * as Location from "expo-location";
// import * as Permissions from "expo-permissions";

import AppText from "../components/AppText";
import AppButton from "../components/AppButton";

import colors from "../config/colors";

function InfoScreen(props) {
  return (
    <SafeAreaView style={styles.background}>
      <View style={styles.container}>
        <AppText>Your Zone: </AppText>
        <AppButton
          title="Get Location"
          onPress={() => console.log("pressed")}
        />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
    backgroundColor: colors.grey,
    alignItems: "center",
    justifyContent: "center",
  },
  container: {
    alignItems: "center",
    justifyContent: "center",
  },
});

export default InfoScreen;
