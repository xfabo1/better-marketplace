"use client";

import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { useRouter } from 'next/navigation';

// User type definition
type User = {
  name: string;
  email: string;
  phone: string;
  location: string;
  country: "cz" | "sk";
  showCrossCountryListings: boolean;
} | null;

// Auth context type
type AuthContextType = {
  user: User;
  isAuthenticated: boolean;
  login: (email: string, password?: string, country?: "cz" | "sk", showCrossCountryListings?: boolean) => Promise<void>;
  logout: () => void;
  updateUserSettings: (settings: { country?: "cz" | "sk", showCrossCountryListings?: boolean }) => void;
  isLoading: boolean;
};

// Create context with default values
const AuthContext = createContext<AuthContextType>({
  user: null,
  isAuthenticated: false,
  login: async () => {},
  logout: () => {},
  updateUserSettings: () => {},
  isLoading: true,
});

// Auth provider props
type AuthProviderProps = {
  children: ReactNode;
};

// Auth provider component
export function AuthProvider({ children }: AuthProviderProps) {
  const [user, setUser] = useState<User>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isClient, setIsClient] = useState(false);
  const router = useRouter();

  // First, set isClient to true when component mounts (client-side only)
  useEffect(() => {
    setIsClient(true);
    
    // Check if user is already logged in, but only on the client
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

  // Login function - accepts any credentials and logs in as Jan Novák
  const login = async (email: string, password?: string, country?: "cz" | "sk", showCrossCountryListings?: boolean) => {
    setIsLoading(true);
    
    try {
      // For demo purposes, always log in as Jan Novák regardless of credentials
      const mockUser = {
        name: "Jan Novák",
        email: email, // Use the provided email
        phone: "+420 123 456 789",
        location: "Praha",
        country: country || "cz", // Default to Czech Republic if not provided
        showCrossCountryListings: showCrossCountryListings !== undefined ? showCrossCountryListings : true // Default to true if not provided
      };
      
      // Only access localStorage on the client
      if (isClient) {
        // Store user in localStorage
        localStorage.setItem('user', JSON.stringify(mockUser));
        
        // Wait a tiny bit to ensure localStorage is fully updated
        setTimeout(() => {
          window.location.href = '/';
        }, 10);
      }
      
      // Update state immediately
      setUser(mockUser);
    } catch (error) {
      console.error('Login error:', error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  // Logout function
  const logout = () => {
    try {
      // Only access localStorage on the client
      if (isClient) {
        // Remove user from localStorage
        localStorage.removeItem('user');
        
        // Add small delay to ensure changes are applied before navigation
        setTimeout(() => {
          // Use window.location for a full page reload
          window.location.href = '/';
        }, 10);
      }
      
      // Update state immediately
      setUser(null);
    } catch (error) {
      console.error('Logout error:', error);
    }
  };

  // Update user settings function
  const updateUserSettings = (settings: { country?: "cz" | "sk", showCrossCountryListings?: boolean }) => {
    if (!user) return;

    try {
      // Only access localStorage on the client
      if (isClient) {
        const updatedUser = {
          ...user,
          ...settings
        };
        
        // Store updated user in localStorage
        localStorage.setItem('user', JSON.stringify(updatedUser));
        
        // Update state
        setUser(updatedUser);
      }
    } catch (error) {
      console.error('Error updating user settings:', error);
    }
  };

  // Context value
  const value = {
    user,
    isAuthenticated: !!user,
    login,
    logout,
    updateUserSettings,
    isLoading,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

// Custom hook to use auth context
export const useAuth = () => useContext(AuthContext); 