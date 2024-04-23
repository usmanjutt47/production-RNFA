import React, { createContext, useState, useEffect } from "react";
import axios from "axios";

//Context
const postContext = createContext();

const PostProvider = ({ children }) => {
  const [loading, setLoadig] = useState(false);
  const [posts, setPosts] = useState([]);

  //get Posts
  const getAllPosts = async () => {
    setLoadig(true);
    try {
      const { data } = await axios.get("/post/get-all-post");
      setLoadig(false);
      setPosts(data?.posts);
    } catch (error) {
      console.log(error);
    }
  };

  //inital post
  useEffect(() => {
    getAllPosts();
  }, []);
  return (
    <postContext.Provider value={[posts, setPosts,getAllPosts]}>
      {children}
    </postContext.Provider>
  );
};
//export

export { postContext, PostProvider };
