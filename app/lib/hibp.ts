import crypto from 'crypto';

/**
 * Checks if a password appears in the Have I Been Pwned database.
 * Uses the k-Anonymity model for privacy: only the first 5 characters of the hash are sent.
 * 
 * @param password The password to check
 * @returns An object with info whether the password was found and how many times
 */
export async function checkPassword(password: string): Promise<{ isCompromised: boolean; count: number }> {
  try {
    // Calculate the SHA-1 hash of the password
    const hash = crypto.createHash('sha1').update(password).digest('hex').toUpperCase();
    
    // Split the hash into prefix (first 5 characters) and suffix (rest)
    const prefix = hash.slice(0, 5);
    const suffix = hash.slice(5);
    
    // Query the API for all hashes with the same prefix
    const response = await fetch(`https://api.pwnedpasswords.com/range/${prefix}`, {
      headers: {
        'User-Agent': 'PassGen Password Manager',
      },
    });
    
    if (!response.ok) {
      throw new Error(`HIBP API responded with status: ${response.status}`);
    }
    
    // Get the data
    const data = await response.text();
    
    // Look for our suffix in the results (each line is in format: SUFFIX:COUNT)
    const lines = data.split('\n');
    const match = lines.find(line => line.startsWith(suffix));
    
    if (match) {
      // If found, get the number of times the password has been leaked
      const count = parseInt(match.split(':')[1].trim(), 10);
      return { isCompromised: true, count };
    }
    
    // If not found, the password is not known to be leaked
    return { isCompromised: false, count: 0 };
  } catch (error) {
    console.error('Error checking password:', error);
    // In case of errors, we indicate that we're not sure if the password is safe
    return { isCompromised: false, count: 0 };
  }
}

/**
 * Evaluates the security of a password based on various factors.
 * 
 * @param password The password to evaluate
 * @returns An object with security score and feedback
 */
export function evaluatePasswordStrength(password: string): {
  score: number;
  feedback: string;
} {
  if (!password) {
    return { score: 0, feedback: 'No password entered' };
  }
  
  let score = 0;
  
  // Length check
  if (password.length >= 12) {
    score += 4;
  } else if (password.length >= 8) {
    score += 2;
  } else {
    score += 1;
  }
  
  // Diversity check
  if (/[A-Z]/.test(password)) score += 1;
  if (/[a-z]/.test(password)) score += 1;
  if (/[0-9]/.test(password)) score += 1;
  if (/[^A-Za-z0-9]/.test(password)) score += 2;
  
  // Pattern check (negative score for simple patterns)
  if (/(.)\1{2,}/.test(password)) score -= 1; // repeating characters
  if (/^(123456|password|qwerty|abc123)/i.test(password)) score -= 3;
  
  // Calculate the final score (0-10)
  let finalScore = Math.min(10, Math.max(0, score));
  
  // Provide feedback based on the score
  let feedback;
  if (finalScore >= 8) {
    feedback = 'Excellent, very strong password!';
  } else if (finalScore >= 6) {
    feedback = 'Good, strong password';
  } else if (finalScore >= 4) {
    feedback = 'Fair, but could be improved';
  } else {
    feedback = 'Weak password, add more complexity';
  }
  
  return { score: finalScore, feedback };
} 