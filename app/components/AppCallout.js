import React, { useState, useEffect } from "react";
import { View, StyleSheet, SafeAreaView, Text, Image } from "react-native";
import WebView from "react-native-webview";
import firebase from "../../firebase";

import colors from "../config/colors";
import AppText from "./AppText";

function AppCallout({ title, location, source, type, caption }) {
  const [imageURL, setImageURL] = useState();

  const getImage = async (source) => {
    let imageRef = firebase.storage().ref(source);
    imageRef
      .getDownloadURL()
      .then((url) => {
        setImageURL(url);
      })
      .catch((e) => console.log("error fetching image download URL"));
    // console.log(imageURL);
    return imageURL;
  };

  getImage(source);

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
    // paddingBottom: 10,
  },
  card: {
    backgroundColor: colors.white,
    borderRadius: 15,
    marginBottom: 10,
    overflow: "hidden",
  },
  image: {
    // top: 20,
    // margin: 20,
    borderRadius: 50,
    height: 75,
    width: 100,
    // backgroundColor: "transparent",
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
    fontSize: 15,
    marginBottom: 0,
    textTransform: "uppercase",
  },
});

export default AppCallout;
