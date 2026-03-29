import { useState } from "react";
import { Menu, X, Cross } from "lucide-react";

const navLinks = [
  { label: "Home", href: "#home" },
  { label: "About", href: "#about" },
  { label: "Leadership", href: "#leadership" },
  { label: "Services", href: "#services" },
  { label: "Ministries", href: "#ministries" },
  { label: "Events", href: "#events" },
  { label: "Giving", href: "#giving" },
  { label: "Contact", href: "#contact" },
];

const Navbar = () => {
  const [open, setOpen] = useState(false);

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-navy-dark/95 backdrop-blur-md border-b border-gold/20">
      <div className="container mx-auto flex items-center justify-between py-3 px-4">
        <a href="#home" className="flex items-center gap-2">
          <Cross className="text-gold" size={28} />
          <span className="font-heading font-bold text-lg text-primary-foreground tracking-tight">
            JDM
          </span>
        </a>

        {/* Desktop */}
        <ul className="hidden lg:flex items-center gap-6">
          {navLinks.map((link) => (
            <li key={link.href}>
              <a
                href={link.href}
                className="font-sans text-sm font-medium text-primary-foreground/80 hover:text-gold transition-colors"
              >
                {link.label}
              </a>
            </li>
          ))}
        </ul>

        <a
          href="#services"
          className="hidden lg:inline-flex font-sans text-sm font-semibold px-5 py-2.5 rounded-lg bg-gold text-accent-foreground hover:bg-gold-light transition-colors"
        >
          Join Us
        </a>

        {/* Mobile toggle */}
        <button
          onClick={() => setOpen(!open)}
          className="lg:hidden text-primary-foreground"
          aria-label="Toggle menu"
        >
          {open ? <X size={26} /> : <Menu size={26} />}
        </button>
      </div>

      {/* Mobile menu */}
      {open && (
        <div className="lg:hidden bg-navy-dark/98 backdrop-blur-md border-t border-gold/10 pb-6">
          <ul className="flex flex-col items-center gap-4 pt-4">
            {navLinks.map((link) => (
              <li key={link.href}>
                <a
                  href={link.href}
                  onClick={() => setOpen(false)}
                  className="font-sans text-base font-medium text-primary-foreground/90 hover:text-gold transition-colors"
                >
                  {link.label}
                </a>
              </li>
            ))}
            <li>
              <a
                href="#services"
                onClick={() => setOpen(false)}
                className="font-sans text-sm font-semibold px-6 py-2.5 rounded-lg bg-gold text-accent-foreground"
              >
                Join Us
              </a>
            </li>
          </ul>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
