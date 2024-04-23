import {
  StyleSheet,
  Text,
  TextInput,
  View,
  ScrollView,
  Pressable,
} from "react-native";
import React, { useState ,useContext} from "react";
import { postContext } from "../context/postContext";
import FooterMenu from "../components/Menus/FooterMenu";
import { StatusBar } from "expo-status-bar";
import FontAwesome5 from "react-native-vector-icons/FontAwesome5";
import axios from "axios";

const Post = ({ navigation }) => {

  //globe post 
  const [posts,setPosts]=useContext(postContext)
  //Locale state
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [loading, setLoading] = useState(false);

  //handlePost Data
  const handlePost = async () => {
    try {
      setLoading(true);
      if (!title) {
        alert("Please add post title");
      }
      if (!description) {
        alert("Please add post description");
      }
    } catch (error) {
      alert(error.response.data.message || error.message);
      setLoading(false);
      setPosts([...posts,data?.post])
      console.log(error);
    }
    const { data } = await axios.post("/post/create-post", {
      title,
      description,
    });
    setLoading(false);
    alert(data?.message);
    navigation.navigate("Home");
  };
  return (
    <View style={styles.container}>
      <ScrollView>
        <View style={{ alignItems: "center", marginTop: 20 }}>
          <Text style={styles.heading}>Create a Post</Text>
          <TextInput
            placeholder="add post title"
            style={styles.inputBox}
            placeholderTextColor={"gray"}
            value={title}
            onChangeText={(text) => setTitle(text)}
          />

          <TextInput
            placeholder="add post description"
            style={styles.inputBox}
            placeholderTextColor={"gray"}
            multiline
            numberOfLines={5}
            value={description}
            onChangeText={(text) => setDescription(text)}
          />
        </View>
        <View style={{ alignItems: "center" }}>
          <Pressable style={styles.postBtn} onPress={handlePost}>
            <Text style={styles.postBtnText}>
              <FontAwesome5 name="plus-circle" size={18} />
              {"   "}
              Create post
            </Text>
          </Pressable>
        </View>
      </ScrollView>

      <View style={{ justifyContent: "flex-end", flex: 1 }}>
        <FooterMenu />
      </View>
      <StatusBar style="dark" />
    </View>
  );
};

export default Post;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "space-between",
  },
  heading: {
    fontSize: 25,
    fontWeight: "bold",
  },
  inputBox: {
    backgroundColor: "#ffff",
    width: "85%",
    marginTop: 30,
    fontSize: 15,
    paddingLeft: 10,
    borderColor: "gray",
    borderWidth: 0.5,
    borderRadius: 8,
    paddingTop: 5,
    textAlignVertical: "top",
  },
  postBtn: {
    backgroundColor: "black",
    width: "80%",
    marginTop: 30,
    height: 40,
    borderRadius: 7,
    justifyContent: "center",
    alignItems: "center",
  },
  postBtnText: {
    color: "white",
    fontSize: 15,
  },
});
