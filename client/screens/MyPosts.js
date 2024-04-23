import { ScrollView, StyleSheet, Text, View } from "react-native";
import React, { useState, useEffect } from "react";
import FooterMenu from "../components/Menus/FooterMenu";
import { StatusBar } from "expo-status-bar";
import axios from "axios";
import PostCard from "../components/PostCard";


const MyPosts = () => {
  //state
  const [post, setPost] = useState([]);
  const [loading, setLoading] = useState(false);

  //getUser post
  const getUserPost = async () => {
    try {
      setLoading(true);
      const { data } = await axios.get("/post/get-user-post");
      setLoading(false);
      setPost(data?.userPosts);
    } catch (error) {
      setLoading(false);
      console.log(error);
      alert("error");
    }
  };

  //initial
  useEffect(() => {
    getUserPost();
  }, []);
  return (
    <View style={styles.container}>
      <ScrollView>
        <PostCard post={post} myPostScreen={true}/>
        {/* <Text>{JSON.stringify(post, null, 5)}</Text> */}
      </ScrollView>

      <View>
        <FooterMenu />
      </View>
      <StatusBar style="dark" />
    </View>
  );
};

export default MyPosts;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "space-between",
  },
});
