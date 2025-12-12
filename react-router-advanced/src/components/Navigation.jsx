import { NavLink, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Navigation = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <nav className="nav">
      <ul>
        <li>
          <NavLink to="/">Home</NavLink>
        </li>
        
        {/* Public Routes */}
        <li>
          <NavLink to="/blog">Blog</NavLink>
        </li>
        
        {/* Protected Routes */}
        {user && (
          <>
            <li>
              <NavLink to="/dashboard">Dashboard</NavLink>
            </li>
            <li>
              <NavLink to="/profile">Profile</NavLink>
            </li>
          </>
        )}
        
        {/* Auth Links */}
        {!user ? (
          <>
            <li>
              <NavLink to="/login">Login</NavLink>
            </li>
            <li>
              <NavLink to="/register">Register</NavLink>
            </li>
          </>
        ) : (
          <li style={{ marginLeft: 'auto' }}>
            <span style={{ color: 'white', marginRight: '1rem' }}>
              Welcome, {user.name}!
            </span>
            <button onClick={handleLogout} className="btn btn-secondary">
              Logout
            </button>
          </li>
        )}
      </ul>
    </nav>
  );
};

export default Navigation;