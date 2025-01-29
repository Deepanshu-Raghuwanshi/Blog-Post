import { useState, useEffect } from "react";
import axios from "axios";
import CreatePost from "../components/CreatePost";
import PostList from "../components/PostList";
import { Container, Row, Col, Card, Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const [posts, setPosts] = useState([]);
  const navigate = useNavigate();

  const userName = localStorage.getItem("name");

  const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000";

  useEffect(() => {
    fetchPosts();
  }, []);

  const fetchPosts = async () => {
    try {
      const response = await axios.get(`${API_URL}/api/posts`);
      setPosts(response.data);
    } catch (error) {
      console.error("Error fetching posts:", error);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("name");
    navigate("/");
  };

  return (
    <Container className="mt-4">
      {userName && <h2 className="text-center mb-4">Hello, {userName}!</h2>}

      <Button
        variant="danger"
        onClick={handleLogout}
        style={{
          position: "absolute",
          top: "20px",
          right: "20px",
        }}
      >
        Logout
      </Button>

      {posts.length > 0 && (
        <Row className="mt-4 justify-content-center">
          <Col md={10}>
            <PostList fetchPosts={fetchPosts} postsData={posts} />
          </Col>
        </Row>
      )}
    </Container>
  );
};

export default Home;
