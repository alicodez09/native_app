import { View, Text, StyleSheet, ScrollView } from "react-native";
import React, { useContext } from "react";
import { AuthContext } from "../../context/auth";
import FooterMenu from "../../components/Menus/FooterMenu";
import { TodoContext } from "../../context/todo";
import TodoCard from "./TodoCard";

const Home = () => {
  const [todos] = useContext(TodoContext);
  return (
    <View style={styles.container}>
      <ScrollView>
        <TodoCard todos={todos} />
        {/* <Text>{JSON.stringify(todos, null, 4)}</Text> */}
      </ScrollView>
      <View style={{ backgroundColor: "#ffffff" }}>
        <FooterMenu />
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "space-between",
    margin: 10,
  },
});
export default Home;
