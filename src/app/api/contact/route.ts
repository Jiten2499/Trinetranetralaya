import { contactSchema } from "@/services/contact/contact-schema";

export async function POST(request: Request) {
  const endpoint = process.env.FORM_ENDPOINT?.trim();
  if (!endpoint) {
    return Response.json(
      {
        ok: false,
        code: "not_configured",
        message: "The contact form is not connected to a delivery service yet.",
      },
      { status: 503 },
    );
  }

  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return Response.json({ ok: false, code: "invalid" }, { status: 400 });
  }

  const parsed = contactSchema.safeParse(body);
  if (!parsed.success) {
    return Response.json({ ok: false, code: "invalid" }, { status: 400 });
  }

  const payload: Record<string, string> = {
    name: parsed.data.fullName,
    phone: parsed.data.phone,
    subject: parsed.data.subject,
    message: parsed.data.message,
    _subject: `Website enquiry: ${parsed.data.subject}`,
  };
  if (parsed.data.email) {
    payload.email = parsed.data.email;
    payload._replyto = parsed.data.email;
  }

  try {
    const response = await fetch(endpoint, {
      method: "POST",
      headers: { "Content-Type": "application/json", Accept: "application/json" },
      body: JSON.stringify(payload),
      signal: AbortSignal.timeout(8000),
    });

    if (!response.ok) {
      return Response.json({ ok: false, code: "delivery_failed" }, { status: 502 });
    }

    return Response.json({ ok: true });
  } catch {
    return Response.json({ ok: false, code: "delivery_failed" }, { status: 502 });
  }
}
