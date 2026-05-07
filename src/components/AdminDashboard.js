import { useEffect, useState, useContext } from 'react';
import { AuthContext } from './AuthContext';

export default function AdminDashboard() {
  const { user, setUser } = useContext(AuthContext);
  const [users, setUsers] = useState([]);
  const [error, setError] = useState('');

  const backendPort = process.env.REACT_APP_API_PORT || 5000;
  const backendUrl = `http://localhost:${backendPort}`;

  useEffect(() => {
    fetch(`${backendUrl}/api/users`, {
      headers: { Authorization: `Bearer ${user.token}` }
    })
      .then(res => res.json())
      .then(data => setUsers(data))
      .catch(() => setError('Failed to load users'));
  }, [user, backendUrl]);

  const handleLogout = () => {
    setUser(null);
  };

  return (
    <div style={{ maxWidth: 800, margin: '2rem auto' }}>
      <h2>Admin Dashboard</h2>
      <button onClick={handleLogout} style={{ float: 'right' }}>Logout</button>
      <h3>All Users</h3>
      {error && <div style={{ color: 'red' }}>{error}</div>}
      <table border="1" cellPadding="8" style={{ width: '100%', marginTop: 16 }}>
        <thead>
          <tr><th>Email</th><th>Role</th></tr>
        </thead>
        <tbody>
          {users.map(u => (
            <tr key={u._id}><td>{u.email}</td><td>{u.role}</td></tr>
          ))}
        </tbody>
      </table>
      {/* Add import/export, user management, and data visualization here */}
    </div>
  );
}
