import { 
  collection, 
  addDoc, 
  getDocs, 
  query, 
  where, 
  deleteDoc,
  doc,
  updateDoc,
  serverTimestamp,
  Timestamp
} from 'firebase/firestore';
import { db } from '../firebase/config';

export interface Password {
  id?: string;
  website: string;
  username: string;
  password: string;
  userId: string;
  createdAt?: Timestamp;
  updatedAt?: Timestamp;
}

// Create a new password entry
export const createPassword = async (passwordData: Omit<Password, 'id' | 'createdAt' | 'updatedAt'>) => {
  try {
    const passwordsCollection = collection(db, 'passwords');
    const docRef = await addDoc(passwordsCollection, {
      ...passwordData,
      createdAt: serverTimestamp(),
      updatedAt: serverTimestamp()
    });
    
    return { id: docRef.id, ...passwordData };
  } catch (error) {
    console.error('Error creating password:', error);
    throw new Error('Failed to create password');
  }
};

// Get all passwords for a user
export const getPasswordsByUserId = async (userId: string): Promise<Password[]> => {
  try {
    const passwordsCollection = collection(db, 'passwords');
    const q = query(passwordsCollection, where('userId', '==', userId));
    const querySnapshot = await getDocs(q);
    
    return querySnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    } as Password));
  } catch (error) {
    console.error('Error getting passwords:', error);
    throw new Error('Failed to get passwords');
  }
};

// Update an existing password entry
export const updatePassword = async (id: string, passwordData: Partial<Omit<Password, 'id' | 'createdAt' | 'updatedAt'>>) => {
  try {
    const passwordRef = doc(db, 'passwords', id);
    await updateDoc(passwordRef, {
      ...passwordData,
      updatedAt: serverTimestamp()
    });
    
    return { id, ...passwordData };
  } catch (error) {
    console.error('Error updating password:', error);
    throw new Error('Failed to update password');
  }
};

// Delete a password entry
export const deletePassword = async (id: string) => {
  try {
    const passwordRef = doc(db, 'passwords', id);
    await deleteDoc(passwordRef);
    return id;
  } catch (error) {
    console.error('Error deleting password:', error);
    throw new Error('Failed to delete password');
  }
}; 