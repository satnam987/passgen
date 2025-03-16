"use client";

import React, { createContext, useContext, useEffect, useState } from "react";
import { onAuthStateChanged, User, signOut, Auth } from "firebase/auth";
import { auth } from "../lib/firebase";

// Define the context type
interface AuthContextType {
  user: User | null;
  loading: boolean;
  logout: () => Promise<void>;
}

// Create the context with default values
const AuthContext = createContext<AuthContextType>({
  user: null,
  loading: false,
  logout: async () => {}
});

// Hook to use the auth context
export const useAuth = () => useContext(AuthContext);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  // State to track user and loading status
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(false);
  
  // Logout function
  const logout = async () => {
    try {
      console.log("Starting logout process...");
      
      // First set user to null to update UI immediately
      setUser(null);
      
      // Set loading state to give visual feedback
      setLoading(true);
      
      // Then try to sign out from Firebase (may fail silently)
      try {
        await signOut(auth);
        console.log("Firebase sign out successful");
      } catch (signOutError) {
        console.error("Firebase sign out error (continuing):", signOutError);
      }
      
      // Clear any cached user data
      localStorage.removeItem('firebase:authUser');
      sessionStorage.removeItem('firebase:authUser');
      
      // Reset loading state
      setLoading(false);
      
      // Force hard redirect regardless of signOut result
      console.log("Redirecting to homepage...");
      
      // Use setTimeout to ensure UI updates before redirect
      setTimeout(() => {
        window.location.href = '/';
      }, 100);
      
    } catch (error) {
      console.error("Logout failed:", error);
      // Reset loading state
      setLoading(false);
      // Force redirect even if logout fails
      window.location.href = '/';
    }
  };
  
  // Set up auth state listener
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(
      auth,
      (currentUser) => {
        setUser(currentUser);
        setLoading(false);
      },
      (error) => {
        console.error("Auth error:", error);
        setLoading(false);
      }
    );
    
    // Clean up on unmount
    return () => unsubscribe();
  }, []);
  
  // Provide context to children
  return (
    <AuthContext.Provider value={{ user, loading, logout }}>
      {children}
    </AuthContext.Provider>
  );
} 