import pastorImg from "@/assets/pastor-portrait.jpg";

const LeadershipSection = () => (
  <section id="leadership" className="py-20 md:py-28 bg-secondary">
    <div className="container mx-auto px-4">
      <div className="text-center mb-12">
        <p className="font-sans text-gold text-sm uppercase tracking-[0.25em] mb-3">Our Leader</p>
        <h2 className="font-heading text-3xl md:text-5xl font-bold text-foreground">Meet the Pastor</h2>
      </div>

      <div className="max-w-4xl mx-auto flex flex-col md:flex-row items-center gap-10">
        <div className="w-64 h-64 md:w-80 md:h-80 rounded-2xl overflow-hidden border-4 border-gold/30 shadow-gold flex-shrink-0">
          <img
            src={pastorImg}
            alt="Pastor Olusola Emmanuel Ayodele"
            className="w-full h-full object-cover"
            loading="lazy"
            width={800}
            height={1024}
          />
        </div>
        <div className="text-center md:text-left">
          <h3 className="font-heading text-2xl md:text-3xl font-bold text-foreground mb-1">
            Pastor Olusola Emmanuel Ayodele
          </h3>
          <p className="font-sans text-gold font-semibold mb-4">Senior Pastor</p>
          <p className="text-muted-foreground leading-relaxed mb-4">
            Pastor Olusola Emmanuel Ayodele is a passionate teacher of the Word and a devoted shepherd. With a deep commitment to raising disciples, he has led Jesus Discipleship Ministry since its founding in 1999.
          </p>
          <p className="text-muted-foreground leading-relaxed">
            Under his leadership, JDM has grown into a vibrant community of believers, impacting lives across Ibadan and beyond through sound biblical teaching, fervent prayer, and compassionate outreach.
          </p>
        </div>
      </div>
    </div>
  </section>
);

export default LeadershipSection;
