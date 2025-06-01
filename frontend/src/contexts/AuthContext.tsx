"use client";

import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { useRouter } from 'next/navigation';
import { loginUser, logoutUser } from '@/api/authApi';

// User type definition
type User = {
  name: string;
  email: string;
  phone: string;
  location: string;
  country: "CZ" | "SK";
  showCrossCountryListings: boolean;
  currency: "CZK" | "EUR";
} | null;

// Auth context type
type AuthContextType = {
  user: User;
  isAuthenticated: boolean;
  login: (email: string, password?: string, country?: "CZ" | "SK", showCrossCountryListings?: boolean, currency?: "CZK" | "EUR") => Promise<void>;
  logout: () => void;
  updateUserSettings: (settings: { 
    country?: "CZ" | "SK", 
    showCrossCountryListings?: boolean,
    currency?: "CZK" | "EUR"
  }) => void;
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

  // Login function - connects to the backend API
  const login = async (email: string, password?: string, country?: "CZ" | "SK", showCrossCountryListings?: boolean, currency?: "CZK" | "EUR") => {
    setIsLoading(true);
    
    try {
      if (!password) {
        // For demo purposes (social login), use the mock user
        const mockUser = {
          name: "Jan Novák",
          email: email,
          phone: "+420 123 456 789",
          location: "Praha",
          country: country || "CZ",
          showCrossCountryListings: showCrossCountryListings !== undefined ? showCrossCountryListings : true,
          currency: currency || (country === "SK" ? "EUR" : "CZK")
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
      
      // Call the backend API for login
      const response = await loginUser(email, password);
      
      // Create a user object from the response
      const loggedInUser = {
        name: email.split('@')[0], // Temporary name from email
        email: email,
        phone: "",
        location: "",
        country: country || "CZ",
        showCrossCountryListings: showCrossCountryListings !== undefined ? showCrossCountryListings : true,
        currency: currency || (country === "SK" ? "EUR" : "CZK")
      };
      
      // Store user in localStorage
      if (isClient) {
        localStorage.setItem('user', JSON.stringify(loggedInUser));
        
        // Wait a tiny bit to ensure localStorage is fully updated
        setTimeout(() => {
          window.location.href = '/';
        }, 10);
      }
      
      // Update state immediately
      setUser(loggedInUser);
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
      // Call the backend API for logout
      logoutUser().catch(err => console.error('Error during API logout:', err));
      
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
  const updateUserSettings = (settings: { 
    country?: "CZ" | "SK", 
    showCrossCountryListings?: boolean,
    currency?: "CZK" | "EUR"
  }) => {
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