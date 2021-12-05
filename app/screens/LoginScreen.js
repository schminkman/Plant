// outside sources used to help implement authentication in the app: https://www.youtube.com/watch?v=ql4J6SpLXZA&ab_channel=MadeWithMatt

import React, { useEffect, useState } from "react";
import { View, StyleSheet } from "react-native";
import { Formik } from "formik";
import * as Yup from "yup";

import colors from "../config/colors";
import AppTextInput from "../components/AppTextInput";
import AppButton from "../components/AppButton";
import { auth } from "../../firebase";
// import { Admins } from "../admin/A_WhiteList";
import firebase from "../../firebase";
import routes from "../navigation/routes";
import AppText from "../components/AppText";

// It should be noted here that I learned about Formik and Yup via https://codewithmosh.com/courses/the-ultimate-react-native-course-part1/lectures/16762478
// but I put this together myself

const validationSchema = Yup.object().shape({
  email: Yup.string().required().email().label("Email"),
  password: Yup.string().required().min(5).label("Password"),
});

function LoginScreen({ navigation }) {
  const adminRef = firebase.database().ref("Admins"); // reference to the admin list in firebase (the whitelist)

  const getAdminList = () => {
    const list = [];
    adminRef.on("value", (snapshot) => {
      snapshot.forEach((data) => {
        list.push(data.val().email);
      });
    });
    return list;
  };

  const checkAdminStatus = (user) => {
    const list = getAdminList();
    for (let i = 0; i < list.length; i++) {
      if (list[i] === user.email) {
        return true;
      }
    }
  };

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        const isAdmin = checkAdminStatus(user);
        if (isAdmin) {
          // if user's uid is contained in admin list
          navigation.replace(routes.A_HOME); // then take to admin pages via "A_Home" (AdminNavigator)
        } else {
          navigation.replace(routes.HOME); // take to typical pages via "Home" (AppNavigator)
          console.log(user.uid); // for debugging
        }
      }
    });

    return unsubscribe;
  }, []);

  const handleLogin = (values) => {
    let email = values.email;
    let password = values.password;
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
      <Formik
        initialValues={{ email: "", password: "" }}
        onSubmit={(values) => handleLogin(values)}
        validationSchema={validationSchema}
      >
        {({ handleChange, handleSubmit, errors }) => (
          <>
            <AppTextInput
              placeholder="Email"
              // value={email}
              onChangeText={handleChange("email")}
              style={styles.input}
            />
            <AppTextInput
              placeholder="Password"
              // value={password}
              onChangeText={handleChange("password")}
              style={styles.input}
              secureTextEntry // to hide the password as it's typed
            />
            <AppButton title="Log In" color="tertiary" onPress={handleSubmit} />
          </>
        )}
      </Formik>
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
  error: {
    color: "red",
    fontSize: 12,
  },
  input: {
    flex: 1,
  },
});

export default LoginScreen;
