import { ScrollView, StyleSheet, View, RefreshControl } from "react-native";
import React, { useContext, useState, useCallback } from "react";
import FooterMenu from "../components/Menus/FooterMenu";
import { StatusBar } from "expo-status-bar";
import { postContext } from "../context/postContext";
import PostCard from "../components/PostCard";

const Home = () => {
  // const [state] = useContext(AuthContext);
  const [post, getAllPosts] = useContext(postContext);
  const [refreshing, setRefreshing] = useState(false);

  //refresh controll
  const onRefresh = useCallback(() => {
    setRefreshing(true);
    getAllPosts();
    setTimeout(() => {
      setRefreshing(false);
    }, 2000);
  }, []);

  return (
    <View style={styles.container}>
      <ScrollView>
        <PostCard post={post} />
        {/* <Text>Home</Text> */}
        {/* <Text>{JSON.stringify(post, null, 4)}</Text> */}
      </ScrollView>

      <View>
        <FooterMenu />
      </View>
      <StatusBar style="dark" />
    </View>
  );
};

export default Home;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "space-between",
  },
});
