import { useState } from "react";
import { auth, googleProvider } from "@/integrations/firebase/client";
import { createUserWithEmailAndPassword, signInWithPopup, updateProfile } from "firebase/auth";
import { useNavigate, Link } from "react-router-dom";
import { toast } from "sonner";
import { Cross } from "lucide-react";

const SignupPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [displayName, setDisplayName] = useState("");
  const [loading, setLoading] = useState(false);
  const [googleLoading, setGoogleLoading] = useState(false);
  const navigate = useNavigate();

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    if (password.length < 6) {
      toast.error("Password must be at least 6 characters");
      return;
    }
    setLoading(true);
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      if (displayName && userCredential.user) {
        await updateProfile(userCredential.user, {
          displayName: displayName,
        });
      }
      toast.success("Account created successfully!");
      navigate("/");
    } catch (error: any) {
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleSignup = async () => {
    setGoogleLoading(true);
    try {
      await signInWithPopup(auth, googleProvider);
      toast.success("Account created successfully!");
      navigate("/");
    } catch (error: any) {
      toast.error(error.message);
    } finally {
      setGoogleLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-navy-gradient flex items-center justify-center px-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <div className="flex items-center justify-center gap-2 mb-4">
            <Cross className="text-gold" size={32} />
            <span className="font-heading font-bold text-2xl text-primary-foreground">JDM</span>
          </div>
          <h1 className="font-heading text-3xl font-bold text-primary-foreground">Create Account</h1>
          <p className="text-primary-foreground/60 mt-2">Join Jesus Discipleship Ministry</p>
        </div>

        <form onSubmit={handleSignup} className="bg-primary-foreground/5 backdrop-blur-sm border border-gold/20 rounded-xl p-8 space-y-5">
          <div className="space-y-4">
            <button
              type="button"
              onClick={handleGoogleSignup}
              disabled={googleLoading}
              className="w-full py-3 px-4 rounded-lg bg-white text-gray-900 font-sans font-semibold hover:bg-gray-50 transition-colors disabled:opacity-50 flex items-center justify-center gap-3 border border-gray-300"
            >
              <svg className="w-5 h-5" viewBox="0 0 24 24">
                <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
              </svg>
              {googleLoading ? "Signing up..." : "Continue with Google"}
            </button>

            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <span className="w-full border-t border-primary-foreground/20" />
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-2 bg-primary-foreground/5 text-primary-foreground/60">Or create account with email</span>
              </div>
            </div>
          </div>

          <div>
            <label className="font-sans text-sm text-primary-foreground/80 mb-1 block">Full Name</label>
            <input
              type="text"
              value={displayName}
              onChange={(e) => setDisplayName(e.target.value)}
              required
              className="w-full px-4 py-3 rounded-lg bg-primary-foreground/10 border border-gold/20 text-primary-foreground placeholder:text-primary-foreground/30 focus:outline-none focus:border-gold font-sans"
              placeholder="Ayodele Olusola"
            />
          </div>
          <div>
            <label className="font-sans text-sm text-primary-foreground/80 mb-1 block">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full px-4 py-3 rounded-lg bg-primary-foreground/10 border border-gold/20 text-primary-foreground placeholder:text-primary-foreground/30 focus:outline-none focus:border-gold font-sans"
              placeholder="your@email.com"
            />
          </div>
          <div>
            <label className="font-sans text-sm text-primary-foreground/80 mb-1 block">Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              minLength={6}
              className="w-full px-4 py-3 rounded-lg bg-primary-foreground/10 border border-gold/20 text-primary-foreground placeholder:text-primary-foreground/30 focus:outline-none focus:border-gold font-sans"
              placeholder="at least 6 characters"
            />
          </div>
          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 rounded-lg bg-gold text-accent-foreground font-sans font-semibold hover:bg-gold-light transition-colors disabled:opacity-50"
          >
            {loading ? "Creating account..." : "Sign Up"}
          </button>
          <p className="text-center text-primary-foreground/60 text-sm font-sans">
            Already have an account?{" "}
            <Link to="/login" className="text-gold hover:underline">Sign In</Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default SignupPage;
