import { useContext, useState } from 'react';
import { AuthContext } from './AuthContext';

export default function UserDashboard() {
  const { setUser } = useContext(AuthContext);
  const [error, setError] = useState('');

  const handleLogout = () => {
    setUser(null);
  };

  return (
    <div style={{ maxWidth: 600, margin: '2rem auto' }}>
      <h2>User Dashboard</h2>
      <button onClick={handleLogout} style={{ float: 'right' }}>Logout</button>
      {/* Add import/export, user data management here */}
      <div>Welcome! You can import/export and manage your own data here.</div>
      {error && <div style={{ color: 'red' }}>{error}</div>}
    </div>
  );
}
