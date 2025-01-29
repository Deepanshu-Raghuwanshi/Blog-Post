const Post = require("../model/postModel");

exports.getAllPosts = async (req, res) => {
  try {
    const posts = await Post.find().populate("user", "name");
    res.status(200).json(posts);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch posts" });
  }
};

exports.createPost = async (req, res) => {
  const { title, description, userId } = req.body;
  const image = req.file ? req.file.path : null;

  try {
    const newPost = new Post({ title, description, image, user: userId });
    await newPost.save();
    res.status(201).json(newPost);
  } catch (error) {
    res.status(500).json({ message: "Failed to create post" });
  }
};

exports.getPostsByUser = async (req, res) => {
  try {
    const posts = await Post.find({ user: req.params.userId });
    res.status(200).json(posts);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch user posts" });
  }
};

exports.deletePost = async (req, res) => {
  try {
    await Post.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: "Post deleted" });
  } catch (error) {
    res.status(500).json({ message: "Failed to delete post" });
  }
};

exports.updatePost = async (req, res) => {
  try {
    const updatedPost = await Post.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    res.status(200).json(updatedPost);
  } catch (error) {
    res.status(500).json({ message: "Failed to update post" });
  }
};
