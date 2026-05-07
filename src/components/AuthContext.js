import { createContext, useState, useEffect } from 'react';

export const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => {
    const token = localStorage.getItem('token');
    const role = localStorage.getItem('role');
    return token ? { token, role } : null;
  });

  useEffect(() => {
    if (user) {
      localStorage.setItem('token', user.token);
      localStorage.setItem('role', user.role);
    } else {
      localStorage.removeItem('token');
      localStorage.removeItem('role');
    }
  }, [user]);

  return (
    <AuthContext.Provider value={{ user, setUser }}>
      {children}
    </AuthContext.Provider>
  );
}
