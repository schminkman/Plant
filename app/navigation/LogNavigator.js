import React from "react";
import { createStackNavigator } from "@react-navigation/stack";

import AddPlantScreen from "../screens/AddPlantScreen";
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
    <Stack.Screen name="Add Plant" component={AddPlantScreen} />
  </Stack.Navigator>
);

export default LogNavigator;
