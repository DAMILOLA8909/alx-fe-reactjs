import React from 'react';

const UserProfile = ({ user, error, loading }) => {
  if (loading) {
    return (
      <div className="user-profile loading">
        <div className="loading-spinner"></div>
        <p>Loading...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="user-profile error">
        <p>Looks like we can't find the user</p>
        <p className="error-detail">{error}</p>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="user-profile empty">
        <p>Enter a GitHub username to search</p>
      </div>
    );
  }

  return (
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

      <div className="profile-details">
        {user.company && (
          <p><strong>Company:</strong> {user.company}</p>
        )}
        {user.location && (
          <p><strong>Location:</strong> {user.location}</p>
        )}
        {user.blog && (
          <p>
            <strong>Blog:</strong>{' '}
            <a href={user.blog} target="_blank" rel="noopener noreferrer">
              {user.blog}
            </a>
          </p>
        )}
        {user.twitter_username && (
          <p><strong>Twitter:</strong> @{user.twitter_username}</p>
        )}
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
  );
};

export default UserProfile;