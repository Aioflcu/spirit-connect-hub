import { useMemo, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { Cross } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const redirectTo = useMemo(
    () => new URLSearchParams(location.search).get("redirect") || "/",
    [location.search]
  );

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const { error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) throw error;

      toast.success("Welcome back!");
      navigate(redirectTo);
    } catch (error: any) {
      toast.error(error.message || "Unable to sign in.");
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleSignIn = async () => {
    setLoading(true);

    try {
      const { error } = await supabase.auth.signInWithOAuth({
        provider: "google",
        options: {
          redirectTo: `${window.location.origin}${redirectTo}`,
        },
      });

      if (error) throw error;
    } catch (error: any) {
      toast.error(error.message || "Unable to sign in with Google.");
      setLoading(false);
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
          <h1 className="font-heading text-3xl font-bold text-primary-foreground">Welcome Back</h1>
          <p className="text-primary-foreground/60 mt-2 font-sans">
            Sign in to manage hymns, daily Bible, and livestream links.
          </p>
        </div>

        <form onSubmit={handleLogin} className="bg-primary-foreground/5 backdrop-blur-sm border border-gold/20 rounded-xl p-8 space-y-5">
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
              className="w-full px-4 py-3 rounded-lg bg-primary-foreground/10 border border-gold/20 text-primary-foreground placeholder:text-primary-foreground/30 focus:outline-none focus:border-gold font-sans"
              placeholder="Enter your password"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 rounded-lg bg-gold text-accent-foreground font-sans font-semibold hover:bg-gold-light transition-colors disabled:opacity-50"
          >
            {loading ? "Signing in..." : "Sign In"}
          </button>

          <button
            type="button"
            onClick={handleGoogleSignIn}
            disabled={loading}
            className="w-full py-3 rounded-lg bg-white text-slate-900 font-sans font-semibold border border-slate-200 hover:bg-slate-100 transition-colors disabled:opacity-50"
          >
            {loading ? "Redirecting..." : "Continue with Google"}
          </button>

          <p className="text-center text-primary-foreground/60 text-sm font-sans">
            Don&apos;t have an account?{" "}
            <Link to={`/signup?redirect=${encodeURIComponent(redirectTo)}`} className="text-gold hover:underline">
              Sign Up
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;
