import { Link } from 'react-router-dom';

// Mock blog posts data
const blogPosts = [
  {
    id: 1,
    title: 'Getting Started with React Router',
    excerpt: 'Learn how to implement routing in your React applications.',
    author: 'John Doe',
    date: '2024-01-10',
    category: 'React',
    readTime: '5 min'
  },
  {
    id: 2,
    title: 'Advanced State Management',
    excerpt: 'Exploring useContext and useReducer patterns.',
    author: 'Jane Smith',
    date: '2024-01-15',
    category: 'React',
    readTime: '8 min'
  },
  {
    id: 3,
    title: 'Building Scalable Applications',
    excerpt: 'Architecture patterns for large-scale React apps.',
    author: 'Mike Johnson',
    date: '2024-01-20',
    category: 'Architecture',
    readTime: '10 min'
  },
  {
    id: 4,
    title: 'TypeScript with React',
    excerpt: 'Benefits of using TypeScript in React projects.',
    author: 'Sarah Williams',
    date: '2024-01-25',
    category: 'TypeScript',
    readTime: '6 min'
  },
  {
    id: 5,
    title: 'Performance Optimization',
    excerpt: 'Tips and tricks for optimizing React performance.',
    author: 'Robert Brown',
    date: '2024-02-01',
    category: 'Performance',
    readTime: '7 min'
  }
];

const BlogList = () => {
  return (
    <div>
      <h2>Latest Articles</h2>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', marginTop: '1rem' }}>
        {blogPosts.map(post => (
          <Link 
            key={post.id} 
            to={`/blog/${post.id}`}
            style={{ textDecoration: 'none' }}
          >
            <div className="card" style={{ transition: 'transform 0.2s' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                <div>
                  <h3 style={{ color: '#667eea', marginBottom: '0.5rem' }}>{post.title}</h3>
                  <p style={{ color: '#666', marginBottom: '0.5rem' }}>{post.excerpt}</p>
                  <div style={{ display: 'flex', gap: '1rem', fontSize: '0.9rem', color: '#888' }}>
                    <span>By {post.author}</span>
                    <span>{post.date}</span>
                    <span>{post.category}</span>
                    <span>{post.readTime} read</span>
                  </div>
                </div>
                <span className="btn" style={{ padding: '5px 15px', fontSize: '0.9rem' }}>
                  Read →
                </span>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default BlogList;