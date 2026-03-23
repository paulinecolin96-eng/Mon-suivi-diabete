import { serve } from "https://deno.land/std@0.168.0/http/server.ts"

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
}

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response("ok", { headers: corsHeaders })
  }

  try {
    const body = await req.text()
    const parsed = JSON.parse(body)

    const html = "<div style='font-family:sans-serif;max-width:600px;margin:0 auto'>" +
      "<div style='background:#001e5a;padding:20px;border-radius:10px 10px 0 0'>" +
      "<h2 style='color:white;margin:0'>MON SUIVI DIABETE</h2></div>" +
      "<div style='background:#f5f5f5;padding:28px;border-radius:0 0 10px 10px'>" +
      "<p>Bonjour " + parsed.prenom_patient + ",</p>" +
      "<p>Votre medecin <strong>" + parsed.nom_medecin + "</strong> vous a repondu :</p>" +
      "<div style='background:white;border-left:4px solid #001e5a;padding:16px 20px;border-radius:0 8px 8px 0;margin:20px 0'>" +
      "<p style='color:#001e5a;margin:0;line-height:1.7'>" + parsed.reponse + "</p></div>" +
      "<p style='color:#999;font-size:0.8rem;margin-top:24px'>Envoye depuis Mon Suivi Diabete.<br/>Ne pas repondre directement a cet email.</p>" +
      "</div></div>"

    const res = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": "Bearer " + Deno.env.get("RESEND_API_KEY"),
      },
      body: JSON.stringify({
        from: "Mon Suivi Diabete <noreply@monsuividiabete.com>",
        to: parsed.email_patient,
        subject: "Reponse de " + parsed.nom_medecin + " - Mon Suivi Diabete",
        html: html,
      }),
    })

    return new Response(
      JSON.stringify({ ok: res.ok }),
      { headers: { ...corsHeaders, "Content-Type": "application/json" } }
    )
  } catch (err) {
    return new Response(
      JSON.stringify({ error: err.message }),
      { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    )
  }
})
