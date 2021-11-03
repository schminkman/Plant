import React from "react";
import { SafeAreaView, View, StyleSheet } from "react-native";

import colors from "../config/colors";

import LogCard from "../components/LogCard";
import AppButton from "../components/AppButton";

function LogScreen({ navigation }) {
  return (
    <SafeAreaView style={styles.background}>
      <View style={styles.container}>
        <LogCard
          title="Species"
          subtitle="Location"
          status="Recent (?)"
          caption="Notes: Saw a whole bunch of them "
        />
      </View>
      <View style={styles.buttonContainer}>
        <AppButton
          title="+"
          onPress={() => navigation.navigate("AddSighting")}
        />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
    backgroundColor: colors.grey,
    padding: 20,
    paddingTop: 20,
  },
  buttonContainer: {
    justifyContent: "center",
    alignItems: "center",
  },
  container: {
    flexDirection: "column",
    flex: 1,
    padding: 10,
    paddingTop: 100,
  },
});

export default LogScreen;
