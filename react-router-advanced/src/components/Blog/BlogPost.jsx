import { useParams, Link, useNavigate } from 'react-router-dom';

// Mock blog posts data
const blogPosts = {
  1: {
    title: 'Getting Started with React Router',
    content: `
      <p>React Router is a powerful routing library for React applications. It enables you to handle navigation and routing in a declarative way.</p>
      <h3>Key Features:</h3>
      <ul>
        <li>Declarative routing</li>
        <li>Nested routes</li>
        <li>Route parameters</li>
        <li>Programmatic navigation</li>
      </ul>
      <p>To get started, install React Router and wrap your application with the Router component.</p>
    `,
    author: 'John Doe',
    date: '2024-01-10',
    category: 'React',
    readTime: '5 min'
  },
  2: {
    title: 'Advanced State Management',
    content: `
      <p>State management is crucial for building complex React applications. While useState is great for simple state, useContext and useReducer provide more powerful solutions.</p>
      <h3>When to use Context:</h3>
      <ul>
        <li>Global theme settings</li>
        <li>User authentication state</li>
        <li>Multi-step forms</li>
        <li>Language preferences</li>
      </ul>
    `,
    author: 'Jane Smith',
    date: '2024-01-15',
    category: 'React',
    readTime: '8 min'
  },
  3: {
    title: 'Building Scalable Applications',
    content: `
      <p>Scalability in React applications involves both code organization and performance optimization.</p>
      <h3>Best Practices:</h3>
      <ul>
        <li>Component modularization</li>
        <li>Code splitting</li>
        <li>Lazy loading</li>
        <li>Proper state management</li>
      </ul>
    `,
    author: 'Mike Johnson',
    date: '2024-01-20',
    category: 'Architecture',
    readTime: '10 min'
  }
};

const BlogPost = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const post = blogPosts[id];

  if (!post) {
    return (
      <div className="card">
        <h2>Post Not Found</h2>
        <p>The blog post you're looking for doesn't exist.</p>
        <button onClick={() => navigate('/blog')} className="btn">
          Back to Blog
        </button>
      </div>
    );
  }

  return (
    <div className="card">
      <div style={{ marginBottom: '1rem' }}>
        <Link to="/blog" style={{ color: '#667eea', textDecoration: 'none' }}>
          ← Back to all posts
        </Link>
      </div>
      
      <article>
        <h1>{post.title}</h1>
        
        <div style={{
          display: 'flex',
          gap: '1rem',
          alignItems: 'center',
          margin: '1rem 0',
          paddingBottom: '1rem',
          borderBottom: '1px solid #eee'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <strong>Author:</strong> {post.author}
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <strong>Date:</strong> {post.date}
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <strong>Category:</strong> {post.category}
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <strong>Read Time:</strong> {post.readTime}
          </div>
        </div>
        
        <div dangerouslySetInnerHTML={{ __html: post.content }} />
        
        <div style={{ marginTop: '2rem', paddingTop: '1rem', borderTop: '1px solid #eee' }}>
          <h3>Related Posts</h3>
          <div style={{ display: 'flex', gap: '1rem', marginTop: '1rem' }}>
            {Object.entries(blogPosts)
              .filter(([postId]) => postId !== id)
              .slice(0, 2)
              .map(([postId, relatedPost]) => (
                <Link 
                  key={postId} 
                  to={`/blog/${postId}`}
                  className="card"
                  style={{ 
                    flex: 1, 
                    textDecoration: 'none',
                    transition: 'transform 0.2s'
                  }}
                >
                  <h4 style={{ color: '#667eea' }}>{relatedPost.title}</h4>
                  <small style={{ color: '#888' }}>{relatedPost.category} • {relatedPost.readTime}</small>
                </Link>
              ))}
          </div>
        </div>
      </article>
    </div>
  );
};

export default BlogPost;