"use client";

import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { useRouter } from 'next/navigation';
import { loginUser, logoutUser } from '@/api/authApi';
import { useLanguage } from '@/contexts/LanguageContext';

type User = {
  name: string;
  email: string;
  phone: string;
} | null;

type AuthContextType = {
  user: User;
  isAuthenticated: boolean;
  login: (email: string, password?: string) => Promise<void>;
  logout: () => void;
  isLoading: boolean;
  handleAuthError: (error: unknown) => void;
};

const AuthContext = createContext<AuthContextType>({
  user: null,
  isAuthenticated: false,
  login: async () => {},
  logout: () => {},
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
    const httpError = error as { status?: number; response?: { status?: number } } | null | undefined;
    if (httpError?.response?.status === 401 || httpError?.status === 401) {
      setUser(null);
      if (isClient) {
        localStorage.removeItem('user');
      }
      
      alert(t('auth_error_message') || "Authentication error occurred. Please log in again. If the problem persists, there might be an issue on our side.");
      
      router.push('/login');
    }
  };

  const login = async (email: string, password?: string) => {
    setIsLoading(true);
    
    try {
      if (!password) {
        // For demo purposes (social login), use the mock user
        const mockUser = {
          name: "Jan Novák",
          email: email,
          phone: "+420 123 456 789",
        };
        
        if (isClient) {
          localStorage.setItem('user', JSON.stringify(mockUser));
          setTimeout(() => {
            window.location.href = '/';
          }, 10);
        }
        
        setUser(mockUser);
        return;
      }
      
      await loginUser(email, password);
      
      const loggedInUser = {
        name: email.split('@')[0], // Temporary name from email
        email: email,
        phone: "",
      };
      
      if (isClient) {
        localStorage.setItem('user', JSON.stringify(loggedInUser));
        
        setTimeout(() => {
          window.location.href = '/';
        }, 10);
      }
      
      setUser(loggedInUser);
    } catch (error) {
      // A 401 here means wrong credentials, not an expired session, so the login page shows the error itself
      console.error('Login error:', error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const logout = () => {
    try {
      logoutUser().catch(err => {
        console.error('Error during API logout:', err);
        handleAuthError(err);
      });
      
      if (isClient) {
        localStorage.removeItem('user');
        
        setTimeout(() => {
          // Use window.location for a full page reload
          window.location.href = '/';
        }, 10);
      }
      
      setUser(null);
    } catch (error) {
      console.error('Logout error:', error);
      handleAuthError(error);
    }
  };

  const value = {
    user,
    isAuthenticated: !!user,
    login,
    logout,
    isLoading,
    handleAuthError,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export const useAuth = () => useContext(AuthContext); 