import React, { useState } from 'react';
import Search from './components/Search';  // Changed from SearchBar
import UserProfile from './components/UserProfile';
import { fetchUserData } from './services/githubService';  // Changed from githubAPI
import './App.css';

function App() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSearch = async (username) => {
    setLoading(true);
    setError('');
    setUser(null);
    
    try {
      const userData = await fetchUserData(username);
      setUser(userData);
    } catch (err) {
      if (err.response && err.response.status === 404) {
        setError('User not found. Please check the username and try again.');
      } else if (err.response && err.response.status === 403) {
        setError('API rate limit exceeded. Please wait a moment and try again.');
      } else {
        setError('An error occurred while fetching user data. Please try again.');
      }
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
        <Search onSearch={handleSearch} loading={loading} />
        <UserProfile user={user} error={error} loading={loading} />
      </main>
    </div>
  );
}

export default App;