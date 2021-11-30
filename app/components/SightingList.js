import React, { useEffect, useState } from "react";
import { SafeAreaView, View, StyleSheet } from "react-native";

import colors from "../config/colors";
import firebase from "../../firebase";

import LogCard from "../components/LogCard";
import AppButton from "../components/AppButton";
import routes from "../navigation/routes";
import AppText from "./AppText";
import { createIconSetFromFontello } from "react-native-vector-icons";
import { geocodeAsync, reverseGeocodeAsync } from "expo-location";

// sources used to aid in the creation of this component: https://www.youtube.com/watch?v=v0TKYSkZ2tI&ab_channel=DailyWebCoding

function SightingList() {
  const [sightingList, setSightingList] = useState();

  useEffect(() => {
    const sightingRef = firebase.database().ref("Sightings");
    sightingRef.on("value", (snapshot) => {
      const sightings = snapshot.val();

      const sightingList = [];
      for (let id in sightings) {
        sightingList.push(sightings[id]);
      }
      setSightingList(sightingList);
    });
  }, []);

  return (
    <View style={styles.list}>
      {sightingList ? (
        sightingList.map((sighting, index) => (
          <LogCard
            title={sighting.species}
            location={sighting.coarse}
            // location="Location"
            type={sighting.type.label}
            caption={sighting.notes}
            source={sighting.image}
            key={index}
          />
        ))
      ) : (
        <AppText>"Error Rendering Sighting List"</AppText>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  list: {
    paddingBottom: 30,
  },
});

export default SightingList;
