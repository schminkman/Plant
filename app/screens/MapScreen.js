import React, { useState, useEffect } from "react";
import { View, SafeAreaView, StyleSheet, Image } from "react-native";
import MapView, { Callout, Marker } from "react-native-maps";

import AppText from "../components/AppText";
import Card from "../components/Card";
import TextCard from "../components/TextCard";
import colors from "../config/colors";
import firebase from "../../firebase";
import LogCard from "../components/LogCard";
import AppCallout from "../components/AppCallout";
// import mapStyle from "../config/mapStyle";

function MapScreen(props) {
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
    <SafeAreaView style={styles.background}>
      <MapView
        style={styles.map}
        initialRegion={{
          latitude: 33.366,
          longitude: -89.518,
          // latitudeDelta: 0.0922,
          // longitudeDelta: 0.0421,
          latitudeDelta: 2,
          longitudeDelta: 2,
        }}
      >
        {sightingList ? (
          sightingList.map((sighting, index) => (
            <Marker
              key={index}
              coordinate={{
                latitude: sighting.location.latitude,
                longitude: sighting.location.longitude,
              }}
            >
              <Callout style={styles.callout}>
                <AppCallout
                  title={sighting.species}
                  location={sighting.coarse}
                  type={sighting.type.label}
                  caption={sighting.notes}
                  source={sighting.image}
                  key={index}
                />
              </Callout>
            </Marker>
          ))
        ) : (
          <Marker
            coordinate={{
              latitude: 34.3668283,
              longitude: -89.518635,
            }}
          />
        )}
      </MapView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
    backgroundColor: colors.grey,
  },
  callout: {
    height: 200,
    width: 200,
    borderRadius: 40,
  },
  container: {
    flexDirection: "column",
    flex: 1,
    padding: 10,
    paddingTop: 100,
  },
  header: {
    fontWeight: "bold",
    fontSize: 30,
    alignSelf: "center",
    margin: 10,
    top: 40,
  },
  image: {
    width: "100%",
    height: 200,
    borderRadius: 30,
  },
  map: {
    height: "100%",
  },
  textContainer: {
    flex: 2,
    padding: 30,
  },
  subtext: {
    fontWeight: "normal",
    fontSize: 15,
  },
});

export default MapScreen;
