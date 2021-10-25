import React from "react";
import { StyleSheet, View, Text } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

function InfoScreen(props) {
  return (
    <SafeAreaView style={styles.background}>
      <View style={styles.container}>
        <Text>Your Zone: </Text>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
    backgroundColor: "#3DE411",
  },
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
});

export default InfoScreen;
