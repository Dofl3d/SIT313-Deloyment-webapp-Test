import { 
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged 
} from 'firebase/auth';
import { doc, setDoc } from 'firebase/firestore';
import bcrypt from 'bcryptjs';
import { auth, db } from '../firebase/config';

// Handles user registration, login, logout, and authentication state using Firebase Auth and Firestore.

// Hashes a password using bcrypt before storing in Firestore
export const hashPassword = async (password) => {
  const saltRounds = 10;
  return await bcrypt.hash(password, saltRounds);
};

// Verifies a password against a hashed password (not used in login, but useful for custom logic)
export const verifyPassword = async (password, hashedPassword) => {
  return await bcrypt.compare(password, hashedPassword);
};

// Registers a new user with Firebase Auth and stores additional info in Firestore
export const registerUser = async (userData) => {
  try {
    const { email, password, firstName, lastName } = userData;
    
    // Create user in Firebase Authentication
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;
    
    // Hash the password before saving to Firestore (extra security)
    const hashedPassword = await hashPassword(password);
    
    // Store user profile in Firestore under 'users' collection
    await setDoc(doc(db, 'users', user.uid), {
      firstName,
      lastName,
      email,
      password: hashedPassword, // Store hashed password
      createdAt: new Date().toISOString(),
      uid: user.uid
    });
    
    return { success: true, user };
  } catch (error) {
    // Return error message if registration fails
    return { success: false, error: error.message };
  }
};

// Logs in a user using Firebase Authentication
export const loginUser = async (email, password) => {
  try {
    // Attempt to sign in with email and password
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    return { success: true, user: userCredential.user };
  } catch (error) {
    // Handle common Firebase Auth errors
    let errorMessage = 'Login failed. Please check your credentials.';
    
    if (error.code === 'auth/user-not-found') {
      errorMessage = 'No account found with this email address.';
    } else if (error.code === 'auth/wrong-password') {
      errorMessage = 'Invalid password.';
    } else if (error.code === 'auth/invalid-email') {
      errorMessage = 'Invalid email address.';
    }
    
    return { success: false, error: errorMessage };
  }
};

// Logs out the current user
export const logoutUser = async () => {
  try {
    await signOut(auth);
    return { success: true };
  } catch (error) {
    return { success: false, error: error.message };
  }
};

// Observes authentication state changes (used in AuthContext)
export const onAuthStateChange = (callback) => {
  return onAuthStateChanged(auth, callback);
};