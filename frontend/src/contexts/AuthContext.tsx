"use client";

import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { useRouter } from 'next/navigation';
import { loginUser, logoutUser } from '@/api/authApi';
import { useLanguage } from './LanguageContext';

type User = {
  name: string;
  email: string;
  country: "CZ" | "SK";
  showCrossCountryListings: boolean;
} | null;

type AuthContextType = {
  user: User;
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
  updateUserSettings: (settings: { 
    country?: "CZ" | "SK", 
    showCrossCountryListings?: boolean
  }) => void;
  isLoading: boolean;
  handleAuthError: (error: unknown) => void;
};

const AuthContext = createContext<AuthContextType>({
  user: null,
  isAuthenticated: false,
  login: async () => {},
  logout: () => {},
  updateUserSettings: () => {},
  isLoading: true,
  handleAuthError: () => {},
});

type AuthProviderProps = {
  children: ReactNode;
};

export function AuthProvider({ children }: AuthProviderProps) {
  const [user, setUser] = useState<User>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isClient, setIsClient] = useState(false);
  const router = useRouter();
  const { t } = useLanguage();

  useEffect(() => {
    setIsClient(true);
    
    try {
      const storedUser = localStorage.getItem('user');
      if (storedUser) {
        setUser(JSON.parse(storedUser));
      }
    } catch (error) {
      console.error('Error checking authentication:', error);
    } finally {
      setIsLoading(false);
    }
  }, []);

  const handleAuthError = (error: unknown) => {
    if (error && typeof error === 'object' && 'message' in error) {
      const errorObj = error as { message: string };
      
      if (errorObj.message.includes('401') || errorObj.message.includes('unauthorized') || errorObj.message.includes('invalid_credentials')) {
        setUser(null);
        if (isClient) {
          localStorage.removeItem('user');
        }
        
        if (window.location.pathname !== '/login') {
          router.push('/login');
        }
      }
    }
  };

  const login = async (email: string, password: string) => {
    setIsLoading(true);
    
    try {
      const loggedInUser: User = await loginUser(email, password, t);
      
      if (isClient) {
        localStorage.setItem('user', JSON.stringify(loggedInUser));
        
        setTimeout(() => {
          window.location.href = '/';
        }, 10);
      }
      
      setUser(loggedInUser);
    } catch (error) {
      handleAuthError(error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const logout = () => {
    try {
      logoutUser(t).catch(err => {
        handleAuthError(err);
      });
      
      if (isClient) {
        localStorage.removeItem('user');
        
        setTimeout(() => {
          window.location.href = '/';
        }, 10);
      }
      
      setUser(null);
    } catch (error) {
      handleAuthError(error);
    }
  };

  const updateUserSettings = (settings: { 
    country?: "CZ" | "SK", 
    showCrossCountryListings?: boolean
  }) => {
    if (!user) return;

    try {
      if (isClient) {
        const updatedUser = {
          ...user,
          ...settings
        };
        
        localStorage.setItem('user', JSON.stringify(updatedUser));
        
        setUser(updatedUser);
      }
    } catch (error) {
      console.error('Error updating user settings:', error);
      handleAuthError(error);
    }
  };

  const value = {
    user,
    isAuthenticated: !!user,
    login,
    logout,
    updateUserSettings,
    isLoading,
    handleAuthError,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export const useAuth = () => useContext(AuthContext); 