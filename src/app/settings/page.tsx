"use client";

import { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import Header from "@/components/Header";

export default function SettingsPage() {
  const searchParams = useSearchParams();
  const [activeTab, setActiveTab] = useState<'profile' | 'security'>('profile');
  
  // Set active tab based on URL parameter if present
  useEffect(() => {
    const tab = searchParams.get('tab');
    if (tab === 'security') {
      setActiveTab('security');
    } else {
      setActiveTab('profile');
    }
  }, [searchParams]);
  
  // Mock user data
  const [userData, setUserData] = useState({
    email: "jan.novak@example.com",
    phone: "+420 123 456 789",
    location: "Praha"
  });

  const handleProfileSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Here you would call your API to update the user profile
    console.log("Profile update submitted:", userData);
    alert("Profil byl úspěšně aktualizován!");
  };

  const handlePasswordSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Here you would call your API to update the password
    console.log("Password update submitted");
    alert("Heslo bylo úspěšně změněno!");
  };

  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      <Header />
      
      <main className="flex-grow py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-2xl font-medium text-gray-900 mb-6">
            Nastavení účtu
          </h1>
          
          <div className="bg-white shadow overflow-hidden sm:rounded-lg">
            <div className="border-b border-gray-200">
              <nav className="flex">
                <button
                  onClick={() => setActiveTab('profile')}
                  className={`px-6 py-4 text-sm font-medium whitespace-nowrap ${
                    activeTab === 'profile'
                      ? 'border-b-2 border-primary text-primary'
                      : 'text-gray-500 hover:text-gray-700 hover:border-gray-300'
                  }`}
                >
                  Osobní údaje
                </button>
                <button
                  onClick={() => setActiveTab('security')}
                  className={`px-6 py-4 text-sm font-medium whitespace-nowrap ${
                    activeTab === 'security'
                      ? 'border-b-2 border-primary text-primary'
                      : 'text-gray-500 hover:text-gray-700 hover:border-gray-300'
                  }`}
                >
                  Zabezpečení
                </button>
              </nav>
            </div>
            
            <div className="p-6">
              {activeTab === 'profile' && (
                <div>
                  <h2 className="text-xl font-medium text-gray-900 mb-6">Osobní údaje</h2>
                  <form onSubmit={handleProfileSubmit} className="space-y-6 max-w-2xl">
                    <div className="mb-4">
                      <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                        E-mail
                      </label>
                      <input
                        type="email"
                        id="email"
                        className="block w-full px-4 py-3 rounded-md border border-gray-300 shadow-sm text-gray-900 focus:border-primary focus:outline-none sm:text-sm"
                        value={userData.email}
                        onChange={(e) => setUserData({...userData, email: e.target.value})}
                      />
                    </div>
                    
                    <div className="mb-4">
                      <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">
                        Telefon
                      </label>
                      <input
                        type="tel"
                        id="phone"
                        className="block w-full px-4 py-3 rounded-md border border-gray-300 shadow-sm text-gray-900 focus:border-primary focus:outline-none sm:text-sm"
                        value={userData.phone}
                        onChange={(e) => setUserData({...userData, phone: e.target.value})}
                      />
                    </div>
                    
                    <div className="mb-4">
                      <label htmlFor="location" className="block text-sm font-medium text-gray-700 mb-1">
                        Lokalita
                      </label>
                      <input
                        type="text"
                        id="location"
                        className="block w-full px-4 py-3 rounded-md border border-gray-300 shadow-sm text-gray-900 focus:border-primary focus:outline-none sm:text-sm"
                        value={userData.location}
                        onChange={(e) => setUserData({...userData, location: e.target.value})}
                      />
                    </div>
                    
                    <div className="pt-4">
                      <button
                        type="submit"
                        className="w-full sm:w-auto inline-flex justify-center py-3 px-6 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-primary hover:bg-primary-hover focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary transition-colors"
                      >
                        Uložit změny
                      </button>
                    </div>
                  </form>
                </div>
              )}
              
              {activeTab === 'security' && (
                <div>
                  <h2 className="text-xl font-medium text-gray-900 mb-6">Zabezpečení</h2>
                  <form onSubmit={handlePasswordSubmit} className="space-y-6 max-w-2xl">
                    <div className="mb-4">
                      <label htmlFor="current-password" className="block text-sm font-medium text-gray-700 mb-1">
                        Současné heslo
                      </label>
                      <input
                        type="password"
                        id="current-password"
                        className="block w-full px-4 py-3 rounded-md border border-gray-300 shadow-sm text-gray-900 focus:border-primary focus:outline-none sm:text-sm"
                      />
                    </div>
                    
                    <div className="mb-4">
                      <label htmlFor="new-password" className="block text-sm font-medium text-gray-700 mb-1">
                        Nové heslo
                      </label>
                      <input
                        type="password"
                        id="new-password"
                        className="block w-full px-4 py-3 rounded-md border border-gray-300 shadow-sm text-gray-900 focus:border-primary focus:outline-none sm:text-sm"
                      />
                    </div>
                    
                    <div className="mb-4">
                      <label htmlFor="confirm-password" className="block text-sm font-medium text-gray-700 mb-1">
                        Potvrdit nové heslo
                      </label>
                      <input
                        type="password"
                        id="confirm-password"
                        className="block w-full px-4 py-3 rounded-md border border-gray-300 shadow-sm text-gray-900 focus:border-primary focus:outline-none sm:text-sm"
                      />
                    </div>
                    
                    <div className="pt-4">
                      <button
                        type="submit"
                        className="w-full sm:w-auto inline-flex justify-center py-3 px-6 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-primary hover:bg-primary-hover focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary transition-colors"
                      >
                        Změnit heslo
                      </button>
                    </div>
                  </form>
                </div>
              )}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
} 