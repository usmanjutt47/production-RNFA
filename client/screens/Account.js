import {
  Image,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import React, { useContext, useState } from "react";
import { AuthContext } from "../context/authContext";
import FooterMenu from "../components/Menus/FooterMenu";
import { StatusBar } from "expo-status-bar";
import axios from "axios";

const Account = () => {
  //Globe State
  const [state, setState] = useContext(AuthContext);
  const { user, token } = state;

  //Local State
  const [name, setName] = useState(user?.name);
  const [password, setPassword] = useState(user?.password);
  const [email] = useState(user?.email);
  const [loading, setLoading] = useState(false);

  //handel update user data
  const handleUpdate = async () => {
    setLoading(true);
    const { data } = await axios.put("/auth/update-user", {
      name,
      password,
      email,
    });

    setLoading(false);
    let UD = JSON.stringify(data);
    setState({ ...state, user: UD?.updatedUser });
    alert(data && data.message);
    try {
    } catch (error) {
      alert(error.response.data.message);
      setLoading(false);
      console.log(error);
    }
  };
  return (
    <View style={styles.container}>
      <StatusBar style="dark" />
      <View style={{ alignItems: "center" }}>
        <Image
          source={{
            uri: "https://cdn.pixabay.com/photo/2020/07/01/12/58/icon-5359553_640.png",
          }}
          style={{ height: 150, width: 150 }}
        />
      </View>
      <Text style={styles.warniningText}>
        Currently you can update your name and password*
      </Text>
      <View style={styles.inputContainer}>
        <Text style={styles.inputText}>Name</Text>
        <TextInput
          value={name}
          style={styles.inputBox}
          onChangeText={(text) => setName(text)}
        />
      </View>
      <View style={styles.inputContainer}>
        <Text style={styles.inputText}>Email</Text>
        <TextInput value={email} style={styles.inputBox} editable={false} />
      </View>
      <View style={styles.inputContainer}>
        <Text style={styles.inputText}>Password</Text>
        <TextInput
          value={password}
          style={styles.inputBox}
          onChangeText={(text) => setPassword(text)}
          secureTextEntry={true}
        />
      </View>
      <View style={styles.inputContainer}>
        <Text style={styles.inputText}>Role</Text>
        <TextInput
          value={state?.user.role}
          style={styles.inputBox}
          editable={false}
        />
      </View>

      <View style={{ alignItems: "center" }}>
        <Pressable style={styles.updateBtn} onPress={handleUpdate}>
          <Text style={styles.updateBtnText}>
            {loading ? "Please wait..." : "Update profile"}
          </Text>
        </Pressable>
      </View>

      <View style={{ justifyContent: "flex-end", flex: 1 }}>
        <FooterMenu />
      </View>
    </View>
  );
};

export default Account;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "space-between",
    marginTop: 40,
  },
  warniningText: {
    color: "red",
    fontSize: 15,
    textAlign: "center",
  },
  inputContainer: {
    marginTop: 20,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  inputText: {
    fontWeight: "bold",
    width: 70,
    color: "gray",
  },
  inputBox: {
    width: 250,
    backgroundColor: "#FFFFFF",
    marginLeft: 10,
    fontSize: 15,
    paddingLeft: 10,
    borderRadius: 5,
    elevation: 2,
  },
  updateBtn: {
    backgroundColor: "black",
    color: "white",
    height: 40,
    width: "70%",
    borderRadius: 10,
    marginTop: 30,
    alignItems: "center",
    justifyContent: "center",
  },
  updateBtnText: {
    color: "white",
    fontSize: 15,
  },
});
