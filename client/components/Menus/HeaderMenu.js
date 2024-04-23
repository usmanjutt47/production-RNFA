import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React, { useContext } from "react";
import { AuthContext } from "../../context/authContext";
import FontAwesome5 from "react-native-vector-icons/FontAwesome5";
import AsyncStorage from "@react-native-async-storage/async-storage";

const HeaderMenu = () => {
  //Global data get Method
  const [state, setState] = useContext(AuthContext);
  //logout
  const handleLogout = async () => {
    setState({ token: "", user: null });
    await AsyncStorage.removeItem("@auth");
    alert("logout successfully");
  };
  return (
    <View>
      <TouchableOpacity onPress={handleLogout}>
        <FontAwesome5
          name="sign-out-alt"
          color={"red"}
          style={styles.iconStyle}
        />
      </TouchableOpacity>
    </View>
  );
};

export default HeaderMenu;

const styles = StyleSheet.create({
  constainer: {
    flexDirection: "row",
    backgroundColor: "#fff",
    borderRadius: 20,
    padding: 10,
    justifyContent: "space-between",
    elevation: 2,
    marginBottom: "3%",
    marginRight: "3%",
    marginLeft: "3%",
  },
  iconStyle: {
    marginBottom: 3,
    alignSelf: "center",
    fontSize: 23,
    color: "red",
  },
  textColor: {
    color: "red",
    fontSize: 12,
  },
});
