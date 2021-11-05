import React from "react";
import { StyleSheet, Text, View, SafeAreaView } from "react-native";
import { Button } from "react-native-elements";

import { auth } from "../../firebase";

import AppText from "../components/AppText";
import AppButton from "../components/AppButton";

function A_InfoScreen({ navigation }) {
  const handleLogOut = () => {
    auth.signOut().then(() => {
      navigation.replace("Welcome");
    });
  };

  return (
    <SafeAreaView style={styles.container}>
      <AppText>Loggin in as: {auth.currentUser?.email}</AppText>
      <AppText style={styles.admin}>[Administrator]</AppText>
      {/* <Button title="Log Out" type="solid" onPress={handleLogOut} /> */}
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
