import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key';

export function verifyToken(token: string) {
  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    console.log('Token geverifieerd:', decoded);
    return { 
      id: (decoded as any).userId, 
      email: (decoded as any).email 
    };
  } catch (error) {
    console.error('Token verificatie mislukt:', error);
    return null;
  }
}

export function generateToken(userId: string): string {
  return jwt.sign({ userId }, JWT_SECRET, { expiresIn: '24h' });
} 