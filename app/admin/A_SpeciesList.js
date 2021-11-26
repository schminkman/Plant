import React, { useState, useEffect } from "react";
import { StyleSheet, View, Modal, ScrollView } from "react-native";
import firebase from "../../firebase";

import AppButton from "../components/AppButton";
import Card from "../components/Card";
import colors from "../config/colors";
import TextCard from "../components/TextCard";
import AppTextInput from "../components/AppTextInput";
import AppText from "../components/AppText";

function A_SpeciesList(props) {
  const [species, setSpecies] = useState(""); // state to hold the user input species to be added to list
  const [modalVisible, setModalVisible] = useState(false); // state to manage visibility of modal
  const [speciesList, setSpeciesList] = useState("");
  const [identifier, setIdentifier] = useState(0);

  // create reference for species list in database
  const speciesRef = firebase.database().ref("Species List");

  // get each item in species list from database
  useEffect(() => {
    speciesRef.on("value", (snapshot) => {
      // const elements = Object.keys(snapshot.val()).length;
      const list = [];
      snapshot.forEach((data) => {
        // console.log(data.val());
        // list.push(data.val().species.toString());
        list.push(data.val());
      });
      console.log(list);
      setSpeciesList(list);
      // console.log(speciesList);
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
          // console.log("data.val().id: ");
          // console.log(data.val().id);
          num = data.val().id + 1;
          setIdentifier(num);
        });
      });
  };

  // handle deleting a species from the list
  const deleteSpecies = async (index) => {
    speciesRef.on("value", (snapshot) => {
      snapshot.forEach((data) => {
        // console.log("data.val(): ");
        // console.log(data.val().id);
        if (data.val().id === index) {
          //   console.log(data.key);
          const key = data.key;
          speciesRef.child(key).remove();
        }
      });
    });
  };

  return (
    <View style={styles.top}>
      <View style={styles.list}>
        <ScrollView style={styles.scroll}>
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
  scroll: {
    // paddingTop: 40,
    // paddingBottom: 100,
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
