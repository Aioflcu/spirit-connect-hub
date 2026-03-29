import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { BookOpen, Search } from "lucide-react";
import Navbar from "@/components/Navbar";
import FooterSection from "@/components/FooterSection";

interface Hymn {
  id: string;
  title: string;
  lyrics: string;
  author: string | null;
  hymn_number: number | null;
}

const HymnsPage = () => {
  const [hymns, setHymns] = useState<Hymn[]>([]);
  const [search, setSearch] = useState("");
  const [selected, setSelected] = useState<Hymn | null>(null);

  useEffect(() => {
    supabase
      .from("hymns")
      .select("*")
      .order("hymn_number", { ascending: true })
      .then(({ data }) => setHymns(data || []));
  }, []);

  const filtered = hymns.filter(
    (h) =>
      h.title.toLowerCase().includes(search.toLowerCase()) ||
      (h.hymn_number && String(h.hymn_number).includes(search))
  );

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <div className="pt-24 pb-16 container mx-auto px-4">
        <div className="text-center mb-10">
          <p className="font-sans text-gold text-sm uppercase tracking-[0.25em] mb-3">Praise & Worship</p>
          <h1 className="font-heading text-3xl md:text-5xl font-bold text-foreground">Hymn Book</h1>
        </div>

        <div className="max-w-md mx-auto mb-10 relative">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground" size={18} />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search hymns by title or number..."
            className="w-full pl-11 pr-4 py-3 rounded-lg border border-border bg-card text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-gold font-sans"
          />
        </div>

        {selected ? (
          <div className="max-w-2xl mx-auto">
            <button
              onClick={() => setSelected(null)}
              className="font-sans text-gold text-sm mb-4 hover:underline"
            >
              ← Back to hymns
            </button>
            <div className="bg-card rounded-xl border border-border p-8">
              <div className="flex items-center gap-3 mb-4">
                <BookOpen className="text-gold" size={24} />
                <div>
                  {selected.hymn_number && (
                    <span className="font-sans text-gold text-xs uppercase tracking-wider">Hymn #{selected.hymn_number}</span>
                  )}
                  <h2 className="font-heading text-2xl font-bold text-foreground">{selected.title}</h2>
                </div>
              </div>
              {selected.author && (
                <p className="text-muted-foreground text-sm mb-6 font-sans">By {selected.author}</p>
              )}
              <div className="whitespace-pre-wrap text-foreground leading-relaxed">{selected.lyrics}</div>
            </div>
          </div>
        ) : (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 max-w-5xl mx-auto">
            {filtered.length === 0 && (
              <p className="col-span-full text-center text-muted-foreground py-10">
                {hymns.length === 0 ? "No hymns have been added yet." : "No hymns match your search."}
              </p>
            )}
            {filtered.map((h) => (
              <button
                key={h.id}
                onClick={() => setSelected(h)}
                className="bg-card rounded-xl border border-border p-5 text-left hover:border-gold/40 hover:shadow-gold transition-all"
              >
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-gold/10 flex items-center justify-center flex-shrink-0">
                    <span className="font-sans text-gold font-bold text-sm">
                      {h.hymn_number || "#"}
                    </span>
                  </div>
                  <div>
                    <h3 className="font-heading font-bold text-foreground text-sm">{h.title}</h3>
                    {h.author && <p className="text-muted-foreground text-xs font-sans">{h.author}</p>}
                  </div>
                </div>
              </button>
            ))}
          </div>
        )}
      </div>
      <FooterSection />
    </div>
  );
};

export default HymnsPage;
