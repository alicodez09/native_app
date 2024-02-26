import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import React from "react";
import FontAwesome5 from "react-native-vector-icons/FontAwesome5";
const FooterMenu = () => {
  return (
    <View style={styles.container}>
      <TouchableOpacity>
        <FontAwesome5 name="home" style={styles.icons} />
        <Text>Home</Text>
      </TouchableOpacity>
      <TouchableOpacity>
        <FontAwesome5 name="plus-square" style={styles.icons} />

        <Text>Add Todo</Text>
      </TouchableOpacity>
      <TouchableOpacity>
        <FontAwesome5 name="info-circle" style={styles.icons} />

        <Text>About</Text>
      </TouchableOpacity>
      <TouchableOpacity>
        <FontAwesome5 name="user-circle" style={styles.icons} />

        <Text>Account</Text>
      </TouchableOpacity>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    margin: 10,
  },
  icons: {
    marginBottom: 3,
    alignSelf: "center",
    fontSize: 25,
  },
});
export default FooterMenu;
