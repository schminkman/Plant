import React, { useEffect, useState } from "react";
import { SafeAreaView, View, StyleSheet } from "react-native";

import colors from "../config/colors";
import firebase from "../../firebase";

import LogCard from "../components/LogCard";
import AppButton from "../components/AppButton";
import routes from "../navigation/routes";
import AppText from "./AppText";
import App from "../../App";

// sources used for the creation of this  component: https://www.youtube.com/watch?v=v0TKYSkZ2tI&ab_channel=DailyWebCoding

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
    <View>
      {sightingList ? (
        sightingList.map((sighting, index) => (
          <LogCard
            title={sighting.species}
            subtitle="Location"
            status={sighting.type.label}
            caption={sighting.notes}
            key={index}
          />
        ))
      ) : (
        <AppText>"Error Rendering Sighting List"</AppText>
      )}
    </View>
  );
}

export default SightingList;
