import React, { useState } from 'react';
import './PostsComponent.css';

const PostItem = ({ post, onDelete, isDeleting }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <div className={`post-card ${isExpanded ? 'expanded' : ''}`}>
      <div className="post-header">
        <div className="post-meta">
          <span className="post-id">ID: {post.id}</span>
          <span className="user-id">User: {post.userId}</span>
        </div>
        <div className="post-actions">
          <button 
            onClick={() => setIsExpanded(!isExpanded)}
            className="btn-expand"
          >
            {isExpanded ? '▲' : '▼'}
          </button>
          <button 
            onClick={() => onDelete(post.id)}
            disabled={isDeleting}
            className="btn-delete"
          >
            {isDeleting ? 'Deleting...' : 'Delete'}
          </button>
        </div>
      </div>
      
      <h3 className="post-title">{post.title}</h3>
      
      {isExpanded && (
        <div className="post-body">
          <p>{post.body}</p>
        </div>
      )}
      
      <div className="post-footer">
        <button 
          onClick={() => setIsExpanded(!isExpanded)}
          className="btn-toggle"
        >
          {isExpanded ? 'Show Less' : 'Read More'}
        </button>
      </div>
    </div>
  );
};

export default PostItem;