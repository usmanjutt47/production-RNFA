import { StyleSheet, Text, View } from "react-native";
import React, { useContext } from "react";
import FooterMenu from "../components/Menus/FooterMenu";
import { StatusBar } from "expo-status-bar";
import { AuthContext } from "../context/authContext";

const About = () => {
  const [state] = useContext(AuthContext);
  return (
    <View style={styles.container}>
      <View style={{ justifyContent: "flex-end", flex: 1 }}>
        <FooterMenu />
      </View>
      <StatusBar style="dark" />
    </View>
  );
};

export default About;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "space-between",
    marginTop: 40,
  },
});
