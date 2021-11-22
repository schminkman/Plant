import React from "react";
import { useState, useEffect } from "react";
import {
  Image,
  Text,
  Platform,
  StyleSheet,
  TouchableOpacity,
  View,
  Button,
  TouchableHighlight,
} from "react-native";
import * as ImagePicker from "expo-image-picker";
import { IconButton, Colors } from "react-native-paper";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { uuid } from "uuidv4";

import AppText from "./AppText";
import colors from "../config/colors";
import AppButton from "./AppButton";

// using the recommended code at https://docs.expo.dev/versions/latest/sdk/imagepicker/

function AppImagePicker(props) {
  const [image, setImage] = useState(null);

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

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    console.log(result);

    if (!result.cancelled) {
      setImage(result.uri);
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

export default AppImagePicker;
