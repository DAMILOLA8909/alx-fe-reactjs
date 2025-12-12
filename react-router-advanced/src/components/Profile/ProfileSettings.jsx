import { useState } from 'react';

const ProfileSettings = () => {
  const [settings, setSettings] = useState({
    notifications: true,
    newsletter: false,
    darkMode: false,
  });

  const handleToggle = (setting) => {
    setSettings(prev => ({
      ...prev,
      [setting]: !prev[setting]
    }));
  };

  return (
    <div className="card">
      <h2>Profile Settings</h2>
      <div style={{ marginTop: '1rem' }}>
        <div style={{ marginBottom: '1rem' }}>
          <label style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
            <input
              type="checkbox"
              checked={settings.notifications}
              onChange={() => handleToggle('notifications')}
            />
            Enable Notifications
          </label>
        </div>
        
        <div style={{ marginBottom: '1rem' }}>
          <label style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
            <input
              type="checkbox"
              checked={settings.newsletter}
              onChange={() => handleToggle('newsletter')}
            />
            Subscribe to Newsletter
          </label>
        </div>
        
        <div style={{ marginBottom: '1rem' }}>
          <label style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
            <input
              type="checkbox"
              checked={settings.darkMode}
              onChange={() => handleToggle('darkMode')}
            />
            Dark Mode
          </label>
        </div>
        
        <button className="btn" style={{ marginTop: '1rem' }}>
          Save Settings
        </button>
      </div>
    </div>
  );
};

export default ProfileSettings;