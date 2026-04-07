import { MapPin, Phone, Mail, Cross } from "lucide-react";
import { Link } from "react-router-dom";

const FooterSection = () => {
  return (
    <footer id="contact" className="py-16 bg-navy-dark border-t border-gold/10">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-3 gap-10 mb-12">
          <div>
            <div className="flex items-center gap-2 mb-4">
              <Cross className="text-gold" size={24} />
              <span className="font-heading font-bold text-lg text-primary-foreground">Jesus Discipleship Ministry</span>
            </div>
            <p className="text-primary-foreground/60 text-sm leading-relaxed">
              Winning the lost, discipling converts, and raising leaders for the Kingdom since 1999.
            </p>
          </div>

          <div>
            <h4 className="font-heading font-bold text-primary-foreground mb-4">Quick Links</h4>
            <ul className="space-y-2">
              {["About", "Services", "Ministries", "Events", "Giving"].map((l) => (
                <li key={l}>
                  <a href={`#${l.toLowerCase()}`} className="font-sans text-sm text-primary-foreground/60 hover:text-gold transition-colors">
                    {l}
                  </a>
                </li>
              ))}
              <li>
                <Link to="/hymns" className="font-sans text-sm text-primary-foreground/60 hover:text-gold transition-colors">
                  Hymn Book
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-heading font-bold text-primary-foreground mb-4">Contact Us</h4>
            <div className="space-y-3">
              <div className="flex items-start gap-3">
                <MapPin className="text-gold flex-shrink-0 mt-0.5" size={18} />
                <p className="text-primary-foreground/60 text-sm">
                  Yejide Junction, near St. Luke Grammar School, Molete, Ibadan
                </p>
              </div>
              <div className="flex items-center gap-3">
                <Phone className="text-gold flex-shrink-0" size={18} />
                <a href="tel:+2347067581767" className="text-primary-foreground/60 text-sm hover:text-gold transition-colors">
                  +234 706 758 1767
                </a>
              </div>
              <div className="flex items-center gap-3">
                <Mail className="text-gold flex-shrink-0" size={18} />
                <a href="mailto:olusolaea12@gmail.com" className="text-primary-foreground/60 text-sm hover:text-gold transition-colors">
                  olusolaea12@gmail.com
                </a>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-gold/10 pt-6 text-center">
          <p className="font-sans text-primary-foreground/40 text-xs">
            © {new Date().getFullYear()} Jesus Discipleship Ministry. All rights reserved.
          </p>
          <Link
            to="/admin"
            className="inline-flex items-center mt-3 px-3 py-1.5 text-xs font-sans text-primary-foreground/70 hover:text-gold transition-colors border border-gold/20 hover:border-gold/40 rounded"
            title="Admin Page"
          >
            Admin Page
          </Link>
        </div>
      </div>
    </footer>
  );
};

export default FooterSection;
