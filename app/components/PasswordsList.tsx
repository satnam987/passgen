import { useState } from 'react';

interface Password {
  id: string;
  title: string;
  username: string;
  password: string;
  notes?: string;
  createdAt: string;
}

interface PasswordsListProps {
  passwords: Password[];
  handleDeletePassword: (id: string) => void;
  isFetching: boolean;
}

export default function PasswordsList({ 
  passwords, 
  handleDeletePassword,
  isFetching 
}: PasswordsListProps) {
  const [visiblePasswords, setVisiblePasswords] = useState<Record<string, boolean>>({});
  const [showConfirmDelete, setShowConfirmDelete] = useState<string | null>(null);
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [expandedId, setExpandedId] = useState<string | null>(null);

  const togglePasswordVisibility = (id: string) => {
    setVisiblePasswords(prev => ({
      ...prev,
      [id]: !prev[id]
    }));
  };

  const copyPassword = (password: string, id: string) => {
    navigator.clipboard.writeText(password);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const copyUsername = (username: string, id: string) => {
    navigator.clipboard.writeText(username);
    setCopiedId(`${id}-username`);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const toggleExpandCard = (id: string) => {
    setExpandedId(prev => prev === id ? null : id);
  };
  
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString(undefined, { 
      year: 'numeric', 
      month: 'short', 
      day: 'numeric' 
    });
  };

  if (isFetching) {
    return (
      <div className="flex justify-center items-center py-12">
        <div className="flex flex-col items-center">
          <div className="w-12 h-12 border-4 border-blue-200 border-t-blue-500 rounded-full animate-spinner"></div>
          <p className="mt-4 text-gray-500">Loading your passwords...</p>
        </div>
      </div>
    );
  }

  if (!passwords || passwords.length === 0) {
    return (
      <div className="py-12 text-center">
        <div className="inline-block p-4 bg-blue-50 rounded-full mb-4">
          <svg className="w-12 h-12 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
          </svg>
        </div>
        <h3 className="text-xl font-medium text-gray-800 mb-2">No passwords saved yet</h3>
        <p className="text-gray-500 mb-6">Add your first password using the button above</p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {passwords.map((password) => (
        <div 
          key={password.id} 
          className="bg-white/90 backdrop-blur-sm rounded-xl border border-gray-200 overflow-hidden hover:shadow-lg transition-all duration-300 group animate-fade-in"
        >
          <div 
            className="relative p-4 flex flex-col sm:flex-row justify-between cursor-pointer"
            onClick={() => toggleExpandCard(password.id)}
          >
            {/* Main Content */}
            <div className="flex-grow pr-6">
              <div className="flex items-center mb-2">
                <div className="w-10 h-10 bg-gradient-to-br from-blue-100 to-purple-100 rounded-full flex items-center justify-center mr-3 group-hover:from-blue-200 group-hover:to-purple-200 transition-all duration-300">
                  <span className="text-purple-600 font-medium text-lg">
                    {password.title.substring(0, 1).toUpperCase()}
                  </span>
                </div>
                <div>
                  <h3 className="font-medium text-gray-900 text-lg line-clamp-1">{password.title}</h3>
                  <div className="flex items-center space-x-2 text-sm text-gray-500">
                    <span className="line-clamp-1">{password.username}</span>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        copyUsername(password.username, password.id);
                      }}
                      className="p-1 hover:text-blue-500 transition-colors duration-200"
                      title="Copy username"
                    >
                      {copiedId === `${password.id}-username` ? (
                        <svg className="w-4 h-4 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                      ) : (
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                        </svg>
                      )}
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex items-center space-x-1">
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  togglePasswordVisibility(password.id);
                }}
                className="p-2 text-gray-400 hover:text-blue-600 transition-colors duration-200 rounded-md hover:bg-blue-50"
                title={visiblePasswords[password.id] ? "Hide password" : "Show password"}
              >
                {visiblePasswords[password.id] ? (
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
              
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  copyPassword(password.password, password.id);
                }}
                className="p-2 text-gray-400 hover:text-blue-600 transition-colors duration-200 rounded-md hover:bg-blue-50"
                title="Copy password"
              >
                {copiedId === password.id ? (
                  <svg className="w-5 h-5 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                ) : (
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 5H6a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2v-1M8 5a2 2 0 002 2h2a2 2 0 002-2M8 5a2 2 0 012-2h2a2 2 0 012 2m0 0h2a2 2 0 012 2v3m2 4H10m0 0l3-3m-3 3l3 3" />
                  </svg>
                )}
              </button>
              
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  if (showConfirmDelete === password.id) {
                    handleDeletePassword(password.id);
                    setShowConfirmDelete(null);
                  } else {
                    setShowConfirmDelete(password.id);
                  }
                }}
                className={`p-2 rounded-md transition-colors duration-200 ${
                  showConfirmDelete === password.id 
                    ? 'bg-red-100 text-red-600 hover:bg-red-200' 
                    : 'text-gray-400 hover:text-red-600 hover:bg-red-50'
                }`}
                title={showConfirmDelete === password.id ? "Click again to confirm" : "Delete"}
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                </svg>
              </button>
              
              <button 
                onClick={(e) => {
                  e.stopPropagation();
                  toggleExpandCard(password.id);
                }}
                className="p-2 text-gray-400 hover:text-blue-600 transition-colors duration-200 rounded-md hover:bg-blue-50"
                title={expandedId === password.id ? "Collapse" : "Expand"}
              >
                <svg 
                  className={`w-5 h-5 transform transition-transform duration-200 ${expandedId === password.id ? 'rotate-180' : ''}`} 
                  fill="none" 
                  stroke="currentColor" 
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>
            </div>
          </div>

          {/* Password Preview */}
          <div className="px-4 pb-2">
            <div className="relative flex items-center bg-gray-50 rounded-lg py-1.5 px-3">
              <span className="text-sm font-mono tracking-wide flex-grow">
                {visiblePasswords[password.id] 
                  ? password.password 
                  : '• • • • • • • • • • • •'}
              </span>
            </div>
          </div>

          {/* Expanded Details */}
          {expandedId === password.id && (
            <div className="px-4 pb-4 pt-2 animate-fade-in border-t border-gray-100 mt-2">
              {password.notes && (
                <div className="mb-4">
                  <h4 className="text-sm font-medium text-gray-700 mb-1">Notes</h4>
                  <p className="text-sm text-gray-600 bg-gray-50 p-3 rounded-lg whitespace-pre-wrap">{password.notes}</p>
                </div>
              )}
              
              <div className="flex flex-wrap gap-x-6 gap-y-2 text-xs text-gray-500">
                <div>
                  <span className="font-medium">Created:</span> {formatDate(password.createdAt)}
                </div>
                <div>
                  <span className="font-medium">Password Strength:</span> {
                    password.password && password.password.length >= 16 ? 'Strong' : 'Medium'
                  }
                </div>
              </div>
            </div>
          )}
        </div>
      ))}
    </div>
  );
} 