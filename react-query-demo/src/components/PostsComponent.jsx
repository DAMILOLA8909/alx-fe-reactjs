import React, { useState } from 'react';
import { 
  useQuery, 
  useMutation, 
  useQueryClient 
} from '@tanstack/react-query';
import PostItem from './PostItem';
import PostForm from './PostForm';
import './PostsComponent.css';

// Fetch posts from API
const fetchPosts = async () => {
  const response = await fetch('https://jsonplaceholder.typicode.com/posts');
  if (!response.ok) {
    throw new Error('Network response was not ok');
  }
  return response.json();
};

// Simulate creating a new post (POST request)
const createPost = async (postData) => {
  const response = await fetch('https://jsonplaceholder.typicode.com/posts', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(postData),
  });
  if (!response.ok) {
    throw new Error('Failed to create post');
  }
  return response.json();
};

// Simulate deleting a post
const deletePost = async (postId) => {
  const response = await fetch(`https://jsonplaceholder.typicode.com/posts/${postId}`, {
    method: 'DELETE',
  });
  if (!response.ok) {
    throw new Error('Failed to delete post');
  }
  return { success: true };
};

const PostsComponent = () => {
  const [filter, setFilter] = useState('');
  const [sortBy, setSortBy] = useState('id');
  const [showForm, setShowForm] = useState(false);
  const queryClient = useQueryClient();

  // Fetch posts with React Query
  const {
    data: posts = [],
    isLoading,
    isError,
    error,
    refetch,
    isFetching,
  } = useQuery({
    queryKey: ['posts'],
    queryFn: fetchPosts,
    staleTime: 1000 * 60 * 5, // 5 minutes
    cacheTime: 1000 * 60 * 10, // 10 minutes
  });

  // Create post mutation
  const createPostMutation = useMutation({
    mutationFn: createPost,
    onSuccess: () => {
      // Invalidate and refetch posts query after successful creation
      queryClient.invalidateQueries({ queryKey: ['posts'] });
      setShowForm(false);
    },
    onError: (error) => {
      console.error('Error creating post:', error);
    },
  });

  // Delete post mutation
  const deletePostMutation = useMutation({
    mutationFn: deletePost,
    onSuccess: () => {
      // Invalidate and refetch posts query after successful deletion
      queryClient.invalidateQueries({ queryKey: ['posts'] });
    },
    onError: (error) => {
      console.error('Error deleting post:', error);
    },
  });

  // Filter and sort posts
  const filteredAndSortedPosts = React.useMemo(() => {
    let result = [...posts];
    
    // Filter by title or body
    if (filter) {
      const lowerFilter = filter.toLowerCase();
      result = result.filter(post => 
        post.title.toLowerCase().includes(lowerFilter) ||
        post.body.toLowerCase().includes(lowerFilter)
      );
    }
    
    // Sort
    result.sort((a, b) => {
      if (sortBy === 'id') return a.id - b.id;
      if (sortBy === 'title') return a.title.localeCompare(b.title);
      if (sortBy === 'userId') return a.userId - b.userId;
      return 0;
    });
    
    return result;
  }, [posts, filter, sortBy]);

  // Handle post creation
  const handleCreatePost = (postData) => {
    const newPost = {
      ...postData,
      userId: 1, // Default user ID
      id: posts.length + 1, // Generate new ID (in real app, this would come from API)
    };
    createPostMutation.mutate(newPost);
  };

  // Handle post deletion
  const handleDeletePost = (postId) => {
    if (window.confirm('Are you sure you want to delete this post?')) {
      deletePostMutation.mutate(postId);
    }
  };

  if (isLoading) {
    return (
      <div className="loading-state">
        <div className="loading-spinner"></div>
        <p>Loading posts...</p>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="error-state">
        <h3>Error loading posts</h3>
        <p>{error.message}</p>
        <button onClick={() => refetch()}>Retry</button>
      </div>
    );
  }

  return (
    <div className="posts-container">
      <div className="controls-section">
        <div className="stats-card">
          <h3>React Query Stats</h3>
          <div className="stats-grid">
            <div className="stat-item">
              <span className="stat-label">Total Posts:</span>
              <span className="stat-value">{posts.length}</span>
            </div>
            <div className="stat-item">
              <span className="stat-label">Filtered Posts:</span>
              <span className="stat-value">{filteredAndSortedPosts.length}</span>
            </div>
            <div className="stat-item">
              <span className="stat-label">Status:</span>
              <span className={`stat-value ${isFetching ? 'fetching' : 'cached'}`}>
                {isFetching ? 'Fetching...' : 'Cached'}
              </span>
            </div>
            <div className="stat-item">
              <span className="stat-label">Cache Time:</span>
              <span className="stat-value">10 min</span>
            </div>
          </div>
        </div>

        <div className="filter-controls">
          <div className="search-box">
            <input
              type="text"
              placeholder="Search posts..."
              value={filter}
              onChange={(e) => setFilter(e.target.value)}
              className="search-input"
            />
            <span className="search-icon">🔍</span>
          </div>

          <div className="sort-controls">
            <label>Sort by:</label>
            <select 
              value={sortBy} 
              onChange={(e) => setSortBy(e.target.value)}
              className="sort-select"
            >
              <option value="id">ID</option>
              <option value="title">Title</option>
              <option value="userId">User ID</option>
            </select>
          </div>

          <div className="action-buttons">
            <button 
              onClick={() => refetch()} 
              className="btn btn-refresh"
              disabled={isFetching}
            >
              {isFetching ? 'Refreshing...' : 'Refresh Data'}
            </button>
            
            <button 
              onClick={() => setShowForm(!showForm)} 
              className="btn btn-new-post"
            >
              {showForm ? 'Cancel' : 'Create New Post'}
            </button>
          </div>
        </div>

        {showForm && (
          <PostForm 
            onSubmit={handleCreatePost} 
            isLoading={createPostMutation.isPending}
            onCancel={() => setShowForm(false)}
          />
        )}
      </div>

      <div className="posts-grid">
        <h2>Posts ({filteredAndSortedPosts.length})</h2>
        
        {filteredAndSortedPosts.length === 0 ? (
          <div className="empty-state">
            <p>No posts found matching your search criteria.</p>
          </div>
        ) : (
          <div className="posts-list">
            {filteredAndSortedPosts.slice(0, 12).map((post) => (
              <PostItem 
                key={post.id} 
                post={post} 
                onDelete={handleDeletePost}
                isDeleting={deletePostMutation.isPending}
              />
            ))}
          </div>
        )}
      </div>

      <div className="cache-demo">
        <h3>Cache Demonstration</h3>
        <p>
          Try these actions to see React Query caching in action:
        </p>
        <ul>
          <li>✓ Navigate away and come back - Data loads instantly from cache</li>
          <li>✓ Click "Refresh Data" to fetch fresh data from API</li>
          <li>✓ Create/Delete posts - Cache automatically updates</li>
          <li>✓ Check Network tab - No API calls when using cached data</li>
        </ul>
        <p className="cache-note">
          <strong>Note:</strong> Data is cached for 5 minutes (staleTime). 
          After 10 minutes (cacheTime), cache is garbage collected.
        </p>
      </div>
    </div>
  );
};

export default PostsComponent;