import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { ArrowLeft, User, Save } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/hooks/useAuth";

const ProfilePage = () => {
  const { user, loading: authLoading } = useAuth();
  const navigate = useNavigate();
  const [displayName, setDisplayName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  // Password change
  const [newPassword, setNewPassword] = useState("");
  const [confirmNewPassword, setConfirmNewPassword] = useState("");
  const [changingPassword, setChangingPassword] = useState(false);

  useEffect(() => {
    if (!authLoading && !user) {
      navigate("/login?redirect=/profile", { replace: true });
    }
  }, [authLoading, user, navigate]);

  useEffect(() => {
    if (!user) return;
    const fetchProfile = async () => {
      setEmail(user.email || "");
      const { data } = await supabase
        .from("profiles")
        .select("display_name, phone")
        .eq("user_id", user.id)
        .maybeSingle();
      if (data) {
        setDisplayName(data.display_name || "");
        setPhone(data.phone || "");
      }
      setLoading(false);
    };
    fetchProfile();
  }, [user]);

  const handleSaveProfile = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) return;
    setSaving(true);

    try {
      const { error } = await supabase
        .from("profiles")
        .update({ display_name: displayName, phone })
        .eq("user_id", user.id);

      if (error) throw error;
      toast.success("Profile updated!");
    } catch (err: any) {
      toast.error(err.message || "Failed to update profile.");
    } finally {
      setSaving(false);
    }
  };

  const handleChangePassword = async (e: React.FormEvent) => {
    e.preventDefault();
    if (newPassword.length < 6) {
      toast.error("Password must be at least 6 characters.");
      return;
    }
    if (newPassword !== confirmNewPassword) {
      toast.error("Passwords do not match.");
      return;
    }
    setChangingPassword(true);
    try {
      const { error } = await supabase.auth.updateUser({ password: newPassword });
      if (error) throw error;
      toast.success("Password changed successfully!");
      setNewPassword("");
      setConfirmNewPassword("");
    } catch (err: any) {
      toast.error(err.message || "Failed to change password.");
    } finally {
      setChangingPassword(false);
    }
  };

  if (authLoading || loading) {
    return <div className="min-h-screen bg-background" />;
  }

  if (!user) return null;

  const inputClass =
    "w-full px-4 py-3 rounded-lg border border-border bg-card text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-gold font-sans text-sm";

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8 max-w-lg">
        <div className="flex items-center gap-3 mb-6">
          <button onClick={() => navigate("/")} className="text-muted-foreground hover:text-foreground" aria-label="Back to home">
            <ArrowLeft size={20} />
          </button>
          <h1 className="font-heading text-2xl font-bold text-foreground flex items-center gap-2">
            <User size={22} /> My Profile
          </h1>
        </div>

        {/* Profile Info */}
        <form onSubmit={handleSaveProfile} className="bg-card rounded-xl border border-border p-6 space-y-4 mb-6">
          <h2 className="font-heading font-bold text-foreground text-lg">Personal Information</h2>

          <div>
            <label className="font-sans text-sm text-muted-foreground mb-1 block">Display Name</label>
            <input
              type="text"
              value={displayName}
              onChange={(e) => setDisplayName(e.target.value)}
              className={inputClass}
              placeholder="Your name"
            />
          </div>

          <div>
            <label className="font-sans text-sm text-muted-foreground mb-1 block">Email</label>
            <input
              type="email"
              value={email}
              disabled
              className={inputClass + " opacity-60 cursor-not-allowed"}
            />
            <p className="text-xs text-muted-foreground mt-1 font-sans">Email cannot be changed here.</p>
          </div>

          <div>
            <label className="font-sans text-sm text-muted-foreground mb-1 block">Phone Number</label>
            <input
              type="tel"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              className={inputClass}
              placeholder="+234 xxx xxx xxxx"
            />
          </div>

          <button
            type="submit"
            disabled={saving}
            className="flex items-center gap-2 px-6 py-2.5 rounded-lg bg-gold text-accent-foreground font-sans font-semibold hover:bg-gold-light transition-colors text-sm disabled:opacity-50"
          >
            <Save size={16} />
            {saving ? "Saving..." : "Save Changes"}
          </button>
        </form>

        {/* Change Password */}
        <form onSubmit={handleChangePassword} className="bg-card rounded-xl border border-border p-6 space-y-4">
          <h2 className="font-heading font-bold text-foreground text-lg">Change Password</h2>

          <div>
            <label className="font-sans text-sm text-muted-foreground mb-1 block">New Password</label>
            <input
              type="password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              className={inputClass}
              placeholder="At least 6 characters"
              minLength={6}
              required
            />
          </div>

          <div>
            <label className="font-sans text-sm text-muted-foreground mb-1 block">Confirm New Password</label>
            <input
              type="password"
              value={confirmNewPassword}
              onChange={(e) => setConfirmNewPassword(e.target.value)}
              className={inputClass}
              placeholder="Re-enter new password"
              minLength={6}
              required
            />
          </div>

          <button
            type="submit"
            disabled={changingPassword}
            className="px-6 py-2.5 rounded-lg bg-gold text-accent-foreground font-sans font-semibold hover:bg-gold-light transition-colors text-sm disabled:opacity-50"
          >
            {changingPassword ? "Changing..." : "Change Password"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default ProfilePage;
