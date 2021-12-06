import React from "react";
import { useState } from "react";
import {
  TextInput,
  View,
  StyleSheet,
  Platform,
  TouchableOpacity,
  TouchableHighlight,
  TouchableOpacityBase,
  Modal,
  FlatList,
} from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";

import AppText from "./AppText";
import colors from "../config/colors";
import AppButton from "./AppButton";
import PickerOption from "./PickerOption";

function AppPicker({
  icon,
  items,
  onSelectItem,
  placeholder,
  selectedItem,
  color = "grey",
}) {
  const [modalVisible, setModalVisible] = useState(false);

  return (
    <React.Fragment>
      <TouchableOpacity onPress={() => setModalVisible(true)}>
        <View style={[styles.container, { backgroundColor: colors[color] }]}>
          {icon && (
            <MaterialCommunityIcons
              name={icon}
              size={20}
              color={colors.black}
              style={styles.icon}
            />
          )}
          <AppText style={styles.placeholder}>
            {selectedItem ? selectedItem.label : placeholder}
          </AppText>
          <MaterialCommunityIcons
            name={"chevron-down"}
            size={20}
            color={colors.black}
          />
        </View>
      </TouchableOpacity>
      <Modal visible={modalVisible} animationType="fade">
        <View style={styles.button}>
          <AppButton title="Close" onPress={() => setModalVisible(false)} />
        </View>
        <FlatList
          data={items}
          keyExtractor={(item) => item.value.toString()}
          renderItem={({ item }) => (
            <PickerOption
              label={item.label}
              onPress={() => {
                setModalVisible(false);
                onSelectItem(item);
              }}
            />
          )}
        />
      </Modal>
    </React.Fragment>
  );
}

const styles = StyleSheet.create({
  button: {
    justifyContent: "center",
    alignItems: "center",
  },
  container: {
    backgroundColor: colors.grey,
    borderRadius: 25,
    flexDirection: "row",
    width: "80%",
    padding: 15,
    marginVertical: 10,
    alignItems: "center",
  },
  icon: {
    marginRight: 10,
  },
  placeholder: {
    fontWeight: "normal",
    fontSize: 18,
    color: colors.black,
    flex: 1,
  },
});

export default AppPicker;
