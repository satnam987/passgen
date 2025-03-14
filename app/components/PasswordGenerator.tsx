'use client';

import { useState } from 'react';
import { useAuth } from '../context/AuthContext';

// Event systeem voor het delen van updates
export const passwordEvents = {
  listeners: new Set<() => void>(),
  emit: () => {
    passwordEvents.listeners.forEach(listener => listener());
  },
  subscribe: (listener: () => void) => {
    passwordEvents.listeners.add(listener);
    return () => {
      passwordEvents.listeners.delete(listener);
    };
  }
};

interface PasswordStrength {
  score: number;
  label: string;
  color: string;
  crackingTime: string;
}

export default function PasswordGenerator() {
  const { user } = useAuth();
  const [password, setPassword] = useState('');
  const [length, setLength] = useState(16);
  const [includeUppercase, setIncludeUppercase] = useState(true);
  const [includeLowercase, setIncludeLowercase] = useState(true);
  const [includeNumbers, setIncludeNumbers] = useState(true);
  const [includeSymbols, setIncludeSymbols] = useState(true);
  const [copied, setCopied] = useState(false);
  const [saveTitle, setSaveTitle] = useState('');
  const [manualPassword, setManualPassword] = useState('');
  const [isSaving, setIsSaving] = useState(false);
  const [saveSuccess, setSaveSuccess] = useState(false);

  const calculateCrackingTime = (password: string): string => {
    const hasUppercase = /[A-Z]/.test(password);
    const hasLowercase = /[a-z]/.test(password);
    const hasNumbers = /\d/.test(password);
    const hasSymbols = /[^A-Za-z0-9]/.test(password);

    // Calculate character set size
    let charsetSize = 0;
    if (hasLowercase) charsetSize += 26;
    if (hasUppercase) charsetSize += 26;
    if (hasNumbers) charsetSize += 10;
    if (hasSymbols) charsetSize += 32;

    // Calculate possible combinations
    const combinations = Math.pow(charsetSize, password.length);

    // Assuming 10,000 attempts per second (common cracking speed)
    const secondsToCrack = combinations / 10000;

    // Convert to human-readable time
    if (secondsToCrack < 60) return 'Less than a minute';
    if (secondsToCrack < 3600) return `${Math.round(secondsToCrack / 60)} minutes`;
    if (secondsToCrack < 86400) return `${Math.round(secondsToCrack / 3600)} hours`;
    if (secondsToCrack < 31536000) return `${Math.round(secondsToCrack / 86400)} days`;
    if (secondsToCrack < 3153600000) return `${Math.round(secondsToCrack / 31536000)} years`;
    return 'Centuries';
  };

  const calculateStrength = (password: string): PasswordStrength => {
    let score = 0;
    const hasUppercase = /[A-Z]/.test(password);
    const hasLowercase = /[a-z]/.test(password);
    const hasNumbers = /\d/.test(password);
    const hasSymbols = /[^A-Za-z0-9]/.test(password);

    if (password.length >= 12) score += 2;
    if (hasUppercase) score += 1;
    if (hasLowercase) score += 1;
    if (hasNumbers) score += 1;
    if (hasSymbols) score += 1;

    const crackingTime = calculateCrackingTime(password);

    if (score <= 2) return { score, label: 'Weak', color: 'bg-red-500', crackingTime };
    if (score <= 4) return { score, label: 'Medium', color: 'bg-yellow-500', crackingTime };
    if (score <= 6) return { score, label: 'Strong', color: 'bg-blue-500', crackingTime };
    return { score, label: 'Very Strong', color: 'bg-green-500', crackingTime };
  };

  const generatePassword = () => {
    const uppercase = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    const lowercase = 'abcdefghijklmnopqrstuvwxyz';
    const numbers = '0123456789';
    const symbols = '!@#$%^&*()_+-=[]{}|;:,.<>?';

    let chars = '';
    if (includeUppercase) chars += uppercase;
    if (includeLowercase) chars += lowercase;
    if (includeNumbers) chars += numbers;
    if (includeSymbols) chars += symbols;

    if (!chars) {
      alert('Select at least one character type');
      return;
    }

    let newPassword = '';
    for (let i = 0; i < length; i++) {
      newPassword += chars.charAt(Math.floor(Math.random() * chars.length));
    }

    setPassword(newPassword);
    setSaveSuccess(false);
  };

  const copyToClipboard = async () => {
    if (!password) return;
    
    try {
      await navigator.clipboard.writeText(password);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy password:', err);
    }
  };

  const savePassword = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user || !saveTitle || (!password && !manualPassword)) return;
    
    setIsSaving(true);
    
    try {
      const response = await fetch('/api/passwords', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${user.token}`
        },
        body: JSON.stringify({
          title: saveTitle,
          password: manualPassword || password // Use manual password if entered, otherwise use generated password
        })
      });
      
      if (!response.ok) {
        throw new Error('Failed to save password');
      }
      
      setSaveSuccess(true);
      setSaveTitle('');
      setManualPassword('');
      
      // Emit an event so other components (like SavedPasswords) know a password was saved
      passwordEvents.emit();
      
      // Automatically hide success message after 3 seconds
      setTimeout(() => setSaveSuccess(false), 3000);
    } catch (err) {
      console.error('Error saving password:', err);
    } finally {
      setIsSaving(false);
    }
  };

  const strength = calculateStrength(password);

  return (
    <div className="space-y-6">
      <div className="relative">
        <div className="flex items-center space-x-2">
          <input
            type="text"
            value={password}
            readOnly
            className="w-full px-4 py-3 bg-white border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent font-mono text-lg"
            placeholder="Generate a password..."
          />
          <button
            onClick={copyToClipboard}
            className="p-3 bg-gradient-to-r from-blue-500 to-purple-500 text-white rounded-lg hover:from-blue-600 hover:to-purple-600 transition-all duration-300 transform hover:scale-105 hover:shadow-lg relative group"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 5H6a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2v-1M8 5a2 2 0 002 2h2a2 2 0 002-2M8 5a2 2 0 012-2h2a2 2 0 012 2m0 0h2a2 2 0 012 2v3m2 4H10m0 0l3-3m-3 3l3 3" />
            </svg>
            <span className="absolute -top-8 left-1/2 transform -translate-x-1/2 bg-gray-800 text-white text-xs py-1 px-2 rounded opacity-0 group-hover:opacity-100 transition-opacity duration-200 whitespace-nowrap">
              {copied ? 'Copied!' : 'Copy'}
            </span>
          </button>
        </div>
        
        {password && (
          <div className="mt-2">
            <div className="flex justify-between text-sm text-gray-600 mb-1">
              <span>Password Strength:</span>
              <span className="font-medium">{strength.label}</span>
            </div>
            <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
              <div
                className={`h-full ${strength.color} transition-all duration-300`}
                style={{ width: `${(strength.score / 6) * 100}%` }}
              ></div>
            </div>
            <div className="mt-2 text-sm text-gray-600">
              <span>Estimated time to crack: </span>
              <span className="font-medium text-blue-600">{strength.crackingTime}</span>
            </div>
          </div>
        )}
      </div>

      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Password Length: {length}
          </label>
          <input
            type="range"
            min="8"
            max="32"
            value={length}
            onChange={(e) => setLength(Number(e.target.value))}
            className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-blue-500"
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <label className="flex items-center space-x-2 cursor-pointer">
            <input
              type="checkbox"
              checked={includeUppercase}
              onChange={(e) => setIncludeUppercase(e.target.checked)}
              className="w-4 h-4 text-blue-600 rounded border-gray-300 focus:ring-blue-500"
            />
            <span className="text-sm text-gray-700">Uppercase (A-Z)</span>
          </label>
          <label className="flex items-center space-x-2 cursor-pointer">
            <input
              type="checkbox"
              checked={includeLowercase}
              onChange={(e) => setIncludeLowercase(e.target.checked)}
              className="w-4 h-4 text-blue-600 rounded border-gray-300 focus:ring-blue-500"
            />
            <span className="text-sm text-gray-700">Lowercase (a-z)</span>
          </label>
          <label className="flex items-center space-x-2 cursor-pointer">
            <input
              type="checkbox"
              checked={includeNumbers}
              onChange={(e) => setIncludeNumbers(e.target.checked)}
              className="w-4 h-4 text-blue-600 rounded border-gray-300 focus:ring-blue-500"
            />
            <span className="text-sm text-gray-700">Numbers (0-9)</span>
          </label>
          <label className="flex items-center space-x-2 cursor-pointer">
            <input
              type="checkbox"
              checked={includeSymbols}
              onChange={(e) => setIncludeSymbols(e.target.checked)}
              className="w-4 h-4 text-blue-600 rounded border-gray-300 focus:ring-blue-500"
            />
            <span className="text-sm text-gray-700">Symbols (!@#$)</span>
          </label>
        </div>
      </div>

      <button
        onClick={generatePassword}
        className="w-full bg-gradient-to-r from-blue-500 to-purple-500 text-white py-3 px-4 rounded-lg hover:from-blue-600 hover:to-purple-600 transition-all duration-300 transform hover:scale-105 hover:shadow-lg flex items-center justify-center space-x-2"
      >
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
        </svg>
        <span>Generate Password</span>
      </button>

      {password && user && (
        <form onSubmit={savePassword} className="mt-6 p-4 bg-gradient-to-r from-blue-50 to-purple-50 rounded-lg animate-fade-in">
          <h3 className="text-lg font-medium text-gray-900 mb-4">Save Password</h3>
          
          <div className="space-y-4">
            <div>
              <label htmlFor="saveTitle" className="block text-sm font-medium text-gray-700 mb-1">
                Title
              </label>
              <input
                type="text"
                id="saveTitle"
                value={saveTitle}
                onChange={(e) => setSaveTitle(e.target.value)}
                placeholder="e.g. Gmail, Netflix, etc."
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                required
              />
            </div>

            <div>
              <label htmlFor="manualPassword" className="block text-sm font-medium text-gray-700 mb-1">
                Password
              </label>
              <input
                type="text"
                id="manualPassword"
                value={manualPassword}
                onChange={(e) => setManualPassword(e.target.value)}
                placeholder="Leave empty to use generated password"
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 font-mono"
              />
              <p className="mt-1 text-xs text-gray-500">
                {manualPassword ? "Your custom password will be used" : "The generated password will be used"}
              </p>
            </div>
            
            <button
              type="submit"
              disabled={isSaving || !saveTitle}
              className="w-full bg-gradient-to-r from-blue-500 to-purple-500 text-white py-2 px-4 rounded-md hover:from-blue-600 hover:to-purple-600 transition-all duration-300 flex items-center justify-center space-x-2 disabled:opacity-70"
            >
              {isSaving ? (
                <>
                  <svg className="animate-spin h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  <span>Saving...</span>
                </>
              ) : (
                <>
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7H5a2 2 0 00-2 2v9a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-3m-1 4l-3 3m0 0l-3-3m3 3V4" />
                  </svg>
                  <span>Save</span>
                </>
              )}
            </button>
          </div>
          
          {saveSuccess && (
            <div className="mt-4 bg-green-100 border border-green-400 text-green-700 px-4 py-2 rounded-md text-sm">
              Password successfully saved!
            </div>
          )}
        </form>
      )}
    </div>
  );
} 