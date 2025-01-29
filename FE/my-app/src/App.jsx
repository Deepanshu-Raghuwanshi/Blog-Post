import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./components/Login/Login";
import Home from "./pages/Home";
import PostList from "./components/PostList";
import CreatePost from "./components/CreatePost";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/home" element={<Home />} />
        <Route path="/create_post" element={<CreatePost />} />
        <Route path="/post_list" element={<PostList />} />
      </Routes>
    </Router>
  );
}

export default App;
