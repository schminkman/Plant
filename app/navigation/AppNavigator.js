import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { MaterialCommunityIcons } from "@expo/vector-icons";

import InfoScreen from "../screens/InfoScreen";
import LogScreen from "../screens/LogScreen";
import MapScreen from "../screens/MapScreen";
import RecommendScreen from "../screens/RecommendScreen";
import WelcomeScreen from "../screens/WelcomeScreen";
import LogNavigator from "./LogNavigator";

// Handle navigation with tabs, from react-navigation
const Tab = createBottomTabNavigator();
const AppNavigator = () => (
  <Tab.Navigator
    initialRouteName="Info"
    tabBarOptions={{
      activeBackgroundColor: "dodgerblue",
      activeTintColor: "white",
      inactiveBackgroundColor: "#eee",
      inactiveTintColor: "black",
    }}
  >
    {/* <Tab.Screen name="Welcome" component={WelcomeScreen} /> */}
    <Tab.Screen
      name="Info"
      component={InfoScreen}
      options={{
        headerShown: false,
        tabBarIcon: ({ size, color }) => (
          <MaterialCommunityIcons
            name="information-outline"
            size={size}
            color={color}
          />
        ),
      }}
    />
    {/* <Tab.Screen
      name="Recommend"
      component={RecommendScreen}
      options={{
        headerShown: false,
        tabBarIcon: ({ size, color }) => (
          <MaterialCommunityIcons
            name="book-information-variant"
            size={size}
            color={color}
          />
        ),
      }}
    /> */}
    <Tab.Screen
      name="Log"
      component={LogNavigator}
      options={{
        headerShown: false,
        tabBarIcon: ({ size, color }) => (
          <MaterialCommunityIcons name="notebook" size={size} color={color} />
        ),
      }}
    />
    <Tab.Screen
      name="Map"
      component={MapScreen}
      options={{
        headerShown: false,
        tabBarIcon: ({ size, color }) => (
          <MaterialCommunityIcons name="map" size={size} color={color} />
        ),
      }}
    />
  </Tab.Navigator>
);

export default AppNavigator;
