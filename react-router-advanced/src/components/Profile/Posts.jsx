import { useState } from 'react';
import { useAuth } from '../../context/AuthContext';

const Posts = () => {
  const { user } = useAuth();
  const [posts, setPosts] = useState([
    { id: 1, title: 'My First Post', content: 'This is my first blog post!', date: '2024-01-01' },
    { id: 2, title: 'Learning React', content: 'React is awesome!', date: '2024-01-15' },
    { id: 3, title: 'State Management', content: 'Understanding useState and useEffect', date: '2024-02-01' },
  ]);
  
  const [newPost, setNewPost] = useState({ title: '', content: '' });

  const handleAddPost = () => {
    if (newPost.title && newPost.content) {
      const post = {
        id: posts.length + 1,
        ...newPost,
        date: new Date().toISOString().split('T')[0]
      };
      setPosts([post, ...posts]);
      setNewPost({ title: '', content: '' });
    }
  };

  const handleDeletePost = (id) => {
    setPosts(posts.filter(post => post.id !== id));
  };

  return (
    <div>
      <h2>My Posts</h2>
      
      {/* Add New Post Form */}
      <div className="card" style={{ marginBottom: '2rem' }}>
        <h3>Create New Post</h3>
        <div className="form-group">
          <input
            type="text"
            placeholder="Post Title"
            value={newPost.title}
            onChange={(e) => setNewPost({ ...newPost, title: e.target.value })}
            style={{ marginBottom: '1rem' }}
          />
          <textarea
            placeholder="Post Content"
            value={newPost.content}
            onChange={(e) => setNewPost({ ...newPost, content: e.target.value })}
            style={{ width: '100%', padding: '0.75rem', minHeight: '100px', marginBottom: '1rem' }}
          />
          <button onClick={handleAddPost} className="btn">
            Add Post
          </button>
        </div>
      </div>

      {/* Posts List */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
        {posts.map(post => (
          <div key={post.id} className="card">
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <h3>{post.title}</h3>
              <button
                onClick={() => handleDeletePost(post.id)}
                className="btn btn-danger"
                style={{ padding: '5px 10px', fontSize: '0.9rem' }}
              >
                Delete
              </button>
            </div>
            <p style={{ margin: '0.5rem 0' }}>{post.content}</p>
            <small style={{ color: '#666' }}>
              Posted by {user?.name} on {post.date}
            </small>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Posts;