import { useState, useEffect } from "react";
import axios from "axios";
import BlogForm from "./components/BlogForm";
import BlogList from "./components/BlogList";
import Header from "./components/Header";
import "./App.css";

function App() {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:5000/api/blogs")
      .then((res) => {
        const serverPosts = res.data.map((post) => ({
          id: post._id, // mapping MongoDB _id to id
          title: post.title,
          content: post.content,
          tags: post.tags || [],
          date: new Date(post.date).toLocaleString(),
        }));
        setPosts(serverPosts);
      })
      .catch((err) => console.error("Error fetching posts:", err));
  }, []);

  const addPost = (title, content, tags) => {
    axios
      .post("http://localhost:5000/api/blogs", { title, content, tags })
      .then((res) => {
        const newPost = {
          id: res.data._id, // from MongoDB
          title: res.data.title,
          content: res.data.content,
          tags: res.data.tags || [],
          date: new Date(res.data.date).toLocaleString(),
        };
        setPosts([newPost, ...posts]);
      })
      .catch((err) => console.error("Error adding post:", err));
  };

  const deletePost = (id) => {
    axios
      .delete(`http://localhost:5000/api/blogs/${id}`)
      .then(() => {
        setPosts(posts.filter((p) => p.id !== id));
      })
      .catch((err) => console.error("Error deleting post:", err));
  };

  return (
    <div className="app-container">
      <Header />
      <div className="content">
        <BlogForm addPost={addPost} />
        <BlogList posts={posts} deletePost={deletePost} />
      </div>
    </div>
  );
}

export default App;
