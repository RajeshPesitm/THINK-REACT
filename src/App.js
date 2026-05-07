import { useContext, useState } from 'react';
import { AuthProvider, AuthContext } from './components/AuthContext';
import Login from './components/Login';
import Register from './components/Register';
import AdminDashboard from './components/AdminDashboard';
import UserDashboard from './components/UserDashboard';

function MainApp() {
  const { user } = useContext(AuthContext);
  const [showRegister, setShowRegister] = useState(false);

  if (!user) {
    return showRegister ? (
      <Register onRegister={() => setShowRegister(false)} />
    ) : (
      <>
        <Login onLogin={() => {}} />
        <div style={{ textAlign: 'center', marginTop: 8 }}>
          <button onClick={() => setShowRegister(true)}>Register as User</button>
        </div>
      </>
    );
  }

  if (user.role === 'admin') {
    return <AdminDashboard />;
  }
  return <UserDashboard />;
}

export default function App() {
  return (
    <AuthProvider>
      <MainApp />
    </AuthProvider>
  );
}