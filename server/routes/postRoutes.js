const express = require("express");
const { requireSignIn } = require("../controllers/UserController");
const {
  createPostController,
  getAllPostsController,
  getUserPostsController,
  deletePostController,
  updatePostController,
} = require("../controllers/postController");

//routes object
const router = express.Router();

//create post || POST
router.post("/create-post", requireSignIn, createPostController);

//get ALl posts
router.get("/get-all-post", getAllPostsController);

//GET USER POSTS
router.get("/get-user-post", requireSignIn, getUserPostsController);

//Delete Post
router.delete("/delete-post/:id",requireSignIn,deletePostController);

//Update Post
router.put("/update-post/:id",requireSignIn,updatePostController);

//exports
module.exports = router;
