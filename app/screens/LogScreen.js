import React, { useEffect, useState } from "react";
import { SafeAreaView, View, StyleSheet } from "react-native";

import colors from "../config/colors";
import firebase from "../../firebase";

import LogCard from "../components/LogCard";
import AppButton from "../components/AppButton";
import routes from "../navigation/routes";
import SightingList from "../components/SightingList";

function LogScreen({ navigation }) {
  // const [sightingList, setSightingList] = useState();

  // useEffect(() => {
  //   const sightingRef = firebase.database().ref("Sightings");
  //   sightingRef.on("value", (snapshot) => {
  //     const sightings = snapshot.val();
  //     const sightingList = [];
  //     for (let id in sightings) {
  //       sightingList.push(sightings[id]);
  //     }
  //     setSightingList(sightingList);
  //   });
  // }, []);

  return (
    <SafeAreaView style={styles.background}>
      <SightingList />
      <View style={styles.buttonContainer}>
        <AppButton
          title="+"
          onPress={() => navigation.navigate(routes.ADD_SIGHTING)}
        />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
    backgroundColor: colors.grey,
    padding: 20,
    paddingTop: 75,
  },
  buttonContainer: {
    justifyContent: "center",
    alignItems: "center",
  },
  container: {
    flexDirection: "column",
    flex: 1,
    padding: 10,
    paddingTop: 100,
  },
});

export default LogScreen;
