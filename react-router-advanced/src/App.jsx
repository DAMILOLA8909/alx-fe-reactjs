import { Routes, Route, Navigate } from 'react-router-dom';
import { useAuth } from './context/AuthContext';
import ProtectedRoute from './components/ProtectedRoute';

// Layout
import MainLayout from './components/Layout/MainLayout';

// Pages
import Home from './components/Home';
import Dashboard from './components/Dashboard';
import Login from './components/Auth/Login';
import Register from './components/Auth/Register';

// Profile (Nested Routes)
import Profile from './components/Profile/Profile';
import ProfileDetails from './components/Profile/ProfileDetails';
import ProfileSettings from './components/Profile/ProfileSettings';
import Posts from './components/Profile/Posts';

// Blog (Dynamic Routes)
import BlogLayout from './components/Blog/BlogLayout';
import BlogList from './components/Blog/BlogList';
import BlogPost from './components/Blog/BlogPost';

// Error Pages
import Unauthorized from './components/ErrorPages/Unauthorized';
import NotFound from './components/ErrorPages/NotFound';

// Home Component
const Home = () => (
  <div className="card">
    <h1>Welcome to Advanced React Router Demo</h1>
    <p>This application demonstrates advanced routing techniques in React including:</p>
    <ul style={{ margin: '1rem 0', paddingLeft: '1.5rem' }}>
      <li>Nested Routes (Profile section)</li>
      <li>Protected Routes (Dashboard and Profile)</li>
      <li>Dynamic Routes (Blog posts)</li>
      <li>Authentication with Context API</li>
      <li>Programmatic Navigation</li>
    </ul>
    <div style={{ marginTop: '2rem' }}>
      <h3>Try these features:</h3>
      <div style={{ display: 'flex', gap: '1rem', marginTop: '1rem' }}>
        <div className="card" style={{ flex: 1 }}>
          <h4>Public Routes</h4>
          <p>Access the blog without authentication</p>
        </div>
        <div className="card" style={{ flex: 1 }}>
          <h4>Protected Routes</h4>
          <p>Login to access dashboard and profile</p>
        </div>
        <div className="card" style={{ flex: 1 }}>
          <h4>Nested Routes</h4>
          <p>Explore profile sub-sections</p>
        </div>
      </div>
    </div>
  </div>
);

// Error Pages Components
const Unauthorized = () => (
  <div className="card">
    <h2>Unauthorized Access</h2>
    <p>You don't have permission to access this page.</p>
    <button onClick={() => window.history.back()} className="btn">
      Go Back
    </button>
  </div>
);

const NotFound = () => {
  const { user } = useAuth();
  
  return (
    <div className="card">
      <h2>404 - Page Not Found</h2>
      <p>The page you're looking for doesn't exist.</p>
      <div style={{ marginTop: '1rem', display: 'flex', gap: '1rem' }}>
        <button onClick={() => window.history.back()} className="btn btn-secondary">
          Go Back
        </button>
        <button onClick={() => window.location.href = '/'} className="btn">
          Go Home
        </button>
      </div>
    </div>
  );
};

const App = () => {
  const { user } = useAuth();

  return (
    <Routes>
      <Route path="/" element={<MainLayout />}>
        {/* Public Routes */}
        <Route index element={<Home />} />
        <Route path="login" element={user ? <Navigate to="/dashboard" /> : <Login />} />
        <Route path="register" element={user ? <Navigate to="/dashboard" /> : <Register />} />
        
        {/* Blog Routes (Public) */}
        <Route path="blog" element={<BlogLayout />}>
          <Route index element={<BlogList />} />
          <Route path=":id" element={<BlogPost />} />
        </Route>
        
        {/* Protected Routes */}
        <Route path="dashboard" element={
          <ProtectedRoute>
            <Dashboard />
          </ProtectedRoute>
        } />
        
        {/* Nested Routes - Profile */}
        <Route path="profile" element={
          <ProtectedRoute>
            <Profile />
          </ProtectedRoute>
        }>
          <Route index element={
            <div className="card">
              <h2>Profile Overview</h2>
              <p>Select a section from the navigation above to manage your profile.</p>
            </div>
          } />
          <Route path="details" element={<ProfileDetails />} />
          <Route path="settings" element={<ProfileSettings />} />
          <Route path="posts" element={<Posts />} />
        </Route>
        
        {/* Error Routes */}
        <Route path="unauthorized" element={<Unauthorized />} />
        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  );
};

export default App;