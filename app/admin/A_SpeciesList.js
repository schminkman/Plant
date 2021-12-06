import React, { useState, useEffect } from "react";
import { StyleSheet, View, Modal, ScrollView } from "react-native";

import colors from "../config/colors";
import firebase from "../../firebase";

import AppButton from "../components/AppButton";
import AppText from "../components/AppText";
import AppTextInput from "../components/AppTextInput";
import TextCard from "../components/TextCard";

function A_SpeciesList(props) {
  const [species, setSpecies] = useState(""); // state to hold the user input species to be added to list
  const [modalVisible, setModalVisible] = useState(false); // state to manage visibility of modal
  const [speciesList, setSpeciesList] = useState(""); // state to hold the list of supported species
  const [identifier, setIdentifier] = useState(0); // state to hold the ID (key/index) of the next species to be added

  // create reference for species list in database
  const speciesRef = firebase.database().ref("Species List");

  // get each item in species list from database when component is rendered
  useEffect(() => {
    speciesRef.on("value", (snapshot) => {
      const list = [];
      snapshot.forEach((data) => {
        list.push(data.val());
      });
      console.log(list);
      setSpeciesList(list);
    });
  }, []);

  // add species to species list
  const createSpecies = () => {
    const newSpecies = {
      species: species,
      id: identifier,
    };

    speciesRef.push(newSpecies); // push to database
  };

  // set species state to the text input by user
  const handleOnChangeSpecies = (text) => {
    setSpecies(text);
  };

  // when "Add to List" button is pressed, add species to species list in database and close the modal
  const handleCreateSpecies = () => {
    createSpecies();
    setModalVisible(false);
  };

  // call getID with useEffect
  let num = 0;
  useEffect(() => {
    getID();
  });

  // get the next species' uniquie identifier
  const getID = async () => {
    speciesRef
      .orderByValue()
      .limitToLast(1)
      .on("value", (snapshot) => {
        snapshot.forEach((data) => {
          num = data.val().id + 1;
          setIdentifier(num);
        });
      });
  };

  // handle deleting a species from the list
  const deleteSpecies = async (index) => {
    speciesRef.on("value", (snapshot) => {
      snapshot.forEach((data) => {
        if (data.val().id === index) {
          const key = data.key;
          speciesRef.child(key).remove();
        }
      });
    });
  };

  // below, we are mapping each species object from the species list to a TextCard component, which also contains a prop
  // to set the title of the delete button
  return (
    <View style={styles.top}>
      <View style={styles.list}>
        <ScrollView>
          {speciesList ? (
            speciesList.map((species, index) => (
              <TextCard
                caption={species.species.toString()}
                key={index}
                style={styles.listItem}
                button="Delete"
                action={() => deleteSpecies(species.id)}
              />
            ))
          ) : (
            <AppText>"Error Rendering Sighting List"</AppText>
          )}
        </ScrollView>
      </View>
      <View style={styles.button}>
        <AppButton
          title="Add Species"
          color="secondary"
          onPress={() => setModalVisible(true)}
        />
      </View>
      <View style={styles.container}>
        <Modal visible={modalVisible} animationType="fade">
          <View style={styles.closeButton}>
            <AppButton
              title="Close"
              onPress={() => setModalVisible(false)}
              style={styles.button}
              width="75%"
            />
          </View>
          <View style={styles.container}>
            <AppTextInput
              icon="badge-account-outline"
              placeholder="Species Name"
              onChangeText={(text) => handleOnChangeSpecies(text)}
              value={species}
            />
            <AppButton
              title="Add to List"
              color="tertiary"
              onPress={handleCreateSpecies}
              width="40%"
            />
          </View>
        </Modal>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  button: {
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
    bottom: 20,
  },
  closeButton: {
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
    top: 20,
  },
  container: {
    flex: 1,
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
  },
  list: {
    margin: 10,
  },
  listItem: {
    fontSize: 20,
    fontWeight: "bold",
    color: colors.black,
  },
  text: {
    alignItems: "center",
    justifyContent: "center",
  },
  top: {
    height: "90%",
    paddingTop: 30,
  },
});

export default A_SpeciesList;
