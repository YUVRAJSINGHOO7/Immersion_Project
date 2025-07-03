import { useState } from 'react'
import BlogForm from './components/BlogForm'
import BlogList from './components/BlogList'
import Header from './components/Header'
import './App.css'

function App() {
  const [posts, setPosts] = useState([])

  const addPost = (title, content, tags) => {
    const newPost = {
      id: Date.now(),
      title,
      content,
      tags,
      date: new Date().toLocaleString()
    }
    setPosts([newPost, ...posts])
  }

  const deletePost = (id) => {
    setPosts(posts.filter(p => p.id !== id))
  }

  return (
    <div className="app-container">
      <Header />
      <div className="content">
        <BlogForm addPost={addPost} />
        <BlogList posts={posts} deletePost={deletePost} />
      </div>
    </div>
  )
}

export default App
