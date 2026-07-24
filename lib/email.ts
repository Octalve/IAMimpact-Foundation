import { getRuntimeEnv } from "./runtime-env";

type Mail = { to: string; subject: string; html: string; replyTo?: string };

export async function sendMail(message: Mail) {
  const env = await getRuntimeEnv();
  const provider = env.MAIL_PROVIDER || "resend";
  if (provider !== "resend" || !env.RESEND_API_KEY) {
    console.info("Email delivery skipped: configure MAIL_PROVIDER and provider credentials.");
    return { delivered: false };
  }
  const response = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: { Authorization: `Bearer ${env.RESEND_API_KEY}`, "Content-Type": "application/json" },
    body: JSON.stringify({
      from: env.MAIL_FROM || "IAMimpact Foundation <updates@example.org>",
      to: [message.to],
      subject: message.subject,
      html: message.html,
      reply_to: message.replyTo,
    }),
  });
  return { delivered: response.ok };
}

export async function adminRecipient() {
  const env = await getRuntimeEnv();
  return env.ADMIN_NOTIFICATION_EMAIL || "";
}
