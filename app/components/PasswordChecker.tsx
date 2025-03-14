'use client';

import { useState } from 'react';
import { checkPassword, evaluatePasswordStrength } from '../lib/hibp';

export default function PasswordChecker() {
  const [password, setPassword] = useState('');
  const [isChecking, setIsChecking] = useState(false);
  const [result, setResult] = useState<{
    isChecked: boolean;
    isCompromised: boolean;
    count: number;
    strength: { score: number; feedback: string };
  }>({
    isChecked: false,
    isCompromised: false,
    count: 0,
    strength: { score: 0, feedback: '' }
  });

  const handleCheck = async () => {
    if (!password) return;
    
    setIsChecking(true);
    
    try {
      // Check if the password has been leaked
      const compromisedResult = await checkPassword(password);
      
      // Evaluate the password strength
      const strengthResult = evaluatePasswordStrength(password);
      
      setResult({
        isChecked: true,
        isCompromised: compromisedResult.isCompromised,
        count: compromisedResult.count,
        strength: strengthResult
      });
    } catch (error) {
      console.error('Error checking password:', error);
    } finally {
      setIsChecking(false);
    }
  };

  // Function to determine the color of the security score
  const getScoreColor = (score: number) => {
    if (score >= 8) return 'text-green-600';
    if (score >= 6) return 'text-blue-600';
    if (score >= 4) return 'text-yellow-600';
    return 'text-red-600';
  };

  return (
    <div className="bg-white rounded-xl shadow-md p-5 border border-gray-100 space-y-4">
      <div className="flex items-center space-x-2">
        <svg className="w-6 h-6 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
        </svg>
        <h3 className="text-lg font-semibold text-gray-800">Password Security Check</h3>
      </div>
      
      <p className="text-sm text-gray-600">
        Check if your password is secure and hasn't appeared in known data breaches.
        We use the "Have I Been Pwned" service to check this without sending your password.
      </p>
      
      <div className="space-y-3">
        <div className="flex flex-col md:flex-row gap-2">
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Enter your password to check"
            className="flex-1 border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent text-black"
          />
          <button
            onClick={handleCheck}
            disabled={!password || isChecking}
            className={`px-4 py-2 rounded-md text-white font-medium ${
              !password || isChecking ? 'bg-gray-400' : 'bg-indigo-600 hover:bg-indigo-700'
            } transition-colors duration-200`}
          >
            {isChecking ? (
              <div className="flex items-center justify-center">
                <div className="w-5 h-5 border-t-2 border-b-2 border-white rounded-full animate-spin mr-2"></div>
                <span>Checking...</span>
              </div>
            ) : (
              'Check Password'
            )}
          </button>
        </div>
        
        {result.isChecked && (
          <div className="mt-4 space-y-3">
            <div className="flex flex-col p-4 rounded-lg border">
              <div className="flex justify-between items-center mb-2">
                <h4 className="font-medium">Password security:</h4>
                <div className="flex items-center">
                  <div className="bg-gray-200 h-2 w-36 rounded-full overflow-hidden">
                    <div 
                      className={`h-full ${
                        result.strength.score >= 8 ? 'bg-green-500' :
                        result.strength.score >= 6 ? 'bg-blue-500' :
                        result.strength.score >= 4 ? 'bg-yellow-500' :
                        'bg-red-500'
                      }`}
                      style={{ width: `${result.strength.score * 10}%` }}
                    ></div>
                  </div>
                  <span className={`ml-2 font-bold ${getScoreColor(result.strength.score)}`}>
                    {result.strength.score}/10
                  </span>
                </div>
              </div>
              <p className="text-sm text-gray-600">{result.strength.feedback}</p>
            </div>
            
            <div className={`p-4 rounded-lg border ${result.isCompromised ? 'bg-red-50 border-red-200' : 'bg-green-50 border-green-200'}`}>
              <div className="flex items-start">
                <div className={`rounded-full p-1 mr-3 ${result.isCompromised ? 'bg-red-100 text-red-600' : 'bg-green-100 text-green-600'}`}>
                  {result.isCompromised ? (
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                    </svg>
                  ) : (
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  )}
                </div>
                <div>
                  <h4 className={`font-medium ${result.isCompromised ? 'text-red-800' : 'text-green-800'}`}>
                    {result.isCompromised ? 'Password found in data breaches!' : 'Password not found in known data breaches'}
                  </h4>
                  <p className={`text-sm ${result.isCompromised ? 'text-red-600' : 'text-green-600'}`}>
                    {result.isCompromised 
                      ? `This password has been found ${result.count.toLocaleString('en-US')} times in known data breaches. It is strongly recommended to use a different password.` 
                      : 'This password does not appear to be in any known data breaches.'}
                  </p>
                </div>
              </div>
            </div>
            
            {result.isCompromised && (
              <div className="p-3 bg-indigo-50 rounded-lg border border-indigo-100">
                <h4 className="font-medium text-indigo-800 mb-2">Tips for a better password:</h4>
                <ul className="list-disc pl-5 text-sm text-indigo-700 space-y-1">
                  <li>Use at least 12 characters for better security</li>
                  <li>Combine lowercase letters, uppercase letters, numbers, and symbols</li>
                  <li>Avoid obvious words or patterns</li>
                  <li>Use a unique password for each website or service</li>
                  <li>Consider using a password manager</li>
                </ul>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
} 