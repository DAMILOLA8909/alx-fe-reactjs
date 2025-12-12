import React, { useState } from 'react';
import './PostsComponent.css';

const PostForm = ({ onSubmit, isLoading, onCancel }) => {
  const [formData, setFormData] = useState({
    title: '',
    body: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (formData.title.trim() && formData.body.trim()) {
      onSubmit(formData);
      setFormData({ title: '', body: '' });
    }
  };

  return (
    <div className="post-form">
      <h3>Create New Post</h3>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="title">Title:</label>
          <input
            type="text"
            id="title"
            name="title"
            value={formData.title}
            onChange={handleChange}
            placeholder="Enter post title"
            required
            className="form-input"
          />
        </div>
        
        <div className="form-group">
          <label htmlFor="body">Content:</label>
          <textarea
            id="body"
            name="body"
            value={formData.body}
            onChange={handleChange}
            placeholder="Enter post content"
            rows="4"
            required
            className="form-textarea"
          />
        </div>
        
        <div className="form-actions">
          <button 
            type="button" 
            onClick={onCancel}
            className="btn btn-cancel"
            disabled={isLoading}
          >
            Cancel
          </button>
          <button 
            type="submit" 
            className="btn btn-submit"
            disabled={isLoading || !formData.title.trim() || !formData.body.trim()}
          >
            {isLoading ? 'Creating...' : 'Create Post'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default PostForm;