import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";

const submitSchema = z.object({
  name: z.string().trim().min(1).max(100),
  business: z.string().trim().max(120).optional().default(""),
  location: z.string().trim().max(120).optional().default(""),
  service: z.string().trim().min(1).max(80),
  rating: z.number().int().min(1).max(5),
  message: z.string().trim().min(20).max(400),
});

export const submitTestimonial = createServerFn({ method: "POST" })
  .inputValidator((input) => submitSchema.parse(input))
  .handler(async ({ data }) => {
    const { supabaseAdmin } = await import("@/integrations/supabase/client.server");

    const { data: row, error } = await supabaseAdmin
      .from("testimonials")
      .insert({
        name: data.name,
        business: data.business || null,
        location: data.location || null,
        service: data.service,
        rating: data.rating,
        message: data.message,
        approved: false,
      })
      .select()
      .single();

    if (error) throw new Error(error.message);

    // Fire-and-await email notification (non-fatal)
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
            subject: `New testimonial from ${data.name} (${data.rating}★)`,
            html: `
              <h2>New testimonial submitted</h2>
              <p><strong>${data.name}</strong>${data.business ? ` — ${data.business}` : ""}${data.location ? `, ${data.location}` : ""}</p>
              <p>Service: ${data.service}</p>
              <p>Rating: ${"★".repeat(data.rating)}${"☆".repeat(5 - data.rating)}</p>
              <blockquote style="border-left:3px solid #EF9F27;padding-left:12px;color:#444;font-style:italic;">${data.message.replace(/</g, "&lt;")}</blockquote>
              <p>Review &amp; approve in the admin panel: <a href="https://id-preview--448eae1b-145f-4459-9548-57242bafb455.lovable.app/admin/testimonials">/admin/testimonials</a></p>
            `,
          }),
        });
      }
    } catch (e) {
      console.error("Email notification failed:", e);
    }

    return { ok: true, id: row.id };
  });

export const listApprovedTestimonials = createServerFn({ method: "GET" }).handler(
  async () => {
    const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
    const { data, error } = await supabaseAdmin
      .from("testimonials")
      .select("id, name, business, location, message, rating, created_at")
      .eq("approved", true)
      .order("created_at", { ascending: false });
    if (error) throw new Error(error.message);
    return { items: data ?? [] };
  },
);

const adminAuthSchema = z.object({ password: z.string().min(1) });

export const adminListTestimonials = createServerFn({ method: "POST" })
  .inputValidator((input) => adminAuthSchema.parse(input))
  .handler(async ({ data }) => {
    if (data.password !== process.env.ADMIN_PASSWORD) {
      throw new Error("Invalid password");
    }
    const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
    const { data: rows, error } = await supabaseAdmin
      .from("testimonials")
      .select("*")
      .order("created_at", { ascending: false });
    if (error) throw new Error(error.message);
    return { items: rows ?? [] };
  });

const adminUpdateSchema = z.object({
  password: z.string().min(1),
  id: z.string().uuid(),
  action: z.enum(["approve", "reject", "delete"]),
});

export const adminUpdateTestimonial = createServerFn({ method: "POST" })
  .inputValidator((input) => adminUpdateSchema.parse(input))
  .handler(async ({ data }) => {
    if (data.password !== process.env.ADMIN_PASSWORD) {
      throw new Error("Invalid password");
    }
    const { supabaseAdmin } = await import("@/integrations/supabase/client.server");

    if (data.action === "delete" || data.action === "reject") {
      const { error } = await supabaseAdmin
        .from("testimonials")
        .delete()
        .eq("id", data.id);
      if (error) throw new Error(error.message);
    } else if (data.action === "approve") {
      const { error } = await supabaseAdmin
        .from("testimonials")
        .update({ approved: true })
        .eq("id", data.id);
      if (error) throw new Error(error.message);
    }
    return { ok: true };
  });
