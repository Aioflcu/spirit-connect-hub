import heroBg from "@/assets/hero-bg.jpg";

const HeroSection = () => (
  <section id="home" className="relative min-h-screen flex items-center justify-center">
    <img
      src={heroBg}
      alt="Church worship service"
      className="absolute inset-0 w-full h-full object-cover"
      width={1920}
      height={1080}
    />
    <div className="absolute inset-0 bg-hero-overlay" />
    <div className="relative z-10 container mx-auto px-4 text-center py-32">
      <p className="font-sans text-gold text-sm md:text-base uppercase tracking-[0.3em] mb-4 animate-fade-in-up">
        Welcome to
      </p>
      <h1 className="font-heading text-4xl sm:text-5xl md:text-7xl font-extrabold text-primary-foreground leading-tight mb-6 animate-fade-in-up" style={{ animationDelay: "0.15s" }}>
        Jesus Discipleship
        <br />
        <span className="text-gold-gradient">Ministry</span>
      </h1>
      <p className="max-w-2xl mx-auto text-primary-foreground/80 text-base md:text-lg mb-10 animate-fade-in-up" style={{ animationDelay: "0.3s" }}>
        Winning the lost for Christ, discipling converts, and raising leaders for the Kingdom — since 1999 in Ibadan.
      </p>
      <div className="flex flex-col sm:flex-row gap-4 justify-center animate-fade-in-up" style={{ animationDelay: "0.45s" }}>
        <a
          href="#services"
          className="font-sans font-semibold px-8 py-4 rounded-lg bg-gold text-accent-foreground hover:bg-gold-light transition-colors text-base"
        >
          Join Our Services
        </a>
        <a
          href="#about"
          className="font-sans font-semibold px-8 py-4 rounded-lg border-2 border-gold/50 text-primary-foreground hover:bg-gold/10 transition-colors text-base"
        >
          Learn More
        </a>
      </div>
    </div>
  </section>
);

export default HeroSection;
