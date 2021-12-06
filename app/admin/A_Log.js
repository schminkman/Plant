import React, { useEffect, useState } from "react";
import { View, StyleSheet } from "react-native";

import firebase from "../../firebase";

import A_LogCard from "./A_LogCard";
import AppText from "../components/AppText";

// sources used to aid in the creation of this component: https://www.youtube.com/watch?v=v0TKYSkZ2tI&ab_channel=DailyWebCoding

// this component gets each of the sightings from the database and maps each of those objects to an A_Log component
function A_Log() {
  const [sightingList, setSightingList] = useState(); // state to hold the sightingList

  // getting the sightings from the database inside of a useEffect function, so that we get the sightings
  // when this component is rendered
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

  // below, we are checking to see if the sightingList exists, and if so
  // are mapping that list to A_LogCard components, making sure to pass ID (unlike the typical user's logcard)
  // in order that we are able to know which delete button goes with which sighting
  return (
    <View style={styles.list}>
      {sightingList ? (
        sightingList.map((sighting, index) => (
          <A_LogCard
            title={sighting.species}
            location={sighting.coarse}
            type={sighting.type.label}
            caption={sighting.notes}
            source={sighting.image}
            key={index}
            ID={sighting.id}
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

export default A_Log;
