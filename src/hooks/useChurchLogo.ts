import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";

export function useChurchLogo() {
  const [logoUrl, setLogoUrl] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchLogo = async () => {
      const { data } = await supabase
        .from("site_settings")
        .select("value")
        .eq("key", "church_logo")
        .maybeSingle();
      setLogoUrl(data?.value || null);
      setLoading(false);
    };
    fetchLogo();
  }, []);

  return { logoUrl, loading };
}

export function useUploadChurchLogo() {
  const [uploading, setUploading] = useState(false);

  const uploadLogo = async (file: File): Promise<string | null> => {
    setUploading(true);
    try {
      const ext = file.name.split(".").pop();
      const filePath = `church-logo.${ext}`;

      // Upload to storage
      const { error: uploadError } = await supabase.storage
        .from("site-assets")
        .upload(filePath, file, { upsert: true });

      if (uploadError) throw uploadError;

      const { data: urlData } = supabase.storage
        .from("site-assets")
        .getPublicUrl(filePath);

      const publicUrl = urlData.publicUrl + "?t=" + Date.now();

      // Upsert into site_settings
      const { data: existing } = await supabase
        .from("site_settings")
        .select("id")
        .eq("key", "church_logo")
        .maybeSingle();

      if (existing) {
        await supabase
          .from("site_settings")
          .update({ value: publicUrl, updated_at: new Date().toISOString() })
          .eq("key", "church_logo");
      } else {
        await supabase
          .from("site_settings")
          .insert({ key: "church_logo", value: publicUrl });
      }

      return publicUrl;
    } catch (err: any) {
      console.error("Logo upload failed:", err);
      return null;
    } finally {
      setUploading(false);
    }
  };

  return { uploadLogo, uploading };
}
