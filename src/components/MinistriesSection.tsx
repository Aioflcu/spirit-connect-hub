import { Baby, Users, UserCheck, Heart, Gem, Music, Globe } from "lucide-react";

const ministries = [
  { icon: Baby, name: "Children", desc: "Nurturing the next generation in Christ." },
  { icon: Users, name: "Youth", desc: "Empowering young people for Kingdom impact." },
  { icon: UserCheck, name: "Men", desc: "Building men of faith, purpose, and integrity." },
  { icon: Heart, name: "Women", desc: "Strengthening women in the Word and prayer." },
  { icon: Gem, name: "Marriage", desc: "Building godly homes and strong marriages." },
  { icon: Music, name: "Music", desc: "Leading worship through Spirit-filled music." },
  { icon: Globe, name: "Outreach", desc: "Taking the Gospel to unreached communities." },
];

const MinistriesSection = () => (
  <section id="ministries" className="py-20 md:py-28 bg-background">
    <div className="container mx-auto px-4">
      <div className="text-center mb-14">
        <p className="font-sans text-gold text-sm uppercase tracking-[0.25em] mb-3">Get Involved</p>
        <h2 className="font-heading text-3xl md:text-5xl font-bold text-foreground">Our Ministries</h2>
      </div>

      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-5xl mx-auto">
        {ministries.map((m) => (
          <div
            key={m.name}
            className="bg-card rounded-xl p-6 border border-border hover:border-gold/40 hover:shadow-gold transition-all text-center group"
          >
            <div className="w-14 h-14 mx-auto rounded-full bg-gold/10 group-hover:bg-gold/20 flex items-center justify-center mb-4 transition-colors">
              <m.icon className="text-gold" size={26} />
            </div>
            <h4 className="font-heading font-bold text-foreground mb-1">{m.name}</h4>
            <p className="text-muted-foreground text-sm">{m.desc}</p>
          </div>
        ))}
      </div>
    </div>
  </section>
);

export default MinistriesSection;
