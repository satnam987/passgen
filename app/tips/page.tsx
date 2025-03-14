'use client';

import Link from 'next/link';
import PasswordChecker from '../components/PasswordChecker';
import { useState } from 'react';

const tips = [
  {
    title: 'Use Strong Passwords',
    description: 'Create passwords that are at least 12 characters long and contain a combination of uppercase letters, lowercase letters, numbers, and symbols.',
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
      </svg>
    ),
    color: 'from-blue-500 to-blue-600'
  },
  {
    title: 'Use Unique Passwords',
    description: 'Use a unique password for each service. If one password is compromised, your other accounts will still be secure.',
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
      </svg>
    ),
    color: 'from-green-500 to-green-600'
  },
  {
    title: 'Use a Password Manager',
    description: 'A password manager helps you securely store and manage all your passwords. You only need to remember one master password.',
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2M7 7h10" />
      </svg>
    ),
    color: 'from-purple-500 to-purple-600'
  },
  {
    title: 'Enable Two-Factor Authentication',
    description: 'Two-factor authentication adds an extra layer of security to your accounts. Even if someone has your password, they cannot log in without the second factor.',
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
    color: 'from-yellow-500 to-yellow-600'
  },
  {
    title: 'Regularly Check Your Accounts',
    description: 'Regularly check your accounts for suspicious activities. If you notice anything unusual, change your password immediately.',
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
      </svg>
    ),
    color: 'from-red-500 to-red-600'
  }
];

// Password-related statistics for the statistics section
const passwordStats = [
  {
    number: '80%',
    label: 'Of hacks are related to weak passwords',
    color: 'from-red-500 to-red-600'
  },
  {
    number: '51%',
    label: 'Of people use the same password for multiple accounts',
    color: 'from-orange-500 to-orange-600'
  },
  {
    number: '300M+',
    label: 'Passwords were leaked in 2023 through major data breaches',
    color: 'from-yellow-500 to-yellow-600'
  },
  {
    number: '10,000+',
    label: 'Passwords can be cracked per second by hackers',
    color: 'from-blue-500 to-blue-600'
  }
];

// Common password mistakes
const commonMistakes = [
  {
    title: 'Easy-to-guess personal information',
    description: 'Never use your date of birth, pet names, or other personal information that is easily discoverable.',
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
  },
  {
    title: 'Simple words and sequences',
    description: 'Avoid simple words (e.g., "password") and easy sequences (123456, qwerty) that can be cracked within seconds.',
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
  },
  {
    title: 'Reusing the same password',
    description: 'If one account is hacked, all your other accounts are also at risk if you use the same password everywhere.',
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4" />
      </svg>
    ),
  },
  {
    title: 'Writing down passwords',
    description: 'Storing passwords on paper or in unsecured text files is very risky. Use a password manager instead.',
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
      </svg>
    ),
  }
];

// Phishing recognition tips
const phishingTips = [
  {
    title: 'Check the email address',
    description: 'Look for subtle spelling errors in email addresses (e.g., support@g00gle.com instead of support@google.com).',
  },
  {
    title: 'Be cautious with urgent requests',
    description: 'Phishing emails often create a false sense of urgency to pressure you to act quickly.',
  },
  {
    title: 'Check the URL before logging in',
    description: 'Make sure you are on the correct website by verifying the URL before entering your credentials.',
  },
  {
    title: 'Watch for poor language',
    description: 'Official companies usually don\'t make spelling or grammar mistakes in their communications.',
  },
];

// FAQ about password security
const passwordFAQs = [
  {
    question: 'How often should I change my passwords?',
    answer: 'Experts now advise against periodic password changes, recommending changes only when there is suspicion of a data breach. Frequent changes often lead to weaker passwords. Use strong, unique passwords and change them only when necessary.'
  },
  {
    question: 'Are password managers safe?',
    answer: 'Yes, reliable password managers are very secure. They encrypt your passwords with strong encryption and require one master password. This is much safer than reusing passwords or writing them down.'
  },
  {
    question: 'What is two-factor authentication (2FA) and why is it important?',
    answer: '2FA adds an extra layer of security by requiring a second verification method alongside your password, such as a code on your phone. This makes it much harder for hackers to access your accounts, even if they know your password.'
  },
  {
    question: 'How do I create a password that is both strong and easy to remember?',
    answer: 'Use a passphrase: a series of random words with numbers and symbols. For example: "Horse24!TreeChair" is both strong and easier to remember than "P@s5w0rd!".'
  },
];

export default function TipsPage() {
  const [activeTab, setActiveTab] = useState('tips');
  const [openFAQ, setOpenFAQ] = useState<number | null>(null);

  const toggleFAQ = (index: number) => {
    setOpenFAQ(openFAQ === index ? null : index);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
      {/* Decorative blobs */}
      <div className="fixed inset-0 -z-10 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-blue-200 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-purple-200 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-2000"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-pink-200 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-4000"></div>
      </div>

      {/* Navigation */}
      <nav className="bg-white/80 backdrop-blur-md border-b border-gray-200 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex items-center">
              <Link href="/" className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                PassGen
              </Link>
            </div>
            <div className="flex items-center space-x-4">
              <Link
                href="/"
                className="text-gray-600 hover:text-gray-900 transition-colors duration-200"
              >
                Back to Generator
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Main content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4 animate-fade-in">
            Password Security Guide
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto animate-fade-in animation-delay-200">
            Everything you need to know to keep your online accounts secure
          </p>
        </div>

        {/* Tab navigation */}
        <div className="flex justify-center mb-10">
          <div className="bg-white/70 backdrop-blur-md rounded-full shadow-md p-1 inline-flex space-x-1">
            <button 
              onClick={() => setActiveTab('tips')}
              className={`px-4 py-2 rounded-full font-medium transition-all duration-200 ${
                activeTab === 'tips' 
                  ? 'bg-gradient-to-r from-blue-500 to-purple-500 text-white shadow-md' 
                  : 'text-gray-600 hover:text-gray-900 hover:bg-white/50'
              }`}
            >
              Tips
            </button>
            <button 
              onClick={() => setActiveTab('stats')}
              className={`px-4 py-2 rounded-full font-medium transition-all duration-200 ${
                activeTab === 'stats' 
                  ? 'bg-gradient-to-r from-blue-500 to-purple-500 text-white shadow-md' 
                  : 'text-gray-600 hover:text-gray-900 hover:bg-white/50'
              }`}
            >
              Statistics
            </button>
            <button 
              onClick={() => setActiveTab('mistakes')}
              className={`px-4 py-2 rounded-full font-medium transition-all duration-200 ${
                activeTab === 'mistakes' 
                  ? 'bg-gradient-to-r from-blue-500 to-purple-500 text-white shadow-md' 
                  : 'text-gray-600 hover:text-gray-900 hover:bg-white/50'
              }`}
            >
              Mistakes
            </button>
            <button 
              onClick={() => setActiveTab('phishing')}
              className={`px-4 py-2 rounded-full font-medium transition-all duration-200 ${
                activeTab === 'phishing' 
                  ? 'bg-gradient-to-r from-blue-500 to-purple-500 text-white shadow-md' 
                  : 'text-gray-600 hover:text-gray-900 hover:bg-white/50'
              }`}
            >
              Phishing
            </button>
            <button 
              onClick={() => setActiveTab('faq')}
              className={`px-4 py-2 rounded-full font-medium transition-all duration-200 ${
                activeTab === 'faq' 
                  ? 'bg-gradient-to-r from-blue-500 to-purple-500 text-white shadow-md' 
                  : 'text-gray-600 hover:text-gray-900 hover:bg-white/50'
              }`}
            >
              FAQ
            </button>
            <button 
              onClick={() => setActiveTab('checker')}
              className={`px-4 py-2 rounded-full font-medium transition-all duration-200 ${
                activeTab === 'checker' 
                  ? 'bg-gradient-to-r from-blue-500 to-purple-500 text-white shadow-md' 
                  : 'text-gray-600 hover:text-gray-900 hover:bg-white/50'
              }`}
            >
              Checker
            </button>
          </div>
        </div>

        {/* Tips */}
        {activeTab === 'tips' && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 animate-fade-in">
            {tips.map((tip, index) => (
              <div
                key={tip.title}
                className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div className="flex items-start space-x-4">
                  <div className={`p-3 rounded-lg bg-gradient-to-r ${tip.color} text-white`}>
                    {tip.icon}
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-gray-900 mb-2">
                      {tip.title}
                    </h3>
                    <p className="text-gray-600">
                      {tip.description}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Statistics */}
        {activeTab === 'stats' && (
          <div className="animate-fade-in">
            <div className="text-center mb-10">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">
                Password Security Statistics
              </h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Understanding the numbers behind password security can help you make better security choices.
              </p>
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {passwordStats.map((stat, index) => (
                <div 
                  key={index}
                  className="bg-white rounded-xl shadow-md overflow-hidden transform transition-all duration-300 hover:shadow-xl hover:-translate-y-1"
                  style={{ animationDelay: `${index * 150}ms` }}
                >
                  <div className={`h-2 bg-gradient-to-r ${stat.color}`}></div>
                  <div className="p-6 text-center">
                    <div className={`text-4xl font-bold mb-2 bg-gradient-to-r ${stat.color} bg-clip-text text-transparent`}>
                      {stat.number}
                    </div>
                    <p className="text-gray-600">{stat.label}</p>
                  </div>
                </div>
              ))}
            </div>
            
            <div className="mt-12 bg-white/90 backdrop-blur-md rounded-xl shadow-md p-6">
              <h3 className="text-2xl font-semibold text-gray-900 mb-4">
                What does this mean for you?
              </h3>
              <p className="text-gray-600 mb-4">
                These statistics show that password security is still a major issue. Most hacks don't happen through 
                advanced techniques, but through simple password mistakes that are easy to prevent.
              </p>
              <p className="text-gray-600">
                By using strong, unique passwords and following the tips on this page, you can protect yourself 
                against most cyber attacks. A small effort can make a big difference in your online security.
              </p>
            </div>
          </div>
        )}

        {/* Common mistakes */}
        {activeTab === 'mistakes' && (
          <div className="animate-fade-in">
            <div className="text-center mb-10">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">
                Common Password Mistakes
              </h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                These frequently made mistakes can seriously compromise your online accounts.
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {commonMistakes.map((mistake, index) => (
                <div
                  key={index}
                  className="bg-white rounded-xl shadow-md p-6 border-l-4 border-red-500 hover:shadow-lg transition-all duration-300"
                  style={{ animationDelay: `${index * 150}ms` }}
                >
                  <div className="flex items-start space-x-4">
                    <div className="p-3 rounded-full bg-red-100 text-red-600">
                      {mistake.icon}
                    </div>
                    <div>
                      <h3 className="text-xl font-semibold text-gray-900 mb-2">
                        {mistake.title}
                      </h3>
                      <p className="text-gray-600">
                        {mistake.description}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            
            <div className="mt-10 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl shadow-md p-6 border border-blue-100">
              <div className="flex items-start">
                <div className="p-3 rounded-full bg-blue-100 text-blue-600 mr-4">
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">
                    Did you know?
                  </h3>
                  <p className="text-gray-600">
                    Simple passwords like "123456" and "password" are still used by millions of people.
                    These passwords can be cracked in less than a second by automated tools.
                    A strong password with 12 characters (uppercase letters, lowercase letters, numbers, and symbols) would take 
                    more than 200 years to crack with current technology.
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Phishing recognition */}
        {activeTab === 'phishing' && (
          <div className="animate-fade-in">
            <div className="text-center mb-10">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">
                Recognize Phishing Attacks
              </h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Phishing is one of the most common ways cybercriminals try to obtain your passwords.
                Learn how to recognize and prevent these attacks.
              </p>
            </div>
            
            <div className="bg-white rounded-xl shadow-lg overflow-hidden mb-10">
              <div className="bg-gradient-to-r from-indigo-600 to-purple-600 px-6 py-4">
                <h3 className="text-xl font-semibold text-white">
                  How to recognize a phishing attempt?
                </h3>
              </div>
              <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-6">
                {phishingTips.map((tip, index) => (
                  <div key={index} className="flex">
                    <div className="mr-4 text-indigo-500">
                      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                      </svg>
                    </div>
                    <div>
                      <h4 className="font-medium text-gray-900">{tip.title}</h4>
                      <p className="text-gray-600 text-sm">{tip.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            
            <div className="bg-amber-50 border border-amber-200 rounded-xl p-6 shadow-md">
              <div className="flex items-start">
                <div className="flex-shrink-0 mt-1">
                  <svg className="w-5 h-5 text-amber-600" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                  </svg>
                </div>
                <div className="ml-3">
                  <h3 className="text-lg font-medium text-amber-800">Important to know</h3>
                  <div className="mt-2 text-amber-700">
                    <p>
                      Legitimate companies will <strong>never</strong> ask for your password via email.
                      If you receive a suspicious message, go directly to the official website by manually typing the URL
                      (not by clicking on links in the message) and check your account or contact customer service.
                    </p>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="mt-10 p-6 bg-white rounded-xl shadow-md">
              <h3 className="text-xl font-semibold text-gray-900 mb-4">Example of a phishing email:</h3>
              <div className="border rounded-lg overflow-hidden">
                <div className="bg-gray-100 border-b px-4 py-2 flex justify-between items-center">
                  <div className="font-medium">From: accounts@goog1e.com</div>
                  <div className="text-red-600 bg-red-100 px-2 py-1 rounded text-xs font-medium">Suspicious!</div>
                </div>
                <div className="p-4 bg-white">
                  <div className="font-medium mb-2">Subject: Urgent: Your account is being locked!</div>
                  <div className="text-gray-700 space-y-3">
                    <p>Dear customer,</p>
                    <p>We have detected suspicious activity on your Google account. If you do not respond within 24 hours, your account will be permanently locked.</p>
                    <p>Click on the link below to verify your identity and protect your account:</p>
                    <p className="text-blue-600 underline">https://google-account-verify.com/login</p>
                    <p>Regards,<br/>The Google Security Team</p>
                  </div>
                </div>
              </div>
              <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="p-3 bg-red-50 rounded border border-red-200">
                  <h4 className="font-medium text-red-800 mb-1">Suspicious elements:</h4>
                  <ul className="text-red-700 text-sm space-y-1">
                    <li>• Email address contains a "1" instead of "l" (goog1e vs google)</li>
                    <li>• Threatening, urgent tone to pressure you</li>
                    <li>• URL doesn't match the official domain (google.com)</li>
                    <li>• Generic greeting instead of your name</li>
                  </ul>
                </div>
                <div className="p-3 bg-green-50 rounded border border-green-200">
                  <h4 className="font-medium text-green-800 mb-1">How to respond:</h4>
                  <ul className="text-green-700 text-sm space-y-1">
                    <li>• Don't click on the link</li>
                    <li>• Go directly to accounts.google.com in your browser</li>
                    <li>• Check your account there for notifications</li>
                    <li>• Report the phishing email</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* FAQ */}
        {activeTab === 'faq' && (
          <div className="animate-fade-in">
            <div className="text-center mb-10">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">
                Frequently Asked Questions about Password Security
              </h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Answers to the most common questions about password security and account safety.
              </p>
            </div>
            
            <div className="space-y-4">
              {passwordFAQs.map((faq, index) => (
                <div 
                  key={index} 
                  className="bg-white rounded-xl shadow-md overflow-hidden"
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  <button 
                    onClick={() => toggleFAQ(index)}
                    className="w-full px-6 py-4 text-left font-semibold flex justify-between items-center hover:bg-gray-50 transition-colors duration-200"
                  >
                    <span className="faq-question">{faq.question}</span>
                    <svg 
                      className={`w-5 h-5 text-gray-500 transform transition-transform duration-200 ${openFAQ === index ? 'rotate-180' : ''}`} 
                      fill="none" 
                      stroke="currentColor" 
                      viewBox="0 0 24 24"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </button>
                  <div 
                    className={`px-6 py-4 bg-gray-50 border-t border-gray-100 transition-all duration-200 ${
                      openFAQ === index ? 'block' : 'hidden'
                    }`}
                  >
                    <p className="text-gray-600">
                      {faq.answer}
                    </p>
                  </div>
                </div>
              ))}
            </div>
            
            <div className="mt-10 bg-white/70 backdrop-blur-md rounded-xl shadow-md p-6 border border-purple-100">
              <div className="flex">
                <div className="flex-shrink-0">
                  <svg className="h-6 w-6 text-purple-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                  </svg>
                </div>
                <div className="ml-3">
                  <h3 className="text-lg font-medium text-gray-900">Have another question?</h3>
                  <div className="mt-2 text-gray-600">
                    <p>
                      If you have a question that isn't answered here, visit the official websites of cybersecurity organizations 
                      such as the <a href="https://www.cisa.gov/" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:text-blue-800 underline">Cybersecurity & Infrastructure Security Agency</a> for more information.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Password Checker */}
        {activeTab === 'checker' && (
          <div className="animate-fade-in animation-delay-500">
            <div className="text-center mb-10">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">
                Check Your Password Security
              </h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Use the tool below to check if your password is secure and hasn't appeared in known data breaches.
                The check is securely performed with the "Have I Been Pwned" service without sending your password.
              </p>
            </div>
            
            <PasswordChecker />
            
            <div className="text-center mt-8 text-sm text-gray-500">
              <p>Powered by <a href="https://haveibeenpwned.com" target="_blank" rel="noopener noreferrer" className="text-indigo-600 hover:text-indigo-800 underline">Have I Been Pwned</a> - a service that checks if passwords appear in known data breaches.</p>
              <p className="mt-1">Your password never leaves your browser - only a partial hash is sent to protect your privacy.</p>
            </div>
          </div>
        )}
      </main>
    </div>
  );
} 