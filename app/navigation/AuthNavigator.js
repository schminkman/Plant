import React from "react";
import { createStackNavigator } from "@react-navigation/stack";

import WelcomeScreen from "../screens/WelcomeScreen";
import LoginScreen from "../screens/LoginScreen.js";
import SignupScreen from "../screens/SignupScreen.js";
import AppNavigator from "./AppNavigator";
import AdminNavigator from "./AdminNavigator";

// Handle navigation with stack, from react-navigation
const Stack = createStackNavigator();

// this navigation component uses a stack navigator to handle the auth navigation,
// the log in / sign up / welcome screens
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
