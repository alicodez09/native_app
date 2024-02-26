import React, { createContext, useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
// context
const AuthContext = createContext();

// provider
const AuthProvider = ({ children }) => {
  // Global State
  const [state, setState] = useState({
    user: null,
    token: "",
  });

  //   default URL   192.168.162.220
  axios.defaults.baseURL = "http://192.168.1.8:8084/api/v1";
  //   intial local storage data
  useEffect(() => {
    const loadLocalStorage = async () => {
      let data = await AsyncStorage.getItem("@auth");
      let loginData = JSON.parse(data);
      setState({ ...state, user: loginData?.user, token: loginData?.token });
    };
    loadLocalStorage();
  }, []);

  return (
    <AuthContext.Provider value={[state, setState]}>
      {children}
    </AuthContext.Provider>
  );
};
export { AuthContext, AuthProvider };
