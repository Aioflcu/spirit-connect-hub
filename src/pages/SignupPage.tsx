import { useMemo, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { Cross } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useChurchLogo } from "@/hooks/useChurchLogo";

const SignupPage = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const { logoUrl } = useChurchLogo();

  const redirectTo = useMemo(
    () => new URLSearchParams(location.search).get("redirect") || "/",
    [location.search]
  );

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();

    if (password.length < 6) {
      toast.error("Password must be at least 6 characters.");
      return;
    }

    if (password !== confirmPassword) {
      toast.error("Passwords do not match.");
      return;
    }

    setLoading(true);

    try {
      const displayName = `${firstName} ${lastName}`.trim();

      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          emailRedirectTo: window.location.origin,
          data: {
            display_name: displayName,
            phone: phone || undefined,
          },
        },
      });

      if (error) throw error;

      // Update profile with phone if provided
      if (data.user && phone) {
        await supabase
          .from("profiles")
          .update({ phone })
          .eq("user_id", data.user.id);
      }

      if (data.session) {
        toast.success("Account created successfully!");
        navigate(redirectTo);
      } else {
        toast.success("Account created! Please check your email to confirm, then sign in.");
        navigate(`/login?redirect=${encodeURIComponent(redirectTo)}`);
      }
    } catch (error: any) {
      toast.error(error.message || "Unable to create account.");
    } finally {
      setLoading(false);
    }
  };

  const inputClass =
    "w-full px-4 py-3 rounded-lg bg-primary-foreground/10 border border-gold/20 text-primary-foreground placeholder:text-primary-foreground/30 focus:outline-none focus:border-gold font-sans";

  return (
    <div className="min-h-screen bg-navy-gradient flex items-center justify-center px-4 py-8">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <div className="flex items-center justify-center gap-2 mb-4">
            {logoUrl ? (
              <img src={logoUrl} alt="Church Logo" className="h-10 w-10 object-contain rounded" />
            ) : (
              <Cross className="text-gold" size={32} />
            )}
            <span className="font-heading font-bold text-xl text-primary-foreground">Jesus Discipleship Ministry</span>
          </div>
          <h1 className="font-heading text-3xl font-bold text-primary-foreground">Create Account</h1>
          <p className="text-primary-foreground/60 mt-2 font-sans">
            Join the Jesus Discipleship Ministry community.
          </p>
        </div>

        <form onSubmit={handleSignup} className="bg-primary-foreground/5 backdrop-blur-sm border border-gold/20 rounded-xl p-8 space-y-4">
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="font-sans text-sm text-primary-foreground/80 mb-1 block">First Name</label>
              <input
                type="text"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                required
                className={inputClass}
                placeholder="John"
              />
            </div>
            <div>
              <label className="font-sans text-sm text-primary-foreground/80 mb-1 block">Last Name</label>
              <input
                type="text"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                required
                className={inputClass}
                placeholder="Doe"
              />
            </div>
          </div>

          <div>
            <label className="font-sans text-sm text-primary-foreground/80 mb-1 block">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className={inputClass}
              placeholder="your@email.com"
            />
          </div>

          <div>
            <label className="font-sans text-sm text-primary-foreground/80 mb-1 block">Phone Number <span className="text-primary-foreground/40">(optional)</span></label>
            <input
              type="tel"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              className={inputClass}
              placeholder="+234 xxx xxx xxxx"
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
              className={inputClass}
              placeholder="At least 6 characters"
            />
          </div>

          <div>
            <label className="font-sans text-sm text-primary-foreground/80 mb-1 block">Confirm Password</label>
            <input
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
              minLength={6}
              className={inputClass}
              placeholder="Re-enter your password"
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
            <Link to={`/login?redirect=${encodeURIComponent(redirectTo)}`} className="text-gold hover:underline">
              Sign In
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default SignupPage;
