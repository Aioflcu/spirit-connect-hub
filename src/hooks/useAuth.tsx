import { useState, useEffect, createContext, useContext } from "react";
import { auth } from "@/integrations/firebase/client";
import { User, onAuthStateChanged, signOut as firebaseSignOut } from "firebase/auth";

interface AuthContextType {
  user: User | null;
  isAdmin: boolean;
  loading: boolean;
  signOut: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType>({
  user: null,
  isAdmin: false,
  loading: true,
  signOut: async () => {},
});

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isAdmin, setIsAdmin] = useState(false);
  const [loading, setLoading] = useState(true);

  console.log('AuthProvider: Initializing...');

  const checkAdmin = async (userId: string) => {
    try {
      // TODO: Implement admin role checking with Firestore or other method
      // For now, checking if user email is in a hardcoded list
      const adminEmails = ['admin@jdm.org', 'kd1dave123@gmail.com']; // Add admin emails here
      const isUserAdmin = adminEmails.includes(user?.email || '');
      console.log('Admin check:', { email: user?.email, isUserAdmin });
      setIsAdmin(isUserAdmin);
    } catch (error) {
      console.error('Error checking admin status:', error);
      setIsAdmin(false);
    }
  };

  useEffect(() => {
    console.log('AuthProvider: Setting up auth state listener...');
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      console.log('AuthProvider: Auth state changed', { user: user?.email, uid: user?.uid });
      setUser(user);
      if (user) {
        checkAdmin(user.uid);
      } else {
        setIsAdmin(false);
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

    return () => unsubscribe();
  }, [];

  const signOut = async () => {
    await firebaseSignOut(auth);
  };

  return (
    <AuthContext.Provider value={{ user, isAdmin, loading, signOut }}>
      {children}
    </AuthContext.Provider>
  );
};
