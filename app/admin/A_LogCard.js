import React, { useState, useEffect } from "react";
import {
  FlatList,
  Button,
  Image,
  SafeAreaView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { Colors } from "react-native/Libraries/NewAppScreen";
import firebase from "../../firebase";
import AppButton from "../components/AppButton";

import colors from "../config/colors";
import AppText from "../components/AppText";

function A_LogCard({ title, location, source, type, caption, ID }) {
  const [imageURL, setImageURL] = useState();
  //   const [ourKey, setOurKey] = useState();

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

  const sightingsRef = firebase.database().ref("Sightings");

  const nowDelete = () => {
    sightingsRef.orderByValue().on("value", (snapshot) => {
      snapshot.forEach((data) => {
        // console.log("data.val(): ");
        // console.log(data.val().id);
        if (data.val().id === ID) {
          //   console.log(data.key);
          key = data.key;
          sightingsRef.child(key).remove();
        }
      });
    });
  };

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
              onPress={handleDelete}
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
