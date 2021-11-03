import React from "react";
import { createStackNavigator } from "@react-navigation/stack";

import AddSightingScreen from "../screens/AddSightingScreen";
import LogScreen from "../screens/LogScreen";

const Stack = createStackNavigator();

const LogNavigator = () => (
  <Stack.Navigator>
    <Stack.Screen
      name="Logbook"
      component={LogScreen}
      options={{
        headerShown: false,
      }}
    />
    <Stack.Screen name="AddSighting" component={AddSightingScreen} />
  </Stack.Navigator>
);

export default LogNavigator;
