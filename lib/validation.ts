const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export function cleanText(value: unknown, max = 2000) {
  return typeof value === "string" ? value.trim().replace(/\0/g, "").slice(0, max) : "";
}

export function validateEmail(value: unknown) {
  const email = cleanText(value, 254).toLowerCase();
  return emailPattern.test(email) ? email : "";
}

export function isHoneypotClean(value: unknown) {
  return !cleanText(value, 200);
}

export function makeRegistrationCode() {
  const bytes = crypto.getRandomValues(new Uint8Array(6));
  const token = Array.from(bytes, (byte) => byte.toString(16).padStart(2, "0")).join("").toUpperCase();
  return `IAM-${token.slice(0, 4)}-${token.slice(4, 8)}-${token.slice(8)}`;
}
