import React from "react";
import { StyleSheet, View, Text } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { auth } from "../../firebase";

import AppText from "../components/AppText";
import AppButton from "../components/AppButton";

import colors from "../config/colors";

function InfoScreen({ navigation }) {
  const handleLogOut = () => {
    auth.signOut().then(() => {
      navigation.replace("Welcome");
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
