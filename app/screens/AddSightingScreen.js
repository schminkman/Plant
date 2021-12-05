import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  Image,
  TextInput,
  View,
  Button,
  TouchableOpacity,
} from "react-native";
import { IconButton, Colors } from "react-native-paper";
import * as ImagePicker from "expo-image-picker";
import "firebase/storage";
import * as Location from "expo-location";
import { Formik } from "formik";
import * as Yup from "yup";

import AppText from "../components/AppText";
import AppTextInput from "../components/AppTextInput";
import AppPicker from "../components/AppPicker";
import AppButton from "../components/AppButton";
import colors from "../config/colors";
import firebase from "../../firebase";
import * as Firebase from "firebase";
import routes from "../navigation/routes";

const typeCats = [
  { label: "Animal", value: 1 },
  { label: "Plant", value: 2 },
];

const sightingRef = firebase.database().ref("Sightings"); // sightings ref

function AddSightingScreen({ navigation }) {
  const [species, setSpecies] = useState("");
  const [speciesLabel, setSpeciesLabel] = useState("");
  const [speciesType, setSpeciesType] = useState("");
  const [sightingNotes, setSightingNotes] = useState("");
  const [image, setImage] = useState(null);
  const [imageUUID, setImageUUID] = useState("");
  const [identifier, setIdentifier] = useState(0);
  const [location, setLocation] = useState(null);
  const [coarseLocation, setCoarseLocation] = useState(null);
  const [supportedSpecies, setSupportedSpecies] = useState(null);
  const [valid, setValid] = useState(false);

  // function to get user's location permission and location
  // citation: https://codewithmosh.com/courses/955852/lectures/17711040
  const getLocation = async () => {
    const { granted } = await Location.requestForegroundPermissionsAsync();
    // console.log("granted: " + granted);
    if (!granted) {
      console.log("PERM NOT GRANTED!!");
      return;
    }

    // currently this is only working with last known position,
    // I had this working with current position, but for some reason it has stopped working
    const { coords } = await Location.getLastKnownPositionAsync();
    const latitude = coords.latitude;
    const longitude = coords.longitude;
    // console.log("COORDS: "); // for debugging
    // console.log(latitude);
    // console.log(longitude);
    setLocation({ latitude, longitude });

    // setting coarse location using reverseGeocodeAsync
    let coarseInfo = await Location.reverseGeocodeAsync(coords);
    let cityState = coarseInfo[0].city + ", " + coarseInfo[0].region;
    setCoarseLocation(cityState);
    // console.log("Coordinates: " + location);
  };

  // calling getLocation() in useEffect function, calling only once
  useEffect(() => {
    getLocation();
  }, []);

  // function which sets species to input text when we change the input text
  const handleOnChangeSpecies = (text) => {
    // console.log(text.label);
    setSpecies(text);
    setSpeciesLabel(text.label);
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

    // console.log(result.uri);

    if (!result.cancelled) {
      setImage(result.uri);
    }
  };

  // https://www.youtube.com/watch?v=XxZO7151HYc&ab_channel=Voldy
  // (this function was found on stack overflow, but I cannot find a link to that post... it is referenced in this video)

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
        console.log("HERE: ");
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

  // get the next sighting's uniquie identifier
  const getID = async () => {
    sightingRef
      .orderByValue()
      .limitToLast(1)
      .on("value", (snapshot) => {
        snapshot.forEach((data) => {
          // console.log("data.val().id: ");
          // console.log(data.val().id);
          num = data.val().id + 1;
          setIdentifier(num);
          console.log(identifier);
        });
      });
  };

  // had to put getID() call inside of useEffect so that we could setState for identifier
  let num = 0;
  useEffect(() => {
    getID();
  }, []);

  //// getting the list of supported species from the database, and setting the supportedSpecies state with that data ///////////

  const supportedList = []; // will hold the list of supported species

  const supportedRef = firebase.database().ref("Species List"); // reference to supported species in database

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
    });
  };

  // calling the above function in useEffect once
  useEffect(() => {
    getSupportedSpecies(); // will set the value of supportedList = to the correct values
    setSupportedSpecies(supportedList); // set supportedSpecies based on supportedList
  }, []);

  ///////////////////// end handling getting and setting supported species list

  //
  // add sighting to database
  const createSighting = () => {
    const sightingRef = firebase.database().ref("Sightings"); // sightings ref
    console.log(identifier);
    const sighting = {
      // the object we will push
      species: speciesLabel,
      location: location,
      coarse: coarseLocation,
      type: speciesType,
      image: imageUUID,
      notes: sightingNotes,
      id: identifier,
    };

    sightingRef.push(sighting); // push to database
  };

  // handle uploadImage(), createSighting(), go back to logbook
  const addToLogbook = () => {
    if (!valid) {
      checkFields();
    } else {
      uploadImage();
      createSighting();
      navigation.navigate(routes.LOGBOOK);
    }
  };

  // handle checking to see if each field is populated (except for the notes field)
  const checkFields = () => {
    if (species === "" || speciesType === "" || image === null) {
      alert("Error: All fields except for 'notes' are required", [
        { text: "" },
      ]);
    } else {
      setValid(true);
      uploadImage();
      createSighting();
      navigation.navigate(routes.LOGBOOK);
    }
  };

  return (
    <View>
      <View style={styles.container}>
        {/* <AppTextInput
          icon="badge-account-outline"
          placeholder="Species Name"
          onChangeText={(text) => handleOnChangeSpecies(text)}
          value={species}
        /> */}
        <AppPicker
          selectedItem={species}
          onSelectItem={(item) => handleOnChangeSpecies(item)}
          items={supportedSpecies}
          icon="badge-account-outline"
          placeholder="Species"
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
        <AppButton
          title="Add to Logbook!"
          color="tertiary"
          onPress={addToLogbook}
        />
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
