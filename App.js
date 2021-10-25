import { StatusBar } from "expo-status-bar";
import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import InfoScreen from "./app/screens/InfoScreen";
import WelcomeScreen from "./app/screens/WelcomeScreen";
import RecommendScreen from "./app/screens/RecommendScreen";
import MapScreen from "./app/screens/MapScreen";
import Card from "./app/components/Card";
import LogScreen from "./app/screens/LogScreen";

export default function App() {
  return <LogScreen />;
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
