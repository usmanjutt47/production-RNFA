import { StyleSheet, Text, View, Alert } from "react-native";
import React, { useState } from "react";
import moment from "moment";
import FontAwesome5 from "react-native-vector-icons/FontAwesome5";
import { MaterialIcons } from "@expo/vector-icons";
import axios from "axios";
import { useNavigation } from "@react-navigation/native";
import { AntDesign } from "@expo/vector-icons";
import EditModal from "./EditModal";

const PostCard = ({ post, myPostScreen }) => {
  const [modalVisible, setModalVisible] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigation = useNavigation();
  const [posts, setPosts] = useState({});
  //handle delete promt
  const handleDeletePromt = (id) => {
    Alert.alert("Attention!", "Are you sure want to delete this post?", [
      {
        text: "Cancel",
        onPress: () => {
          console.log("cancel press");
        },
      },

      {
        text: "Delete",
        onPress: () => {
          handleDeltePost(id);
        },
      },
    ]);
  };
  //delete post delete
  const handleDeltePost = async (id) => {
    try {
      setLoading(true);
      const { data } = await axios.delete(`/post/delete-post/${id}`);
      setLoading(false);
      alert(data?.message);
      navigation.push("My Posts")
    } catch (error) {
      console.log(error);
      setLoading(false);
      alert(error);
    }
  };
  return (
    <View>
      <Text style={styles.heading}>Total Posts ({post?.length})</Text>
      {myPostScreen && (
        <EditModal
          modalVisible={modalVisible}
          setModalVisible={setModalVisible}
          posts={posts}
        />
      )}
      {post?.map((post, i) => (
        <View style={styles.card} key={i}>
          {myPostScreen && (
            <View style={{ flexDirection: "row", justifyContent: "flex-end" }}>
              <Text style={{ marginHorizontal: 10 }}>
                <AntDesign
                  name="edit"
                  size={20}
                  color="green"
                  onPress={() => {setPosts(post),setModalVisible(true)}}
                />
              </Text>

              <Text>
                <MaterialIcons
                  name="delete"
                  color={"red"}
                  size={20}
                  onPress={() => handleDeletePromt(post?._id)}
                />
              </Text>
            </View>
          )}
          <View>
            <Text style={styles.title}>Title : {post?.title}</Text>
            <Text style={{ marginTop: 10 }}>{post?.description}</Text>
          </View>
          <View style={styles.footer}>
            {post?.postedBy?.name && (
              <Text>
                <FontAwesome5 name="user" color={"green"} />
                {"  "}
                {post?.postedBy?.name}
              </Text>
            )}
            <Text>
              <FontAwesome5 name="clock" color={"green"} />
              {"  "}
              {moment(post?.createdAt).format("DD:MM:YYYY")}
            </Text>
          </View>
        </View>
      ))}
    </View>
  );
};

export default PostCard;

const styles = StyleSheet.create({
  heading: {
    textAlign: "center",
    color: "green",
    marginTop: 5,
    marginBottom: 3,
  },
  card: {
    width: "95%",
    backgroundColor: "#ffffff",
    borderColor: "gray",
    padding: 20,
    borderRadius: 15,
    marginVertical: 5,
    alignSelf: "center",
    elevation: 2,
  },
  title: {
    fontWeight: "bold",
    marginBottom: 5,
  },
  footer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 20,
  },
});
