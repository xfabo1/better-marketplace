"use client";

import { useAuth } from "@/contexts/AuthContext";
import Header from "@/components/Header";
import Link from "next/link";
import { useState, useEffect } from "react";

// Mock user data for the profile page
const mockUserData = {
  id: "1",
  name: "Jan Novák",
  email: "jan.novak@example.com",
  phone: "+420 123 456 789",
  registeredAt: "2021-05-15",
  location: "Praha",
  stats: {
    totalListings: 18,
    activeListing: 12,
    soldListings: 6
  }
};

export default function ProfilePage() {
  const { user, isAuthenticated } = useAuth();
  const [userData, setUserData] = useState(mockUserData);

  // In a real app, you would fetch the user data from an API
  useEffect(() => {
    // Simulate API call
    const fetchUserData = async () => {
      // In a real app, you would fetch the user data based on the authenticated user
      // For now, we'll just use the mock data
      setUserData(mockUserData);
    };

    if (isAuthenticated) {
      fetchUserData();
    }
  }, [isAuthenticated]);

  // Format date function
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('cs-CZ', {
      day: 'numeric',
      month: 'long',
      year: 'numeric'
    });
  };

  if (!isAuthenticated) {
    return (
      <div className="flex flex-col min-h-screen bg-gray-50">
        <Header />
        <main className="flex-grow flex items-center justify-center">
          <div className="text-center p-8">
            <h1 className="text-2xl font-medium text-gray-900 mb-4">Přihlaste se pro zobrazení profilu</h1>
            <p className="text-gray-600 mb-6">Pro zobrazení vašeho profilu se musíte nejprve přihlásit.</p>
            <Link
              href="/login"
              className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-primary hover:bg-primary-hover focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary"
            >
              Přihlásit se
            </Link>
          </div>
        </main>
      </div>
    );
  }

  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      <Header />
      
      <main className="flex-grow py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Profile header */}
          <div className="bg-white shadow overflow-hidden sm:rounded-lg mb-6">
            <div className="px-4 py-5 sm:px-6 flex justify-between items-center">
              <div>
                <h1 className="text-2xl font-medium text-gray-900">Profil uživatele</h1>
                <p className="mt-1 max-w-2xl text-sm text-gray-500">
                  Členem od {formatDate(userData.registeredAt)}
                </p>
              </div>
              <Link
                href="/settings"
                className="inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary"
              >
                Upravit profil
              </Link>
            </div>
            <div className="border-t border-gray-200">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-0">
                <div className="px-4 py-4 border-b md:border-b-0 md:border-r border-gray-200">
                  <h3 className="text-base font-medium text-gray-900 mb-3">Osobní údaje</h3>
                  <div className="space-y-3">
                    <div>
                      <p className="text-sm font-medium text-gray-500">Jméno</p>
                      <p className="mt-1 text-sm text-gray-900">{userData.name}</p>
                    </div>
                    <div>
                      <p className="text-sm font-medium text-gray-500">Email</p>
                      <p className="mt-1 text-sm text-gray-900">{userData.email}</p>
                    </div>
                    <div>
                      <p className="text-sm font-medium text-gray-500">Telefon</p>
                      <p className="mt-1 text-sm text-gray-900">{userData.phone}</p>
                    </div>
                    <div>
                      <p className="text-sm font-medium text-gray-500">Lokalita</p>
                      <p className="mt-1 text-sm text-gray-900">{userData.location}</p>
                    </div>
                  </div>
                </div>
                <div className="px-4 py-4">
                  <h3 className="text-base font-medium text-gray-900 mb-3">Statistiky účtu</h3>
                  <div className="space-y-3">
                    <div>
                      <p className="text-sm font-medium text-gray-500">Registrace</p>
                      <p className="mt-1 text-sm text-gray-900">{formatDate(userData.registeredAt)}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          {/* Statistics */}
          <div className="bg-white shadow overflow-hidden sm:rounded-lg">
            <div className="px-4 py-5 sm:px-6">
              <h2 className="text-lg font-medium text-gray-900">Přehled</h2>
              <p className="mt-1 max-w-2xl text-sm text-gray-500">
                Statistiky vašich aktivit na Better Marketplace
              </p>
            </div>
            
            <div className="border-t border-gray-200">
              <div className="p-6">
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h3 className="text-lg font-medium text-gray-900 mb-2">Inzeráty</h3>
                  <div className="grid grid-cols-3 gap-4">
                    <div>
                      <p className="text-sm text-gray-500">Celkem</p>
                      <p className="text-2xl font-bold text-gray-900">{userData.stats.totalListings}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Aktivní</p>
                      <p className="text-2xl font-bold text-gray-900">{userData.stats.activeListing}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Prodané</p>
                      <p className="text-2xl font-bold text-gray-900">{userData.stats.soldListings}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
} 