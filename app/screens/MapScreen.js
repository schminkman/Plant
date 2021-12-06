import React, { useState, useEffect } from "react";
import { View, SafeAreaView, StyleSheet } from "react-native";
import MapView, { Callout, Marker } from "react-native-maps";

import colors from "../config/colors";
import firebase from "../../firebase";

import AppCallout from "../components/AppCallout";
import AppPicker from "../components/AppPicker";
import AppText from "../components/AppText";

// screen component which serves as the map screen, contains the interactive map and map markers
function MapScreen(props) {
  const [sightingList, setSightingList] = useState(null); // state to hold the list of sightings form the database
  const [supportedSpecies, setSupportedSpecies] = useState(null); // state to hold the list of supported species, from which to filter from
  const [species, setSpecies] = useState(""); // state to hold the currently selected species for which the filter functions

  const supportedRef = firebase.database().ref("Species List"); // reference to supported species in database

  const supportedList = []; // will hold the list of supported species

  // function to get and set the list of supported species
  const getSupportedSpecies = () => {
    supportedRef.on("value", (snapshot) => {
      const supported = snapshot.val();

      let i = 0;

      for (let id in supported) {
        let species = supported[id].species.toString();

        let speciesVal = {
          // of this form so that our AppPicker knows how to handle the list
          label: species,
          value: i,
        };
        supportedList.push(speciesVal);
        i = i + 1;
      }
      // adding noFilter as an option, of this form so that our AppPicker knows how to deal with it
      let noFilter = {
        label: "No Filter",
        value: i + 1,
      };

      supportedList.push(noFilter);
    });
  };

  // calling the above function in useEffect once
  useEffect(() => {
    getSupportedSpecies(); // will set the value of supportedList = to the correct values
    setSupportedSpecies(supportedList); // set supportedSpecies based on supportedList
  }, []);

  // get new sighting list once filter selected
  const getSpeciesFilter = (filter) => {
    const sightingRef = firebase.database().ref("Sightings");
    sightingRef.on("value", (snapshot) => {
      const sightings = snapshot.val();

      const sightingList = [];
      for (let id in sightings) {
        if (sightings[id].species == filter) {
          sightingList.push(sightings[id]);
        }
      }
      setSightingList(sightingList);
    });
  };

  // get original sighting list if "none" selected as filter
  const getSpeciesNoFilter = () => {
    const sightingRef = firebase.database().ref("Sightings");
    sightingRef.on("value", (snapshot) => {
      const sightings = snapshot.val();

      const sightingList = [];
      for (let id in sightings) {
        sightingList.push(sightings[id]);
      }
      setSightingList(sightingList);
    });
  };

  // handle changing the filter species
  const handleChangeSpecies = (item) => {
    if (item.label === "No Filter") {
      setSpecies(item.label);
      getSpeciesNoFilter();
    } else {
      setSpecies(item.label);
      getSpeciesFilter(item.label);
    }
  };

  // get the sightings from the database and enter them into an array of sighting objects
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
      <View style={styles.top}>
        <MapView
          style={styles.map}
          initialRegion={{
            latitude: 33.366,
            longitude: -89.518,
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
      </View>
      <View style={styles.bottom}>
        <AppPicker
          selectedItem={species}
          onSelectItem={(item) => handleChangeSpecies(item)}
          items={supportedSpecies}
          icon="badge-account-outline"
          placeholder="Filter"
        />
        <View style={styles.filterTitle} pointerEvents="none">
          <AppText>{species}</AppText>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
    backgroundColor: colors.grey,
  },
  button: {
    position: "absolute",
  },
  bottom: {
    bottom: 100,
    alignItems: "center",
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
  filterTitle: {
    bottom: 50,
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
