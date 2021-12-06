import React, { useState, useEffect } from "react";
import { Alert, Button, Image, StyleSheet, View } from "react-native";
import firebase from "../../firebase";

import colors from "../config/colors";
import AppText from "../components/AppText";

// this component is a resuable logcard, which sighting objects can be mapped to
// in this admin version of the logcard, a delete button is also included
function A_LogCard({ title, location, source, type, caption, ID }) {
  const [imageURL, setImageURL] = useState(); // state to hold the imageURI for each sighting

  // function to get the image url for each respective sighting
  const getImage = async (source) => {
    let imageRef = firebase.storage().ref(source);
    imageRef
      .getDownloadURL()
      .then((url) => {
        setImageURL(url);
      })
      .catch((e) => console.log("error fetching image download URL"));
    return imageURL;
  };

  // calling getImage in order to go ahead and get the images for each sighting
  getImage(source);

  // reference to the sightings list in the database
  const sightingsRef = firebase.database().ref("Sightings");

  // function which deletes a sighting from the database, based on the ID passed from the A_Log component
  const nowDelete = () => {
    sightingsRef.orderByValue().on("value", (snapshot) => {
      snapshot.forEach((data) => {
        if (data.val().id === ID) {
          let key = data.key;
          sightingsRef.child(key).remove();
        }
      });
    });
  };

  // function to show alert, asking the admin whether he/she is sure about deleting a posting
  // must select the yes option in order to delete the sighting
  const showAlert = () => {
    Alert.alert("Wait!", "Are you sure you want to delete this sighting?", [
      {
        text: "No",
        onPress: () => console.log("Cancel Pressed"),
        style: "cancel",
      },
      { text: "Yes!", onPress: () => handleDelete() }, // when yes pressed, call handleDelete()
    ]);
  };

  // handle asking the admin if they are sure they wish to delete a sighting, calling showAlert()
  const handleDeleteSpecies = () => {
    showAlert();
  };

  // calling nowDelete function in order to delete the sighting
  // it should be noted that, for whatever reason, I couldn't get this to work without routing the delete function
  // through each of these handler functions
  const handleDelete = () => {
    nowDelete();
  };

  return (
    <View style={styles.card}>
      <View style={styles.rowContainer}>
        <View style={styles.leftColumnContainer}>
          <AppText style={styles.title}>{title}</AppText>
          <AppText style={styles.status}>{type}</AppText>
          <View style={styles.buttoncontainer}>
            <Button
              title="Delete"
              color={colors.red}
              style={styles.button}
              onPress={handleDeleteSpecies}
            />
          </View>
        </View>
        <View style={styles.rightColumnContainer}>
          <AppText style={styles.subtitle}>{location}</AppText>
          <Image style={styles.image} source={{ uri: imageURL }} />
        </View>
      </View>
      <AppText style={styles.caption}>{caption}</AppText>
    </View>
  );
}

const styles = StyleSheet.create({
  button: {
    width: 10,
    borderRadius: 50,
  },
  buttoncontainer: {
    width: 80,
    top: 60,
  },
  caption: {
    color: colors.steel,
    fontSize: 12,
    fontWeight: "normal",
    paddingLeft: 20,
    paddingBottom: 10,
  },
  card: {
    backgroundColor: colors.white,
    borderRadius: 15,
    marginBottom: 10,
    overflow: "hidden",
  },
  image: {
    top: 20,
    margin: 20,
    borderRadius: 50,
    height: 150,
    width: 200,
  },
  leftColumnContainer: {
    flex: 1,
    flexDirection: "column",
  },
  rightColumnContainer: {
    flex: 1,
    flexDirection: "column",
    justifyContent: "flex-start",
    alignItems: "flex-end",
  },
  rowContainer: {
    flexDirection: "row",
    padding: 20,
  },
  status: {
    color: colors.green,
    fontSize: 15,
    fontWeight: "bold",
  },
  subtitle: {
    color: colors.primary,
    fontSize: 15,
    fontWeight: "bold",
  },
  title: {
    fontSize: 20,
    marginBottom: 0,
    textTransform: "uppercase",
  },
});

export default A_LogCard;
