import { StyleSheet, Text, View, TextInput } from "react-native";
import React from "react";

const InputBox = ({ placeHolder, keyboardType, secureTextEntry = false,value,setValue }) => {
  return (
    <View>
      <Text style={{ marginHorizontal: 5 }}>{placeHolder}</Text>
      <TextInput
        style={styles.inputBox}
        autoCorrect={false}
        keyboardType={keyboardType}
        secureTextEntry={secureTextEntry}
        value={value}
        onChangeText={(text)=>setValue(text)}
      />
    </View>
  );
};

export default InputBox;

const styles = StyleSheet.create({
  inputBox: {
    height: 40,
    marginBottom: 10,
    backgroundColor: "#fff",
    borderRadius: 10,
    marginTop: 5,
    fontSize: 15,
    paddingLeft: 10,
    color: "darkgray",
  },
});
