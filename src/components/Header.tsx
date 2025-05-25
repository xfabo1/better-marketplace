"use client";

import Link from "next/link";
import { useState } from "react";

// Temporary authentication state (in a real app, this would come from a proper auth system)
const isLoggedIn = false;

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="bg-white border-b border-gray-100 sticky top-0 z-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link href="/" className="flex-shrink-0 flex items-center">
              <span className="text-2xl font-bold text-primary">Lepší Tržiště</span>
            </Link>
          </div>
          
          <div className="hidden sm:ml-6 sm:flex sm:items-center space-x-4">
            <Link href="/listings" className="text-gray-600 hover:text-primary px-3 py-2 text-sm font-medium">
              Procházet
            </Link>
            
            {isLoggedIn && (
              <Link href="/sell" className="text-gray-600 hover:text-primary px-3 py-2 text-sm font-medium">
                Prodat
              </Link>
            )}
            
            {isLoggedIn ? (
              <div className="flex items-center space-x-4">
                <Link href="/account" className="text-gray-600 hover:text-primary px-3 py-2 text-sm font-medium">
                  Můj účet
                </Link>
                <button 
                  className="text-gray-600 hover:text-primary px-3 py-2 text-sm font-medium"
                  onClick={() => console.log("Logout clicked")}
                >
                  Odhlásit
                </button>
              </div>
            ) : (
              <Link 
                href="/login" 
                className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-primary hover:bg-primary-hover focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary"
              >
                Přihlásit
              </Link>
            )}
          </div>
          
          <div className="flex items-center sm:hidden">
            <button
              type="button"
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-primary"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              <span className="sr-only">Otevřít menu</span>
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
            <Link 
              href="/listings" 
              className="block px-4 py-2 text-base font-medium text-gray-600 hover:text-primary hover:bg-gray-50"
            >
              Procházet
            </Link>
            
            {isLoggedIn && (
              <Link 
                href="/sell" 
                className="block px-4 py-2 text-base font-medium text-gray-600 hover:text-primary hover:bg-gray-50"
              >
                Prodat
              </Link>
            )}
            
            {isLoggedIn ? (
              <>
                <Link 
                  href="/account" 
                  className="block px-4 py-2 text-base font-medium text-gray-600 hover:text-primary hover:bg-gray-50"
                >
                  Můj účet
                </Link>
                <button 
                  className="block w-full text-left px-4 py-2 text-base font-medium text-gray-600 hover:text-primary hover:bg-gray-50"
                  onClick={() => console.log("Logout clicked")}
                >
                  Odhlásit
                </button>
              </>
            ) : (
              <Link 
                href="/login" 
                className="block px-4 py-2 text-base font-medium text-primary hover:bg-gray-50"
              >
                Přihlásit
              </Link>
            )}
          </div>
        </div>
      )}
    </header>
  );
} 