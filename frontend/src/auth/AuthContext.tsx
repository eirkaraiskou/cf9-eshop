import { createContext } from 'react';

export interface JwtPayload {
  firstName: string; 
  lastName: string;
  username: string;
  role: 'ROLE_USER' | 'ROLE_ADMIN';
  exp: number;
}

export interface AuthContextType {
  user: JwtPayload | null;
  isLoggedIn: boolean;
  isAdmin: boolean;
  login: (token: string) => void;
  logout: () => void;
}

export const AuthContext = createContext<AuthContextType | null>(null);