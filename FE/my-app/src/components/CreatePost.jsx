import { useState, useRef } from "react";
import axios from "axios";
import { Container, Form, Button, Card, Spinner } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";

const CreatePost = ({ fetchPosts, onClose }) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const userId = localStorage.getItem("userId");
  const fileInputRef = useRef(null);

  const handleSubmit = async (e) => {
    e.preventDefault();

    console.log(userId, title, description, image);

    if (!title || !description || !image) {
      alert("All fields are required!");
      return;
    }

    const formData = new FormData();
    formData.append("title", title);
    formData.append("description", description);
    formData.append("image", image);
    formData.append("userId", userId);

    const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000";

    setIsLoading(true);
    try {
      await axios.post(`${API_URL}/api/posts`, formData);
      fetchPosts();
      setTitle("");
      setDescription("");
      setImage(null);
      fileInputRef.current.value = "";
      onClose();
    } catch (error) {
      console.error("Error creating post:", error);
    }
    setIsLoading(false);
  };

  return (
    <Container className="mt-4">
      <Card className="shadow-lg p-4">
        <Card.Title className="text-center mb-3">Create a New Post</Card.Title>
        <Form onSubmit={handleSubmit}>
          <Form.Group className="mb-3">
            <Form.Label>Title</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter post title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              disabled={isLoading}
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Description</Form.Label>
            <Form.Control
              as="textarea"
              rows={3}
              placeholder="Enter post description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              disabled={isLoading}
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Upload Image</Form.Label>
            <Form.Control
              type="file"
              onChange={(e) => setImage(e.target.files[0])}
              disabled={isLoading}
              ref={fileInputRef}
            />
          </Form.Group>

          <Button
            variant="primary"
            type="submit"
            className="w-100"
            disabled={isLoading}
          >
            {isLoading ? (
              <Spinner as="span" animation="border" size="sm" />
            ) : (
              "Create Post"
            )}
          </Button>
        </Form>
      </Card>
    </Container>
  );
};

export default CreatePost;
