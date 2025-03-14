'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import PasswordGenerator from './components/PasswordGenerator';
import SavedPasswords from './components/SavedPasswords';
import { useAuth } from './context/AuthContext';

export default function Home() {
  const { user, logout } = useAuth();
  const [showSavedPasswords, setShowSavedPasswords] = useState(false);

  // Automatically show saved passwords when the user is logged in
  useEffect(() => {
    if (user) {
      setShowSavedPasswords(true);
    } else {
      setShowSavedPasswords(false);
    }
  }, [user]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 relative overflow-hidden">
      {/* Enhanced Decorative Elements */}
      <div className="absolute top-20 left-10 w-72 h-72 bg-blue-200 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob"></div>
      <div className="absolute top-40 right-10 w-72 h-72 bg-purple-200 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-2000"></div>
      <div className="absolute -bottom-8 left-1/3 w-72 h-72 bg-pink-200 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-4000"></div>
      <div className="absolute top-1/2 right-1/4 w-56 h-56 bg-green-200 rounded-full mix-blend-multiply filter blur-xl opacity-60 animate-blob animation-delay-3000"></div>
      
      {/* Light patterns for texture */}
      <div className="absolute inset-0 opacity-30 bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI1IiBoZWlnaHQ9IjUiPgo8cmVjdCB3aWR0aD0iNSIgaGVpZ2h0PSI1IiBmaWxsPSIjZmZmIj48L3JlY3Q+CjxyZWN0IHdpZHRoPSIxIiBoZWlnaHQ9IjEiIGZpbGw9IiNmOGY4ZjgiPjwvcmVjdD4KPC9zdmc+')]"></div>

      {/* Navigation Bar with Glassmorphism */}
      <nav className="sticky top-0 z-50 backdrop-blur-md bg-white/70 border-b border-white/20 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16 items-center">
            <Link href="/" className="flex items-center space-x-2 group">
              <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-full p-2 shadow-md transform group-hover:scale-110 transition-all duration-300">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 7a2 2 0 012 2m4 0a6 6 0 01-7.743 5.743L11 17H9v2H7v2H4a1 1 0 01-1-1v-2.586a1 1 0 01.293-.707l5.964-5.964A6 6 0 1121 9z" />
                </svg>
              </div>
              <span className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent group-hover:from-purple-600 group-hover:to-blue-600 transition-all duration-300">
                Unbreakapass
              </span>
            </Link>

            <div className="flex items-center space-x-4">
              <Link 
                href="/tips" 
                className="relative px-4 py-2 rounded-md text-gray-700 hover:text-blue-600 font-medium transition-all duration-200 overflow-hidden group"
              >
                <span className="relative z-10">Tips</span>
                <div className="absolute inset-0 bg-blue-100 scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left rounded-md"></div>
              </Link>
              
              {user ? (
                <button
                  onClick={logout}
                  className="relative inline-flex items-center px-5 py-2 bg-white border border-blue-200 rounded-lg text-blue-600 hover:bg-blue-50 hover:border-blue-300 transition-all duration-300 shadow-sm hover:shadow group"
                >
                  <svg className="w-4 h-4 mr-2 transform group-hover:rotate-12 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                  </svg>
                  <span>Logout</span>
                </button>
              ) : (
                <Link
                  href="/auth"
                  className="relative inline-flex items-center px-5 py-2 overflow-hidden rounded-lg text-white shadow-md group"
                >
                  <span className="absolute inset-0 bg-gradient-to-r from-blue-500 to-purple-500 group-hover:from-blue-600 group-hover:to-purple-600 transition-all duration-300"></span>
                  <span className="absolute inset-0 bg-gradient-to-r from-blue-600 to-purple-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300 scale-105 blur-xl"></span>
                  <svg className="relative z-10 w-4 h-4 mr-2 transform group-hover:translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1" />
                  </svg>
                  <span className="relative z-10">Login</span>
                </Link>
              )}
            </div>
          </div>
        </div>
      </nav>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 relative">
        <div className="text-center mb-20">
          <h1 className="text-6xl font-extrabold mb-6 leading-tight animate-fade-in">
            <span className="bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 bg-clip-text text-transparent inline-block">
              Secure Password Generator
            </span>
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto leading-relaxed animate-fade-in font-light" style={{ animationDelay: '200ms' }}>
            Generate strong, unique passwords for all your accounts with our advanced password generator.
            Protect your online identity with passwords that even the most advanced hackers cannot crack.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          <div className="lg:col-span-8">
            <div className="bg-white/80 backdrop-blur-md rounded-2xl shadow-xl p-8 transform hover:scale-[1.01] transition-all duration-500 border border-white/20 animate-fade-in relative overflow-hidden" style={{ animationDelay: '400ms' }}>
              {/* Subtle pattern background for card */}
              <div className="absolute inset-0 bg-gradient-to-br from-blue-50/40 to-purple-50/40 opacity-70"></div>
              {/* Glowing accent */}
              <div className="absolute -top-10 -right-10 w-40 h-40 bg-blue-400 rounded-full opacity-10 blur-2xl"></div>
              
              <div className="relative z-10">
                <PasswordGenerator />
              </div>
            </div>
          </div>
          
          <div className="lg:col-span-4">
            {user ? (
              <div className="bg-white/80 backdrop-blur-md rounded-2xl shadow-xl p-8 transform hover:scale-[1.01] transition-all duration-500 border border-white/20 animate-fade-in relative overflow-hidden" style={{ animationDelay: '600ms' }}>
                {/* Subtle pattern background for card */}
                <div className="absolute inset-0 bg-gradient-to-br from-purple-50/40 to-blue-50/40 opacity-70"></div>
                {/* Glowing accent */}
                <div className="absolute -top-10 -left-10 w-40 h-40 bg-purple-400 rounded-full opacity-10 blur-2xl"></div>
                
                <div className="relative z-10">
                  <h2 className="text-2xl font-bold mb-6 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent flex items-center">
                    <svg className="w-5 h-5 mr-2 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                    </svg>
                    Saved Passwords
                  </h2>
                  <SavedPasswords />
                </div>
              </div>
            ) : (
              <div className="bg-white/80 backdrop-blur-md rounded-2xl shadow-xl p-8 text-center border border-white/20 animate-fade-in relative overflow-hidden" style={{ animationDelay: '600ms' }}>
                {/* Subtle pattern background for card */}
                <div className="absolute inset-0 bg-gradient-to-br from-purple-50/40 to-blue-50/40 opacity-70"></div>
                {/* Glowing accent */}
                <div className="absolute -bottom-10 -right-10 w-40 h-40 bg-purple-400 rounded-full opacity-10 blur-2xl"></div>
                
                <div className="relative z-10">
                  <div className="relative w-24 h-24 mx-auto mb-6 group">
                    <div className="absolute inset-0 bg-gradient-to-br from-blue-100 to-purple-100 rounded-full transform group-hover:scale-110 transition-transform duration-500"></div>
                    <div className="absolute inset-0 bg-gradient-to-br from-blue-200 to-purple-200 rounded-full blur-md opacity-50 animate-pulse"></div>
                    <div className="relative w-full h-full flex items-center justify-center">
                      <svg className="w-12 h-12 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                      </svg>
                    </div>
                  </div>
                  
                  <h2 className="text-2xl font-bold mb-4 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                    Save Passwords
                  </h2>
                  <p className="text-gray-600 mb-8">
                    Log in to securely save and manage your passwords. All your passwords are stored encrypted.
                  </p>
                  <Link 
                    href="/auth"
                    className="relative inline-flex items-center justify-center px-6 py-3 overflow-hidden rounded-lg group"
                  >
                    <span className="absolute inset-0 bg-gradient-to-r from-blue-500 to-purple-500 group-hover:from-blue-600 group-hover:to-purple-600 transition-all duration-300"></span>
                    <span className="absolute inset-0 bg-gradient-to-r from-blue-600 to-purple-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300 scale-105 blur-xl"></span>
                    <span className="relative z-10 flex items-center text-white font-medium">
                      <svg className="w-5 h-5 mr-2 transform group-hover:rotate-12 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1" />
                      </svg>
                      Login
                    </span>
                  </Link>
                </div>
              </div>
            )}
          </div>
        </div>
      </main>

      <footer className="relative mt-20 py-10 border-t border-blue-100 bg-white/20 backdrop-blur-sm">
        <div className="absolute inset-0 bg-gradient-to-t from-blue-50/80 to-transparent opacity-70"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center">
            <div className="flex items-center justify-center mb-4">
              <div className="bg-gradient-to-r from-blue-500 to-purple-500 rounded-full p-1.5 shadow-sm">
                <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 7a2 2 0 012 2m4 0a6 6 0 01-7.743 5.743L11 17H9v2H7v2H4a1 1 0 01-1-1v-2.586a1 1 0 01.293-.707l5.964-5.964A6 6 0 1121 9z" />
                </svg>
              </div>
              <span className="ml-2 text-lg font-medium text-gray-700">Unbreakapass</span>
            </div>
            <p className="text-gray-500 text-sm">
              © {new Date().getFullYear()} Unbreakapass. All rights reserved.
            </p>
            <p className="text-gray-400 text-xs mt-2">
              Your passwords are encrypted and never shared with third parties.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
} 