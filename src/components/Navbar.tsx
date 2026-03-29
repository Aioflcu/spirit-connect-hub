import { useState } from "react";
import { Menu, X, Cross, LogIn, LogOut } from "lucide-react";
import { Link } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";

const navLinks = [
  { label: "Home", href: "#home" },
  { label: "About", href: "#about" },
  { label: "Leadership", href: "#leadership" },
  { label: "Services", href: "#services" },
  { label: "Ministries", href: "#ministries" },
  { label: "Events", href: "#events" },
  { label: "Giving", href: "#giving" },
];

const Navbar = () => {
  const [open, setOpen] = useState(false);
  const { user, signOut } = useAuth();

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-navy-dark/95 backdrop-blur-md border-b border-gold/20">
      <div className="container mx-auto flex items-center justify-between py-3 px-4">
        <Link to="/" className="flex items-center gap-2">
          <Cross className="text-gold" size={28} />
          <span className="font-heading font-bold text-lg text-primary-foreground tracking-tight">JDM</span>
        </Link>

        {/* Desktop */}
        <ul className="hidden lg:flex items-center gap-5">
          {navLinks.map((link) => (
            <li key={link.href}>
              <a href={link.href} className="font-sans text-sm font-medium text-primary-foreground/80 hover:text-gold transition-colors">
                {link.label}
              </a>
            </li>
          ))}
          <li>
            <Link to="/hymns" className="font-sans text-sm font-medium text-primary-foreground/80 hover:text-gold transition-colors">
              Hymns
            </Link>
          </li>
        </ul>

        <div className="hidden lg:flex items-center gap-3">
          {user ? (
            <button
              onClick={signOut}
              className="flex items-center gap-1.5 font-sans text-sm font-medium text-primary-foreground/70 hover:text-gold transition-colors"
            >
              <LogOut size={16} />
              Sign Out
            </button>
          ) : (
            <Link
              to="/login"
              className="flex items-center gap-1.5 font-sans text-sm font-semibold px-5 py-2.5 rounded-lg bg-gold text-accent-foreground hover:bg-gold-light transition-colors"
            >
              <LogIn size={16} />
              Sign In
            </Link>
          )}
        </div>

        <button onClick={() => setOpen(!open)} className="lg:hidden text-primary-foreground" aria-label="Toggle menu">
          {open ? <X size={26} /> : <Menu size={26} />}
        </button>
      </div>

      {open && (
        <div className="lg:hidden bg-navy-dark/98 backdrop-blur-md border-t border-gold/10 pb-6">
          <ul className="flex flex-col items-center gap-4 pt-4">
            {navLinks.map((link) => (
              <li key={link.href}>
                <a href={link.href} onClick={() => setOpen(false)} className="font-sans text-base font-medium text-primary-foreground/90 hover:text-gold transition-colors">
                  {link.label}
                </a>
              </li>
            ))}
            <li>
              <Link to="/hymns" onClick={() => setOpen(false)} className="font-sans text-base font-medium text-primary-foreground/90 hover:text-gold transition-colors">
                Hymns
              </Link>
            </li>
            <li>
              {user ? (
                <button onClick={() => { signOut(); setOpen(false); }} className="font-sans text-sm font-semibold px-6 py-2.5 rounded-lg border border-gold/50 text-primary-foreground">
                  Sign Out
                </button>
              ) : (
                <Link to="/login" onClick={() => setOpen(false)} className="font-sans text-sm font-semibold px-6 py-2.5 rounded-lg bg-gold text-accent-foreground">
                  Sign In
                </Link>
              )}
            </li>
          </ul>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
