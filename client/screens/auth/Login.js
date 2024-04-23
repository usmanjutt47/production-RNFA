import {StyleSheet, Text, View} from "react-native";
import React, {useState, useContext} from "react";
import {AuthContext} from "../../context/authContext";
import {StatusBar} from "expo-status-bar";
import InputBox from "../../components/Forms/InputBox";
import SubmitButton from "../../components/Forms/SubmitButton";
import {useNavigation} from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";

const Login = () => {
  //Globle State
  const [state, setState] = useContext(AuthContext);

  const navigation = useNavigation();
  //States
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  // Functions
  const handleSubmit = async () => {
    try {
      setLoading(true);
      if (!email || !password) {
        alert("Please enter all required fields");
        setLoading(false);
        return;
      }
      setLoading(false);
      const {data} = await axios.post("/auth/login", {email, password});
      setState(data);
      await AsyncStorage.setItem("@auth", JSON.stringify(data));
      alert(data && data.message);
      navigation.navigate("Home");

      console.log("Login Data ==>", {email, password});
    } catch (error) {
      alert(error.response.data.message);
      setLoading(false);
      console.log("Local Storage ==>", error);
    }
  };

  const getLocalStorageData = async () => {
    let data = await AsyncStorage.getItem("@auth");
    console.log(data);
  };
  getLocalStorageData();
  return (
    <View style={styles.container}>
      <Text style={styles.pageTitle}>Login</Text>
      <View style={{marginHorizontal: "5%"}}>
        <InputBox
          placeHolder={"Email"}
          keyboardType="email-address"
          autoComplete="email"
          value={email}
          setValue={setEmail}
        />
        <InputBox
          placeHolder={"Password"}
          secureTextEntry={true}
          autoComplete="password"
          value={password}
          setValue={setPassword}
        />
      </View>
      {/* <Text>{JSON.stringify({ name, email, password }, null, 4)}</Text> */}
      <SubmitButton
        btnTitle={"Login"}
        loading={loading}
        handleSubmit={handleSubmit}
      />
      <Text style={styles.linkText}>
        Not a user please{" "}
        <Text
          style={{fontWeight: "bold", color: "red"}}
          onPress={() => navigation.navigate("Register")}
        >
          {" "}
          Register
        </Text>
      </Text>
      <StatusBar style="dark" />
    </View>
  );
};

export default Login;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    backgroundColor: "lightgray",
  },
  pageTitle: {
    fontSize: 40,
    fontWeight: "bold",
    textAlign: "center",
    color: "#1e2225",
    marginBottom: "10%",
  },
  linkText: {
    textAlign: "center",
  },
});
