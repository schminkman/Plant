import React, { useState, useEffect } from "react";
import { View, StyleSheet, ScrollView, Modal } from "react-native";

import colors from "../config/colors";
import firebase from "../../firebase";

import AppButton from "../components/AppButton";
import AppText from "../components/AppText";
import AppTextInput from "../components/AppTextInput";
import TextCard from "../components/TextCard";

// screen component which contains the current list of admins, and allows the user to add additonal admins by email address
function A_AddAdmin(props) {
  const [admin, setAdmin] = useState(""); // state to hold the user input species to be added to list
  const [modalVisible, setModalVisible] = useState(false); // state to manage visibility of modal
  const [adminList, setAdminList] = useState(""); // state to hold the list of admins
  const [userList, setUserList] = useState(null); // state to hold the list of all users, from the database
  const [identifier, setIdentifier] = useState(0); // state to hold the ID (key/index) of the next admin to be added

  // get the list of users from the database
  const getUsers = () => {
    const userRef = firebase.database().ref("Users"); // reference the users list from the database

    const list = [];
    userRef.on("value", (snapshot) => {
      snapshot.forEach((data) => {
        list.push(data.val());
      });
    });
    setUserList(list);
  };

  // call getUsers, when the component renders, to get the list of users when the page is opened
  useEffect(() => {
    getUsers();
  }, []);

  // given a user's email, get that user's uid from firebase users list
  const getUID = (email) => {
    for (let i = 0; i < userList.length; i++) {
      let user = userList[i].email;
      let id = userList[i].uid;
      if (email === user) {
        return id;
      }
    }
  };

  // to check if the uid is linked to an account
  const checkID = (userid) => {
    for (let i = 0; i < userList.length; i++) {
      let id = userList[i].uid;
      if (userid === id) {
        return true;
      }
    }
    return false;
  };

  // create reference for admin list in database
  const adminRef = firebase.database().ref("Admins");

  // get each item in admin list from database
  useEffect(() => {
    adminRef.on("value", (snapshot) => {
      const list = [];
      snapshot.forEach((data) => {
        list.push(data.val());
      });
      setAdminList(list);
    });
  }, []);

  // add admin to admin list
  const createAdmin = (tempID) => {
    let uid = tempID;
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

  // set admin state to the email address input by user
  const handleOnChangeAdmin = (text) => {
    setAdmin(text);
  };

  // when "Add to List" button is pressed, add admin to admin list in database and close the modal
  const handleCreateAdmin = () => {
    const tempID = getUID(admin);
    let success = checkID(tempID);
    if (success) {
      createAdmin(tempID);
    } else {
      alert(
        "Error: There are currently no users registered with that email address!",
        [{ text: "" }]
      );
    }

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

  // below, we are mapping each admin object from the admin list (in firebase) to a TextCard
  // additionally, each text card has a button which will delete from the admin list the ID of the admin associated with that button
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
  top: {
    height: "90%",
    paddingTop: 30,
  },
});

export default A_AddAdmin;
