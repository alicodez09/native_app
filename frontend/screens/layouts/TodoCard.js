import { View, Text, StyleSheet, Alert } from "react-native";
import React, { useState } from "react";
import moment from "moment";
import FontAwesome5 from "react-native-vector-icons/FontAwesome5";
import axios from "axios";
import { useNavigation } from "@react-navigation/native";

const TodoCard = ({ todos, myTodoScreen }) => {
  const [loading, setLoading] = useState(false);
  const navigation = useNavigation();

  // Delete Prompt
  const handleDeletePrompt = async (id) => {
    Alert.alert("Attention!", "Are you sure you want to delete this todo", [
      {
        text: "Cancel",
        onPress: () => {
          console.log("cancel button press");
        },
      },
      {
        text: "Delete",
        onPress: () => handleDeleteTodo(id),
      },
    ]);
  };

  const handleDeleteTodo = async (id) => {
    try {
      setLoading(true);
      const { data } = await axios.delete(`/todo/delete-user-todo/${id}`);
      setLoading(false);
      alert(data?.message);
      navigation.navigate("Home");
    } catch (error) {
      setLoading(false);
      console.log(error);
    }
  };
  return (
    <View>
      <Text style={styles.heading}>Total Todos are {todos?.length}</Text>
      {todos?.map((todo, index) => (
        <View key={index} style={styles.card}>
          {myTodoScreen ? (
            <View style={{ flexDirection: "row", justifyContent: "flex-end" }}>
              <Text style={{ marginHorizontal: 10 }}>
                <FontAwesome5
                  name="trash"
                  color={"crimson"}
                  size={16}
                  onPress={() => handleDeletePrompt(todo?._id)}
                />
              </Text>
              <Text style={{ marginHorizontal: 10 }}>
                <FontAwesome5
                  name="pen"
                  color={"darkblue"}
                  size={16}
                  // onPress={() => handleDeletePrompt(todo?._id)}
                />
              </Text>
            </View>
          ) : (
            <></>
          )}
          <Text style={styles.title}>{todo?.title}</Text>
          <Text style={styles.description}>{todo?.description}</Text>
          <View style={styles.information}>
            {todo?.postedBy?.name ? (
              <Text>
                <FontAwesome5 name="user" color={"orange"} />
                &nbsp;
                {todo?.postedBy?.name}
              </Text>
            ) : (
              <></>
            )}
            <Text>
              <FontAwesome5 name="clock" color={"orange"} />
              &nbsp;
              {moment(todo?.createdAt).format("MMMM Do YYYY")}
            </Text>
          </View>
        </View>
      ))}
    </View>
  );
};
const styles = StyleSheet.create({
  heading: {
    color: "green",
    textAlign: "center",
    fontSize: 18,
  },
  card: {
    width: "96%",
    backgroundColor: "#ffffff",
    borderWidth: 0.3,
    borderColor: "gray",
    padding: 20,
    marginVertical: 10,
    borderRadius: 8,
  },
  title: {
    fontWeight: "bold",
    marginTop: 10,
    paddingBottom: 5,
    borderBottomWidth: 0.3,
  },
  description: {
    marginTop: 10,
  },
  information: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 20,
  },
});
export default TodoCard;
