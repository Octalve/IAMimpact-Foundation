import "server-only";
import { Resend } from "resend";
import { env } from "@/lib/env";

type Mail = {
  to: string;
  subject: string;
  html: string;
  text: string;
  replyTo?: string;
  tags?: Array<{ name: string; value: string }>;
};

export type MailResult =
  | { delivered: true; id: string }
  | { delivered: false; reason: "not-configured" };

let client: Resend | null = null;

function resendClient() {
  if (!env.RESEND_API_KEY) return null;
  client ??= new Resend(env.RESEND_API_KEY);
  return client;
}

export async function sendMail(message: Mail): Promise<MailResult> {
  const resend = resendClient();
  if (!resend || !env.MAIL_FROM) {
    return { delivered: false, reason: "not-configured" };
  }

  const { data, error } = await resend.emails.send({
    from: env.MAIL_FROM,
    to: message.to,
    subject: message.subject,
    html: message.html,
    text: message.text,
    replyTo: message.replyTo,
    tags: message.tags,
  });

  if (error || !data?.id) {
    throw new Error("Email delivery request failed.");
  }

  return { delivered: true, id: data.id };
}

export function adminRecipient() {
  return env.ADMIN_NOTIFICATION_EMAIL || "";
}
