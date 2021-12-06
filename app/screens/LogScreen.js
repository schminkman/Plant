import React, { useEffect, useState } from "react";
import {
  SafeAreaView,
  View,
  StyleSheet,
  ScrollView,
  Button,
  RefreshControl,
  LogBox,
} from "react-native";

import colors from "../config/colors";
import firebase from "../../firebase";
import routes from "../navigation/routes";

import AppButton from "../components/AppButton";
import AppPicker from "../components/AppPicker";
import AppText from "../components/AppText";
import LogCard from "../components/LogCard";

LogBox.ignoreAllLogs(); // placed here for use during presentation
// note: there is currently an error which displays on the virtual device, but
// does not actually typically affect the functionality of the application

// scroll to refresh from docs - https://reactnative.dev/docs/refreshcontrol
const wait = (timeout) => {
  return new Promise((resolve) => setTimeout(resolve, timeout));
};

// screen component which serves as the logscreen for the typical user
function LogScreen({ navigation }) {
  const [refreshing, setRefreshing] = useState(false); // state to handle refreshing page
  const [supportedSpecies, setSupportedSpecies] = useState(); // state to hold the list of supported species for the filter
  const [species, setSpecies] = useState(""); // state to hold the currently selected filter species
  const [sightingList, setSightingList] = useState(); // state to hold the current sighting list, filter or not

  // handle pull to refresh
  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    wait(2000).then(() => setRefreshing(false));
  }, []);

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
      let noFilter = {
        label: "No Filter",
        value: i + 1,
      };

      supportedList.push(noFilter);
    });
  };

  // handling sighting list and filter ///////////////////////////////////////////////////////

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

  // get sightings once filter selected
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

  // calling the above function in useEffect once
  useEffect(() => {
    getSupportedSpecies(); // will set the value of supportedList = to the correct values
    setSupportedSpecies(supportedList); // set supportedSpecies based on supportedList
  }, []);

  return (
    <SafeAreaView style={styles.background}>
      <ScrollView
        style={styles.scroll}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      >
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
      </ScrollView>

      <View style={styles.buttonContainer}>
        <View style={styles.button}>
          <AppButton
            title="Add Sighting"
            onPress={() => navigation.navigate(routes.ADD_SIGHTING)}
            width="40%"
            style={styles.button}
          />
        </View>
        <View style={styles.filter}>
          <AppPicker
            selectedItem={species}
            onSelectItem={(item) => handleChangeSpecies(item)}
            items={supportedSpecies}
            icon="badge-account-outline"
            placeholder="Filter"
            color="secondary"
          />
        </View>
      </View>
      <View style={styles.filterTitle} pointerEvents="none">
        <AppText>{species}</AppText>
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
    backgroundColor: "transparent",
    height: 0,
    justifyContent: "center",
    alignItems: "center",
    paddingBottom: 10,
    top: 20,
    flexDirection: "row",
  },
  button: {
    alignItems: "center",
    left: 100,
  },
  container: {
    flexDirection: "column",
    flex: 1,
    padding: 10,
    paddingTop: 100,
  },
  filter: {
    alignItems: "center",
    backgroundColor: "transparent",
    position: "absolute",
    paddingBottom: 30,
    height: 100,
    width: 285,
    right: 110,
    paddingTop: 9,
    padding: 20,
  },
  filterTitle: {
    bottom: 2.5,
    left: 40,
  },
  list: {
    paddingBottom: 10,
  },
  scroll: {
    flex: 3,
  },
});

export default LogScreen;
