import React, { useContext } from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Register from "../../screens/auth/Register";
import Login from "../../screens/auth/Login";
import Home from "../../screens/layouts/Home";
import { AuthContext } from "../../context/auth";
import HeaderMenu from "./HeaderMenu";

const ScreenMenu = () => {
  const Stack = createNativeStackNavigator();
  // global state
  const [state] = useContext(AuthContext);
  const autheticateUser = state?.user && state?.token;
  return (
    <Stack.Navigator initialRouteName="Login">
      {autheticateUser ? (
        <>
          <Stack.Screen
            name="Home"
            component={Home}
            options={{ title: "Native App", headerRight: () => <HeaderMenu /> }}
          />
        </>
      ) : (
        <>
          <Stack.Screen
            name="Register"
            component={Register}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="Login"
            component={Login}
            options={{ headerShown: false }}
          />
        </>
      )}
    </Stack.Navigator>
  );
};

export default ScreenMenu;
