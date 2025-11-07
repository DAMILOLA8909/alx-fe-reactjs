import React from 'react';
import ProfilePage from './components/ProfilePage';
import { UserContext } from './context/UserContext';

function App() {
  const userData = { 
    name: "Jane Doe", 
    email: "jane.doe@example.com",
    age: 28,
    location: "New York",
    joinDate: "2023-01-15"
  };

  return (
    <UserContext.Provider value={userData}>
      <div style={{ padding: '20px', fontFamily: 'Arial, sans-serif' }}>
        <h1 style={{ color: '#2c3e50', textAlign: 'center' }}>User Profile App</h1>
        <ProfilePage />
      </div>
    </UserContext.Provider>
  );
}

export default App;