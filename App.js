import { StatusBar } from "expo-status-bar";
import React from "react";
import { StyleSheet, Text, View } from "react-native";
import InfoScreen from "./app/screens/InfoScreen";
import WelcomeScreen from "./app/screens/WelcomeScreen";
import { SafeAreaView } from "react-native-safe-area-context";

export default function App() {
  return <WelcomeScreen />;
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
