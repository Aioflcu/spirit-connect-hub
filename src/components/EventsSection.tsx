import { Calendar } from "lucide-react";

const events = [
  { month: "January", name: "Prevailing Prayer Week", desc: "A week of intense prayer and fasting to kick off the year." },
  { month: "April", name: "Easter Retreat", desc: "A special retreat to reflect on the death and resurrection of Christ." },
  { month: "September", name: "Anniversary Week", desc: "Celebrating God's faithfulness to JDM with special services and guests." },
  { month: "December", name: "December Retreat", desc: "A year-end spiritual retreat for refreshing and vision." },
];

const EventsSection = () => (
  <section id="events" className="py-20 md:py-28 bg-secondary">
    <div className="container mx-auto px-4">
      <div className="text-center mb-14">
        <p className="font-sans text-gold text-sm uppercase tracking-[0.25em] mb-3">Annual Programs</p>
        <h2 className="font-heading text-3xl md:text-5xl font-bold text-foreground">Events Calendar</h2>
      </div>

      <div className="max-w-3xl mx-auto space-y-0">
        {events.map((e, i) => (
          <div key={e.name} className="flex gap-6 relative">
            {/* Timeline line */}
            <div className="flex flex-col items-center">
              <div className="w-12 h-12 rounded-full bg-gold/15 border-2 border-gold flex items-center justify-center flex-shrink-0 z-10">
                <Calendar className="text-gold" size={20} />
              </div>
              {i < events.length - 1 && <div className="w-0.5 flex-1 bg-gold/20" />}
            </div>

            <div className="pb-10">
              <p className="font-sans text-gold text-xs uppercase tracking-widest mb-1">{e.month}</p>
              <h3 className="font-heading text-xl font-bold text-foreground mb-1">{e.name}</h3>
              <p className="text-muted-foreground text-sm leading-relaxed">{e.desc}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  </section>
);

export default EventsSection;
