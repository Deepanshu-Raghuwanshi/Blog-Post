import { useEffect, useState } from "react";
import axios from "axios";
import {
  Container,
  Row,
  Col,
  Card,
  Button,
  Form,
  Modal,
  Spinner,
} from "react-bootstrap";
import CreatePost from "./CreatePost";

const PostList = ({ fetchPosts, postsData }) => {
  const [posts, setPosts] = useState([]);
  const [filteredPosts, setFilteredPosts] = useState([]);
  const [filterUser, setFilterUser] = useState("");
  const userId = localStorage.getItem("userId");

  const [showModal, setShowModal] = useState(false);
  const [showCreatePost, setShowCreatePost] = useState(false);
  const [selectedPost, setSelectedPost] = useState({});
  const [isUpdating, setIsUpdating] = useState(false);
  const [isDeleting, setIsDeleting] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000";

  useEffect(() => {
    setIsLoading(true);
    const reversedPosts = [...postsData].reverse();
    setPosts(reversedPosts);
    setFilteredPosts(reversedPosts);
    setIsLoading(false);
  }, [postsData]);

  useEffect(() => {}, [showModal]);

  const handleDelete = async (postId) => {
    setIsDeleting(postId);
    try {
      await axios.delete(`${API_URL}/api/posts/${postId}`);
      fetchPosts();
    } catch (error) {
      console.error("Error deleting post:", error);
    }
    setIsDeleting(null);
  };

  const handleShowModal = (post) => {
    setSelectedPost(post);
    setShowModal(true);
  };

  const handleUpdatePost = async (e) => {
    e.preventDefault();
    setIsUpdating(true);
    try {
      await axios.put(`${API_URL}/api/posts/${selectedPost._id}`, {
        title: selectedPost.title,
        description: selectedPost.description,
      });
      setShowModal(false);
      fetchPosts();
    } catch (error) {
      console.error("Error updating post:", error);
    }
    setIsUpdating(false);
  };

  const filterPostsByUser = () => {
    if (!filterUser) {
      setFilteredPosts(posts);
      return;
    }
    setFilteredPosts(posts.filter((post) => post.user.name === filterUser));
  };

  const resetFilter = () => {
    setFilterUser("");
    setFilteredPosts(posts);
  };

  return (
    <Container className="mt-4">
      <Row className="justify-content-center">
        <Button
          variant="light"
          onClick={() => setShowCreatePost(true)}
          style={{
            marginBottom: "10px",
            borderRadius: "8px",
            width: "550px",
            color: "black",
            fontWeight: "bold",
            border: "1px solid black",
          }}
        >
          Start a Post
        </Button>
        <Col md={8} lg={6} className="d-flex justify-content-between mb-4">
          <Form.Control
            type="text"
            placeholder="Filter by user name"
            value={filterUser}
            onChange={(e) => setFilterUser(e.target.value)}
            className="me-2"
          />
          <Button variant="primary" onClick={filterPostsByUser}>
            Filter
          </Button>
          <Button variant="secondary" onClick={resetFilter} className="ms-2">
            Reset
          </Button>
        </Col>
      </Row>

      {isLoading ? (
        <div className="text-center mt-4">
          <Spinner animation="border" variant="primary" />
          <p>Loading posts...</p>
        </div>
      ) : (
        <Row className="justify-content-center">
          {filteredPosts.length > 0 ? (
            filteredPosts.map((post) => (
              <Col key={post._id} md={10} lg={8} className="mb-4">
                <Card
                  className="shadow-lg text-center"
                  style={{ padding: "20px" }}
                >
                  <Card.Img
                    variant="top"
                    src={post.image}
                    alt={post.title}
                    style={{ height: "400px", objectFit: "cover" }}
                  />
                  <Card.Body>
                    <Card.Title className="fs-3">{post.title}</Card.Title>
                    <Card.Text className="fs-5">{post.description}</Card.Text>
                    <Card.Text className="text-muted">
                      <strong>By:</strong> {post.user.name}
                    </Card.Text>

                    {post.user._id === userId && (
                      <div className="d-flex justify-content-center">
                        <Button
                          variant="warning"
                          className="me-2"
                          onClick={() => handleShowModal(post)}
                        >
                          Update
                        </Button>
                        <Button
                          variant="danger"
                          onClick={() => handleDelete(post._id)}
                          disabled={isDeleting === post._id}
                        >
                          {isDeleting === post._id ? (
                            <Spinner as="span" animation="border" size="sm" />
                          ) : (
                            "Delete"
                          )}
                        </Button>
                      </div>
                    )}
                  </Card.Body>
                </Card>
              </Col>
            ))
          ) : (
            <h4 className="text-center text-muted mt-4">No posts available.</h4>
          )}
        </Row>
      )}

      <Modal show={showModal} onHide={() => setShowModal(false)} centered>
        <Modal.Header closeButton>
          <Modal.Title>Update Post</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleUpdatePost}>
            <Form.Group className="mb-3">
              <Form.Label>Title</Form.Label>
              <Form.Control
                type="text"
                value={selectedPost.title || ""}
                onChange={(e) =>
                  setSelectedPost({ ...selectedPost, title: e.target.value })
                }
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Description</Form.Label>
              <Form.Control
                as="textarea"
                rows={3}
                value={selectedPost.description || ""}
                onChange={(e) =>
                  setSelectedPost({
                    ...selectedPost,
                    description: e.target.value,
                  })
                }
              />
            </Form.Group>
            <Button
              variant="primary"
              type="submit"
              className="w-100"
              disabled={isUpdating}
            >
              {isUpdating ? (
                <Spinner as="span" animation="border" size="sm" />
              ) : (
                "Update Post"
              )}
            </Button>
          </Form>
        </Modal.Body>
      </Modal>

      <Modal
        show={showCreatePost}
        onHide={() => setShowCreatePost(false)}
        centered
      >
        <Modal.Body>
          <CreatePost
            fetchPosts={fetchPosts}
            onClose={() => setShowCreatePost(false)}
          />
        </Modal.Body>
      </Modal>
    </Container>
  );
};

export default PostList;
