import { StyleSheet, Text, TouchableOpacity } from "react-native";
import React from "react";

const SubmitButton = ({ handleSubmit, btnTitle, loading }) => {
  return (
    <TouchableOpacity style={styles.submit} onPress={handleSubmit}>
      <Text style={styles.text}>{loading ? "Please wait..." : btnTitle}</Text>
    </TouchableOpacity>
  );
};

export default SubmitButton;

const styles = StyleSheet.create({
  submit: {
    backgroundColor: "#1e2225",
    height: 50,
    borderRadius: 20,
    marginHorizontal: "5%",
    justifyContent: "center",
    marginBottom: 10,
    marginTop: 10,
  },
  text: {
    color: "#FFFFFF",
    fontSize: 22,
    textAlign: "center",
  },
});
