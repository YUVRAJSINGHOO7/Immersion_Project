function PostModal({ post, onClose, onDelete }) {
  return (
    <div className="modal-overlay">
      <div className="modal">
        <button className="close-btn" onClick={onClose}>×</button>
        <h2>{post.title}</h2>
        <p className="date">{post.date}</p>
        <div className="tags">
          {post.tags.map((tag, i) => <span key={i} className="tag">{tag}</span>)}
        </div>
        <p>{post.content}</p>
        <button className="delete-btn" onClick={onDelete}>🗑 Delete Post</button>
      </div>
    </div>
  )
}

export default PostModal
