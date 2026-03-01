import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";
import { Resend } from "resend";

const LEAD_EMAIL = "contacto@sigmaaiagency.com";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

function getResend() {
  const key = process.env.RESEND_API_KEY;
  return key ? new Resend(key) : null;
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const raw = (body || {}) as {
      name?: string | null;
      email?: string;
      phone?: string | null;
      message?: string | null;
      source?: string;
    };
    const name = raw.name?.trim() || null;
    const email = (raw.email || "").trim();
    const phone = raw.phone?.trim() || null;
    const message = raw.message?.trim() || null;
    const source = raw.source || "website";

    if (!email || !email.includes("@")) {
      return NextResponse.json(
        { error: "Email válido requerido" },
        { status: 400 }
      );
    }

    if (supabaseUrl && supabaseAnonKey) {
      const supabase = createClient(supabaseUrl, supabaseAnonKey);
      const { error } = await supabase.from("leads").insert({
        name,
        email,
        phone,
        message,
        source,
      });
      if (error) {
        console.error("Supabase insert error:", error);
        return NextResponse.json(
          { error: "Error al guardar" },
          { status: 500 }
        );
      }
    } else {
      console.info("Lead:", { name, email, phone, message, source });
    }

    const resend = getResend();
    if (resend) {
      await resend.emails.send({
        from: process.env.RESEND_FROM || "Sigma AI Agency <onboarding@resend.dev>",
        to: LEAD_EMAIL,
        subject: `Nuevo lead: ${name || email}`,
        html: `
          <p><strong>Nombre:</strong> ${name ?? "—"}</p>
          <p><strong>Email:</strong> ${email}</p>
          <p><strong>Tel/WhatsApp:</strong> ${phone ?? "—"}</p>
          <p><strong>Origen:</strong> ${source}</p>
          <p><strong>Mensaje:</strong></p>
          <p>${message ? message.replace(/\n/g, "<br>") : "—"}</p>
        `,
      });
    }

    return NextResponse.json({ ok: true });
  } catch (e) {
    console.error(e);
    return NextResponse.json(
      { error: "Error interno" },
      { status: 500 }
    );
  }
}
