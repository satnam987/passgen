'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useAuth } from './context/AuthContext';
import { db } from './firebase/config';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';

export default function Home() {
  // Access auth
  const { user, logout } = useAuth();
  
  // Basic state for the password generator
  const [password, setPassword] = useState('');
  const [passwordLength, setPasswordLength] = useState(16);
  const [includeUppercase, setIncludeUppercase] = useState(true);
  const [includeLowercase, setIncludeLowercase] = useState(true);
  const [includeNumbers, setIncludeNumbers] = useState(true);
  const [includeSymbols, setIncludeSymbols] = useState(true);
  const [passwordStrength, setPasswordStrength] = useState(0);
  const [isPasswordCopied, setIsPasswordCopied] = useState(false);
  const [showGenerateAnimation, setShowGenerateAnimation] = useState(false);
  
  // State for password saving
  const [siteName, setSiteName] = useState('');
  const [isSaving, setIsSaving] = useState(false);
  const [saveSuccess, setSaveSuccess] = useState(false);
  const [saveError, setSaveError] = useState('');

  // Handle direct logout with immediate UI feedback
  const handleDirectLogout = (e: React.MouseEvent) => {
    // Prevent default link behavior
    e.preventDefault();
    // Stop event from propagating
    e.stopPropagation();
    
    console.log("Direct logout initiated...");
    
    // Call the context logout function
    try {
      // Try to call the logout function
      logout();
      
      // Fallback redirect with delay in case logout function doesn't redirect
      setTimeout(() => {
        if (window.location.pathname !== '/') {
          window.location.href = '/';
        }
      }, 300);
    } catch (error) {
      console.error("Logout error:", error);
      // Force redirect as fallback
      window.location.href = '/';
    }
  };

  // Wachtwoord sterkte berekenen
  useEffect(() => {
    if (password) {
      let strength = 0;
      
      // Basis score op lengte (max 40%)
      strength += Math.min(40, (password.length / 32) * 40);
      
      // Score voor diversiteit van karakters (max 60%)
      const hasUppercase = /[A-Z]/.test(password);
      const hasLowercase = /[a-z]/.test(password);
      const hasNumbers = /[0-9]/.test(password);
      const hasSymbols = /[^A-Za-z0-9]/.test(password);
      
      if (hasUppercase) strength += 15;
      if (hasLowercase) strength += 15;
      if (hasNumbers) strength += 15;
      if (hasSymbols) strength += 15;
      
      setPasswordStrength(Math.min(100, strength));
    } else {
      setPasswordStrength(0);
    }
  }, [password]);

  // Voeg een style tag toe voor de animaties
  useEffect(() => {
    const style = document.createElement('style');
    style.innerHTML = `
      @keyframes progress {
        0% { width: 0%; }
        50% { width: 70%; }
        75% { width: 85%; }
        90% { width: 95%; }
        100% { width: 98%; }
      }
      .animate-progress {
        animation: progress 2s ease-in-out infinite;
      }
    `;
    document.head.appendChild(style);
    
    return () => {
      document.head.removeChild(style);
    };
  }, []);

  const copyToClipboard = () => {
    if (password) {
      navigator.clipboard.writeText(password);
      setIsPasswordCopied(true);
      setTimeout(() => setIsPasswordCopied(false), 2000);
    }
  };

  const generatePassword = () => {
    setShowGenerateAnimation(true);
    setTimeout(() => setShowGenerateAnimation(false), 1000);
    
    const uppercaseChars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    const lowercaseChars = 'abcdefghijklmnopqrstuvwxyz';
    const numberChars = '0123456789';
    const symbolChars = '!@#$%^&*()_+[]{}|;:,.<>?';
    
    let chars = '';
    if (includeUppercase) chars += uppercaseChars;
    if (includeLowercase) chars += lowercaseChars;
    if (includeNumbers) chars += numberChars;
    if (includeSymbols) chars += symbolChars;
    
    if (chars === '') {
      // Default to lowercase if nothing selected
      chars = lowercaseChars;
    }
    
    let generatedPassword = '';
    for (let i = 0; i < passwordLength; i++) {
      const randomIndex = Math.floor(Math.random() * chars.length);
      generatedPassword += chars[randomIndex];
    }
    
    setPassword(generatedPassword);
  };

  // Helper functie voor wachtwoord sterkte kleur
  const getPasswordStrengthColor = () => {
    if (passwordStrength < 40) return 'from-red-600 to-red-500';
    if (passwordStrength < 70) return 'from-yellow-500 to-orange-500';
    return 'from-green-400 to-emerald-500';
  };

  // Helper functie voor wachtwoord sterkte label
  const getPasswordStrengthLabel = () => {
    if (passwordStrength < 40) return 'Weak';
    if (passwordStrength < 70) return 'Medium';
    return 'Strong';
  };

  // Functie om wachtwoord op te slaan
  const savePassword = async () => {
    if (!user) {
      setSaveError('You must be logged in to save passwords');
      return;
    }
    
    if (!password) {
      setSaveError('Generate a password first');
      return;
    }
    
    if (!siteName.trim()) {
      setSaveError('Enter a name for this password');
      return;
    }
    
    try {
      setIsSaving(true);
      setSaveError('');
      
      // Add to Firestore
      await addDoc(collection(db, 'users', user.uid, 'passwords'), {
        siteName: siteName.trim(),
        password: password,
        strength: passwordStrength,
        created: serverTimestamp()
      });
      
      // Reset form and show success message
      setSiteName('');
      setSaveSuccess(true);
      setTimeout(() => setSaveSuccess(false), 3000);
    } catch (error) {
      console.error('Error saving password:', error);
      setSaveError('An error occurred while saving the password');
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-100 to-purple-100">
      {/* Vereenvoudigd: statische achtergrond zonder zware animaties */}
      
      {/* Navigatiebalk */}
      <header className="relative z-10 bg-white/90 backdrop-blur-sm border-b border-gray-100 shadow-sm">
        <div className="max-w-7xl mx-auto py-4 px-4 sm:px-6 lg:px-8 flex justify-between items-center">
          <div className="flex items-center">
            <div className="bg-gradient-to-r from-blue-600 to-indigo-600 rounded-full p-2 mr-2 shadow-md">
              <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 7a2 2 0 012 2m4 0a6 6 0 01-7.743 5.743L11 17H9v2H7v2H4a1 1 0 01-1-1v-2.586a1 1 0 01.293-.707l5.964-5.964A6 6 0 1121 9z" />
              </svg>
            </div>
            <span className="text-xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600">
              Unbreakapass
            </span>
          </div>
          
          <div className="flex items-center space-x-4">
            <Link href="/tips" className="text-gray-700 font-medium hover:text-blue-600 transition-colors">
              Tips
            </Link>
              
            {user ? (
              <div className="flex items-center space-x-2">
                <div className="flex items-center space-x-2 bg-blue-50 px-3 py-2 rounded-lg text-gray-700">
                  <div className="flex items-center justify-center w-8 h-8 rounded-full bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-bold">
                    {user.displayName 
                      ? user.displayName.charAt(0).toUpperCase() 
                      : user.email 
                        ? user.email.split('@')[0].charAt(0).toUpperCase() 
                        : 'G'}
                  </div>
                  <span className="font-medium">
                    {user.displayName 
                      ? user.displayName 
                      : user.email 
                        ? user.email.split('@')[0] 
                        : 'Gebruiker'}
                  </span>
                </div>
                
                <button
                  onClick={handleDirectLogout}
                  className="flex items-center space-x-1 bg-red-50 hover:bg-red-100 px-3 py-2 rounded-lg text-red-600 hover:text-red-700 font-medium transition-all duration-300"
                  aria-label="Logout"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                  </svg>
                  <span>Logout</span>
                </button>
              </div>
            ) : (
              <Link
                href="/auth"
                className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white px-4 py-2 rounded-lg shadow-md hover:shadow-lg transition-all duration-300"
              >
                Login
              </Link>
            )}
          </div>
        </div>
      </header>

      <main className="relative z-10 max-w-7xl mx-auto px-4 py-12 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold mb-6 text-transparent bg-clip-text bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600">
            Secure Password Generator
          </h1>
          <p className="text-gray-700 max-w-3xl mx-auto">
            Generate strong, unique passwords for all your accounts with our
            advanced password generator. Protect your online identity with
            passwords that even the most advanced hackers cannot crack.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          <div className="md:col-span-2 bg-white/90 backdrop-blur-sm rounded-lg border border-gray-200 shadow-md overflow-hidden">
            <div className="p-6">
              <div className="relative mb-6">
                <input
                  type="text"
                  value={password}
                  readOnly
                  placeholder="Generate a password..."
                  className="w-full p-4 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500 text-gray-800 shadow-inner font-mono text-black"
                />
                <button 
                  className={`absolute right-2 top-2 p-2 ${isPasswordCopied ? 'bg-green-100 text-green-600' : 'bg-blue-100 text-blue-600'} rounded-lg hover:bg-blue-200 transition-colors`}
                  onClick={copyToClipboard}
                >
                  {isPasswordCopied ? (
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  ) : (
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 5H6a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2v-1M8 5a2 2 0 002 2h2a2 2 0 002-2M8 5a2 2 0 012-2h2a2 2 0 012 2m0 0h2a2 2 0 012 2v3m2 4H10m0 0l3-3m-3 3l3 3" />
                    </svg>
                  )}
                </button>
              </div>

              {/* Password strength meter */}
              {password && (
                <div className="mb-6">
                  <div className="flex justify-between items-center mb-1">
                    <span className="text-sm text-gray-500">Strength: {getPasswordStrengthLabel()}</span>
                    <span className="text-sm text-gray-500">{passwordStrength}%</span>
                  </div>
                  <div className="w-full h-2 bg-gray-200 rounded-full overflow-hidden">
                    <div 
                      className={`h-full rounded-full bg-gradient-to-r ${getPasswordStrengthColor()} transition-all duration-500`}
                      style={{ width: `${passwordStrength}%` }}
                    ></div>
                  </div>
                </div>
              )}

              <div className="mb-6">
                <div className="flex justify-between items-center mb-2">
                  <label className="block text-sm font-medium text-gray-700">Password Length: {passwordLength}</label>
                </div>
                <input
                  type="range"
                  min="8"
                  max="32"
                  value={passwordLength}
                  onChange={(e) => setPasswordLength(Number(e.target.value))}
                  className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-blue-600"
                />
                <div className="flex justify-between mt-1 text-xs text-gray-500">
                  <span>8</span>
                  <span>16</span>
                  <span>24</span>
                  <span>32</span>
                </div>
              </div>
              
              <div className="grid grid-cols-2 gap-4 mb-6">
                <div className="flex items-center">
                  <input
                    type="checkbox"
                    id="uppercase"
                    checked={includeUppercase}
                    onChange={() => setIncludeUppercase(!includeUppercase)}
                    className="w-4 h-4 text-blue-600 rounded focus:ring-blue-500"
                  />
                  <label htmlFor="uppercase" className="ml-2 text-sm font-medium text-gray-700">Uppercase (A-Z)</label>
                </div>
                <div className="flex items-center">
                  <input
                    type="checkbox"
                    id="lowercase"
                    checked={includeLowercase}
                    onChange={() => setIncludeLowercase(!includeLowercase)}
                    className="w-4 h-4 text-blue-600 rounded focus:ring-blue-500"
                  />
                  <label htmlFor="lowercase" className="ml-2 text-sm font-medium text-gray-700">Lowercase (a-z)</label>
                </div>
                <div className="flex items-center">
                  <input
                    type="checkbox"
                    id="numbers"
                    checked={includeNumbers}
                    onChange={() => setIncludeNumbers(!includeNumbers)}
                    className="w-4 h-4 text-blue-600 rounded focus:ring-blue-500"
                  />
                  <label htmlFor="numbers" className="ml-2 text-sm font-medium text-gray-700">Numbers (0-9)</label>
                </div>
                <div className="flex items-center">
                  <input
                    type="checkbox"
                    id="symbols"
                    checked={includeSymbols}
                    onChange={() => setIncludeSymbols(!includeSymbols)}
                    className="w-4 h-4 text-blue-600 rounded focus:ring-blue-500"
                  />
                  <label htmlFor="symbols" className="ml-2 text-sm font-medium text-gray-700">Symbols (!@#$)</label>
                </div>
              </div>

              {/* Password save form - only show if user is logged in AND a password has been generated */}
              {user && password && (
                <div className="mt-6 p-4 bg-blue-50 rounded-lg border border-blue-100">
                  <h3 className="text-lg font-semibold text-blue-700 mb-2">Save Password</h3>
                  
                  {saveSuccess && (
                    <div className="mb-3 p-2 bg-green-100 border border-green-200 rounded text-green-700 text-sm">
                      <div className="flex items-center">
                        <svg className="w-5 h-5 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                        Password saved successfully!
                      </div>
                    </div>
                  )}
                  
                  {saveError && (
                    <div className="mb-3 p-2 bg-red-100 border border-red-200 rounded text-red-700 text-sm">
                      <div className="flex items-center">
                        <svg className="w-5 h-5 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                        </svg>
                        {saveError}
                      </div>
                    </div>
                  )}
                  
                  <div className="flex flex-col sm:flex-row gap-3">
                    <div className="flex-grow">
                      <input
                        type="text"
                        value={siteName}
                        onChange={(e) => setSiteName(e.target.value)}
                        placeholder="E.g. Gmail, Facebook, Twitter..."
                        className="w-full p-2 border border-blue-200 rounded focus:ring-blue-500 focus:border-blue-500"
                      />
                    </div>
                    <button
                      onClick={savePassword}
                      disabled={isSaving || !siteName.trim()}
                      className={`px-4 py-2 rounded font-medium flex items-center justify-center
                        ${isSaving || !siteName.trim() 
                          ? 'bg-gray-200 text-gray-500 cursor-not-allowed' 
                          : 'bg-gradient-to-r from-blue-600 to-indigo-600 text-white hover:from-blue-700 hover:to-indigo-700'
                        }`}
                    >
                      {isSaving ? (
                        <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                      ) : (
                        <svg className="w-5 h-5 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7H5a2 2 0 00-2 2v9a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-3m-1 4l-3 3m0 0l-3-3m3 3V4" />
                        </svg>
                      )}
                      Save
                    </button>
                  </div>
                  
                  <div className="mt-2 text-xs text-blue-600">
                    <Link href="/passwords" className="flex items-center hover:underline">
                      <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 8h14M5 8a2 2 0 110-4h14a2 2 0 110 4M5 8v10a2 2 0 002 2h10a2 2 0 002-2V8m-9 4h4" />
                      </svg>
                      View all saved passwords
                    </Link>
                  </div>
                </div>
              )}

              <button
                className="w-full mt-6 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white py-3 px-4 rounded-lg flex items-center justify-center font-medium shadow-md hover:shadow-lg transition-all duration-300"
                onClick={generatePassword}
              >
                <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                </svg>
                Generate Password
              </button>
            </div>
          </div>

          <div className="bg-white/90 backdrop-blur-sm rounded-lg border border-gray-200 shadow-md p-6">
            <div className="flex flex-col items-center">
              <div className="p-4 bg-gradient-to-r from-blue-100 to-indigo-100 rounded-full mb-4 shadow-inner">
                <svg className="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                </svg>
              </div>
              <h2 className="text-2xl font-bold mb-4 text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600">Manage Passwords</h2>
              
              {user ? (
                <div className="w-full">
                  <p className="text-gray-700 text-center mb-6">
                    You are logged in as {user.email}. You can save and manage your passwords.
                  </p>
                  
                  <Link
                    href="/passwords"
                    className="w-full mb-4 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white py-3 px-4 rounded-lg flex items-center justify-center font-medium shadow-md hover:shadow-lg transition-all duration-300"
                  >
                    <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 8h14M5 8a2 2 0 110-4h14a2 2 0 110 4M5 8v10a2 2 0 002 2h10a2 2 0 002-2V8m-9 4h4" />
                    </svg>
                    View Passwords
                  </Link>
                  
                  <button 
                    onClick={handleDirectLogout}
                    className="w-full bg-gradient-to-r from-red-500 to-pink-600 hover:from-red-600 hover:to-pink-700 text-white py-3 px-4 rounded-lg font-medium shadow-md hover:shadow-lg transition-all duration-300"
                    type="button"
                    aria-label="Logout"
                  >
                    <div className="flex items-center justify-center">
                      <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                      </svg>
                      Logout
                    </div>
                  </button>
                </div>
              ) : (
                <div className="w-full">
                  <p className="text-gray-700 text-center mb-6">
                    Log in to securely save and manage your passwords. All passwords are stored encrypted.
                  </p>
                  
                  <Link
                    href="/auth"
                    className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white py-3 px-4 rounded-lg flex items-center justify-center font-medium shadow-md hover:shadow-lg transition-all duration-300"
                  >
                    <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1" />
                    </svg>
                    Login
                  </Link>
                </div>
              )}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
} 