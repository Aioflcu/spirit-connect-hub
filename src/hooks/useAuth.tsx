import { ReactNode, createContext, useContext, useEffect, useState } from "react";
import { User } from "@supabase/supabase-js";
import { supabase } from "@/integrations/supabase/client";

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

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isAdmin, setIsAdmin] = useState(false);

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let mounted = true;

    const syncSession = async () => {
      if (!mounted) return;
      const {
        data: { session },
      } = await supabase.auth.getSession();
      if (mounted) {
        setUser(session?.user ?? null);
        setLoading(false);
      }
    };

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      if (!mounted) return;
      setUser(session?.user ?? null);
      setLoading(false);
    });

    void syncSession();

    return () => {
      mounted = false;
      subscription.unsubscribe();
    };
  }, []);

  const signOut = async () => {
    await supabase.auth.signOut();
    setUser(null);
    setIsAdmin(false);
  };

  const checkAdmin = async (currentUser: User) => {
    // Check user_metadata or email for admin
    if (currentUser.user_metadata?.isAdmin) {
      setIsAdmin(true);
      return;
    }
    if (currentUser.email === 'admin@jdm.org') { // Fallback
      setIsAdmin(true);
      return;
    }
    setIsAdmin(false);
  };

  useEffect(() => {
    if (user) {
      void checkAdmin(user);
    }
  }, [user]);

  return (
    <AuthContext.Provider value={{ user, isAdmin, loading, signOut }}>
      {children}
    </AuthContext.Provider>
  );
};

