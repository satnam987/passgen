'use client';

import { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { passwordEvents } from './PasswordGenerator';
import { getPasswordsByUserId, deletePassword, Password as FirestorePassword } from '../services/passwordService';

interface Password {
  id?: string;
  website: string;
  username: string;
  password: string;
  createdAt?: any;
  updatedAt?: any;
}

export default function SavedPasswords() {
  const { user } = useAuth();
  const [passwords, setPasswords] = useState<Password[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [refreshCount, setRefreshCount] = useState(0);
  const [passwordCopied, setPasswordCopied] = useState(false);

  const fetchPasswords = async () => {
    if (!user) return;
    
    try {
      setLoading(true);
      setError(null);
      
      // Use the passwordService instead of the API route
      const passwordData = await getPasswordsByUserId(user.uid);
      console.log("Passwords retrieved:", passwordData);
      setPasswords(passwordData);
    } catch (err) {
      setError('An error occurred while retrieving passwords');
      console.error('Error fetching passwords:', err);
    } finally {
      setLoading(false);
    }
  };

  // Trigger refresh when refreshCount changes
  useEffect(() => {
    if (user) {
      fetchPasswords();
    }
  }, [user, refreshCount]);

  // Manual refresh function
  const handleRefresh = () => {
    setRefreshCount(prev => prev + 1);
  };

  // Callback for password events
  const handlePasswordEvent = () => {
    console.log('New password saved, refreshing data...');
    handleRefresh();
  };

  // Subscribe to password events
  useEffect(() => {
    // Only subscribe if the user is logged in
    if (!user) return;
    
    // Subscribe to password events
    passwordEvents.on('passwordGenerated', handlePasswordEvent);
    
    // Polling mechanism to refresh every 10 seconds
    const interval = setInterval(() => {
      handleRefresh();
    }, 10000);
    
    // Unsubscribe when cleaning up the component
    return () => {
      passwordEvents.removeListener('passwordGenerated', handlePasswordEvent);
      clearInterval(interval);
    };
  }, [user]);

  const handleDelete = async (id: string) => {
    if (!user) return;
    
    try {
      // Optimistic update - remove password immediately from the UI
      setPasswords(prevPasswords => prevPasswords.filter(pwd => pwd.id !== id));
      
      // Use the passwordService instead of the API route
      await deletePassword(id);
      
      // Deletion successful
    } catch (err) {
      setError('An error occurred while deleting the password');
      console.error('Error deleting password:', err);
      // Retrieve passwords again to restore the correct state
      handleRefresh();
    }
  };

  const copyToClipboard = async (password: string) => {
    try {
      await navigator.clipboard.writeText(password);
      setPasswordCopied(true);
      setTimeout(() => setPasswordCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy password:', err);
    }
  };

  if (!user) {
    return (
      <div className="text-center py-8">
        <p className="text-gray-600">Log in to view your saved passwords</p>
      </div>
    );
  }

  return (
    <div className="space-y-4 relative">
      {/* Decorative elements */}
      <div className="absolute top-0 right-0 w-20 h-20 bg-gradient-to-br from-blue-200 to-indigo-300 rounded-full opacity-20 blur-xl -z-10 animate-pulse"></div>
      <div className="absolute bottom-20 left-10 w-16 h-16 bg-gradient-to-tr from-purple-200 to-pink-300 rounded-full opacity-20 blur-xl -z-10 animate-pulse" style={{ animationDuration: '6s' }}></div>
      
      <div className="flex justify-between items-center bg-gradient-to-r from-blue-50 to-indigo-50 p-4 rounded-lg shadow-sm">
        <h3 className="text-lg font-semibold text-gray-900 flex items-center">
          <svg className="w-5 h-5 text-indigo-600 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
          </svg>
          Saved passwords
        </h3>
        <button
          onClick={handleRefresh}
          className="p-2 text-indigo-600 hover:text-indigo-800 transition-colors duration-200 flex items-center space-x-1 bg-white rounded-full shadow-sm hover:shadow-md transform hover:scale-105 transition-transform"
          title="Refresh"
          disabled={loading}
        >
          <svg className={`w-5 h-5 ${loading ? 'animate-spin' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
          </svg>
          <span>Refresh</span>
        </button>
      </div>

      {/* Statistics box with password count */}
      <div className="bg-gradient-to-r from-blue-500 to-indigo-500 text-white rounded-lg p-4 shadow-md">
        <div className="flex items-center">
          <div className="bg-indigo-100 p-2 rounded-full mr-3">
            <svg className="w-6 h-6 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          <div>
            <h4 className="text-sm font-medium text-indigo-100">Number of passwords</h4>
            <div className="flex items-baseline">
              <span className="text-2xl font-bold text-white">{passwords.length}</span>
              <span className="ml-2 text-sm text-indigo-100">stored items</span>
            </div>
          </div>
        </div>
      </div>

      {loading ? (
        <div className="flex justify-center items-center py-12 animate-pulse">
          <svg className="animate-spin h-8 w-8 text-indigo-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
          </svg>
          <span className="ml-3 text-indigo-500 font-medium">Loading passwords...</span>
        </div>
      ) : error ? (
        <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-md text-sm">
          <p className="font-medium">Error loading passwords</p>
          <p className="mt-1">Please try refreshing or log in again.</p>
        </div>
      ) : passwords.length === 0 ? (
        <div className="text-center py-10 bg-gray-50 rounded-lg shadow-inner border border-gray-100">
          <svg className="w-12 h-12 text-gray-300 mx-auto mb-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
          </svg>
          <p className="text-gray-600 font-medium">You haven't saved any passwords yet</p>
          <p className="text-sm text-gray-500 mt-2">Generate a password and save it</p>
        </div>
      ) : (
        <div className="space-y-4">
          {passwords
            .filter(pwd => pwd.id !== undefined) // Filter passwords without id
            .map((pwd) => (
              <div
                key={pwd.id}
                className="bg-white rounded-xl shadow-md p-5 hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1 border border-gray-100"
              >
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="text-lg font-semibold text-gray-800 flex items-center">
                      {pwd.website}
                      <span className="ml-2 px-2 py-0.5 text-xs font-medium bg-blue-100 text-blue-800 rounded-full">
                        Safe
                      </span>
                    </h3>
                    <p className="text-sm text-gray-500 flex items-center mt-1">
                      <svg className="w-4 h-4 mr-1 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                      </svg>
                      {pwd.createdAt ? new Date(pwd.createdAt.seconds * 1000).toLocaleDateString('en-US') : 'Unknown date'}
                    </p>
                  </div>
                  
                  <div className="flex space-x-1">
                    <button
                      onClick={() => copyToClipboard(pwd.password)}
                      className="p-2 text-gray-600 hover:text-blue-600 hover:bg-blue-50 rounded-full transition-colors duration-200"
                      title="Copy password"
                    >
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 5H6a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2v-1M8 5a2 2 0 002 2h2a2 2 0 002-2M8 5a2 2 0 012-2h2a2 2 0 012 2m0 0h2a2 2 0 012 2v3m2 4H10m0 0l3-3m-3 3l3 3" />
                      </svg>
                    </button>
                    <button
                      onClick={() => pwd.id && handleDelete(pwd.id)}
                      className="p-2 text-gray-600 hover:text-red-600 hover:bg-red-50 rounded-full transition-colors duration-200"
                      title="Delete password"
                    >
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                      </svg>
                    </button>
                  </div>
                </div>
                <div className="mt-3 flex items-center">
                  <div className="flex-1 font-mono text-sm bg-gradient-to-r from-gray-50 to-gray-100 px-4 py-2 rounded-lg border border-gray-200 select-all overflow-x-auto">
                    {pwd.password}
                  </div>
                </div>
                <div className="mt-2 flex justify-between text-xs text-gray-500">
                  <span>{pwd.password.length} characters</span>
                </div>
              </div>
            ))}
        </div>
      )}
      
      {passwordCopied && (
        <div className="fixed bottom-4 right-4 bg-green-100 text-green-800 px-4 py-2 rounded-md shadow-lg animate-fade-in">
          Password copied to clipboard!
        </div>
      )}
    </div>
  );
} 