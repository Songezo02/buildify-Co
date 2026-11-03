import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";

const submitSchema = z.object({
  name: z.string().trim().min(1, "Please enter your full name.").max(120),
  business: z.string().trim().max(120).optional().default(""),
  email: z.string().trim().email("Please enter a valid email address.").max(200),
  phone: z.string().trim().max(30).optional().default(""),
  services: z
    .array(z.string().trim().min(1).max(120))
    .min(1, "Please select at least one service.")
    .max(10),
  budget: z.string().trim().max(40).optional().default(""),
  description: z
    .string()
    .trim()
    .min(20, "Please describe your project in at least 20 characters.")
    .max(3000),
  contactMethod: z.enum(["email", "phone", "whatsapp"]),
});

export type EnquiryInput = z.infer<typeof submitSchema>;

export const submitEnquiry = createServerFn({ method: "POST" })
  .inputValidator((input) => submitSchema.parse(input))
  .handler(async ({ data }) => {
    const { supabaseAdmin } = await import("@/integrations/supabase/client.server");

    const { data: row, error } = await supabaseAdmin
      .from("enquiries")
      .insert({
        name: data.name,
        business: data.business || null,
        email: data.email,
        phone: data.phone || null,
        services: data.services,
        budget: data.budget || null,
        description: data.description,
        contact_method: data.contactMethod,
      })
      .select("id")
      .single();

    if (error) throw new Error(error.message);

    // Email notification (non-fatal — the enquiry is already stored).
    try {
      const apiKey = process.env.RESEND_API_KEY;
      if (apiKey) {
        await fetch("https://api.resend.com/emails", {
          method: "POST",
          headers: {
            Authorization: `Bearer ${apiKey}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            from: "Buildify Co. <onboarding@resend.dev>",
            to: ["songezogwabavu@gmail.com"],
            subject: `New quotation request from ${data.name}`,
            html: `
              <h2>New quotation request</h2>
              <p><strong>${data.name}</strong>${data.business ? ` — ${data.business}` : ""}</p>
              <p>Email: ${data.email}${data.phone ? `<br>Phone: ${data.phone}` : ""}</p>
              <p>Services: ${data.services.map((s) => `<li>${s}</li>`).join("")}</p>
              ${data.budget ? `<p>Estimated budget: ${data.budget}</p>` : ""}
              <p>Preferred contact method: ${data.contactMethod}</p>
              <p><strong>Project description:</strong></p>
              <blockquote style="border-left:3px solid #7c5cff;padding-left:12px;color:#444;">${data.description.replace(/</g, "&lt;").replace(/\n/g, "<br>")}</blockquote>
            `,
          }),
        });
      }
    } catch (e) {
      console.error("Enquiry email notification failed:", e);
    }

    return { ok: true, id: row.id };
  });
