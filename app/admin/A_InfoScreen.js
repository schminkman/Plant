import React from "react";
import { StyleSheet, SafeAreaView } from "react-native";

import { auth } from "../../firebase";
import routes from "../navigation/routes";

import AppButton from "../components/AppButton";
import AppText from "../components/AppText";

// screen component which displays the current user's email address and provides a button
// which will log the user out
function A_InfoScreen({ navigation }) {
  // function to handle the logout and navigate back to the welcome screen
  const handleLogOut = () => {
    auth.signOut().then(() => {
      navigation.replace(routes.WELCOME);
    });
  };

  return (
    <SafeAreaView style={styles.container}>
      <AppText>Loggin in as: {auth.currentUser?.email}</AppText>
      <AppText style={styles.admin}>[Administrator]</AppText>
      <AppButton title="Log Out" onPress={handleLogOut} />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  admin: {
    fontSize: 25,
    fontWeight: "bold",
  },
  container: {
    flex: 1,
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
  },
});

export default A_InfoScreen;
