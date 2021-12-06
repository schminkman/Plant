import React from "react";
import { createStackNavigator } from "@react-navigation/stack";

import AddSightingScreen from "../screens/AddSightingScreen";
import LogScreen from "../screens/LogScreen";

// Handle navigation with stack, from react-navigation
const Stack = createStackNavigator();

// this navigation component uses a stack navigator to handle the log / add sighting screens
// this navigator is also nested within the app navigator
const LogNavigator = () => (
  <Stack.Navigator>
    <Stack.Screen
      name="Logbook"
      component={LogScreen}
      options={{
        headerShown: false,
      }}
    />
    <Stack.Screen name="Add Sighting" component={AddSightingScreen} />
  </Stack.Navigator>
);

export default LogNavigator;
