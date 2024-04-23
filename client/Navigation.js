import React from "react";
import { AuthProvider } from "./context/authContext";
import ScreenMenu from "./components/Menus/ScreenMenu";
import { PostProvider } from "./context/postContext";

const RootNavigation = () => {
  return (
    <AuthProvider>
      <PostProvider>
      <ScreenMenu />
      </PostProvider>
    </AuthProvider>
  );
};

export default RootNavigation;
