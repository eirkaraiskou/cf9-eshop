import { useState } from 'react';
import { jwtDecode } from 'jwt-decode';
import { AuthContext } from '../auth/AuthContext';
import type { JwtPayload } from '../auth/AuthContext';
import { mergeGuestCart } from "../services/cartService";

// ✅ Helper
const getUserFromToken = (): JwtPayload | null => {
  const token = localStorage.getItem('token');
  if (!token) return null;

  try {
    const decoded = jwtDecode<JwtPayload>(token);

    if (decoded.exp * 1000 > Date.now()) {
      return decoded;
    } else {
      localStorage.removeItem('token');
      return null;
    }
  } catch {
    localStorage.removeItem('token');
    return null;
  }
};

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<JwtPayload | null>(() => getUserFromToken());

  const login = async (token: string) => {
    localStorage.setItem('token', token);
    const decoded = jwtDecode<JwtPayload>(token);
    setUser(decoded);

    // Merge cart if user started as guest and then logged in
    await mergeGuestCart();
  };

  const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('email');
    localStorage.removeItem('username');
    localStorage.removeItem('firstName');
    localStorage.removeItem('lastName');
    setUser(null);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isLoggedIn: !!user,
        isAdmin: user?.role === 'ROLE_ADMIN',
        login,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};