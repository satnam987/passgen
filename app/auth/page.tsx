'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { signInWithEmailAndPassword, createUserWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../lib/firebase';
import { useAuth } from '../context/AuthContext';

export default function AuthPage() {
  const router = useRouter();
  const { logout } = useAuth();
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const handleLogout = () => {
    try {
      logout();
      // Redirect will happen automatically due to the reload in logout()
    } catch (error) {
      console.error("Logout error:", error);
      window.location.reload(); // Force reload as fallback
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    
    if (!isLogin && password !== confirmPassword) {
      setError('Wachtwoorden komen niet overeen. Probeer opnieuw.');
      return;
    }
    
    setIsLoading(true);

    try {
      if (isLogin) {
        // Login
        await signInWithEmailAndPassword(auth, email, password);
      } else {
        // Registration
        await createUserWithEmailAndPassword(auth, email, password);
      }
      router.push('/');
    } catch (err: any) {
      console.error('Auth error:', err);
      // Error handling
      if (err.code === 'auth/invalid-credential') {
        setError('Ongeldige email of wachtwoord');
      } else if (err.code === 'auth/user-not-found') {
        setError('Gebruiker niet gevonden');
      } else if (err.code === 'auth/wrong-password') {
        setError('Onjuist wachtwoord');
      } else if (err.code === 'auth/email-already-in-use') {
        setError('Dit e-mailadres is al in gebruik');
      } else if (err.code === 'auth/weak-password') {
        setError('Wachtwoord is te zwak');
      } else {
        setError(err.message || 'Er is een fout opgetreden');
      }
    } finally {
      setIsLoading(false);
    }
  };

  const switchMode = () => {
    setIsLogin(!isLogin);
    setError('');
    if (!isLogin) {
      setConfirmPassword('');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-100 to-purple-100 flex items-center justify-center py-12 px-4">
      {/* User is already logged in, show logout option */}
      {auth.currentUser && (
        <div className="absolute top-4 right-4 flex items-center">
          <div className="text-sm text-gray-600 mr-3">
            Ingelogd als <span className="font-semibold">{auth.currentUser.email}</span>
          </div>
          <button 
            onClick={handleLogout}
            className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg text-sm font-medium"
          >
            Uitloggen
          </button>
        </div>
      )}
      
      <div className="bg-white rounded-2xl shadow-xl p-8 max-w-md w-full">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold mb-2 text-blue-600">
            {isLogin ? 'Welkom terug' : 'Account aanmaken'}
          </h1>
          <p className="text-gray-600">
            {isLogin 
              ? 'Log in om je wachtwoorden veilig te beheren' 
              : 'Registreer om je wachtwoorden op te slaan'}
          </p>
        </div>

        {error && (
          <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg text-sm mb-6">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
              E-mailadres
            </label>
            <div className="relative">
              <input
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="jouw.email@voorbeeld.com"
                required
              />
            </div>
          </div>

          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
              Wachtwoord
            </label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full pr-12 px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder={isLogin ? "Voer je wachtwoord in" : "Maak een sterk wachtwoord"}
                required
              />
              <button 
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-blue-500"
              >
                {showPassword ? "Verbergen" : "Tonen"}
              </button>
            </div>
          </div>

          {!isLogin && (
            <div>
              <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700 mb-1">
                Bevestig wachtwoord
              </label>
              <div className="relative">
                <input
                  type={showConfirmPassword ? "text" : "password"}
                  id="confirmPassword"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  className={`w-full pr-12 px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                    confirmPassword && password !== confirmPassword 
                      ? 'border-red-300 bg-red-50' 
                      : 'border-gray-300'
                  }`}
                  placeholder="Voer je wachtwoord opnieuw in"
                  required
                />
                <button 
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-blue-500"
                >
                  {showConfirmPassword ? "Verbergen" : "Tonen"}
                </button>
              </div>
              {confirmPassword && password !== confirmPassword && (
                <p className="mt-1 text-xs text-red-600">
                  Wachtwoorden komen niet overeen
                </p>
              )}
            </div>
          )}

          <div>
            <button
              type="submit"
              disabled={isLoading}
              className={`w-full flex justify-center py-3 px-4 border border-transparent rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 ${
                isLoading ? 'opacity-70 cursor-not-allowed' : ''
              }`}
            >
              {isLoading ? (
                'Bezig...'
              ) : isLogin ? (
                'Inloggen'
              ) : (
                'Registreren'
              )}
            </button>
          </div>
        </form>

        <div className="mt-6 text-center">
          <button 
            type="button" 
            onClick={switchMode} 
            className="text-blue-600 hover:text-blue-500 font-medium"
          >
            {isLogin ? 'Nog geen account? Registreer hier' : 'Al een account? Log in'}
          </button>
        </div>

        <div className="mt-4 text-center">
          <Link href="/" className="text-sm text-gray-600 hover:text-blue-500">
            Terug naar homepage
          </Link>
        </div>
      </div>
    </div>
  );
} 