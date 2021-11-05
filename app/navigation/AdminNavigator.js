import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { MaterialCommunityIcons } from "@expo/vector-icons";

import A_SpeciesList from "../admin/A_SpeciesList";
import A_InfoScreen from "../admin/A_InfoScreen";
import A_SightingList from "../admin/A_SightingList";

import colors from "../config/colors";

import LogNavigator from "./LogNavigator";

// Handle navigation with tabs, from react-navigation
const Tab = createBottomTabNavigator();
const AdminNavigator = () => (
  <Tab.Navigator
    initialRouteName="A_Info"
    tabBarOptions={{
      activeBackgroundColor: colors.tertiary,
      activeTintColor: "white",
      inactiveBackgroundColor: "#eee",
      inactiveTintColor: "black",
    }}
  >
    {/* <Tab.Screen name="Welcome" component={WelcomeScreen} /> */}
    <Tab.Screen
      name="A_Info"
      component={A_InfoScreen}
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
      name="A_Log"
      component={A_SightingList}
      options={{
        headerShown: false,
        tabBarIcon: ({ size, color }) => (
          <MaterialCommunityIcons
            name="format-list-bulleted"
            size={size}
            color={color}
          />
        ),
      }}
    />
    <Tab.Screen
      name="A_Species"
      component={A_SpeciesList}
      options={{
        headerShown: false,
        tabBarIcon: ({ size, color }) => (
          <MaterialCommunityIcons
            name="clipboard-list-outline"
            size={size}
            color={color}
          />
        ),
      }}
    />
  </Tab.Navigator>
);

export default AdminNavigator;
