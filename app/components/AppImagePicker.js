import React from "react";
import { useState, useEffect } from "react";
import { Image, Platform, StyleSheet, View } from "react-native";
import * as ImagePicker from "expo-image-picker";
import { IconButton } from "react-native-paper";

import colors from "../config/colors";

import AppText from "./AppText";

// component which allows the user to select an image from the device library
// using the recommended code at https://docs.expo.dev/versions/latest/sdk/imagepicker/
function AppImagePicker(props) {
  const [image, setImage] = useState(null); // state to hold the image URI

  // requesting permission from the user to access the media library
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

  // launching the image library and allowing the user to pick an image
  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    console.log(result);

    if (!result.cancelled) {
      setImage(result.uri); // setting the image URI based on the selected image
    }
  };

  return (
    <React.Fragment>
      <View style={styles.container}>
        <AppText style={styles.text}>Upload Image</AppText>
        <IconButton
          icon="camera"
          color={colors.primary}
          size={20}
          onPress={pickImage}
        />
      </View>
      {image && (
        <Image source={{ uri: image }} style={{ width: 200, height: 200 }} />
      )}
    </React.Fragment>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.grey,
    borderRadius: 25,
    flexDirection: "row",
    width: "80%",
    height: 60,
    padding: 15,
    marginVertical: 8,
    alignItems: "center",
  },
  text: {
    paddingLeft: 10,
    fontWeight: "normal",
    fontSize: 18,
    color: colors.black,
    flex: 1,
  },
});

export default AppImagePicker;
