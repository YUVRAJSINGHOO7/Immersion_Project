import { useState } from 'react'
import PostModal from './PostModal'

function BlogCard({ post, deletePost }) {
  const [open, setOpen] = useState(false)

  return (
    <>
      <div className="blog-card" onClick={() => setOpen(true)}>
        <h3>{post.title}</h3>
        <p className="date">{post.date}</p>
        <div className="tags">
          {post.tags.map((tag, i) => <span key={i} className="tag">{tag}</span>)}
        </div>
        <p className="preview">{post.content.slice(0, 100)}...</p>
      </div>
      {open && <PostModal post={post} onClose={() => setOpen(false)} onDelete={() => deletePost(post.id)} />}
    </>
  )
}

export default BlogCard
