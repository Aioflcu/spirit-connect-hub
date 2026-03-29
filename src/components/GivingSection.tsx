import { Landmark, Heart, Building, Users, Quote } from "lucide-react";

const givingAreas = [
  { icon: Heart, label: "Missions & Evangelism" },
  { icon: Building, label: "Church Building Projects" },
  { icon: Users, label: "Youth Development" },
];

const testimonials = [
  {
    text: "Supporting JDM has been one of the most rewarding decisions of my life. Seeing lives transformed through the ministry is truly a blessing.",
    name: "Bro. Akinwale",
  },
  {
    text: "I give because I have experienced firsthand the impact of this ministry. JDM is raising disciples who are making a difference across Nigeria.",
    name: "Sis. Folake",
  },
];

const GivingSection = () => (
  <section id="giving" className="py-20 md:py-28 bg-navy-gradient">
    <div className="container mx-auto px-4">
      <div className="text-center mb-14">
        <p className="font-sans text-gold text-sm uppercase tracking-[0.25em] mb-3">Partner With Us</p>
        <h2 className="font-heading text-3xl md:text-5xl font-bold text-primary-foreground">Support the Ministry</h2>
      </div>

      <div className="max-w-4xl mx-auto grid md:grid-cols-2 gap-10">
        {/* Bank Details */}
        <div className="bg-primary-foreground/5 backdrop-blur-sm border border-gold/20 rounded-xl p-8">
          <div className="flex items-center gap-3 mb-6">
            <Landmark className="text-gold" size={28} />
            <h3 className="font-heading text-xl font-bold text-primary-foreground">Bank Transfer</h3>
          </div>
          <div className="space-y-3 mb-8">
            <div>
              <p className="font-sans text-primary-foreground/60 text-xs uppercase tracking-wider">Bank Name</p>
              <p className="font-heading text-lg font-bold text-primary-foreground">Fidelity Bank</p>
            </div>
            <div>
              <p className="font-sans text-primary-foreground/60 text-xs uppercase tracking-wider">Account Number</p>
              <p className="font-heading text-2xl font-extrabold text-gold tracking-wider">6060244966</p>
            </div>
            <div>
              <p className="font-sans text-primary-foreground/60 text-xs uppercase tracking-wider">Account Name</p>
              <p className="font-heading text-lg font-bold text-primary-foreground">Jesus Discipleship Ministry</p>
            </div>
          </div>

          <h4 className="font-heading font-bold text-primary-foreground mb-3">Your Giving Supports</h4>
          <div className="space-y-2">
            {givingAreas.map((a) => (
              <div key={a.label} className="flex items-center gap-3">
                <a.icon className="text-gold" size={18} />
                <span className="text-primary-foreground/80 text-sm">{a.label}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Testimonials */}
        <div className="space-y-6">
          {testimonials.map((t) => (
            <div key={t.name} className="bg-primary-foreground/5 backdrop-blur-sm border border-gold/10 rounded-xl p-6">
              <Quote className="text-gold/40 mb-3" size={28} />
              <p className="text-primary-foreground/80 italic leading-relaxed mb-4">"{t.text}"</p>
              <p className="font-sans font-semibold text-gold text-sm">— {t.name}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  </section>
);

export default GivingSection;
