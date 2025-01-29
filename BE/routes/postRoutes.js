const express = require("express");
const multer = require("multer");
const {
  getAllPosts,
  createPost,
  getPostsByUser,
  deletePost,
  updatePost,
} = require("../controller/post.controller");
const { upload } = require("../middleware/uploadMiddleware");

const router = express.Router();

router.get("/", getAllPosts);
router.get("/user/:userId", getPostsByUser);
router.post("/", upload.single("image"), createPost);
router.delete("/:id", deletePost);
router.put("/:id", updatePost);

module.exports = router;
