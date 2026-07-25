import "server-only";
import { Resend } from "resend";
import { env } from "@/lib/env";

type Mail = { to: string; subject: string; html: string; replyTo?: string };

export async function sendMail(message: Mail) {
  if (!env.RESEND_API_KEY || !env.MAIL_FROM) return { delivered: false };

  const resend = new Resend(env.RESEND_API_KEY);
  const { error } = await resend.emails.send({
    from: env.MAIL_FROM,
    to: message.to,
    subject: message.subject,
    html: message.html,
    replyTo: message.replyTo,
  });

  if (error) throw new Error("Email delivery failed.");
  return { delivered: true };
}

export function adminRecipient() {
  return env.ADMIN_NOTIFICATION_EMAIL || "";
}
