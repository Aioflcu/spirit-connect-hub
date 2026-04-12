import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.100.1";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const LOVABLE_API_KEY = Deno.env.get("LOVABLE_API_KEY");
    if (!LOVABLE_API_KEY) throw new Error("LOVABLE_API_KEY is not configured");

    const SUPABASE_URL = Deno.env.get("SUPABASE_URL");
    const SUPABASE_SERVICE_ROLE_KEY = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY");
    if (!SUPABASE_URL || !SUPABASE_SERVICE_ROLE_KEY) {
      throw new Error("Supabase credentials not configured");
    }

    const supabase = createClient(SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY);

    // Check if today's verse already exists
    const today = new Date().toISOString().split("T")[0];
    const { data: existing } = await supabase
      .from("daily_bible")
      .select("id")
      .eq("date", today)
      .maybeSingle();

    if (existing) {
      return new Response(JSON.stringify({ message: "Today's verse already exists" }), {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    // Generate a Bible verse using Lovable AI
    const aiResponse = await fetch("https://ai.gateway.lovable.dev/v1/chat/completions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${LOVABLE_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "google/gemini-3-flash-preview",
        messages: [
          {
            role: "system",
            content: `You are a Bible verse selector for a church website. Your job is to select an inspiring Bible verse for the day and provide a short spiritual reflection.

You MUST respond with valid JSON in this exact format (no markdown, no code blocks):
{"verse_reference": "Book Chapter:Verse", "verse_text": "The exact Bible verse text", "reflection": "A short 2-3 sentence spiritual reflection on the verse"}

Rules:
- Pick a different verse each time - vary across Old and New Testament
- Use the King James Version (KJV) or New International Version (NIV) text
- The reflection should be encouraging, uplifting, and applicable to daily life
- Keep the reflection under 100 words
- Today's date is ${today} - consider the season/time of year for relevance`,
          },
          {
            role: "user",
            content: `Select an inspiring Bible verse for today (${today}) and provide a short reflection.`,
          },
        ],
      }),
    });

    if (!aiResponse.ok) {
      if (aiResponse.status === 429) {
        return new Response(JSON.stringify({ error: "Rate limited, please try again later" }), {
          status: 429, headers: { ...corsHeaders, "Content-Type": "application/json" },
        });
      }
      if (aiResponse.status === 402) {
        return new Response(JSON.stringify({ error: "AI credits exhausted" }), {
          status: 402, headers: { ...corsHeaders, "Content-Type": "application/json" },
        });
      }
      const errText = await aiResponse.text();
      console.error("AI gateway error:", aiResponse.status, errText);
      throw new Error(`AI gateway error: ${aiResponse.status}`);
    }

    const aiData = await aiResponse.json();
    const content = aiData.choices?.[0]?.message?.content;
    if (!content) throw new Error("No content from AI");

    // Parse the JSON response - strip markdown code blocks if present
    let cleaned = content.trim();
    if (cleaned.startsWith("```")) {
      cleaned = cleaned.replace(/^```(?:json)?\s*/, "").replace(/\s*```$/, "");
    }

    const parsed = JSON.parse(cleaned);
    const { verse_reference, verse_text, reflection } = parsed;

    if (!verse_reference || !verse_text) {
      throw new Error("AI response missing required fields");
    }

    // Insert into database
    const { error: insertError } = await supabase.from("daily_bible").insert({
      date: today,
      verse_reference,
      verse_text,
      reflection: reflection || null,
    });

    if (insertError) throw insertError;

    return new Response(JSON.stringify({ success: true, verse_reference, date: today }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  } catch (e) {
    console.error("generate-daily-bible error:", e);
    return new Response(JSON.stringify({ error: e instanceof Error ? e.message : "Unknown error" }), {
      status: 500,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});
