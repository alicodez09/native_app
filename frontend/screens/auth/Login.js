import { View, Text, StyleSheet, TextInput, Alert } from "react-native";
import React, { useState } from "react";
import InputBox from "../../components/InputBox";
import SubmitButton from "../../components/SubmitButton";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";

const Login = ({ navigation }) => {
  //States
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  // Functions
  const handleSubmit = async () => {
    try {
      setLoading(true);
      if (!email || !password) {
        Alert.alert("Please fill all fields");
        setLoading(false);
        return;
      }
      const { data } = await axios.post(
        "http://192.168.100.242:8084/api/v1/auth/login",
        { email, password }
      );
      console.log(JSON.stringify(data, null, 2), "data");
      await AsyncStorage.setItem("@auth", JSON.stringify(data));
      setLoading(false);

      alert(data && data.message);
    } catch (error) {
      setLoading(false);
      console.log(error);
    }
  };
  // temp function to check local storage
  const getLocalStorageData = async () => {
    let data = await AsyncStorage.getItem("@auth");
    console.log(data, "local storage data");
  };
  getLocalStorageData();
  return (
    <View style={styles.container}>
      <Text style={styles.pageTitle}>Login</Text>
      <View>
        <InputBox
          inputTitle={"Email"}
          keyboardType={"email-address"}
          // autoComplete="email"
          value={email}
          setValue={setEmail}
        />
        <InputBox
          inputTitle={"Password"}
          secureTextEntry={true}
          // autoComplete="password"
          value={password}
          setValue={setPassword}
        />
      </View>
      <SubmitButton
        title="Login"
        loading={loading}
        handleSubmit={handleSubmit}
      />
      <Text style={styles.linkText}>
        Don't have an account? &nbsp;
        <Text
          style={styles.link}
          onPress={() => navigation.navigate("Register")}
        >
          Register
        </Text>
      </Text>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    backgroundColor: "#e1d5c9",
  },
  pageTitle: {
    fontSize: 30,
    fontWeight: "bold",
    textAlign: "center",
    color: "#1e2225",
  },
  inputBox: {
    height: 40,
    backgroundColor: "#fff",
    margin: 15,
    borderRadius: 7,
    padding: 10,
  },
  linkText: {
    textAlign: "center",
  },
  link: {
    color: "crimson",
    fontSize: 16,
    fontWeight: "bold",
  },
});

export default Login;
