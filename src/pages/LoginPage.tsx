import { useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useNavigate, Link } from "react-router-dom";
import { toast } from "sonner";
import { Cross } from "lucide-react";

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    const { error } = await supabase.auth.signInWithPassword({ email, password });
    setLoading(false);
    if (error) {
      toast.error(error.message);
    } else {
      toast.success("Welcome back!");
      navigate("/");
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
          <p className="text-primary-foreground/60 mt-2">Sign in to your account</p>
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
              placeholder="••••••••"
            />
          </div>
          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 rounded-lg bg-gold text-accent-foreground font-sans font-semibold hover:bg-gold-light transition-colors disabled:opacity-50"
          >
            {loading ? "Signing in..." : "Sign In"}
          </button>
          <p className="text-center text-primary-foreground/60 text-sm font-sans">
            Don't have an account?{" "}
            <Link to="/signup" className="text-gold hover:underline">Sign Up</Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;
