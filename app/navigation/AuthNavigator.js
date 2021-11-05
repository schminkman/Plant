import React from "react";
import { createStackNavigator } from "@react-navigation/stack";

import WelcomeScreen from "../screens/WelcomeScreen";
import LoginScreen from "../screens/LoginScreen.js";
import SignupScreen from "../screens/SignupScreen.js";
import AppNavigator from "./AppNavigator";
import AdminNavigator from "./AdminNavigator";

const Stack = createStackNavigator();

const AuthNavigator = () => (
  <Stack.Navigator>
    <Stack.Screen
      name="Welcome"
      component={WelcomeScreen}
      options={{
        headerShown: false,
      }}
    />
    <Stack.Screen
      name="Home"
      component={AppNavigator}
      options={{ headerShown: false }}
    />
    <Stack.Screen
      name="A_Home"
      component={AdminNavigator}
      options={{ headerShown: false }}
    />
    <Stack.Screen name="Login" component={LoginScreen} />
    <Stack.Screen name="Signup" component={SignupScreen} />
  </Stack.Navigator>
);

export default AuthNavigator;
