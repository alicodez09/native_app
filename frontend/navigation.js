import React from "react";
import ScreenMenu from "./components/Menus/ScreenMenu";
import { AuthProvider } from "./context/auth";

const RootNavigation = () => {
  return (
    <AuthProvider>
      <ScreenMenu />
    </AuthProvider>
  );
};

export default RootNavigation;
