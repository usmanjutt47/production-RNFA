import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import React from "react";
import FontAwesome5 from "react-native-vector-icons/FontAwesome5";
import { useNavigation, useRoute } from "@react-navigation/native";
import { Entypo } from "@expo/vector-icons";

const FooterMenu = () => {
  //Hooks
  const route = useRoute();
  const navigation = useNavigation();
  return (
    <View style={styles.constainer}>
      <TouchableOpacity onPress={() => navigation.navigate("Home")}>
        <FontAwesome5
          name="home"
          style={{
            marginBottom: 3,
            alignSelf: "center",
            fontSize: 23,
          }}
          color={route.name === "Home" ? "green" : "black"}
        />
        <Text
          style={{
            color: route.name === "Home" ? "green" : "black",
            fontSize: 12,
          }}
        >
          Home
        </Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={() => navigation.navigate("Post")}>
        <FontAwesome5
          name="plus-circle"
          style={styles.iconStyle}
          color={route.name === "Post" ? "green" : "black"}
        />
        <Text
          style={{
            color: route.name === "Post" ? "green" : "black",
            fontSize: 12,
          }}
        >
          Post
        </Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={() => navigation.navigate("My Posts")}>
        <Entypo
          name="list"
          style={styles.iconStyle}
          color={route.name === "My Posts" ? "green" : "black"}
        />
        <Text
          style={{
            color: route.name === "My Posts" ? "green" : "black",
            fontSize: 12,
          }}
        >
          My Posts
        </Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={() => navigation.navigate("Account")}>
        <FontAwesome5
          name="user"
          style={styles.iconStyle}
          color={route.name === "Account" ? "green" : "black"}
        />
        <Text
          style={{
            color: route.name === "Account" ? "green" : "black",
            fontSize: 12,
          }}
        >
          Account
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default FooterMenu;

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
  },
  textColor: {
    color: "green",
    fontSize: 12,
  },
});
