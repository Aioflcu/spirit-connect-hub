import { BookOpen, Users, Globe, Heart } from "lucide-react";
import { useNavigate } from "react-router-dom";

const beliefs = [
  { icon: BookOpen, title: "The Bible", desc: "The inspired and infallible Word of God, our ultimate authority for faith and practice." },
  { icon: Heart, title: "The Trinity", desc: "One God eternally existing in three persons — Father, Son, and Holy Spirit." },
  { icon: Globe, title: "Salvation", desc: "By grace through faith in Jesus Christ alone, available to all who believe." },
  { icon: Users, title: "Great Commission", desc: "Called to make disciples of all nations, baptizing and teaching them." },
];

const AboutSection = () => {
  const navigate = useNavigate();
  return (
  <section id="about" className="py-20 md:py-28 bg-background">
    <div className="container mx-auto px-4">
      {/* Story */}
      <div className="max-w-3xl mx-auto text-center mb-16">
         <p className="font-sans text-gold text-sm uppercase tracking-[0.25em] mb-3">About Us</p>
         <h2 className="font-heading text-3xl md:text-5xl font-bold text-foreground mb-6">Our Story</h2>
         <p className="text-muted-foreground text-base md:text-lg leading-relaxed mb-4">
           Founded in <strong className="text-foreground cursor-pointer" onClick={() => navigate('/admin')}>1999</strong> in the heart of Ibadan, Jesus Discipleship Ministry was birthed out of a burning passion to see lives transformed by the power of the Gospel. From a humble gathering, God has built a vibrant community of believers committed to spiritual growth and Kingdom expansion.
         </p>
         <p className="text-muted-foreground text-base md:text-lg leading-relaxed">
           Today, JDM continues to be a beacon of hope in Molete and beyond, raising disciples who impact their communities for Christ.
         </p>
       </div>

       {/* Mission & Vision */}
       <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto mb-20">
         <div className="bg-card rounded-xl p-8 border border-border shadow-sm">
           <h3 className="font-heading text-xl font-bold text-foreground mb-3">Our Mission</h3>
           <p className="text-muted-foreground leading-relaxed">
             WINNING THE LOST, DISCIPLING THE CONVERTS, UNTO SPIRITUAL MATURITY, BUILDING ABLE LEADERS TO DEFEND THE INTEGRITY OF THE SOUND GOSPEL.
           </p>
         </div>
         <div className="bg-card rounded-xl p-8 border border-border shadow-sm">
           <h3 className="font-heading text-xl font-bold text-foreground mb-3">Our Vision</h3>
           <p className="text-muted-foreground leading-relaxed">
             To build a community of Spirit-filled disciples who are rooted in the Word, fervent in prayer, and passionate about reaching the nations for Jesus Christ.
           </p>
         </div>
       </div>

       {/* Core Beliefs */}
       <div className="text-center mb-10">
         <p className="font-sans text-gold text-sm uppercase tracking-[0.25em] mb-3">What We Believe</p>
         <h2 className="font-heading text-3xl md:text-4xl font-bold text-foreground">Core Beliefs</h2>
       </div>
       <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-5xl mx-auto">
         {beliefs.map((b) => (
           <div key={b.title} className="bg-card rounded-xl p-6 border border-border hover:shadow-gold transition-shadow text-center">
             <div className="w-14 h-14 mx-auto rounded-full bg-gold/10 flex items-center justify-center mb-4">
               <b.icon className="text-gold" size={28} />
             </div>
             <h4 className="font-heading font-bold text-foreground mb-2">{b.title}</h4>
             <p className="text-muted-foreground text-sm leading-relaxed">{b.desc}</p>
           </div>
         ))}
       </div>
     </div>
   </section>
   );
};

export default AboutSection;
