// outside sources used to help implement authentication in the app: https://www.youtube.com/watch?v=ql4J6SpLXZA&ab_channel=MadeWithMatt

import React, { useEffect, useState } from "react";
import { View, StyleSheet } from "react-native";

import colors from "../config/colors";
import AppTextInput from "../components/AppTextInput";
import AppButton from "../components/AppButton";
import { auth } from "../../firebase";
import { Admins } from "../admin/A_WhiteList";
import routes from "../navigation/routes";

function LoginScreen({ navigation }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        if (Admins.includes(user.uid)) {
          // if user's uid is contained in admin whitelist
          navigation.replace(routes.A_HOME); // then take to admin pages via "A_Home" (AdminNavigator)
        } else {
          navigation.replace(routes.HOME); // take to typical pages via "Home" (AppNavigator)
          console.log(user.uid); // for debugging
        }
      }
    });

    return unsubscribe;
  }, []);

  const handleLogin = () => {
    auth
      .signInWithEmailAndPassword(email, password)
      .then((userCredentials) => {
        const user = userCredentials.user;
        console.log("logged in as: ", user.email); // for debugging
      })
      .catch((error) => alert(error.message));
  };

  return (
    <View style={styles.container}>
      <AppTextInput
        placeholder="Email"
        value={email}
        onChangeText={(text) => setEmail(text)}
        style={styles.input}
      />
      <AppTextInput
        placeholder="Password"
        value={password}
        onChangeText={(text) => setPassword(text)}
        style={styles.input}
        secureTextEntry // to hide the password as it's typed
      />
      <AppButton title="Log In" color="tertiary" onPress={handleLogin} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.secondary,
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
  },
  input: {
    flex: 1,
  },
});

export default LoginScreen;
