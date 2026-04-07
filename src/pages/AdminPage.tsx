import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { Music, BookOpen, Video, Image, MessageCircle, FileAudio, Trash2, Plus, ArrowLeft } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/hooks/useAuth";
import { useGalleryUpload, useMessagesUpload } from "@/hooks/useGallery";

const AdminPage = () => {
  const { user, loading } = useAuth();
  const navigate = useNavigate();
  const [tab, setTab] = useState<"hymns" | "bible" | "live" | "gallery" | "messages">("hymns");

  const { uploadImage, uploading: galleryUploading } = useGalleryUpload();
  const [galleryCaption, setGalleryCaption] = useState("");
  const [galleryFile, setGalleryFile] = useState<File | null>(null);
  const [galleryImages, setGalleryImages] = useState<any[]>([]);

  const { uploadMessage, uploading: messagesUploading } = useMessagesUpload(); // Note: hook expects FormData, will handle
  const [messagesTitle, setMessagesTitle] = useState("");
  const [messagesTranscript, setMessagesTranscript] = useState("");
  const [messagesAudio, setMessagesAudio] = useState<File | null>(null);
  const [messagesImage, setMessagesImage] = useState<File | null>(null);
  const [messages, setMessages] = useState<any[]>([]);

  const [hymnTitle, setHymnTitle] = useState("");
  const [hymnLyrics, setHymnLyrics] = useState("");
  const [hymnAuthor, setHymnAuthor] = useState("");
  const [hymnNumber, setHymnNumber] = useState("");
  const [hymns, setHymns] = useState<any[]>([]);

  const [verseRef, setVerseRef] = useState("");
  const [verseText, setVerseText] = useState("");
  const [reflection, setReflection] = useState("");
  const [verseDate, setVerseDate] = useState(new Date().toISOString().split("T")[0]);
  const [verses, setVerses] = useState<any[]>([]);

  const [liveTitle, setLiveTitle] = useState("");
  const [liveUrl, setLiveUrl] = useState("");
  const [streams, setStreams] = useState<any[]>([]);

  useEffect(() => {
    if (!loading && !user) {
      navigate("/login?redirect=/admin", { replace: true });
    }
  }, [loading, navigate, user]);

  useEffect(() => {
    if (user) {
      void loadData();
    }
  }, [user]);

  const loadData = async () => {
    const [h, b, s] = await Promise.all([
      supabase.from("hymns").select("*").order("hymn_number"),
      supabase.from("daily_bible").select("*").order("date", { ascending: false }).limit(20),
      supabase.from("livestreams").select("*").order("created_at", { ascending: false }),
    ]);

    setHymns(h.data || []);
    setVerses(b.data || []);
    setStreams(s.data || []);
  };

  const addHymn = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) return;

    const { error } = await supabase.from("hymns").insert({
      title: hymnTitle,
      lyrics: hymnLyrics,
      author: hymnAuthor || null,
      hymn_number: hymnNumber ? Number(hymnNumber) : null,
      created_by: user.id,
    });

    if (error) {
      toast.error(error.message);
      return;
    }

    toast.success("Hymn added!");
    setHymnTitle("");
    setHymnLyrics("");
    setHymnAuthor("");
    setHymnNumber("");
    void loadData();
  };

  const deleteHymn = async (id: string) => {
    const { error } = await supabase.from("hymns").delete().eq("id", id);
    if (error) {
      toast.error(error.message);
      return;
    }
    toast.success("Hymn deleted.");
    void loadData();
  };

  const addVerse = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) return;

    const { error } = await supabase.from("daily_bible").insert({
      verse_reference: verseRef,
      verse_text: verseText,
      reflection: reflection || null,
      date: verseDate,
      created_by: user.id,
    });

    if (error) {
      toast.error(error.message);
      return;
    }

    toast.success("Daily Bible entry published!");
    setVerseRef("");
    setVerseText("");
    setReflection("");
    void loadData();
  };

  const deleteVerse = async (id: string) => {
    const { error } = await supabase.from("daily_bible").delete().eq("id", id);
    if (error) {
      toast.error(error.message);
      return;
    }
    toast.success("Daily Bible entry deleted.");
    void loadData();
  };

  const addStream = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) return;

    const { error } = await supabase.from("livestreams").insert({
      title: liveTitle,
      stream_url: liveUrl,
      is_live: true,
      created_by: user.id,
    });

    if (error) {
      toast.error(error.message);
      return;
    }

    toast.success("Livestream link published!");
    setLiveTitle("");
    setLiveUrl("");
    void loadData();
  };

  const endStream = async (id: string) => {
    const { error } = await supabase.from("livestreams").update({ is_live: false }).eq("id", id);
    if (error) {
      toast.error(error.message);
      return;
    }
    toast.success("Livestream ended.");
    void loadData();
  };

  const deleteStream = async (id: string) => {
    const { error } = await supabase.from("livestreams").delete().eq("id", id);
    if (error) {
      toast.error(error.message);
      return;
    }
    toast.success("Livestream deleted.");
    void loadData();
  };

  if (loading) {
    return <div className="min-h-screen bg-background" />;
  }

  if (!user) {
    return null;
  }

  const inputClass = "w-full px-4 py-3 rounded-lg border border-border bg-card text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-gold font-sans text-sm";

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        <div className="flex items-center gap-3 mb-3">
          <button onClick={() => navigate("/")} className="text-muted-foreground hover:text-foreground" aria-label="Back to home">
            <ArrowLeft size={20} />
          </button>
          <h1 className="font-heading text-2xl font-bold text-foreground">Admin Dashboard</h1>
        </div>
        <p className="text-muted-foreground font-sans text-sm mb-8">
          Manage hymns, daily Bible messages, and livestream links from one place.
        </p>

        <div className="flex gap-2 mb-8 flex-wrap">
          {[
            { key: "hymns" as const, icon: Music, label: "Hymns" },
            { key: "bible" as const, icon: BookOpen, label: "Daily Bible" },
            { key: "live" as const, icon: Video, label: "Livestream" },
            { key: "gallery" as const, icon: Image, label: "Gallery" },
            { key: "messages" as const, icon: MessageCircle, label: "Messages" },
          ].map((t) => (
            <button
              key={t.key}
              onClick={() => setTab(t.key)}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg font-sans text-sm font-medium transition-colors ${
                tab === t.key
                  ? "bg-gold text-accent-foreground"
                  : "bg-card border border-border text-muted-foreground hover:text-foreground"
              }`}
            >
              <t.icon size={16} />
              {t.label}
            </button>
          ))}
        </div>

        {tab === "hymns" && (
          <div className="space-y-6">
            <form onSubmit={addHymn} className="bg-card rounded-xl border border-border p-6 space-y-4">
              <h2 className="font-heading font-bold text-foreground flex items-center gap-2">
                <Plus size={18} /> Add New Hymn
              </h2>
              <div className="grid sm:grid-cols-2 gap-4">
                <input value={hymnTitle} onChange={(e) => setHymnTitle(e.target.value)} required placeholder="Hymn Title" className={inputClass} />
                <input value={hymnNumber} onChange={(e) => setHymnNumber(e.target.value)} placeholder="Hymn Number" type="number" className={inputClass} />
              </div>
              <input value={hymnAuthor} onChange={(e) => setHymnAuthor(e.target.value)} placeholder="Author (optional)" className={inputClass} />
              <textarea value={hymnLyrics} onChange={(e) => setHymnLyrics(e.target.value)} required placeholder="Paste lyrics here..." rows={6} className={inputClass + " resize-y"} />
              <button type="submit" className="px-6 py-2.5 rounded-lg bg-gold text-accent-foreground font-sans font-semibold hover:bg-gold-light transition-colors text-sm">
                Add Hymn
              </button>
            </form>

            <div className="space-y-2">
              {hymns.map((h) => (
                <div key={h.id} className="flex items-center justify-between bg-card rounded-lg border border-border p-4">
                  <div>
                    <span className="font-sans text-gold text-xs mr-2">#{h.hymn_number || "—"}</span>
                    <span className="font-heading font-bold text-foreground text-sm">{h.title}</span>
                  </div>
                  <button onClick={() => deleteHymn(h.id)} className="text-destructive hover:text-destructive/80" aria-label={`Delete ${h.title}`}>
                    <Trash2 size={16} />
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}

        {tab === "bible" && (
          <div className="space-y-6">
            <form onSubmit={addVerse} className="bg-card rounded-xl border border-border p-6 space-y-4">
              <h2 className="font-heading font-bold text-foreground flex items-center gap-2">
                <Plus size={18} /> Add Daily Bible Verse
              </h2>
              <div className="grid sm:grid-cols-2 gap-4">
                <input value={verseRef} onChange={(e) => setVerseRef(e.target.value)} required placeholder="e.g. John 3:16" className={inputClass} />
                <input type="date" value={verseDate} onChange={(e) => setVerseDate(e.target.value)} className={inputClass} />
              </div>
              <textarea value={verseText} onChange={(e) => setVerseText(e.target.value)} required placeholder="Verse text..." rows={3} className={inputClass + " resize-y"} />
              <textarea value={reflection} onChange={(e) => setReflection(e.target.value)} placeholder="Reflection / devotional note (optional)" rows={3} className={inputClass + " resize-y"} />
              <button type="submit" className="px-6 py-2.5 rounded-lg bg-gold text-accent-foreground font-sans font-semibold hover:bg-gold-light transition-colors text-sm">
                Publish Verse
              </button>
            </form>

            <div className="space-y-2">
              {verses.map((v) => (
                <div key={v.id} className="flex items-center justify-between bg-card rounded-lg border border-border p-4">
                  <div>
                    <span className="font-sans text-gold text-xs mr-2">{v.date}</span>
                    <span className="font-heading font-bold text-foreground text-sm">{v.verse_reference}</span>
                  </div>
                  <button onClick={() => deleteVerse(v.id)} className="text-destructive hover:text-destructive/80" aria-label={`Delete ${v.verse_reference}`}>
                    <Trash2 size={16} />
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}

        {tab === "live" && (
          <div className="space-y-6">
            <form onSubmit={addStream} className="bg-card rounded-xl border border-border p-6 space-y-4">
              <h2 className="font-heading font-bold text-foreground flex items-center gap-2">
                <Plus size={18} /> Publish Livestream Link
              </h2>
              <input value={liveTitle} onChange={(e) => setLiveTitle(e.target.value)} required placeholder="Stream title e.g. Sunday Service" className={inputClass} />
              <input value={liveUrl} onChange={(e) => setLiveUrl(e.target.value)} required placeholder="YouTube/Facebook Live URL" type="url" className={inputClass} />
              <button type="submit" className="px-6 py-2.5 rounded-lg bg-gold text-accent-foreground font-sans font-semibold hover:bg-gold-light transition-colors text-sm">
                Go Live
              </button>
            </form>

            <div className="space-y-2">
              {streams.map((s) => (
                <div key={s.id} className="flex items-center justify-between bg-card rounded-lg border border-border p-4">
                  <div className="flex items-center gap-2">
                    {s.is_live && <span className="w-2 h-2 bg-destructive rounded-full animate-pulse" />}
                    <span className="font-heading font-bold text-foreground text-sm">{s.title}</span>
                    <span className="text-muted-foreground text-xs font-sans">{s.is_live ? "LIVE" : "Ended"}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    {s.is_live && (
                      <button onClick={() => endStream(s.id)} className="text-xs font-sans px-3 py-1 rounded bg-muted text-muted-foreground hover:text-foreground">
                        End
                      </button>
                    )}
                    <button onClick={() => deleteStream(s.id)} className="text-destructive hover:text-destructive/80" aria-label={`Delete ${s.title}`}>
                      <Trash2 size={16} />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {tab === "gallery" && (
          <div className="space-y-6">
            <form onSubmit={async (e) => {
              e.preventDefault();
              if (!galleryFile) return toast.error('Please select an image');
              const success = await uploadImage(galleryFile, galleryCaption);
              if (success) {
                setGalleryCaption('');
                setGalleryFile(null);
                // Reload list
                const { data } = await supabase.from('galleries').select('*').order('created_at', { ascending: false });
                setGalleryImages(data || []);
              }
            }} className="bg-card rounded-xl border border-border p-6 space-y-4">
              <h2 className="font-heading font-bold text-foreground flex items-center gap-2">
                <Plus size={18} /> Add Gallery Image
              </h2>
              <input 
                value={galleryCaption} 
                onChange={(e) => setGalleryCaption(e.target.value)} 
                placeholder="Image caption (optional)" 
                className={inputClass} 
              />
              <input
                type="file"
                accept="image/*"
                onChange={(e) => setGalleryFile(e.target.files ? e.target.files[0] : null)}
                className="file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-gold file:text-accent-foreground hover:file:bg-gold-light block w-full text-sm text-muted-foreground file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-gold file:text-accent-foreground hover:file:bg-gold-light border border-border rounded-lg p-4"
              />
              <button type="submit" disabled={galleryUploading} className="px-6 py-2.5 rounded-lg bg-gold text-accent-foreground font-sans font-semibold hover:bg-gold-light transition-colors text-sm disabled:opacity-50">
                {galleryUploading ? 'Uploading...' : 'Upload Image'}
              </button>
            </form>

            <div className="space-y-2">
              {galleryImages.map((img) => (
                <div key={img.id} className="flex items-center justify-between bg-card rounded-lg border border-border p-4">
                  <div className="flex items-center gap-3">
                    <img src={img.image_url} alt={img.caption} className="w-12 h-12 object-cover rounded" />
                    <div>
                      <span className="font-heading font-bold text-sm">{img.caption || 'No caption'}</span>
                    </div>
                  </div>
                  <button className="text-destructive hover:text-destructive/80" aria-label="Delete image">
                    <Trash2 size={16} />
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}

        {tab === "messages" && (
          <div className="space-y-6">
            <form onSubmit={async (e) => {
              e.preventDefault();
              const formData = new FormData(e.currentTarget as HTMLFormElement);
              const success = await uploadMessage(formData);
              if (success) {
                setMessagesTitle('');
                setMessagesTranscript('');
                (e.currentTarget as any).reset();
                // Reload list
                const { data } = await supabase.from('messages').select('*').order('created_at', { ascending: false });
                setMessages(data || []);
              }
            }} className="bg-card rounded-xl border border-border p-6 space-y-4">
              <h2 className="font-heading font-bold text-foreground flex items-center gap-2">
                <Plus size={18} /> Add New Message
              </h2>
              <input 
                name="title"
                value={messagesTitle}
                onChange={(e) => setMessagesTitle(e.target.value)}
                required 
                placeholder="Message title" 
                className={inputClass} 
              />
              <textarea 
                name="transcript"
                value={messagesTranscript}
                onChange={(e) => setMessagesTranscript(e.target.value)}
                placeholder="Transcript / notes (optional)" 
                rows={4}
                className={inputClass + " resize-y"}
              />
              <input
                name="audio"
                type="file"
                accept="audio/*"
                className="file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-gold file:text-accent-foreground hover:file:bg-gold-light block w-full text-sm text-muted-foreground file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-gold file:text-accent-foreground hover:file:bg-gold-light border border-border rounded-lg p-4"
              />
              <input
                name="image"
                type="file"
                accept="image/*"
                className="file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-gold file:text-accent-foreground hover:file:bg-gold-light block w-full text-sm text-muted-foreground file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-gold file:text-accent-foreground hover:file:bg-gold-light border border-border rounded-lg p-4"
              />
              <button type="submit" disabled={messagesUploading} className="px-6 py-2.5 rounded-lg bg-gold text-accent-foreground font-sans font-semibold hover:bg-gold-light transition-colors text-sm disabled:opacity-50">
                {messagesUploading ? 'Publishing...' : 'Publish Message'}
              </button>
            </form>

            <div className="space-y-2">
              {messages.map((m) => (
                <div key={m.id} className="flex items-center justify-between bg-card rounded-lg border border-border p-4">
                  <div className="flex items-center gap-3">
                    {m.image_url && <img src={m.image_url} alt={m.title} className="w-12 h-12 object-cover rounded" />}
                    <div>
                      <span className="font-heading font-bold text-sm">{m.title}</span>
                      {m.audio_url && <span className="text-xs text-muted-foreground ml-2">🎵 Audio</span>}
                    </div>
                  </div>
                  <button className="text-destructive hover:text-destructive/80" aria-label="Delete message">
                    <Trash2 size={16} />
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminPage;
