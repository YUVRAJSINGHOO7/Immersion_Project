import BlogCard from './BlogCard'

function BlogList({ posts, deletePost }) {
  if (posts.length === 0) return <p className="no-posts">No posts yet.</p>
  return (
    <div className="blog-list">
      {posts.map(post => (
        <BlogCard key={post.id} post={post} deletePost={deletePost} />
      ))}
    </div>
  )
}

export default BlogList
