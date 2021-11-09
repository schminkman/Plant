import React, { useState } from "react";
import {
  StyleSheet,
  TextInput,
  View,
  Button,
  TouchableOpacity,
} from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { Navigation, NavigationContainer } from "@react-navigation/native";
import { IconButton, Colors } from "react-native-paper";

import AppImagePicker from "../components/AppImagePicker";
import AppTextInput from "../components/AppTextInput";
import AppPicker from "../components/AppPicker";
import AppButton from "../components/AppButton";
import colors from "../config/colors";
import firebase from "../../firebase";
import database from "../../firebase";
import routes from "../navigation/routes";

const typeCats = [
  { label: "Animal", value: 1 },
  { label: "Plant", value: 2 },
];

// const typeCats = ["Animal", "Plant"];

function AddSightingScreen({ navigation }) {
  const [species, setSpecies] = useState("");
  const [speciesType, setSpeciesType] = useState();
  const [sightingNotes, setSightingNotes] = useState("");

  // function which sets species to input text when we change the input text
  const handleOnChangeSpecies = (text) => {
    setSpecies(text);
  };

  // function which sets sighting notes to input text when we change the input text
  const handleOnChangeNotes = (text) => {
    setSightingNotes(text);
  };

  // add sighting to database
  const createSighting = () => {
    const sightingRef = firebase.database().ref("Sightings");
    const sighting = {
      // the object we will push
      species,
      type: speciesType,
      notes: sightingNotes,
    };

    sightingRef.push(sighting); // push to database
  };

  // handle createSighting() and additionally, go back to logbook
  const addToLogbook = () => {
    createSighting();
    navigation.navigate(routes.LOGBOOK);
  };

  return (
    <View>
      <View style={styles.container}>
        <AppTextInput
          icon="badge-account-outline"
          placeholder="Species Name"
          onChangeText={(text) => handleOnChangeSpecies(text)}
          value={species}
        />
        <AppPicker
          selectedItem={speciesType}
          onSelectItem={(item) => setSpeciesType(item)}
          items={typeCats}
          icon="file-tree-outline"
          placeholder="Species Type"
        />
        <AppImagePicker />
        <AppTextInput
          icon="square-edit-outline"
          placeholder="Notes..."
          onChangeText={(text) => handleOnChangeNotes(text)}
          value={sightingNotes}
        />
      </View>
      <View style={styles.container}>
        <AppButton title="Add to Logbook!" onPress={addToLogbook} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    padding: 15,
    marginTop: 10,
  },
});

export default AddSightingScreen;
