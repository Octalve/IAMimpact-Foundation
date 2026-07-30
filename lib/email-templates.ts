type Detail = {
  label: string;
  value: string;
};

type EmailTemplate = {
  subject: string;
  html: string;
  text: string;
};

const BRAND = {
  blue: "#0B3B8F",
  green: "#18864B",
  red: "#D91F2A",
  ink: "#172033",
  muted: "#667085",
  surface: "#F5F7FB",
  border: "#E4E7EC",
};

function escapeHtml(value: string) {
  return value.replace(
    /[&<>"']/g,
    (character) =>
      ({
        "&": "&amp;",
        "<": "&lt;",
        ">": "&gt;",
        '"': "&quot;",
        "'": "&#039;",
      })[character] || character,
  );
}

function renderDetails(details: Detail[]) {
  return details
    .filter((detail) => detail.value.trim())
    .map(
      ({ label, value }) => `
        <tr>
          <td style="padding:12px 0;border-bottom:1px solid ${BRAND.border};color:${BRAND.muted};font-size:13px;vertical-align:top;width:38%;">
            ${escapeHtml(label)}
          </td>
          <td style="padding:12px 0;border-bottom:1px solid ${BRAND.border};color:${BRAND.ink};font-size:14px;font-weight:700;vertical-align:top;">
            ${escapeHtml(value)}
          </td>
        </tr>`,
    )
    .join("");
}

function layout({
  preheader,
  eyebrow,
  heading,
  intro,
  content,
}: {
  preheader: string;
  eyebrow: string;
  heading: string;
  intro: string;
  content: string;
}) {
  return `<!doctype html>
<html lang="en">
  <head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title>${escapeHtml(heading)}</title>
  </head>
  <body style="margin:0;background:${BRAND.surface};font-family:Arial,Helvetica,sans-serif;color:${BRAND.ink};">
    <div style="display:none;max-height:0;overflow:hidden;opacity:0;color:transparent;">
      ${escapeHtml(preheader)}
    </div>
    <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0" style="background:${BRAND.surface};">
      <tr>
        <td align="center" style="padding:32px 16px;">
          <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0" style="max-width:640px;background:#ffffff;border:1px solid ${BRAND.border};border-radius:20px;overflow:hidden;">
            <tr>
              <td style="height:7px;background:linear-gradient(90deg,${BRAND.blue} 0 58%,${BRAND.green} 58% 82%,${BRAND.red} 82% 100%);font-size:0;">&nbsp;</td>
            </tr>
            <tr>
              <td style="padding:28px 32px 18px;">
                <p style="margin:0;color:${BRAND.blue};font-size:20px;font-weight:800;letter-spacing:-0.2px;">IAMimpact Foundation</p>
                <p style="margin:4px 0 0;color:${BRAND.muted};font-size:12px;">Building people. Strengthening communities. Creating impact.</p>
              </td>
            </tr>
            <tr>
              <td style="padding:8px 32px 32px;">
                <p style="margin:0 0 10px;color:${BRAND.green};font-size:12px;font-weight:800;letter-spacing:1.2px;text-transform:uppercase;">${escapeHtml(eyebrow)}</p>
                <h1 style="margin:0;color:${BRAND.ink};font-size:30px;line-height:1.2;letter-spacing:-0.7px;">${escapeHtml(heading)}</h1>
                <p style="margin:16px 0 0;color:${BRAND.muted};font-size:16px;line-height:1.7;">${escapeHtml(intro)}</p>
                ${content}
              </td>
            </tr>
            <tr>
              <td style="padding:22px 32px;background:#F9FAFB;border-top:1px solid ${BRAND.border};">
                <p style="margin:0;color:${BRAND.muted};font-size:12px;line-height:1.6;">
                  This is a service email from IAMimpact Foundation relating to a request or registration made using this email address.
                </p>
              </td>
            </tr>
          </table>
        </td>
      </tr>
    </table>
  </body>
</html>`;
}

function textDetails(details: Detail[]) {
  return details
    .filter((detail) => detail.value.trim())
    .map(({ label, value }) => `${label}: ${value}`)
    .join("\n");
}

export function eventRegistrationConfirmation(input: {
  fullName: string;
  eventTitle: string;
  eventDate: string;
  registrationCode: string;
}): EmailTemplate {
  const details = [
    { label: "Event", value: input.eventTitle },
    { label: "Date and time", value: input.eventDate },
    { label: "Registration code", value: input.registrationCode },
  ];
  const subject = `Registration confirmed: ${input.eventTitle}`;
  return {
    subject,
    html: layout({
      preheader: `Your registration for ${input.eventTitle} is confirmed.`,
      eyebrow: "Event registration confirmed",
      heading: `You’re registered, ${input.fullName}.`,
      intro:
        "Thank you for registering. Keep your registration code safe and present it when requested at the event.",
      content: `
        <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0" style="margin-top:24px;border-top:1px solid ${BRAND.border};">
          ${renderDetails(details)}
        </table>
        <div style="margin-top:24px;padding:16px 18px;border-left:4px solid ${BRAND.green};background:#F0F9F4;border-radius:10px;">
          <p style="margin:0;color:${BRAND.ink};font-size:14px;line-height:1.6;">Please arrive early enough to complete check-in. We look forward to welcoming you.</p>
        </div>`,
    }),
    text: `IAMimpact Foundation\n\nYou’re registered, ${input.fullName}.\n\n${textDetails(details)}\n\nPlease keep your registration code safe and present it when requested at the event.`,
  };
}

export function eventRegistrationAdminNotification(input: {
  fullName: string;
  email: string;
  phone?: string;
  organisation?: string;
  eventTitle: string;
  registrationCode: string;
}): EmailTemplate {
  const details = [
    { label: "Participant", value: input.fullName },
    { label: "Email", value: input.email },
    { label: "Phone", value: input.phone || "Not supplied" },
    { label: "Organisation", value: input.organisation || "Not supplied" },
    { label: "Event", value: input.eventTitle },
    { label: "Registration code", value: input.registrationCode },
  ];
  const subject = `New event registration: ${input.eventTitle}`;
  return {
    subject,
    html: layout({
      preheader: `${input.fullName} registered for ${input.eventTitle}.`,
      eyebrow: "Administration notification",
      heading: "A new participant has registered.",
      intro: "The registration has been saved successfully. Participant details are provided below.",
      content: `<table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0" style="margin-top:24px;border-top:1px solid ${BRAND.border};">${renderDetails(details)}</table>`,
    }),
    text: `IAMimpact Foundation\n\nA new participant has registered.\n\n${textDetails(details)}`,
  };
}

export function submissionConfirmation(input: {
  fullName: string;
  kind: string;
  reference: string;
}): EmailTemplate {
  const kindLabel = input.kind.toLowerCase();
  const details = [
    { label: "Submission type", value: input.kind },
    { label: "Reference", value: input.reference },
  ];
  const subject = `We received your ${kindLabel}`;
  return {
    subject,
    html: layout({
      preheader: `Your ${kindLabel} has been received by IAMimpact Foundation.`,
      eyebrow: "Submission received",
      heading: `Thank you, ${input.fullName}.`,
      intro: `Your ${kindLabel} has been received successfully. Our team will review it and contact you if further information is required.`,
      content: `
        <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0" style="margin-top:24px;border-top:1px solid ${BRAND.border};">
          ${renderDetails(details)}
        </table>
        <p style="margin:22px 0 0;color:${BRAND.muted};font-size:14px;line-height:1.7;">Please keep the reference above for any follow-up concerning this submission.</p>`,
    }),
    text: `IAMimpact Foundation\n\nThank you, ${input.fullName}.\n\nYour ${kindLabel} has been received successfully.\n\n${textDetails(details)}\n\nOur team will review it and contact you if further information is required.`,
  };
}

export function submissionAdminNotification(input: {
  fullName: string;
  email: string;
  phone?: string;
  organisation?: string;
  kind: string;
  reference: string;
  fields: Detail[];
}): EmailTemplate {
  const details = [
    { label: "Submission type", value: input.kind },
    { label: "Reference", value: input.reference },
    { label: "Name", value: input.fullName },
    { label: "Email", value: input.email },
    { label: "Phone", value: input.phone || "Not supplied" },
    { label: "Organisation", value: input.organisation || "Not supplied" },
    ...input.fields,
  ];
  const subject = `New IAMimpact ${input.kind.toLowerCase()}: ${input.fullName}`;
  return {
    subject,
    html: layout({
      preheader: `${input.fullName} submitted a new ${input.kind.toLowerCase()}.`,
      eyebrow: "Administration notification",
      heading: `New ${input.kind.toLowerCase()} received.`,
      intro: "The submission has been stored successfully. Review the details below and follow up when appropriate.",
      content: `<table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0" style="margin-top:24px;border-top:1px solid ${BRAND.border};">${renderDetails(details)}</table>`,
    }),
    text: `IAMimpact Foundation\n\nNew ${input.kind.toLowerCase()} received.\n\n${textDetails(details)}`,
  };
}
