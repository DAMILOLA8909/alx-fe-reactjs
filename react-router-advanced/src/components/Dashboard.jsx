import { useAuth } from '../context/AuthContext';

const Dashboard = () => {
  const { user } = useAuth();

  const stats = [
    { label: 'Total Posts', value: 12, change: '+2 this month' },
    { label: 'Page Views', value: '1,234', change: '+12% from last month' },
    { label: 'Followers', value: 89, change: '+5 new' },
    { label: 'Engagement', value: '78%', change: '+3%' }
  ];

  const recentActivity = [
    { action: 'Created a new post', time: '2 hours ago' },
    { action: 'Updated profile settings', time: '1 day ago' },
    { action: 'Commented on blog post', time: '2 days ago' },
    { action: 'Logged in from new device', time: '3 days ago' }
  ];

  return (
    <div>
      <h1>Dashboard</h1>
      <p>Welcome back, {user?.name}! Here's what's happening with your account.</p>
      
      {/* Stats Cards */}
      <div style={{ 
        display: 'grid', 
        gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
        gap: '1rem',
        margin: '2rem 0'
      }}>
        {stats.map((stat, index) => (
          <div key={index} className="card">
            <h3 style={{ color: '#667eea', marginBottom: '0.5rem' }}>{stat.value}</h3>
            <p style={{ color: '#666', marginBottom: '0.5rem' }}>{stat.label}</p>
            <small style={{ color: '#28a745' }}>{stat.change}</small>
          </div>
        ))}
      </div>
      
      <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '2rem' }}>
        {/* Recent Activity */}
        <div className="card">
          <h2>Recent Activity</h2>
          <div style={{ marginTop: '1rem' }}>
            {recentActivity.map((activity, index) => (
              <div 
                key={index} 
                style={{
                  padding: '1rem',
                  borderBottom: index < recentActivity.length - 1 ? '1px solid #eee' : 'none',
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center'
                }}
              >
                <span>{activity.action}</span>
                <small style={{ color: '#888' }}>{activity.time}</small>
              </div>
            ))}
          </div>
        </div>
        
        {/* Quick Actions */}
        <div className="card">
          <h2>Quick Actions</h2>
          <div style={{ marginTop: '1rem', display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
            <button className="btn">Create New Post</button>
            <button className="btn btn-secondary">Edit Profile</button>
            <button className="btn btn-secondary">View Analytics</button>
            <button className="btn btn-secondary">Manage Settings</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;