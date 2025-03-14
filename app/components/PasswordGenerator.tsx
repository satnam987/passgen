'use client';

import { useState } from 'react';
import { EventEmitter } from 'events';

// Event emitter voor wachtwoordgeneratie events
export const passwordEvents = new EventEmitter();

interface PasswordGeneratorProps {
  // Optionele initiële waarden
  initialLength?: number;
  initialUseSymbols?: boolean;
  initialUseNumbers?: boolean;
  initialUseLowercase?: boolean;
  initialUseUppercase?: boolean;
}

export default function PasswordGenerator({ 
  initialLength = 12,
  initialUseSymbols = true,
  initialUseNumbers = true,
  initialUseLowercase = true,
  initialUseUppercase = true
}: PasswordGeneratorProps) {
  // Alle state direct in de component
  const [length, setLength] = useState(initialLength);
  const [useSymbols, setUseSymbols] = useState(initialUseSymbols);
  const [useNumbers, setUseNumbers] = useState(initialUseNumbers);
  const [useLowercase, setUseLowercase] = useState(initialUseLowercase);
  const [useUppercase, setUseUppercase] = useState(initialUseUppercase);
  const [password, setPassword] = useState("");
  const [copied, setCopied] = useState(false);
  const [passwordStrength, setPasswordStrength] = useState('');
  const [crackTime, setCrackTime] = useState('');

  // Functie om wachtwoord te genereren
  const generatePassword = () => {
    const charset = {
      uppercase: 'ABCDEFGHIJKLMNOPQRSTUVWXYZ',
      lowercase: 'abcdefghijklmnopqrstuvwxyz',
      numbers: '0123456789',
      symbols: '!@#$%^&*()_-+=<>?/[]{}|'
    };
    
    let result = '';
    let availableCharsets: string[] = [];
    
    if (useUppercase) availableCharsets.push(charset.uppercase);
    if (useLowercase) availableCharsets.push(charset.lowercase);
    if (useNumbers) availableCharsets.push(charset.numbers);
    if (useSymbols) availableCharsets.push(charset.symbols);
    
    // Als geen karaktersets zijn geselecteerd, gebruik dan standaard lowercase
    if (availableCharsets.length === 0) {
      availableCharsets.push(charset.lowercase);
    }
    
    // Verzeker dat er minstens één karakter van elk geselecteerde type is
    if (useUppercase) {
      result += charset.uppercase.charAt(Math.floor(Math.random() * charset.uppercase.length));
    }
    if (useLowercase) {
      result += charset.lowercase.charAt(Math.floor(Math.random() * charset.lowercase.length));
    }
    if (useNumbers) {
      result += charset.numbers.charAt(Math.floor(Math.random() * charset.numbers.length));
    }
    if (useSymbols) {
      result += charset.symbols.charAt(Math.floor(Math.random() * charset.symbols.length));
    }
    
    // Vul de rest van het wachtwoord aan
    const combinedCharset = availableCharsets.join('');
    for (let i = result.length; i < length; i++) {
      result += combinedCharset.charAt(Math.floor(Math.random() * combinedCharset.length));
    }
    
    // Shuffle het wachtwoord voor betere veiligheid
    const shuffled = result.split('').sort(() => 0.5 - Math.random()).join('');
    
    // Update state
    setPassword(shuffled);
    updatePasswordStrength(shuffled);
    
    // Emit event wanneer een nieuw wachtwoord wordt gegenereerd
    passwordEvents.emit('passwordGenerated', shuffled);
  };

  // Kopieer wachtwoord
  const handleCopy = () => {
    if (password) {
      navigator.clipboard.writeText(password);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  // Update functie voor password strength
  const updatePasswordStrength = (pwd: string) => {
    if (!pwd) {
      setPasswordStrength('');
      setCrackTime('');
      return;
    }
    
    // Eenvoudige logica voor password strength
    const passwordLength = pwd.length;
    const hasUppercase = /[A-Z]/.test(pwd);
    const hasLowercase = /[a-z]/.test(pwd);
    const hasNumbers = /[0-9]/.test(pwd);
    const hasSymbols = /[^A-Za-z0-9]/.test(pwd);
    
    const typesCount = [hasUppercase, hasLowercase, hasNumbers, hasSymbols].filter(Boolean).length;
    
    if (passwordLength >= 12 && typesCount >= 3) {
      setPasswordStrength('Strong');
      setCrackTime('Centuries');
    } else if (passwordLength >= 8 && typesCount >= 2) {
      setPasswordStrength('Good');
      setCrackTime('Decades');
    } else {
      setPasswordStrength('Weak');
      setCrackTime('Days');
    }
  };

  // Styles
  const mainContainerStyles = {
    borderRadius: "16px",
    padding: "20px",
    backgroundColor: "white",
    width: "100%",
    boxShadow: "0 4px 14px rgba(0, 0, 0, 0.1)"
  };

  const inputContainerStyles = {
    display: "flex",
    marginBottom: "20px"
  };

  const inputStyles = {
    flex: "1",
    height: "46px",
    padding: "12px 16px",
    border: "1px solid #d1d5db",
    borderRadius: "8px",
    fontFamily: "monospace",
    fontSize: "16px",
    marginRight: "8px",
    backgroundColor: "white",
    color: "#000000"
  };

  const buttonStyles = {
    backgroundColor: "#3b82f6",
    color: "white",
    border: "none",
    borderRadius: "8px",
    padding: "8px 12px",
    cursor: "pointer",
    fontWeight: "500" as const,
    fontSize: "14px"
  };

  const strengthMeterContainerStyles = {
    marginBottom: "20px"
  };

  const strengthMeterStyles = {
    height: "8px",
    backgroundColor: "#e5e7eb",
    borderRadius: "4px",
    overflow: "hidden",
    marginTop: "8px",
    marginBottom: "8px"
  };

  const strengthLabelStyles = {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center"
  };

  const labelStyles = {
    display: "block",
    marginBottom: "8px",
    fontSize: "14px",
    color: "#374151",
    fontWeight: "500" as const
  };

  const getStrengthFillStyles = () => {
    const baseStyle = {
      height: "100%",
      borderRadius: "4px",
      width: passwordStrength === 'Strong' ? '90%' : passwordStrength === 'Good' ? '60%' : '30%'
    };
    
    if (passwordStrength === 'Strong') {
      return { ...baseStyle, backgroundColor: "#4285f4" };
    } else if (passwordStrength === 'Good') {
      return { ...baseStyle, backgroundColor: "#fbbc05" };
    }
    return { ...baseStyle, backgroundColor: "#ea4335" };
  };

  const generateButtonStyles = {
    width: "100%",
    padding: "12px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#4285f4",
    background: "linear-gradient(90deg, #4285f4 0%, #8c4bff 100%)",
    color: "white",
    border: "none",
    borderRadius: "8px",
    fontWeight: "500" as const,
    fontSize: "16px",
    cursor: "pointer"
  };

  const sliderContainerStyles = {
    marginBottom: "20px"
  };

  const sliderStyles = {
    width: "100%",
    height: "6px",
    appearance: "none" as const,
    backgroundColor: "#e5e7eb",
    borderRadius: "4px",
    outline: "none"
  };

  const checkboxesContainerStyles = {
    display: "grid",
    gridTemplateColumns: "1fr 1fr",
    gap: "16px",
    marginBottom: "20px"
  };

  const checkboxLabelStyles = {
    display: "flex",
    alignItems: "center",
    fontSize: "14px",
    color: "#374151",
    cursor: "pointer"
  };

  const checkboxStyles = {
    marginRight: "8px",
    width: "16px",
    height: "16px"
  };

  return (
    <div style={mainContainerStyles}>
      <div style={inputContainerStyles}>
        <input
          type="text"
          readOnly
          value={password}
          placeholder="Generate a password..."
          style={inputStyles}
        />
        <button
          onClick={handleCopy}
          style={buttonStyles}
          title={copied ? "Copied!" : "Copy to clipboard"}
        >
          <svg width="20" height="20" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 5H6a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2v-1M8 5a2 2 0 002 2h2a2 2 0 002-2M8 5a2 2 0 012-2h2a2 2 0 012 2m0 0h2a2 2 0 012 2v3m2 4H10m0 0l3-3m-3 3l3 3"></path>
          </svg>
        </button>
      </div>
      
      {password && (
        <div style={strengthMeterContainerStyles}>
          <div style={strengthLabelStyles}>
            <span style={labelStyles}>Password Strength:</span>
            <span style={{ fontWeight: "500", color: passwordStrength === 'Strong' ? "#4285f4" : passwordStrength === 'Good' ? "#fbbc05" : "#ea4335" }}>
              {passwordStrength}
            </span>
          </div>
          <div style={strengthMeterStyles}>
            <div style={getStrengthFillStyles()}></div>
          </div>
          <div style={{ fontSize: "14px", color: "#6b7280" }}>
            Estimated time to crack: <span style={{ fontWeight: "500" }}>{crackTime}</span>
          </div>
        </div>
      )}
      
      <div style={sliderContainerStyles}>
        <label style={labelStyles}>
          Password Length: {length}
        </label>
        <input
          type="range"
          min="8"
          max="32"
          value={length}
          onChange={(e) => setLength(Number(e.target.value))}
          style={sliderStyles}
        />
      </div>
      
      <div style={checkboxesContainerStyles}>
        <label style={checkboxLabelStyles}>
          <input
            type="checkbox"
            checked={useUppercase}
            onChange={(e) => setUseUppercase(e.target.checked)}
            style={checkboxStyles}
          />
          Uppercase (A-Z)
        </label>
        
        <label style={checkboxLabelStyles}>
          <input
            type="checkbox"
            checked={useLowercase}
            onChange={(e) => setUseLowercase(e.target.checked)}
            style={checkboxStyles}
          />
          Lowercase (a-z)
        </label>
        
        <label style={checkboxLabelStyles}>
          <input
            type="checkbox"
            checked={useNumbers}
            onChange={(e) => setUseNumbers(e.target.checked)}
            style={checkboxStyles}
          />
          Numbers (0-9)
        </label>
        
        <label style={checkboxLabelStyles}>
          <input
            type="checkbox"
            checked={useSymbols}
            onChange={(e) => setUseSymbols(e.target.checked)}
            style={checkboxStyles}
          />
          Symbols (!@#$)
        </label>
      </div>
      
      <button
        onClick={generatePassword}
        style={generateButtonStyles}
      >
        <svg width="20" height="20" fill="none" stroke="currentColor" viewBox="0 0 24 24" style={{marginRight: "8px"}}>
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"></path>
        </svg>
        Generate Password
      </button>
    </div>
  );
} 