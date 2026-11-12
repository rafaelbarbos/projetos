'use client';

import { createContext, useContext, useEffect, useState, type ReactNode } from 'react';
import { useRouter } from 'next/navigation';
import {
  type AuthUser,
  clearAuthToken,
  getAuthToken,
  getCurrentUser,
  saveAuthToken,
} from '@/lib/authApi';

type AuthContextValue = {
  user: AuthUser | null;
  isLoading: boolean;
  login: (token: string, remember: boolean) => Promise<void>;
  logout: () => void;
};

const AuthContext = createContext<AuthContextValue | null>(null);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<AuthUser | null>(null);
  const [isLoading, setIsLoading] = useState(() => Boolean(getAuthToken()));
  const router = useRouter();

  useEffect(() => {
    const token = getAuthToken();
    if (!token) {
      return;
    }

    getCurrentUser(token)
      .then(setUser)
      .catch(() => {
        clearAuthToken();
        setUser(null);
      })
      .finally(() => setIsLoading(false));
  }, []);

  const login = async (token: string, remember: boolean) => {
    saveAuthToken(token, remember);
    const currentUser = await getCurrentUser(token);
    setUser(currentUser);
  };

  const logout = () => {
    clearAuthToken();
    setUser(null);
    router.push('/auth');
  };

  return (
    <AuthContext.Provider value={{ user, isLoading, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth(): AuthContextValue {
  const ctx = useContext(AuthContext);
  if (!ctx) {
    throw new Error('useAuth deve ser usado dentro de um AuthProvider');
  }
  return ctx;
}
