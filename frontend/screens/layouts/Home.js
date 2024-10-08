import React, { useCallback, useState, useEffect } from "react";
import { View, ScrollView, RefreshControl, StyleSheet } from "react-native";
import axios from "axios";
import FooterMenu from "../../components/Menus/FooterMenu";
import TodoCard from "./TodoCard";

const Home = () => {
  const [todos, setTodos] = useState([]);
  const [refreshing, setRefreshing] = useState(false);
  const [loading, setLoading] = useState(false);

  // Function to fetch todos directly from the API
  const fetchTodos = async () => {
    setLoading(true);
    try {
      const { data } = await axios.get("/todo/get-all-todo");
      setTodos(data?.todos || []); // Update state with the fetched todos
    } catch (error) {
      console.error("Error fetching todos:", error);
    } finally {
      setLoading(false);
    }
  };

  // Fetch todos when the component mounts
  useEffect(() => {
    fetchTodos();
  }, []);

  // Refresh handler
  const onRefresh = useCallback(() => {
    setRefreshing(true);
    fetchTodos();
    setTimeout(() => {
      setRefreshing(false);
    }, 2000);
  }, []);

  return (
    <View style={styles.container}>
      <ScrollView
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      >
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
