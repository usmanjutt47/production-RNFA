import { Alert, StyleSheet, Text, TextInput, View } from "react-native";
import React, { useState } from "react";
import { StatusBar } from "expo-status-bar";
import InputBox from "../../components/Forms/InputBox";
import SubmitButton from "../../components/Forms/SubmitButton";
import { useNavigation } from "@react-navigation/native";
import axios from "axios";

const Register = () => {
  const navigation = useNavigation();
  //States
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  // Functions
  const handleSubmit = async () => {
    try {
      setLoading(true);
      if (!name || !email || !password) {
        Alert.alert("Please enter all required fields");
        setLoading(false);
        return;
      }
      if (!password || password.length < 6 || !/\d/.test(password)) {
        Alert.alert("Password is required and must be at least 6 characters long");
        setLoading(false);
        return;
      }
  
      setLoading(false);
      const response = await axios.post(
        "/auth/register",
        { name, email, password }
      );
      if (response.status === 409) { // Assuming 409 is the status code for "Conflict"
        Alert.alert("Email is already registered. Please use a different email.");
        return;
      }
      const { data } = response;
      alert(data && data.message);
      navigation.navigate("Login");
      console.log("Register Data Success ==>", { name, email, password });
    } catch (error) {
      if (error.isAxiosError && !error.response) {
        // Network error, handle accordingly
        Alert.alert("Network Error. Please check your internet connection and try again.");
      } else {
        // Other error, handle it
        alert(error.response ? error.response.data.message : "An error occurred");
      }
      setLoading(false);
      console.log(error);
    }
  };
  
  
  
  return (
    <View style={styles.container}>
      <Text style={styles.pageTitle}>Register</Text>
      <View style={{ marginHorizontal: "5%" }}>
        <InputBox placeHolder={"Name"} value={name} setValue={setName} />

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
        btnTitle={"Register"}
        loading={loading}
        handleSubmit={handleSubmit}
      />
      <Text style={styles.linkText}>
        Alredy Register Please
        <Text
          style={{ fontWeight: "bold", color: "red" }}
          onPress={() => navigation.navigate("Login")}
        >
          {" "}
          Login
        </Text>
      </Text>
      <StatusBar style="dark" />
    </View>
  );
};

export default Register;

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
