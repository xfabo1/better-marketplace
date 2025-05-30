"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { useLanguage } from "@/contexts/LanguageContext";
import LanguageSwitcher from "./LanguageSwitcher";

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const { user, isAuthenticated, logout } = useAuth();
  const { t } = useLanguage();

  // Only run client-side
  useEffect(() => {
    setMounted(true);
  }, []);

  const handleLogout = () => {
    logout();
    setIsUserMenuOpen(false);
  };

  // Show a simplified header during server-rendering to avoid hydration mismatch
  if (!mounted) {
    return (
      <header className="bg-white border-b border-gray-100 sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex items-center">
              <Link href="/" className="flex-shrink-0 flex items-center">
                <span className="text-2xl font-bold text-primary">Better Marketplace</span>
              </Link>
              <div className="ml-4">
                <LanguageSwitcher />
              </div>
            </div>
          </div>
        </div>
      </header>
    );
  }

  return (
    <header className="bg-white border-b border-gray-100 sticky top-0 z-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link href="/" className="flex-shrink-0 flex items-center">
              <span className="text-2xl font-bold text-primary">Better Marketplace</span>
            </Link>
            <div className="ml-4">
              <LanguageSwitcher />
            </div>
          </div>
          
          <div className="hidden sm:ml-6 sm:flex sm:items-center space-x-4">
            <Link href="/listings" className="text-gray-600 hover:text-primary px-3 py-2 text-sm font-medium">
              {t('browse')}
            </Link>
            
            {isAuthenticated && (
              <Link href="/sell" className="text-gray-600 hover:text-primary px-3 py-2 text-sm font-medium">
                {t('sell')}
              </Link>
            )}
            
            {isAuthenticated ? (
              <div className="flex items-center space-x-4">
                <Link href="/my-listings" className="text-gray-600 hover:text-primary px-3 py-2 text-sm font-medium">
                  {t('my_listings')}
                </Link>
                
                {/* User dropdown menu */}
                <div className="relative ml-3">
                  <div>
                    <button
                      type="button"
                      className="flex items-center text-gray-600 hover:text-primary px-3 py-2 text-sm font-medium focus:outline-none"
                      onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
                    >
                      <span>{user?.name}</span>
                      <svg className="ml-1 h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                      </svg>
                    </button>
                  </div>
                  
                  {isUserMenuOpen && (
                    <div className="origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5">
                      <div className="py-1" role="menu" aria-orientation="vertical">
                        <Link 
                          href="/profile" 
                          className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                          onClick={() => setIsUserMenuOpen(false)}
                        >
                          {t('profile')}
                        </Link>
                        <Link 
                          href="/settings" 
                          className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                          onClick={() => setIsUserMenuOpen(false)}
                        >
                          {t('settings')}
                        </Link>
                        <button 
                          className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                          onClick={handleLogout}
                        >
                          {t('logout')}
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            ) : (
              <div className="flex items-center space-x-3">
                <Link 
                  href="/login" 
                  className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-primary hover:bg-primary-hover focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary"
                >
                  {t('login')}
                </Link>
                <Link 
                  href="/register" 
                  className="inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-primary bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary"
                >
                  {t('register')}
                </Link>
              </div>
            )}
          </div>
          
          <div className="sm:hidden flex items-center">
            <button
              type="button"
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-primary"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              <span className="sr-only">{t('open_menu')}</span>
              {isMenuOpen ? (
                <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              ) : (
                <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              )}
            </button>
          </div>
        </div>
      </div>
      
      {isMenuOpen && (
        <div className="sm:hidden border-t border-gray-100">
          <div className="pt-2 pb-3 space-y-1">
            <div className="px-4 py-2">
              <LanguageSwitcher />
            </div>
            <Link 
              href="/listings" 
              className="block px-4 py-2 text-base font-medium text-gray-600 hover:text-primary hover:bg-gray-50"
            >
              {t('browse')}
            </Link>
            
            {isAuthenticated && (
              <Link 
                href="/sell" 
                className="block px-4 py-2 text-base font-medium text-gray-600 hover:text-primary hover:bg-gray-50"
              >
                {t('sell')}
              </Link>
            )}
            
            {isAuthenticated ? (
              <>
                <Link 
                  href="/my-listings" 
                  className="block px-4 py-2 text-base font-medium text-gray-600 hover:text-primary hover:bg-gray-50"
                >
                  {t('my_listings')}
                </Link>
                <div className="border-t border-gray-100 pt-2">
                  <div className="px-4 py-2 text-base font-medium text-gray-900">
                    {user?.name}
                  </div>
                  <Link 
                    href="/profile" 
                    className="block px-4 py-2 text-base font-medium text-gray-600 hover:text-primary hover:bg-gray-50"
                  >
                    {t('profile')}
                  </Link>
                  <Link 
                    href="/settings" 
                    className="block px-4 py-2 text-base font-medium text-gray-600 hover:text-primary hover:bg-gray-50"
                  >
                    {t('settings')}
                  </Link>
                  <button 
                    className="block w-full text-left px-4 py-2 text-base font-medium text-gray-600 hover:text-primary hover:bg-gray-50"
                    onClick={handleLogout}
                  >
                    {t('logout')}
                  </button>
                </div>
              </>
            ) : (
              <>
                <Link 
                  href="/login" 
                  className="block px-4 py-2 text-base font-medium text-primary hover:bg-gray-50"
                >
                  {t('login')}
                </Link>
                <Link 
                  href="/register" 
                  className="block px-4 py-2 text-base font-medium text-gray-600 hover:text-primary hover:bg-gray-50"
                >
                  {t('register')}
                </Link>
              </>
            )}
          </div>
        </div>
      )}
    </header>
  );
} 