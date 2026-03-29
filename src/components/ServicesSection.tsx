import { Clock, BookOpen, Zap } from "lucide-react";

const services = [
  { icon: Clock, day: "Sunday", name: "Sunday Service", time: "9:00 AM", desc: "A powerful time of worship, the Word, and fellowship." },
  { icon: BookOpen, day: "Tuesday", name: "Discipleship Class", time: "6:00 PM", desc: "Grow deeper in the faith through structured Bible study." },
  { icon: Zap, day: "Thursday", name: "Solution Hour", time: "5:30 PM", desc: "A prayer meeting for breakthroughs and divine solutions." },
];

const ServicesSection = () => (
  <section id="services" className="py-20 md:py-28 bg-navy-gradient">
    <div className="container mx-auto px-4">
      <div className="text-center mb-14">
        <p className="font-sans text-gold text-sm uppercase tracking-[0.25em] mb-3">Join Us</p>
        <h2 className="font-heading text-3xl md:text-5xl font-bold text-primary-foreground">Service Times</h2>
      </div>

      <div className="grid sm:grid-cols-3 gap-6 max-w-4xl mx-auto">
        {services.map((s) => (
          <div
            key={s.name}
            className="bg-primary-foreground/5 backdrop-blur-sm border border-gold/20 rounded-xl p-8 text-center hover:border-gold/50 transition-colors"
          >
            <div className="w-14 h-14 mx-auto rounded-full bg-gold/15 flex items-center justify-center mb-4">
              <s.icon className="text-gold" size={28} />
            </div>
            <p className="font-sans text-gold text-xs uppercase tracking-widest mb-1">{s.day}</p>
            <h3 className="font-heading text-xl font-bold text-primary-foreground mb-1">{s.name}</h3>
            <p className="font-sans text-2xl font-extrabold text-gold mb-3">{s.time}</p>
            <p className="text-primary-foreground/70 text-sm leading-relaxed">{s.desc}</p>
          </div>
        ))}
      </div>
    </div>
  </section>
);

export default ServicesSection;
