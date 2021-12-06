import React from "react";
import { StyleSheet, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import { auth } from "../../firebase";
import colors from "../config/colors";
import routes from "../navigation/routes";

import AppText from "../components/AppText";
import AppButton from "../components/AppButton";

// screen component which displays the current user's email address
// and provides a logout button, which will log the user out
function InfoScreen({ navigation }) {
  // function to handle log out and navigate back to the welcome screen
  const handleLogOut = () => {
    auth.signOut().then(() => {
      navigation.replace(routes.WELCOME);
    });
  };

  return (
    <SafeAreaView style={styles.background}>
      <View style={styles.container}>
        <AppText>Logged in as: {auth.currentUser?.email} </AppText>
        <AppButton title="Log Out" onPress={handleLogOut} />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
    backgroundColor: colors.grey,
    alignItems: "center",
    justifyContent: "center",
  },
  container: {
    alignItems: "center",
    justifyContent: "center",
  },
});

export default InfoScreen;
