// outside sources used to help implement authentication in the app: https://www.youtube.com/watch?v=ql4J6SpLXZA&ab_channel=MadeWithMatt

import React, { useEffect, useState } from "react";
import { View, StyleSheet } from "react-native";
import { Formik } from "formik";
import * as Yup from "yup";

import { auth } from "../../firebase";
import colors from "../config/colors";
import firebase from "../../firebase";
import routes from "../navigation/routes";

import AppButton from "../components/AppButton";
import AppTextInput from "../components/AppTextInput";
import AppText from "../components/AppText";

// It should be noted here that I learned about Formik and Yup via https://codewithmosh.com/courses/the-ultimate-react-native-course-part1/lectures/16762478
// but I put this together myself

// validation schema for Yup / Formik
const validationSchema = Yup.object().shape({
  email: Yup.string().required().email().label("Email"),
  password: Yup.string().required().min(5).label("Password"),
});

// screen component which serves as the login screen (navigated to by selecting log in from the welcome screen)
function LoginScreen({ navigation }) {
  const [adminList, setAdminList] = useState(""); // state to hold the list of admins
  const [isLoading, setLoading] = useState(true); // state to determine whether we are still waiting on the list of admins

  const adminRef = firebase.database().ref("Admins"); // reference to the admin list in firebase (the whitelist)

  // function to get the lsit of admins from firebase
  const getAdminList = async () => {
    const list = []; // to temporarily hold the admin list
    adminRef.on("value", (snapshot) => {
      snapshot.forEach((data) => {
        list.push(data.val().email);
      });
    });
    setAdminList(list); // set the adminlist = list
    setLoading(false); // set loading to false
  };

  // check to see if the current user is an admin, checking user's email address against the admin list in firebase
  const checkAdminStatus = (user) => {
    for (let i = 0; i < adminList.length; i++) {
      if (adminList[i] === user.email) {
        return true;
      }
    }
  };

  // essentially a listener, waiting on the user to log in
  useEffect(() => {
    // when the user logs in, this is called
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

  // handle logging in with given credentials, using firebase auth
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

  // if we don't yet have the adminlist (isloading is set to false after we get the list)
  if (isLoading) {
    getAdminList();

    return (
      <View>
        <AppText>Loading...</AppText>
      </View>
    );
  } else {
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
                onChangeText={handleChange("email")}
                style={styles.input}
              />
              <AppTextInput
                placeholder="Password"
                onChangeText={handleChange("password")}
                style={styles.input}
                secureTextEntry // to hide the password as it's typed
              />
              <AppButton
                title="Log In"
                color="tertiary"
                onPress={handleSubmit}
              />
            </>
          )}
        </Formik>
      </View>
    );
  }
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
