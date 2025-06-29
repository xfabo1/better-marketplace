"use client";

import { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { loginUser, logoutUser } from "@/api/authApi";

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
    country?: "CZ" | "SK";
    showCrossCountryListings?: boolean;
  }) => void;
};

const AuthContext = createContext<AuthContextType>({
  user: null,
  isAuthenticated: false,
  login: async () => {},
  logout: () => {},
  updateUserSettings: () => {},
});

type AuthProviderProps = {
  children: ReactNode;
};

export function AuthProvider({ children }: AuthProviderProps) {
  const [user, setUser] = useState<User>(null);
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
      const storedUser = localStorage.getItem("user");
      if (storedUser) {
        setUser(JSON.parse(storedUser));
      }
  }, []);

  const login = async (email: string, password: string) => {
    try {
      const loggedInUser: User = await loginUser(email, password);

      if (isClient) {
        localStorage.setItem("user", JSON.stringify(loggedInUser));

        setTimeout(() => {
          window.location.href = "/";
        }, 10);
      }

      setUser(loggedInUser);
    } catch (error) {
      throw error;
    } finally {
    }
  };

  const logout = () => {
    try {
      logoutUser();

      if (isClient) {
        localStorage.removeItem("user");

        setTimeout(() => {
          window.location.href = "/";
        }, 10);
      }

      setUser(null);
    } catch (error) {}
  };

  const updateUserSettings = (settings: {
    country?: "CZ" | "SK";
    showCrossCountryListings?: boolean;
  }) => {
    if (!user) return;

    try {
      if (isClient) {
        const updatedUser = {
          ...user,
          ...settings,
        };

        localStorage.setItem("user", JSON.stringify(updatedUser));

        setUser(updatedUser);
      }
    } catch (error) {
      console.error("Error updating user settings:", error);
    }
  };

  const value = {
    user,
    isAuthenticated: !!user,
    login,
    logout,
    updateUserSettings,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export const useAuth = () => useContext(AuthContext);
