import React from "react";
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  RefreshControl,
} from "react-native";

import colors from "../config/colors";

import A_Log from "./A_Log";

// scroll to refresh from docs - https://reactnative.dev/docs/refreshcontrol
const wait = (timeout) => {
  return new Promise((resolve) => setTimeout(resolve, timeout));
};

// this component renders the A_Log inside of a scrollview
function A_SightingList({ navigation }) {
  const [refreshing, setRefreshing] = React.useState(false); // state to handle refreshing

  // function to handle pull to refresh
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
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  background: {
    backgroundColor: colors.grey,
    padding: 20,
    paddingTop: 40,
    flex: 1,
  },
  scroll: {
    top: 50,
  },
});

export default A_SightingList;
