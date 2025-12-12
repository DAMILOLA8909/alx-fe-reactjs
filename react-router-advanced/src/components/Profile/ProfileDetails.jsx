import { useAuth } from '../../context/AuthContext';

const ProfileDetails = () => {
  const { user } = useAuth();

  return (
    <div className="card">
      <h2>Profile Details</h2>
      <div style={{ marginTop: '1rem' }}>
        <p><strong>Name:</strong> {user?.name}</p>
        <p><strong>Email:</strong> {user?.email}</p>
        <p><strong>User ID:</strong> {user?.id}</p>
        <p><strong>Role:</strong> {user?.role}</p>
      </div>
    </div>
  );
};

export default ProfileDetails;