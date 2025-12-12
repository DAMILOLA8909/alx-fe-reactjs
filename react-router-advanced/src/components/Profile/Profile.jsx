import { Outlet, NavLink, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

const Profile = () => {
  const { user } = useAuth();
  const navigate = useNavigate();

  return (
    <div className="card">
      <h1>Profile</h1>
      <p>Welcome to your profile page, {user?.name}!</p>
      
      {/* Nested Navigation */}
      <nav className="nested-nav">
        <ul>
          <li>
            <NavLink to="/profile" end>
              Overview
            </NavLink>
          </li>
          <li>
            <NavLink to="/profile/details">
              Details
            </NavLink>
          </li>
          <li>
            <NavLink to="/profile/settings">
              Settings
            </NavLink>
          </li>
          <li>
            <NavLink to="/profile/posts">
              My Posts
            </NavLink>
          </li>
          <li>
            <button 
              onClick={() => navigate(-1)}
              className="btn btn-secondary"
              style={{ marginLeft: 'auto' }}
            >
              Go Back
            </button>
          </li>
        </ul>
      </nav>
      
      {/* Nested Routes Outlet */}
      <Outlet />
    </div>
  );
};

export default Profile;