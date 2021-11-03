import React from "react";
import { NavigationContainer, useNavigation } from "@react-navigation/native";

function HomeScreen(props) {
  return (
    <NavigationContainer>
      <AuthNavigator />
    </NavigationContainer>
  );
}

export default HomeScreen;
