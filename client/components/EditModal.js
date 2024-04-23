import React, { useEffect, useState } from "react";
import {
  Alert,
  Modal,
  StyleSheet,
  Text,
  Pressable,
  View,
  TextInput,
} from "react-native";
import axios from "axios";
import { useNavigation } from "@react-navigation/native";

export default function EditModal({ modalVisible, setModalVisible, posts }) {
  const navigation = useNavigation();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [loading, setLoading] = useState(false);

  // handle update Post
  const updatePostHandler = async (id) => {
    try {
      setLoading(true);
      const { data } = await axios.put(
        `/post/update-post/${id}`,
        {
          title,
          description,
        }
      );
      setLoading(false);
      alert(data?.message);
      navigation.push("My Posts")
    } catch (error) {
      setLoading(false);
      console.log(error);
      alert(error);
    }
  };

  //   inital post data
  useEffect(() => {
    setTitle(posts?.title);
    setDescription(posts?.description);
  }, [posts]);
  return (
    <View style={styles.centeredView}>
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          Alert.alert("Modal has been closed.");
          setModalVisible(!modalVisible);
        }}
      >
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            {/* <Text>{JSON.stringify(posts, null, 4)}</Text> */}
            <Text style={styles.modalText}>Update Your Post</Text>
            <Text>Title</Text>
            <TextInput
              style={styles.inputBox}
              value={title}
              onChangeText={(text) => {
                setTitle(text);
              }}
            />
            <Text>Description</Text>
            <TextInput
              style={styles.inputBox}
              multiline={true}
              numberOfLines={5}
              value={description}
              onChangeText={(text) => {
                setDescription(text);
              }}
            />

            <View style={{ flexDirection: "row", margin: 10 }}>
              <Pressable
                style={[styles.button]}
                onPress={() => {
                  updatePostHandler(posts && posts._id),
                    setModalVisible(!modalVisible);
                }}
              >
                <Text style={styles.textStyle}>
                  {loading ? "Please wait" : "Update"}
                </Text>
              </Pressable>

              <Pressable
                style={[styles.button, styles.buttonClose]}
                onPress={() => setModalVisible(!modalVisible)}
              >
                <Text style={styles.textStyle}>cancel</Text>
              </Pressable>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22,
  },
  modalView: {
    margin: 20,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 35,
    shadowColor: "#000",
    // height:'50%',
    // width:'80%',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 2,
  },
  button: {
    borderRadius: 8,
    padding: 10,
    elevation: 2,
    backgroundColor: "black",
    width: 100,
    margin: 13,
  },
  buttonOpen: {
    //     backgroundColor: "#F194FF",
  },
  buttonClose: {
    backgroundColor: "red",
  },

  //   },
  textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
  },
  modalText: {
    marginBottom: 15,
    textAlign: "center",
    fontWeight: "bold",
  },
  inputBox: {
    marginBottom: 10,
    backgroundColor: "lightgrey",
    borderRadius: 6,
    marginTop: 5,
    paddingLeft: 10,
    textAlignVertical: "top",
    paddingTop: 5,
  },
});
