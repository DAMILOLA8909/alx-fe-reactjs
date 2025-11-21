import React, { useState } from 'react';
import { fetchUserData } from '../services/githubService';

const Search = () => {
  const [username, setUsername] = useState('');
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (username.trim()) {
      setLoading(true);
      setError('');
      setUser(null);
      
      try {
        // Using fetchUserData from the service
        const userData = await fetchUserData(username);
        setUser(userData);
      } catch (err) {
        setError('Looks like we cant find the user');
      } finally {
        setLoading(false);
      }
    }
  };

  return (
    <div className="search-container">
      <form onSubmit={handleSubmit} className="search-bar">
        <input
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          placeholder="Enter GitHub username..."
          className="search-input"
          disabled={loading}
        />
        <button 
          type="submit" 
          className="search-button"
          disabled={loading || !username.trim()}
        >
          {loading ? 'Searching...' : 'Search'}
        </button>
      </form>
      
      {/* Loading State */}
      {loading && (
        <div className="user-profile loading">
          <div className="loading-spinner"></div>
          <p>Loading...</p>
        </div>
      )}
      
      {/* Error State */}
      {error && (
        <div className="user-profile error">
          <p>{error}</p>
        </div>
      )}
      
      {/* Success State */}
      {user && (
        <div className="user-profile">
          <div className="profile-header">
            <img src={user.avatar_url} alt={user.login} className="user-avatar" />
            <div className="profile-info">
              <h2>{user.name || user.login}</h2>
              <p className="username">@{user.login}</p>
              {user.bio && <p className="bio">{user.bio}</p>}
            </div>
          </div>
          
          <div className="profile-stats">
            <div className="stat">
              <strong>{user.public_repos}</strong>
              <span>Repositories</span>
            </div>
            <div className="stat">
              <strong>{user.followers}</strong>
              <span>Followers</span>
            </div>
            <div className="stat">
              <strong>{user.following}</strong>
              <span>Following</span>
            </div>
          </div>

          <a 
            href={user.html_url} 
            target="_blank" 
            rel="noopener noreferrer" 
            className="profile-link"
          >
            View GitHub Profile
          </a>
        </div>
      )}
    </div>
  );
};

export default Search;