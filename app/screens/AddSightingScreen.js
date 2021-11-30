import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  Image,
  TextInput,
  View,
  Button,
  TouchableOpacity,
} from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { Navigation, NavigationContainer } from "@react-navigation/native";
import { IconButton, Colors } from "react-native-paper";
import * as ImagePicker from "expo-image-picker";
import { getStorage, ref } from "firebase/storage";
import "firebase/storage";
import uuid from "react-native-uuid";

import AppImagePicker from "../components/AppImagePicker";
import AppText from "../components/AppText";
import AppTextInput from "../components/AppTextInput";
import AppPicker from "../components/AppPicker";
import AppButton from "../components/AppButton";
import colors from "../config/colors";
import firebase from "../../firebase";
import * as Firebase from "firebase";
import routes from "../navigation/routes";
import * as Location from "expo-location";

// const storage = getStorage();

const typeCats = [
  { label: "Animal", value: 1 },
  { label: "Plant", value: 2 },
];

// const typeCats = ["Animal", "Plant"];

function AddSightingScreen({ navigation }) {
  const [species, setSpecies] = useState("");
  const [speciesType, setSpeciesType] = useState("");
  const [sightingNotes, setSightingNotes] = useState("");
  const [image, setImage] = useState(null);
  const [imageUUID, setImageUUID] = useState("");
  const [identifier, setIdentifier] = useState(0);
  const [location, setLocation] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);

  // function to get user's location permission and location
  // citation: https://codewithmosh.com/courses/955852/lectures/17711040
  const getLocation = async () => {
    const { granted } = await Location.requestForegroundPermissionsAsync();
    // console.log("granted: " + granted);
    if (!granted) {
      console.log("PERM NOT GRANTED!!");
      return;
    }
    const {
      coords: { latitude, longitude },
    } = await Location.getCurrentPositionAsync();
    console.log("COORDS: ");
    console.log(coords);
    // const {
    //   coords: { latitude, longitude }, // destructuring the object returned by getLastKnownPosition
    // } = await Location.getCurrentPositionAsync();
    // console.log("Coordinates: " + latitude + " " + longitude);
    setLocation({ latitude, longitude });
    console.log("Coordinates: " + location);
  };

  // calling getLocation() in useEffect function, calling only once
  useEffect(() => {
    getLocation();
  }, []);

  // testing
  // useEffect(() => {
  //   (async () => {
  //     let { status } = await Location.requestForegroundPermissionsAsync();
  //     if (status !== "granted") {
  //       setErrorMsg("Permission to access location was denied");
  //       return;
  //     }

  //     let location = await Location.getLastKnownPositionAsync({});
  //     setLocation(location);
  //   })();
  // }, []);

  // let text = "Waiting...";
  // if (errorMsg) {
  //   text = errorMsg;
  // } else if (location) {
  //   text = JSON.stringify(location);
  // }

  // console.log(text);

  // function which sets species to input text when we change the input text
  const handleOnChangeSpecies = (text) => {
    setSpecies(text);
    const filename = new Date().toISOString(); // doing this here because I cannot get this to work in the image area
    setImageUUID(filename); // creating a unique filename based on current date and then setting the imageUUID to that string
  };

  // function which sets sighting notes to input text when we change the input text
  const handleOnChangeNotes = (text) => {
    setSightingNotes(text);
  };

  //////////////////////////////// image handling ////////////////////////////////////////////

  // handle image picker https://docs.expo.dev/versions/latest/sdk/imagepicker/
  useEffect(() => {
    (async () => {
      if (Platform.OS !== "web") {
        const { status } =
          await ImagePicker.requestMediaLibraryPermissionsAsync();
        if (status !== "granted") {
          alert("This feature requires permission to access the camera roll!");
        }
      }
    })();
  }, []);

  // to pick the image and set the image
  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    // console.log(result);

    if (!result.cancelled) {
      setImage(result.uri);
    }
    // console.log("image: " + image);
  };

  // https://www.youtube.com/watch?v=XxZO7151HYc&ab_channel=Voldy (this function was found on stack overflow, but I cannot find a link to that post... it is referenced in this video)

  const uploadImage = async () => {
    const blob = await new Promise((resolve, reject) => {
      const xhr = new XMLHttpRequest();
      xhr.onload = function () {
        resolve(xhr.response);
      };
      xhr.onerror = function () {
        reject(new TypeError("Network request failed"));
      };
      xhr.responseType = "blob";
      xhr.open("GET", image, true);
      xhr.send(null);
    });

    // create reference for this image, using unique string (imageUUID) to identify the image
    const ref = Firebase.storage().ref().child(imageUUID);
    const snapshot = ref.put(blob);

    snapshot.on(
      Firebase.storage.TaskEvent.STATE_CHANGED,
      () => {
        // console.log("Here");
      },
      (error) => {
        console.log(error);
        blob.close();
        return;
      },
      () => {
        snapshot.snapshot.ref.getDownloadURL().then((url) => {
          blob.close();
          return url;
        });
      }
    );
  };

  ////////////////////////////////////////////////////////////////////////// end image handling

  // had to put getID() call inside of useEffect so that we could setState for identifier
  let num = 0;
  useEffect(() => {
    getID();
  });

  // get the next sighting's uniquie identifier
  const getID = (async = () => {
    const sightingsRef = firebase.database().ref("Sightings");
    sightingsRef
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
  });

  // add sighting to database
  const createSighting = () => {
    const sightingRef = firebase.database().ref("Sightings");
    const sighting = {
      // the object we will push
      species,
      location: location,
      type: speciesType,
      image: imageUUID,
      notes: sightingNotes,
      id: identifier,
    };

    sightingRef.push(sighting); // push to database
  };

  // handle uploadImage(), createSighting(), go back to logbook
  const addToLogbook = () => {
    uploadImage();
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
        {/* <AppImagePicker /> */}
        <React.Fragment>
          <View style={styles.imagepicker}>
            <AppText style={styles.text}>Upload Image</AppText>
            <IconButton
              icon="camera"
              color={colors.primary}
              size={20}
              onPress={pickImage}
            />
          </View>
          {image && (
            <Image
              source={{ uri: image }}
              style={{ width: 200, height: 200 }}
            />
          )}
        </React.Fragment>
        {/* <AppButton title="upload image" onPress={uploadImage} /> */}
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
  imagepicker: {
    backgroundColor: colors.grey,
    borderRadius: 25,
    flexDirection: "row",
    width: "80%",
    height: 60,
    padding: 15,
    marginVertical: 8,
    alignItems: "center",
    // justifyContent: "center",
  },
  icons: {
    alignSelf: "flex-start",
  },
  text: {
    paddingLeft: 10,
    fontWeight: "normal",
    fontSize: 18,
    color: colors.black,
    // alignSelf: "flex-end",
    flex: 1,
  },
});

export default AddSightingScreen;
