"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "../context/AuthContext";
import PasswordGenerator from "../components/PasswordGenerator";
import PasswordsList from "../components/PasswordsList";
import Modal from "../components/Modal";
import Slider from "../components/Slider";
import Link from "next/link";

export default function Dashboard() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState({
    title: "",
    username: "",
    password: "",
    notes: "",
  });
  const [generatedPassword, setGeneratedPassword] = useState("");
  const [length, setLength] = useState(12);
  const [useSymbols, setUseSymbols] = useState(true);
  const [useNumbers, setUseNumbers] = useState(true);
  const [useLowercase, setUseLowercase] = useState(true);
  const [useUppercase, setUseUppercase] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [passwords, setPasswords] = useState([]);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [isFetching, setIsFetching] = useState(true);

  const router = useRouter();
  const { token, logout } = useAuth();

  useEffect(() => {
    if (!token) {
      router.push("/auth");
      return;
    }

    setIsFetching(true);
    fetchPasswords();
  }, [token, router]);

  const fetchPasswords = async () => {
    try {
      const response = await fetch("/api/passwords", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      
      if (!response.ok) {
        if (response.status === 401) {
          logout();
          router.push("/auth");
          return;
        }
        throw new Error("Failed to fetch passwords");
      }
      
      const data = await response.json();
      setPasswords(data);
    } catch (err) {
      console.error("Error fetching passwords:", err);
      setError("Failed to fetch passwords. Please try again.");
    } finally {
      setIsFetching(false);
    }
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setFormData({
      title: "",
      username: "",
      password: "",
      notes: "",
    });
    setGeneratedPassword("");
    setError("");
  };

  const generatePasswordHandler = () => {
    const chars = [];
    if (useLowercase) chars.push("abcdefghijklmnopqrstuvwxyz");
    if (useUppercase) chars.push("ABCDEFGHIJKLMNOPQRSTUVWXYZ");
    if (useNumbers) chars.push("0123456789");
    if (useSymbols) chars.push("!@#$%^&*()_-+=<>?/[]{}|");

    if (chars.length === 0) {
      setError("Please select at least one character type");
      return;
    }

    let charset = chars.join("");
    let password = "";
    
    // Ensure at least one character from each selected type
    if (useLowercase) {
      charset.match(/[a-z]/);
      password += "abcdefghijklmnopqrstuvwxyz".charAt(Math.floor(Math.random() * 26));
    }
    if (useUppercase) {
      charset.match(/[A-Z]/);
      password += "ABCDEFGHIJKLMNOPQRSTUVWXYZ".charAt(Math.floor(Math.random() * 26));
    }
    if (useNumbers) {
      charset.match(/[0-9]/);
      password += "0123456789".charAt(Math.floor(Math.random() * 10));
    }
    if (useSymbols) {
      charset.match(/[!@#$%^&*()_\-+=<>?/[\]{}|]/);
      password += "!@#$%^&*()_-+=<>?/[]{}|".charAt(Math.floor(Math.random() * 23));
    }

    // Fill the rest of the password
    const initialLength = password ? password.length : 0;
    const remainingLength = length - initialLength;
    for (let i = 0; i < remainingLength; i++) {
      password += charset.charAt(Math.floor(Math.random() * charset.length));
    }

    // Shuffle the password to avoid predictable pattern
    password = password.split('').sort(() => 0.5 - Math.random()).join('');
    
    setGeneratedPassword(password);
    setFormData((prev) => ({ ...prev, password }));
    setError("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");
    setSuccess("");

    if (!formData.title || !formData.username || !formData.password) {
      setError("Please fill in all required fields");
      setIsLoading(false);
      return;
    }

    try {
      const response = await fetch("/api/passwords", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error("Failed to save password");
      }

      const result = await response.json();
      setPasswords((prev) => [...prev, result]);
      setSuccess("Password saved successfully!");
      handleCloseModal();
    } catch (err) {
      console.error("Error saving password:", err);
      setError("Failed to save password. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleDeletePassword = async (id) => {
    try {
      const response = await fetch(`/api/passwords/${id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        throw new Error("Failed to delete password");
      }

      setPasswords((prev) => prev.filter((password) => password.id !== id));
      setSuccess("Password deleted successfully!");
    } catch (err) {
      console.error("Error deleting password:", err);
      setError("Failed to delete password. Please try again.");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 relative overflow-hidden">
      {/* Decorative Elements */}
      <div className="absolute top-20 left-10 w-80 h-80 bg-blue-200 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob"></div>
      <div className="absolute top-40 right-10 w-80 h-80 bg-purple-200 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-2000"></div>
      <div className="absolute -bottom-8 left-1/3 w-80 h-80 bg-pink-200 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-4000"></div>
      <div className="absolute top-1/2 right-1/4 w-64 h-64 bg-green-200 rounded-full mix-blend-multiply filter blur-xl opacity-60 animate-blob animation-delay-3000"></div>
      
      {/* Enhanced light patterns for texture */}
      <div className="absolute inset-0 opacity-30 bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI1IiBoZWlnaHQ9IjUiPgo8cmVjdCB3aWR0aD0iNSIgaGVpZ2h0PSI1IiBmaWxsPSIjZmZmIj48L3JlY3Q+CjxyZWN0IHdpZHRoPSIxIiBoZWlnaHQ9IjEiIGZpbGw9IiNmOGY4ZjgiPjwvcmVjdD4KPC9zdmc+')]"></div>
      
      {/* Subtle grid overlay */}
      <div className="absolute inset-0 bg-grid-pattern opacity-10"></div>
      
      {/* Navigation Bar with Enhanced Glassmorphism */}
      <nav className="glassmorphism py-6 px-4 sm:px-6 lg:px-8 flex justify-between items-center z-10 sticky top-0">
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

        <div className="flex space-x-4">
          <button
            onClick={() => logout()}
            className="relative overflow-hidden rounded-lg group h-10 px-4"
          >
            <span className="absolute inset-0 bg-gradient-to-r from-rose-500 to-pink-500 transition-all duration-300"></span>
            <span className="absolute inset-0 bg-gradient-to-r from-rose-600 to-pink-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300 scale-105 blur-xl"></span>
            <div className="absolute inset-0 scale-0 group-hover:scale-100 transition-transform duration-300 origin-center rounded-lg bg-white/10"></div>
            <span className="absolute inset-0 opacity-0 group-hover:opacity-25 group-active:opacity-50 bg-white transition-opacity duration-200"></span>
            
            <span className="relative flex items-center justify-center text-white font-medium h-full">
              <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
              </svg>
              Logout
            </span>
          </button>
        </div>
      </nav>

      <main className="container mx-auto px-4 py-8 relative z-10">
        <div className="flex flex-col md:flex-row justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-2">Your Password Vault</h1>
            <p className="text-gray-600">Manage your saved passwords and generate new ones securely.</p>
          </div>
          
          <button
            onClick={() => setIsModalOpen(true)}
            className="mt-4 md:mt-0 relative overflow-hidden rounded-lg group h-12 px-6"
          >
            <span className="absolute inset-0 bg-gradient-to-r from-blue-500 to-purple-500 group-hover:from-blue-600 group-hover:to-purple-600 transition-all duration-300"></span>
            <span className="absolute inset-0 bg-gradient-to-r from-blue-600 to-purple-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300 scale-105 blur-xl"></span>
            <div className="absolute inset-0 scale-0 group-hover:scale-100 transition-transform duration-300 origin-center rounded-lg bg-white/10"></div>
            <span className="absolute inset-0 opacity-0 group-hover:opacity-25 group-active:opacity-50 bg-white transition-opacity duration-200"></span>
            
            <span className="relative flex items-center justify-center text-white font-medium h-full">
              <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
              </svg>
              Add New Password
            </span>
          </button>
        </div>

        {error && (
          <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg text-sm animate-fade-in mb-6 relative overflow-hidden">
            <div className="absolute inset-0 bg-red-100/50 rounded-lg"></div>
            <div className="flex relative z-10">
              <svg className="w-5 h-5 text-red-500 mr-2 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <span>{error}</span>
            </div>
          </div>
        )}

        {success && (
          <div className="bg-green-50 border border-green-200 text-green-700 px-4 py-3 rounded-lg text-sm animate-fade-in mb-6 relative overflow-hidden">
            <div className="absolute inset-0 bg-green-100/50 rounded-lg"></div>
            <div className="flex relative z-10">
              <svg className="w-5 h-5 text-green-500 mr-2 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
              <span>{success}</span>
            </div>
          </div>
        )}

        <div className="glassmorphism-card rounded-2xl p-0 mb-8 shadow-xl animate-fade-in relative overflow-hidden">
          <div className="absolute -top-20 -right-20 w-60 h-60 bg-blue-400 rounded-full opacity-10 blur-3xl"></div>
          <div className="absolute -bottom-20 -left-20 w-60 h-60 bg-purple-400 rounded-full opacity-10 blur-3xl"></div>
          
          <h2 className="text-xl font-semibold px-6 pt-6 mb-4 flex items-center text-gray-800">
            <svg className="w-5 h-5 mr-2 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 7a2 2 0 012 2m4 0a6 6 0 01-7.743 5.743L11 17H9v2H7v2H4a1 1 0 01-1-1v-2.586a1 1 0 01.293-.707l5.964-5.964A6 6 0 1121 9z" />
            </svg>
            Quick Password Generator
          </h2>
          
          <div className="px-6 pb-6">
            <PasswordGenerator />
          </div>
        </div>

        <div className="glassmorphism-card rounded-2xl p-6 shadow-xl animate-fade-in relative overflow-hidden">
          <div className="absolute -top-20 -right-20 w-60 h-60 bg-indigo-400 rounded-full opacity-10 blur-3xl"></div>
          <div className="absolute -bottom-20 -left-20 w-60 h-60 bg-teal-400 rounded-full opacity-10 blur-3xl"></div>
          
          <h2 className="text-xl font-semibold mb-4 flex items-center text-gray-800">
            <svg className="w-5 h-5 mr-2 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
            </svg>
            Your Saved Passwords
          </h2>
          
          <div className="relative z-10">
            <PasswordsList
              passwords={passwords}
              handleDeletePassword={handleDeletePassword}
              isFetching={isFetching}
            />
          </div>
        </div>
      </main>

      <Modal isOpen={isModalOpen} onClose={handleCloseModal} title="Add New Password">
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="group">
            <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-1 group-focus-within:text-blue-600 transition-colors duration-200">
              Title <span className="text-red-500">*</span>
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <svg className="w-5 h-5 text-gray-400 group-focus-within:text-blue-500 transition-colors duration-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
                </svg>
              </div>
              <input
                id="title"
                type="text"
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 bg-white/80 backdrop-blur-md"
                placeholder="e.g. Gmail, Amazon, Netflix"
                required
              />
              <div className="absolute inset-0 rounded-lg border border-blue-500 opacity-0 group-focus-within:opacity-100 pointer-events-none transition-opacity duration-200"></div>
            </div>
          </div>

          <div className="group">
            <label htmlFor="username" className="block text-sm font-medium text-gray-700 mb-1 group-focus-within:text-blue-600 transition-colors duration-200">
              Username/Email <span className="text-red-500">*</span>
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <svg className="w-5 h-5 text-gray-400 group-focus-within:text-blue-500 transition-colors duration-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
              </div>
              <input
                id="username"
                type="text"
                value={formData.username}
                onChange={(e) => setFormData({ ...formData, username: e.target.value })}
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 bg-white/80 backdrop-blur-md"
                placeholder="your.email@example.com"
                required
              />
              <div className="absolute inset-0 rounded-lg border border-blue-500 opacity-0 group-focus-within:opacity-100 pointer-events-none transition-opacity duration-200"></div>
            </div>
          </div>

          <div className="group">
            <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1 group-focus-within:text-blue-600 transition-colors duration-200">
              Password <span className="text-red-500">*</span>
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <svg className="w-5 h-5 text-gray-400 group-focus-within:text-blue-500 transition-colors duration-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                </svg>
              </div>
              <input
                id="password"
                type={showPassword ? "text" : "password"}
                value={formData.password}
                onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                className="w-full pl-10 pr-12 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 bg-white/80 backdrop-blur-md"
                placeholder="Enter password or generate one"
                required
              />
              <button 
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-blue-500 transition-colors duration-200"
              >
                {showPassword ? (
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21" />
                  </svg>
                ) : (
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                  </svg>
                )}
              </button>
              <div className="absolute inset-0 rounded-lg border border-blue-500 opacity-0 group-focus-within:opacity-100 pointer-events-none transition-opacity duration-200"></div>
            </div>
            
            <div className="mt-2 flex justify-between items-center">
              <button
                type="button"
                onClick={generatePasswordHandler}
                className="text-blue-600 hover:text-blue-800 text-sm font-medium flex items-center transition-colors duration-200"
              >
                <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                </svg>
                Generate Strong Password
              </button>
              
              <button 
                type="button"
                onClick={() => setIsModalOpen(true)}
                className="text-sm text-gray-500 hover:text-blue-600 transition-colors duration-200"
              >
                Advanced Options
              </button>
            </div>
          </div>

          <div className="group">
            <label htmlFor="notes" className="block text-sm font-medium text-gray-700 mb-1 group-focus-within:text-blue-600 transition-colors duration-200">
              Notes (Optional)
            </label>
            <div className="relative">
              <div className="absolute top-3 left-3 flex items-start pointer-events-none">
                <svg className="w-5 h-5 text-gray-400 group-focus-within:text-blue-500 transition-colors duration-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
              </div>
              <textarea
                id="notes"
                value={formData.notes}
                onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 bg-white/80 backdrop-blur-md h-24 resize-none"
                placeholder="Add any additional notes here..."
              ></textarea>
              <div className="absolute inset-0 rounded-lg border border-blue-500 opacity-0 group-focus-within:opacity-100 pointer-events-none transition-opacity duration-200"></div>
            </div>
          </div>

          <div className="flex items-center justify-end space-x-4">
            <button
              type="button"
              onClick={handleCloseModal}
              className="text-gray-700 hover:text-gray-900 font-medium px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors duration-200"
            >
              Cancel
            </button>
            
            <button
              type="submit"
              disabled={isLoading}
              className="relative overflow-hidden rounded-lg group h-10 px-6"
            >
              <span className="absolute inset-0 bg-gradient-to-r from-blue-500 to-purple-500 group-hover:from-blue-600 group-hover:to-purple-600 transition-all duration-300"></span>
              <span className="absolute inset-0 bg-gradient-to-r from-blue-600 to-purple-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300 scale-105 blur-xl"></span>
              <div className="absolute inset-0 scale-0 group-hover:scale-100 transition-transform duration-300 origin-center rounded-lg bg-white/10"></div>
              <span className="absolute inset-0 opacity-0 group-hover:opacity-25 group-active:opacity-50 bg-white transition-opacity duration-200"></span>
              
              <span className="relative flex items-center justify-center text-white font-medium h-full">
                {isLoading ? (
                  <svg className="animate-spinner h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                ) : (
                  <>
                    Save Password
                    <svg className="ml-2 w-4 h-4 transform group-hover:translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                    </svg>
                  </>
                )}
              </span>
            </button>
          </div>
        </form>
      </Modal>
    </div>
  );
} 