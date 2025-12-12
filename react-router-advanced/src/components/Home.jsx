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

export default Home;