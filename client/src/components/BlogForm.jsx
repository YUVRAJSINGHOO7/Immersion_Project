import { useState } from 'react'

function BlogForm({ addPost }) {
  const [title, setTitle] = useState('')
  const [content, setContent] = useState('')
  const [tags, setTags] = useState('')

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!title || !content) return
    addPost(title, content, tags.split(',').map(tag => tag.trim()))
    setTitle('')
    setContent('')
    setTags('')
  }

  return (
    <form className="blog-form" onSubmit={handleSubmit}>
      <input value={title} onChange={e => setTitle(e.target.value)} placeholder="Blog Title" />
      <textarea value={content} onChange={e => setContent(e.target.value)} placeholder="Write your blog..." />
      <input value={tags} onChange={e => setTags(e.target.value)} placeholder="Tags (comma-separated)" />
      <button type="submit">Publish</button>
    </form>
  )
}

export default BlogForm
