// outside sources used to help implement authentication in the app: https://www.youtube.com/watch?v=ql4J6SpLXZA&ab_channel=MadeWithMatt

import React, { useEffect } from "react";
import { View, StyleSheet } from "react-native";
import { Formik } from "formik";
import * as Yup from "yup";

import { auth } from "../../firebase";
import colors from "../config/colors";
import firebase from "../../firebase";
import routes from "../navigation/routes";

import AppButton from "../components/AppButton";
import AppText from "../components/AppText";
import AppTextInput from "../components/AppTextInput";

// It should be noted here that I learned about Formik and Yup via https://codewithmosh.com/courses/the-ultimate-react-native-course-part1/lectures/16762478
// but I put this together myself

// validation schema for use with Yup and Formik
const validationSchema = Yup.object().shape({
  email: Yup.string().required().email().label("Email"),
  password: Yup.string().required().min(5).label("Password"),
});

// screen component which serves as the signup screen, navigated to when selecting signup from the welcome screen
function SignupScreen({ navigation }) {
  // function to listen for an auth state change
  // when the user signs up, naviagate back to the welcome screen
  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        navigation.replace(routes.WELCOME);
      }
    });

    return unsubscribe;
  }, []);

  // function which handles signup
  const handleSignUp = (values) => {
    let email = values.email;
    let password = values.password;
    auth
      .createUserWithEmailAndPassword(email, password)
      .then((userCredentials) => {
        const user = userCredentials.user;
        addToUsersList(email, user.uid); // call addToUsersList with email and user's uid
      })
      .catch((error) => alert(error.message));
  };

  // function to add a user (email and uid) to the users list in the database
  const addToUsersList = (email, uid) => {
    const user = {
      email: email,
      uid: uid,
    };
    const userRef = firebase.database().ref("Users");
    userRef.push(user);
  };

  return (
    <View style={styles.container}>
      <Formik
        initialValues={{ email: "", password: "" }}
        onSubmit={(values) => handleSignUp(values)}
        validationSchema={validationSchema}
      >
        {({ handleChange, handleSubmit, errors }) => (
          <>
            <AppTextInput
              placeholder="Email"
              onChangeText={handleChange("email")}
              style={styles.input}
            />
            <AppText style={styles.error}>{errors.email}</AppText>
            <AppTextInput
              placeholder="Password"
              onChangeText={handleChange("password")}
              style={styles.input}
              secureTextEntry // to hide the password as it's typed
            />
            <AppText style={styles.error}>{errors.password}</AppText>
            <AppButton
              title="Register"
              color="tertiary"
              onPress={handleSubmit}
            />
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

export default SignupScreen;
