import * as React from "react";
import { createContext, useContext, useState, useEffect } from "react";
import { 
  onAuthStateChanged, 
  signInWithPopup, 
  GoogleAuthProvider, 
  signOut,
  User
} from "firebase/auth";
import { auth } from "../lib/firebase";

interface AuthContextType {
  user: User | null;
  loading: boolean;
  isAdmin: boolean;
  login: () => Promise<void>;
  logout: () => Promise<void>;
  error: string | null;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const ADMIN_EMAIL = "joyk1838@gmail.com"; 

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user);
      setLoading(false);
      setError(null);
    });

    return () => unsubscribe();
  }, []);

  const login = async () => {
    setError(null);
    const provider = new GoogleAuthProvider();
    // Force account selection to help debug issues with multiple accounts
    provider.setCustomParameters({
      prompt: 'select_account'
    });
    
    try {
      await signInWithPopup(auth, provider);
    } catch (err: any) {
      console.error("Login failed:", err);
      if (err.code === 'auth/popup-blocked') {
        setError("Login popup was blocked. Please allow popups for this site or open in a new tab.");
      } else if (err.code === 'auth/cancelled-popup-request') {
        setError("Previous login request is still pending.");
      } else {
        setError(`Login failed: ${err.message}`);
      }
    }
  };

  const logout = async () => {
    try {
      await signOut(auth);
      setError(null);
    } catch (err: any) {
      console.error("Logout failed:", err);
    }
  };

  const value = {
    user,
    loading,
    isAdmin: user?.email?.toLowerCase() === ADMIN_EMAIL.toLowerCase(),
    login,
    logout,
    error,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
