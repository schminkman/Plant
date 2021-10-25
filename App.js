import { StatusBar } from "expo-status-bar";
import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { NavigationContainer, useNavigation } from "@react-navigation/native";
import { MaterialCommunityIcons } from "@expo/vector-icons";

import InfoScreen from "./app/screens/InfoScreen";
import WelcomeScreen from "./app/screens/WelcomeScreen";
import RecommendScreen from "./app/screens/RecommendScreen";
import MapScreen from "./app/screens/MapScreen";
import LogScreen from "./app/screens/LogScreen";
import Card from "./app/components/Card";
import colors from "./app/config/colors";
import AppNavigator from "./app/navigation/AppNavigator";

export default function App() {
  return (
    <NavigationContainer>
      <AppNavigator />
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
