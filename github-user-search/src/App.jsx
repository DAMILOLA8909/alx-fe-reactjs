import React, { useState } from 'react';
import SearchBar from './components/SearchBar';
import UserCard from './components/UserCard';
import { searchUsers } from './services/githubAPI';
import './App.css';

function App() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSearch = async (query) => {
    setLoading(true);
    setError('');
    
    try {
      const result = await searchUsers(query);
      setUsers(result.items || []);
    } catch (err) {
      setError('Failed to search users. Please try again.');
      console.error('Search error:', err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1>GitHub User Search</h1>
        <p>Find GitHub users by username</p>
      </header>
      
      <main className="App-main">
        <SearchBar onSearch={handleSearch} />
        
        {loading && <p className="loading">Searching...</p>}
        {error && <p className="error">{error}</p>}
        
        <div className="users-grid">
          {users.map(user => (
            <UserCard key={user.id} user={user} />
          ))}
        </div>
        
        {users.length === 0 && !loading && !error && (
          <p className="no-results">No users found. Try searching for a GitHub username.</p>
        )}
      </main>
    </div>
  );
}

export default App;