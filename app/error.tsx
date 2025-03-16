'use client';

import { useEffect } from 'react';

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Log de error naar de console
    console.error('Application error:', error);
  }, [error]);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4 bg-gray-50">
      <div className="max-w-md w-full bg-white rounded-lg shadow-md p-8 text-center">
        <h2 className="text-2xl font-bold text-red-600 mb-4">Er is iets misgegaan</h2>
        
        <div className="mb-6 p-4 bg-red-50 rounded-md">
          <p className="text-red-800">{error.message || 'Een onbekende fout is opgetreden.'}</p>
        </div>
        
        <p className="mb-6 text-gray-600">
          Het spijt ons voor het ongemak. Je kunt proberen de pagina te vernieuwen of terug te gaan naar de homepagina.
        </p>
        
        <div className="flex space-x-4 justify-center">
          <button
            onClick={() => reset()}
            className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
          >
            Probeer opnieuw
          </button>
          
          <a
            href="/"
            className="px-4 py-2 bg-gray-200 text-gray-800 rounded-md hover:bg-gray-300 transition-colors"
          >
            Naar homepagina
          </a>
        </div>
      </div>
    </div>
  );
} 