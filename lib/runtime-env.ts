type D1Statement = {
  bind: (...values: unknown[]) => D1Statement;
  run: () => Promise<unknown>;
  first: <T>() => Promise<T | null>;
};

export type RuntimeEnv = {
  DB?: {
    prepare: (query: string) => D1Statement;
  };
  TURNSTILE_SECRET_KEY?: string;
  MAIL_PROVIDER?: string;
  RESEND_API_KEY?: string;
  MAIL_FROM?: string;
  ADMIN_NOTIFICATION_EMAIL?: string;
};

export async function getRuntimeEnv(): Promise<RuntimeEnv> {
  return process.env as RuntimeEnv;
}
