'use client';

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import PasswordGenerator from './components/PasswordGenerator';
import SavedPasswords from './components/SavedPasswords';
import { useAuth } from './context/AuthContext';

export default function Home() {
  const { user, logout } = useAuth();
  const [showSavedPasswords, setShowSavedPasswords] = useState(false);
  const heroRef = useRef<HTMLDivElement>(null);

  // Parallax effect for hero section
  useEffect(() => {
    const handleScroll = () => {
      if (heroRef.current) {
        const scrollY = window.scrollY;
        heroRef.current.style.transform = `translateY(${scrollY * 0.3}px)`;
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

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
      {/* Enhanced Decorative Elements with better animation */}
      <div className="absolute top-20 left-10 w-80 h-80 bg-blue-200 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob"></div>
      <div className="absolute top-40 right-10 w-80 h-80 bg-purple-200 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-2000"></div>
      <div className="absolute -bottom-8 left-1/3 w-80 h-80 bg-pink-200 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-4000"></div>
      <div className="absolute top-1/2 right-1/4 w-64 h-64 bg-green-200 rounded-full mix-blend-multiply filter blur-xl opacity-60 animate-blob animation-delay-3000"></div>
      <div className="absolute bottom-1/4 right-1/3 w-72 h-72 bg-yellow-200 rounded-full mix-blend-multiply filter blur-xl opacity-50 animate-blob animation-delay-5000"></div>
      
      {/* Enhanced light patterns for texture */}
      <div className="absolute inset-0 opacity-30 bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI1IiBoZWlnaHQ9IjUiPgo8cmVjdCB3aWR0aD0iNSIgaGVpZ2h0PSI1IiBmaWxsPSIjZmZmIj48L3JlY3Q+CjxyZWN0IHdpZHRoPSIxIiBoZWlnaHQ9IjEiIGZpbGw9IiNmOGY4ZjgiPjwvcmVjdD4KPC9zdmc+')]"></div>
      
      {/* Subtle grid overlay */}
      <div className="absolute inset-0 bg-grid-pattern opacity-10"></div>

      {/* Navigation Bar with Enhanced Glassmorphism */}
      <nav className="sticky top-0 z-50 backdrop-blur-lg bg-white/60 border-b border-white/30 shadow-lg shadow-blue-900/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16 items-center">
            <Link href="/" className="flex items-center space-x-2 group">
              <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-full p-2.5 shadow-lg shadow-blue-500/20 transform group-hover:scale-110 transition-all duration-300 relative overflow-hidden">
                <div className="absolute inset-0 bg-white opacity-0 group-hover:opacity-30 transition-opacity duration-300 rounded-full"></div>
                <svg className="w-6 h-6 text-white relative z-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 7a2 2 0 012 2m4 0a6 6 0 01-7.743 5.743L11 17H9v2H7v2H4a1 1 0 01-1-1v-2.586a1 1 0 01.293-.707l5.964-5.964A6 6 0 1121 9z" />
                </svg>
              </div>
              <span className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent group-hover:from-purple-600 group-hover:to-blue-600 transition-all duration-300">
                Unbreakapass
              </span>
            </Link>

            <div className="flex items-center space-x-5">
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
                  <div className="absolute inset-0 scale-0 group-hover:scale-100 transition-transform duration-300 origin-center rounded-lg bg-white/10"></div>
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
        <div className="text-center mb-20" ref={heroRef}>
          <h1 className="text-6xl font-extrabold mb-6 leading-tight animate-fade-in">
            <span className="bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 bg-clip-text text-transparent inline-block relative">
              Secure Password Generator
              <div className="absolute -bottom-2 left-0 right-0 h-1 rounded-full bg-gradient-to-r from-blue-500 via-indigo-500 to-purple-500 opacity-70 transform scale-x-0 animate-scale-in" style={{ animationDelay: '900ms', animationFillMode: 'forwards' }}></div>
            </span>
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed animate-fade-in font-light" style={{ animationDelay: '300ms' }}>
            Generate strong, unique passwords for all your accounts with our advanced password generator.
            Protect your online identity with passwords that even the most advanced hackers cannot crack.
          </p>
          
          {/* New feature badges */}
          <div className="flex flex-wrap items-center justify-center gap-3 mt-6 animate-fade-in" style={{ animationDelay: '600ms' }}>
            <div className="bg-blue-50 text-blue-700 px-3 py-1 rounded-full text-sm font-medium border border-blue-200 flex items-center">
              <svg className="w-4 h-4 mr-1 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
              </svg>
              End-to-End Encryption
            </div>
            <div className="bg-purple-50 text-purple-700 px-3 py-1 rounded-full text-sm font-medium border border-purple-200 flex items-center">
              <svg className="w-4 h-4 mr-1 text-purple-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
              </svg>
              Secure Storage
            </div>
            <div className="bg-green-50 text-green-700 px-3 py-1 rounded-full text-sm font-medium border border-green-200 flex items-center">
              <svg className="w-4 h-4 mr-1 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
              High Entropy Passwords
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          <div className="lg:col-span-8">
            <div className="bg-white/80 backdrop-blur-xl rounded-2xl shadow-2xl p-8 transform hover:scale-[1.01] transition-all duration-500 border border-white/40 animate-fade-in relative overflow-hidden group" style={{ animationDelay: '400ms' }}>
              {/* Subtle pattern background for card */}
              <div className="absolute inset-0 bg-gradient-to-br from-blue-50/40 to-purple-50/40 opacity-70 transition-opacity duration-300 group-hover:opacity-100"></div>
              
              {/* Enhanced glowing accent */}
              <div className="absolute -top-20 -right-20 w-60 h-60 bg-blue-400 rounded-full opacity-10 blur-3xl transition-all duration-500 group-hover:opacity-20 group-hover:w-72 group-hover:h-72"></div>
              
              {/* Geometric accent */}
              <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-blue-400/0 via-blue-400/50 to-purple-400/0"></div>
              
              <div className="relative z-10">
                <PasswordGenerator />
              </div>
            </div>
          </div>
          
          <div className="lg:col-span-4">
            {user ? (
              <div className="bg-white/80 backdrop-blur-xl rounded-2xl shadow-2xl p-8 transform hover:scale-[1.01] transition-all duration-500 border border-white/40 animate-fade-in relative overflow-hidden group" style={{ animationDelay: '600ms' }}>
                {/* Subtle pattern background for card */}
                <div className="absolute inset-0 bg-gradient-to-br from-purple-50/40 to-blue-50/40 opacity-70 transition-opacity duration-300 group-hover:opacity-100"></div>
                
                {/* Enhanced glowing accent */}
                <div className="absolute -top-20 -left-20 w-60 h-60 bg-purple-400 rounded-full opacity-10 blur-3xl transition-all duration-500 group-hover:opacity-20 group-hover:w-72 group-hover:h-72"></div>
                
                {/* Geometric accent */}
                <div className="absolute top-0 right-0 w-full h-1 bg-gradient-to-r from-purple-400/0 via-purple-400/50 to-blue-400/0"></div>
                
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
              <div className="bg-white/80 backdrop-blur-xl rounded-2xl shadow-2xl p-8 text-center border border-white/40 animate-fade-in relative overflow-hidden group" style={{ animationDelay: '600ms' }}>
                {/* Subtle pattern background for card */}
                <div className="absolute inset-0 bg-gradient-to-br from-purple-50/40 to-blue-50/40 opacity-70 transition-opacity duration-300 group-hover:opacity-100"></div>
                
                {/* Enhanced glowing accent */}
                <div className="absolute -bottom-20 -right-20 w-60 h-60 bg-purple-400 rounded-full opacity-10 blur-3xl transition-all duration-500 group-hover:opacity-20 group-hover:w-72 group-hover:h-72"></div>
                
                {/* Geometric accent */}
                <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-blue-400/0 via-blue-400/50 to-purple-400/0"></div>
                
                <div className="relative z-10">
                  <div className="relative w-28 h-28 mx-auto mb-6 group cursor-pointer">
                    <div className="absolute inset-0 bg-gradient-to-br from-blue-100 to-purple-100 rounded-full transform group-hover:scale-110 transition-transform duration-500"></div>
                    <div className="absolute inset-0 bg-gradient-to-br from-blue-200 to-purple-200 rounded-full blur-md opacity-50 animate-pulse"></div>
                    <div className="absolute inset-0 rounded-full overflow-hidden">
                      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_120%,rgba(120,119,198,0.3),rgba(255,255,255,0))]"></div>
                    </div>
                    <div className="relative w-full h-full flex items-center justify-center">
                      <svg className="w-14 h-14 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
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
                    <div className="absolute inset-0 scale-0 group-hover:scale-100 transition-transform duration-300 origin-center rounded-lg bg-white/10"></div>
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
        
        {/* Feature section */}
        <div className="mt-24 px-4 py-16 rounded-3xl bg-white/70 backdrop-blur-lg border border-white/20 shadow-xl relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-blue-50/30 to-purple-50/30 opacity-80"></div>
          
          {/* Decorative elements */}
          <div className="absolute -top-8 -right-8 w-40 h-40 bg-blue-200 rounded-full mix-blend-multiply opacity-40 blur-2xl"></div>
          <div className="absolute -bottom-8 -left-8 w-40 h-40 bg-purple-200 rounded-full mix-blend-multiply opacity-40 blur-2xl"></div>
          
          <div className="relative z-10">
            <h2 className="text-4xl font-bold mb-16 text-center">
              <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                Why Choose Unbreakapass?
              </span>
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="bg-white/80 p-6 rounded-xl shadow-lg border border-gray-100 transform hover:scale-105 transition-all duration-300">
                <div className="w-14 h-14 bg-blue-50 rounded-xl flex items-center justify-center mb-5 text-blue-600">
                  <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                  </svg>
                </div>
                <h3 className="text-xl font-bold mb-2 text-gray-800">Military-Grade Security</h3>
                <p className="text-gray-600">Our passwords are generated using cryptographically secure algorithms that follow NIST guidelines.</p>
              </div>
              
              <div className="bg-white/80 p-6 rounded-xl shadow-lg border border-gray-100 transform hover:scale-105 transition-all duration-300">
                <div className="w-14 h-14 bg-purple-50 rounded-xl flex items-center justify-center mb-5 text-purple-600">
                  <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4" />
                  </svg>
                </div>
                <h3 className="text-xl font-bold mb-2 text-gray-800">Customizable Complexity</h3>
                <p className="text-gray-600">Tailor your passwords to meet specific requirements with our advanced customization options.</p>
              </div>
              
              <div className="bg-white/80 p-6 rounded-xl shadow-lg border border-gray-100 transform hover:scale-105 transition-all duration-300">
                <div className="w-14 h-14 bg-green-50 rounded-xl flex items-center justify-center mb-5 text-green-600">
                  <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 7v10c0 2.21 3.582 4 8 4s8-1.79 8-4V7M4 7c0 2.21 3.582 4 8 4s8-1.79 8-4M4 7c0-2.21 3.582-4 8-4s8 1.79 8 4m0 5c0 2.21-3.582 4-8 4s-8-1.79-8-4" />
                  </svg>
                </div>
                <h3 className="text-xl font-bold mb-2 text-gray-800">Encrypted Storage</h3>
                <p className="text-gray-600">All saved passwords are encrypted with AES-256 before being stored in our secure database.</p>
              </div>
            </div>
          </div>
        </div>
      </main>

      <footer className="relative mt-20 py-10 border-t border-blue-100 bg-white/40 backdrop-blur-sm">
        <div className="absolute inset-0 bg-gradient-to-t from-blue-50/80 to-transparent opacity-70"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center">
            <div className="flex items-center justify-center mb-4">
              <div className="bg-gradient-to-r from-blue-500 to-purple-500 rounded-full p-2 shadow-lg shadow-blue-500/20">
                <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 7a2 2 0 012 2m4 0a6 6 0 01-7.743 5.743L11 17H9v2H7v2H4a1 1 0 01-1-1v-2.586a1 1 0 01.293-.707l5.964-5.964A6 6 0 1121 9z" />
                </svg>
              </div>
              <span className="ml-2 text-lg font-medium text-gray-700">Unbreakapass</span>
            </div>
            <p className="text-gray-600 text-sm mb-3">
              © {new Date().getFullYear()} Unbreakapass. All rights reserved.
            </p>
            <p className="text-gray-500 text-xs mb-5">
              Your passwords are encrypted and never shared with third parties.
            </p>
            
            <div className="flex justify-center space-x-5">
              <a href="#" className="text-gray-400 hover:text-blue-600 transition-colors duration-200">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M22.675 0h-21.35c-.732 0-1.325.593-1.325 1.325v21.351c0 .731.593 1.324 1.325 1.324h11.495v-9.294h-3.128v-3.622h3.128v-2.671c0-3.1 1.893-4.788 4.659-4.788 1.325 0 2.463.099 2.795.143v3.24l-1.918.001c-1.504 0-1.795.715-1.795 1.763v2.313h3.587l-.467 3.622h-3.12v9.293h6.116c.73 0 1.323-.593 1.323-1.325v-21.35c0-.732-.593-1.325-1.325-1.325z" />
                </svg>
              </a>
              <a href="#" className="text-gray-400 hover:text-blue-600 transition-colors duration-200">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723 10.1 10.1 0 01-3.127 1.184 4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.214 2.19 4.1a4.904 4.904 0 01-2.23-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z" />
                </svg>
              </a>
              <a href="#" className="text-gray-400 hover:text-blue-600 transition-colors duration-200">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 0C5.374 0 0 5.373 0 12c0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z" />
                </svg>
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
} 