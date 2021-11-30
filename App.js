import { StatusBar } from "expo-status-bar";
import React, { useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { NavigationContainer, useNavigation } from "@react-navigation/native";
import { MaterialCommunityIcons } from "@expo/vector-icons";

import Screen from "./app/components/Screen";
import InfoScreen from "./app/screens/InfoScreen";
import WelcomeScreen from "./app/screens/WelcomeScreen";
import RecommendScreen from "./app/screens/RecommendScreen";
import MapScreen from "./app/screens/MapScreen";
import LogScreen from "./app/screens/LogScreen";
import Card from "./app/components/Card";
import colors from "./app/config/colors";
import AppNavigator from "./app/navigation/AppNavigator";
import AuthNavigator from "./app/navigation/AuthNavigator";
import AppTextInput from "./app/components/AppTextInput";
import AddScreen from "./app/screens/AddSightingScreen";
import AppPicker from "./app/components/AppPicker";
import LoginScreen from "./app/screens/LoginScreen";
import SignupScreen from "./app/screens/SignupScreen";
import A_InfoScreen from "./app/admin/A_InfoScreen";
import AdminNavigator from "./app/navigation/AdminNavigator";

export default function App() {
  return (
    <NavigationContainer>
      <AuthNavigator />
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
