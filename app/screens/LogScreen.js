import React, { useEffect, useState } from "react";
import {
  SafeAreaView,
  View,
  StyleSheet,
  ScrollView,
  Button,
  RefreshControl,
  // LogBox,
} from "react-native";

import colors from "../config/colors";
import firebase from "../../firebase";

import LogCard from "../components/LogCard";
import AppButton from "../components/AppButton";
import routes from "../navigation/routes";
import SightingList from "../components/SightingList";
// LogBox.ignoreAllLogs();

// scroll to refresh from docs - https://reactnative.dev/docs/refreshcontrol

const wait = (timeout) => {
  return new Promise((resolve) => setTimeout(resolve, timeout));
};

function LogScreen({ navigation }) {
  const [refreshing, setRefreshing] = React.useState(false);

  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    wait(2000).then(() => setRefreshing(false));
  }, []);

  return (
    <SafeAreaView style={styles.background}>
      <ScrollView
        style={styles.scroll}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      >
        <SightingList />
      </ScrollView>
      <View style={styles.buttonContainer}>
        <AppButton
          title="Add Sighting"
          onPress={() => navigation.navigate(routes.ADD_SIGHTING)}
          width="40%"
        />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
    backgroundColor: colors.grey,
    padding: 20,
    paddingTop: 75,
  },
  buttonContainer: {
    backgroundColor: "transparent",
    height: 0,
    justifyContent: "center",
    alignItems: "flex-end",
    paddingBottom: 10,
    bottom: 10,
  },
  container: {
    flexDirection: "column",
    flex: 1,
    padding: 10,
    paddingTop: 100,
  },
  scroll: {
    flex: 3,
  },
});

export default LogScreen;
