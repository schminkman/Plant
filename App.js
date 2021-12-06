import React from "react";
import { NavigationContainer } from "@react-navigation/native";

import AuthNavigator from "./app/navigation/AuthNavigator";

// the App component, which handles the entire app
// the only thing rendered here is the auth navigator which then navigates to either the AppNavigator  (for typical users)
// or the AdminNavigator (for admins)
export default function App() {
  return (
    <NavigationContainer>
      <AuthNavigator />
    </NavigationContainer>
  );
}
