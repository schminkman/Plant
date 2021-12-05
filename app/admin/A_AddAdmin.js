import React, { useState, useEffect } from "react";
import { View, StyleSheet, ScrollView, Modal } from "react-native";

import AppButton from "../components/AppButton";
import AppText from "../components/AppText";
import AppTextInput from "../components/AppTextInput";
import TextCard from "../components/TextCard";
import firebase from "../../firebase";
import { auth } from "../../firebase";
import colors from "../config/colors";

function A_AddAdmin(props) {
  const [admin, setAdmin] = useState(""); // state to hold the user input species to be added to list
  const [modalVisible, setModalVisible] = useState(false); // state to manage visibility of modal
  const [adminList, setAdminList] = useState("");
  const [userList, setUserList] = useState(null);
  const [identifier, setIdentifier] = useState(0);
  const [uid, setUid] = useState(null);
  //   const [success, setSuccess] = useState(false);

  // create reference for the current user              /////               // useful alternative for login navigation ?
  //   const user = firebase.auth().currentUser.uid;
  //   console.log("User: ");
  //   console.log(user);

  // get the list of users from the database
  const getUsers = () => {
    const userRef = firebase.database().ref("Users");

    const list = [];
    userRef.on("value", (snapshot) => {
      snapshot.forEach((data) => {
        // console.log("email: " + email);
        // console.log("data.val().email: " + data.val().email);
        // console.log("data.val for each: ");
        // console.log(data.val());
        list.push(data.val());
      });
    });
    setUserList(list);
  };

  // call getUsers, to get the list of users when the page is opened
  useEffect(() => {
    getUsers();
    // console.log("users list: ");
    // console.log(userList);
  }, []);

  // given a user's email, get that user's uid from firebase users list
  const getUID = (email) => {
    for (let i = 0; i < userList.length; i++) {
      let user = userList[i].email;
      let id = userList[i].uid;
      if (email === user) {
        setUid(id);
        return id;
      }
    }
  };

  // to check if the uid is linked to an account
  const checkID = (userid) => {
    for (let i = 0; i < userList.length; i++) {
      let id = userList[i].uid;
      console.log(" looking for: " + userid);
      console.log("found: " + userList[i].uid);
      if (userid === id) {
        console.log("SUCCESS HERE");
        return true;
      }
    }
    return false;
  };

  // create reference for species list in database
  const adminRef = firebase.database().ref("Admins");

  // get each item in species list from database
  useEffect(() => {
    adminRef.on("value", (snapshot) => {
      const list = [];
      snapshot.forEach((data) => {
        list.push(data.val());
      });
      //   console.log(list);
      setAdminList(list);
    });
  }, []);

  // add species to species list
  const createAdmin = () => {
    const newAdmin = {
      id: identifier,
      email: admin,
      uid: uid,
    };

    adminRef.push(newAdmin); // push to database
  };

  // handle click "add admin" button

  const handleClickButton = () => {
    setModalVisible(true);
    getUsers();
  };

  // set species state to the text input by user
  const handleOnChangeAdmin = (text) => {
    setAdmin(text);
  };

  // when "Add to List" button is pressed, add species to species list in database and close the modal
  const handleCreateAdmin = () => {
    // console.log("admin currently: " + admin);
    const tempID = getUID(admin);
    console.log("tempID: " + tempID);
    let success = checkID(tempID);
    if (success) {
      createAdmin();
    } else {
      alert(
        "Error: There are currently no users registered with that email address!",
        [{ text: "" }]
      );
    }

    // createAdmin();
    setModalVisible(false);
  };

  // call getID with useEffect
  let num = 0;
  useEffect(() => {
    getID();
  });

  // get the next species' uniquie identifier
  const getID = async () => {
    const adminRef = firebase.database().ref("Admins");
    adminRef
      .orderByValue()
      .limitToLast(1)
      .on("value", (snapshot) => {
        snapshot.forEach((data) => {
          num = data.val().id + 1;
          setIdentifier(num);
        });
      });
  };

  // handle deleting a species from the list
  const deleteAdmin = async (index) => {
    adminRef.on("value", (snapshot) => {
      snapshot.forEach((data) => {
        if (data.val().id === index) {
          const key = data.key;
          adminRef.child(key).remove();
        }
      });
    });
  };

  return (
    <View style={styles.top}>
      <View style={styles.list}>
        <ScrollView style={styles.scroll}>
          {adminList ? (
            adminList.map((admin, index) => (
              <TextCard
                caption={admin.email.toString()}
                key={index}
                style={styles.listItem}
                button="Delete"
                action={() => deleteAdmin(admin.id)}
              />
            ))
          ) : (
            <AppText>"Error Rendering Sighting List"</AppText>
          )}
        </ScrollView>
      </View>
      <View style={styles.button}>
        <AppButton
          title="Add Admin"
          color="secondary"
          onPress={handleClickButton}
        />
      </View>
      <View style={styles.container}>
        <Modal visible={modalVisible} animationType="fade">
          <View style={styles.closeButton}>
            <AppButton
              title="Close"
              onPress={() => setModalVisible(false)}
              style={styles.button}
              width="75%"
            />
          </View>
          <View style={styles.container}>
            <AppTextInput
              icon="badge-account-outline"
              placeholder="Email Address"
              onChangeText={(text) => handleOnChangeAdmin(text)}
              value={admin}
            />
            <AppButton
              title="Add to List"
              color="tertiary"
              onPress={handleCreateAdmin}
              width="40%"
            />
          </View>
        </Modal>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  button: {
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
    bottom: 20,
  },
  closeButton: {
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
    top: 20,
  },
  container: {
    flex: 1,
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
  },
  list: {
    margin: 10,
  },
  listItem: {
    fontSize: 20,
    fontWeight: "bold",
    color: colors.black,
  },
  scroll: {
    // paddingTop: 40,
    // paddingBottom: 100,
  },
  text: {
    alignItems: "center",
    justifyContent: "center",
  },
  top: {
    height: "90%",
    paddingTop: 30,
  },
});

export default A_AddAdmin;
