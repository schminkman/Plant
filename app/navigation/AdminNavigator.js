import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { MaterialCommunityIcons } from "@expo/vector-icons";

import colors from "../config/colors";

import A_SpeciesList from "../admin/A_SpeciesList";
import A_InfoScreen from "../admin/A_InfoScreen";
import A_SightingList from "../admin/A_SightingList";
import A_AddAdmin from "../admin/A_AddAdmin";

// Handle navigation with tabs, from react-navigation
const Tab = createBottomTabNavigator();

// this navigation component handles navigation for admins via tab navigation,
// this is called when the user logs in as an admin
const AdminNavigator = () => (
  <Tab.Navigator
    initialRouteName="A_Info"
    screenoptions={{
      tabBarActiveTintColor: "white",
      tabBarInactiveTintColor: "black",
      tabBarActiveBackgroundColor: colors.tertiary,
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
    <Tab.Screen
      name="A_AddAdmin"
      component={A_AddAdmin}
      options={{
        headerShown: false,
        tabBarIcon: ({ size, color }) => (
          <MaterialCommunityIcons
            name="account-plus-outline"
            size={size}
            color={color}
          />
        ),
      }}
    />
  </Tab.Navigator>
);

export default AdminNavigator;
