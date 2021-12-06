import React, { useState, useEffect } from "react";
import { View, StyleSheet, Text } from "react-native";
import WebView from "react-native-webview";

import colors from "../config/colors";
import firebase from "../../firebase";

import AppText from "./AppText";

// custom map marker callout component, which takes all of the necessary props to handle displaying a given sighting object
function AppCallout({ title, location, source, type, caption }) {
  const [imageURL, setImageURL] = useState(); // state to hold the URL of the image

  // function to get the image URL
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

  // calling getImage here 1/2
  getImage(source);

  // and here, in a useEffect 2/2
  // for some reason, this helped make sure the images load, not sure why it needed to be called in both places
  useEffect(() => {
    getImage(source);
  }, []);

  return (
    <View style={styles.card}>
      <View style={styles.rowContainer}>
        <View style={styles.leftColumnContainer}>
          <AppText style={styles.title}>{title}</AppText>
          <AppText style={styles.status}>{type}</AppText>
        </View>
        <View style={styles.rightColumnContainer}>
          <AppText style={styles.subtitle}>{location}</AppText>
          <Text style={styles.imagecontainer}>
            <WebView style={styles.image} source={{ uri: imageURL }} />
          </Text>
        </View>
      </View>
      <AppText style={styles.caption}>{caption}</AppText>
    </View>
  );
}

const styles = StyleSheet.create({
  caption: {
    color: colors.steel,
    fontSize: 12,
    fontWeight: "normal",
    paddingLeft: 20,
  },
  card: {
    backgroundColor: colors.white,
    borderRadius: 15,
    marginBottom: 10,
    overflow: "hidden",
  },
  image: {
    borderRadius: 50,
    height: 75,
    width: 100,
  },
  imagecontainer: {
    top: 20,
    margin: 5,
    right: 20,
  },
  leftColumnContainer: {
    flex: 1,
    flexDirection: "column",
  },
  rightColumnContainer: {
    flex: 1,
    flexDirection: "column",
    justifyContent: "flex-end",
    alignItems: "flex-end",
    padding: 10,
  },
  rowContainer: {
    flexDirection: "row",
    padding: 20,
  },
  status: {
    color: colors.green,
    fontSize: 12,
    fontWeight: "bold",
  },
  subtitle: {
    color: colors.primary,
    fontSize: 10,
    fontWeight: "bold",
    left: 35,
  },
  title: {
    fontSize: 13,
    marginBottom: 0,
    textTransform: "uppercase",
  },
});

export default AppCallout;
