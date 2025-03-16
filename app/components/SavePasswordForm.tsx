'use client';

import { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { createPassword } from '../services/passwordService';
import { passwordEvents } from './PasswordGenerator';

interface SavePasswordFormProps {
  generatedPassword: string;
}

export default function SavePasswordForm({ generatedPassword }: SavePasswordFormProps) {
  const { user } = useAuth();
  const [website, setWebsite] = useState('');
  const [username, setUsername] = useState('');
  const [saving, setSaving] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!user) {
      setError('You must be logged in to save a password');
      return;
    }
    
    if (!website) {
      setError('Please enter the website');
      return;
    }
    
    if (!username) {
      setError('Please enter the username');
      return;
    }
    
    try {
      setSaving(true);
      setError(null);
      
      await createPassword({
        website,
        username,
        password: generatedPassword,
        userId: user.uid
      });
      
      setSuccess(true);
      setWebsite('');
      setUsername('');
      
      // Notify other components that a new password has been saved
      passwordEvents.emit('passwordGenerated');
      
      // Reset success message after 3 seconds
      setTimeout(() => {
        setSuccess(false);
      }, 3000);
    } catch (err) {
      console.error('Error saving password:', err);
      setError('An error occurred while saving the password');
    } finally {
      setSaving(false);
    }
  };

  if (!generatedPassword) {
    return null;
  }

  return (
    <div className="mt-5 p-4 bg-gray-50 rounded-lg border border-gray-100">
      <h3 className="text-lg font-semibold mb-3 text-gray-800">Save Password</h3>
      
      {!user ? (
        <div className="text-sm text-gray-600 bg-blue-50 p-3 rounded-md">
          You must <a href="/auth" className="text-blue-600 hover:underline">log in</a> to save passwords.
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-3">
          <div>
            <label htmlFor="website" className="block text-sm font-medium text-gray-700">
              Website / Application
            </label>
            <input
              type="text"
              id="website"
              value={website}
              onChange={(e) => setWebsite(e.target.value)}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm text-sm focus:ring-indigo-500 focus:border-indigo-500"
              placeholder="e.g. google.com"
            />
          </div>
          
          <div>
            <label htmlFor="username" className="block text-sm font-medium text-gray-700">
              Username / Email
            </label>
            <input
              type="text"
              id="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm text-sm focus:ring-indigo-500 focus:border-indigo-500"
              placeholder="e.g. your.email@example.com"
            />
          </div>
          
          {error && (
            <div className="text-sm text-red-600 bg-red-50 p-2 rounded-md">
              {error}
            </div>
          )}
          
          {success && (
            <div className="text-sm text-green-600 bg-green-50 p-2 rounded-md">
              Password saved successfully!
            </div>
          )}
          
          <button
            type="submit"
            disabled={saving}
            className={`w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 ${saving ? 'opacity-70 cursor-not-allowed' : ''}`}
          >
            {saving ? 'Saving...' : 'Save Password'}
          </button>
        </form>
      )}
    </div>
  );
} 