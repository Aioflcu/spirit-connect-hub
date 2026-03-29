import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { BookOpen, Video } from "lucide-react";

interface DailyVerse {
  verse_reference: string;
  verse_text: string;
  reflection: string | null;
}

interface Livestream {
  id: string;
  title: string;
  stream_url: string;
  is_live: boolean;
}

const DailyBibleAndLive = () => {
  const [verse, setVerse] = useState<DailyVerse | null>(null);
  const [streams, setStreams] = useState<Livestream[]>([]);

  useEffect(() => {
    const today = new Date().toISOString().split("T")[0];
    supabase
      .from("daily_bible")
      .select("verse_reference, verse_text, reflection")
      .eq("date", today)
      .order("created_at", { ascending: false })
      .limit(1)
      .maybeSingle()
      .then(({ data }) => setVerse(data));

    supabase
      .from("livestreams")
      .select("*")
      .eq("is_live", true)
      .order("created_at", { ascending: false })
      .then(({ data }) => setStreams(data || []));

    // Realtime for new livestreams
    const channel = supabase
      .channel("livestreams-realtime")
      .on(
        "postgres_changes",
        { event: "INSERT", schema: "public", table: "livestreams" },
        (payload) => {
          const newStream = payload.new as Livestream;
          if (newStream.is_live) {
            setStreams((prev) => [newStream, ...prev]);
          }
        }
      )
      .subscribe();

    return () => { supabase.removeChannel(channel); };
  }, []);

  if (!verse && streams.length === 0) return null;

  return (
    <section className="py-16 bg-background">
      <div className="container mx-auto px-4 space-y-10">
        {/* Daily Bible Verse */}
        {verse && (
          <div className="max-w-3xl mx-auto bg-card rounded-xl border border-border p-8 text-center">
            <div className="flex items-center justify-center gap-2 mb-4">
              <BookOpen className="text-gold" size={24} />
              <p className="font-sans text-gold text-sm uppercase tracking-[0.25em]">Today's Verse</p>
            </div>
            <blockquote className="text-xl md:text-2xl font-heading font-bold text-foreground mb-3 italic">
              "{verse.verse_text}"
            </blockquote>
            <p className="font-sans text-gold font-semibold">— {verse.verse_reference}</p>
            {verse.reflection && (
              <p className="mt-4 text-muted-foreground leading-relaxed">{verse.reflection}</p>
            )}
          </div>
        )}

        {/* Live Streams */}
        {streams.length > 0 && (
          <div className="max-w-3xl mx-auto">
            {streams.map((s) => (
              <a
                key={s.id}
                href={s.stream_url}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-4 bg-card rounded-xl border border-border p-6 hover:border-gold/40 hover:shadow-gold transition-all"
              >
                <div className="w-12 h-12 rounded-full bg-destructive/10 flex items-center justify-center flex-shrink-0 animate-pulse">
                  <Video className="text-destructive" size={24} />
                </div>
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <span className="w-2 h-2 bg-destructive rounded-full animate-pulse" />
                    <span className="font-sans text-destructive text-xs font-bold uppercase">LIVE NOW</span>
                  </div>
                  <h3 className="font-heading font-bold text-foreground">{s.title}</h3>
                  <p className="text-muted-foreground text-sm font-sans">Click to join the livestream</p>
                </div>
              </a>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default DailyBibleAndLive;
