import React, { createContext, useState, useEffect, useContext } from 'react';
import { signInWithPopup, GoogleAuthProvider, signOut, onAuthStateChanged } from "firebase/auth";
import { auth } from '../firebase'; // Import from shared config
import axios from 'axios';

const googleProvider = new GoogleAuthProvider();

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [token, setToken] = useState(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      if (currentUser) {
        const idToken = await currentUser.getIdToken();
        setToken(idToken);

        // Sync with backend
        try {
          await axios.post('http://localhost:4000/api/auth/sync', {
            displayName: currentUser.displayName,
            photoURL: currentUser.photoURL
          }, {
            headers: { Authorization: `Bearer ${idToken}` }
          });
        } catch (error) {
          console.error("Backend sync failed", error);
        }

        setUser(currentUser);
      } else {
        setUser(null);
        setToken(null);
      }
      setLoading(false);
    });

    return unsubscribe;
  }, []);

  const loginWithGoogle = async () => {
    try {
      await signInWithPopup(auth, googleProvider);
    } catch (error) {
      console.error("Login failed", error);
    }
  };

  const logout = () => {
    return signOut(auth);
  };

  const value = {
    user,
    token,
    loginWithGoogle,
    logout,
    loading
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
};
