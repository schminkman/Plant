import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { MaterialCommunityIcons } from "@expo/vector-icons";

import InfoScreen from "../screens/InfoScreen";
import MapScreen from "../screens/MapScreen";
import LogNavigator from "./LogNavigator";

// Handle navigation with tabs, from react-navigation
const Tab = createBottomTabNavigator();

// this navigation component handles the navigation for the typical user via tab navigation
const AppNavigator = () => (
  <Tab.Navigator
    initialRouteName="Info"
    screenoptions={{
      tabBarActiveTintColor: "white",
      tabBarInactiveTintColor: "black",
      tabBarActiveBackgroundColor: "dodgerblue",
      tabBarInactiveBackgroundColor: "#eee",
      tabBarStyle: [
        {
          display: "flex",
        },
        null,
      ],
    }}
  >
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
