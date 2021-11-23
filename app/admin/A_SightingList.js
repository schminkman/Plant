import React, { useEffect, useState } from "react";
import {
  SafeAreaView,
  View,
  StyleSheet,
  ScrollView,
  Button,
  RefreshControl,
} from "react-native";

import colors from "../config/colors";
import firebase from "../../firebase";

import A_Log from "./A_Log";
import AppButton from "../components/AppButton";
import routes from "../navigation/routes";
import SightingList from "../components/SightingList";

// scroll to refresh from docs - https://reactnative.dev/docs/refreshcontrol
const wait = (timeout) => {
  return new Promise((resolve) => setTimeout(resolve, timeout));
};

function A_SightingList({ navigation }) {
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
        <A_Log />
      </ScrollView>
      {/* <View style={styles.buttonContainer}>
        <AppButton
          title="Delete Sightings"
          onPress={() => navigation.navigate(routes.ADD_SIGHTING)}
          width="100%"
        />
      </View> */}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  background: {
    backgroundColor: colors.aluminum,
    padding: 20,
    paddingTop: 40,
    flex: 1,
  },
  scroll: {
    top: 50,
  },
});

export default A_SightingList;
