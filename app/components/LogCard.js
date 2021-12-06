import React, { useState, useEffect } from "react";
import { View, StyleSheet, Image } from "react-native";
import firebase from "../../firebase";

import colors from "../config/colors";

import AppText from "./AppText";

// custom card component, originally built with the help of https://codewithmosh.com/courses/the-ultimate-react-native-course-part1/lectures/16762478
// but then customized in order to handle my sighting objects
function LogCard({ title, location, source, type, caption }) {
  const [imageURL, setImageURL] = useState(); // state to hold the image URL

  // function which gets the image from database cloud storage
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
  // Calling in both locations seemed to be necessary for the best results
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
          <Image style={styles.image} source={{ uri: imageURL }} />
        </View>
      </View>
      <AppText style={styles.caption}>{caption}</AppText>
    </View>
  );
}

const styles = StyleSheet.create({
  caption: {
    color: colors.steel,
    fontSize: 15,
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

export default LogCard;
