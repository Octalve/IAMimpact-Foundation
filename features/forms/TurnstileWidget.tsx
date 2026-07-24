"use client";

import { useEffect, useRef } from "react";

declare global {
  interface Window {
    turnstile?: { render: (element: HTMLElement, options: { sitekey: string; callback: (token: string) => void; "expired-callback": () => void }) => string };
  }
}

export function TurnstileWidget() {
  const container = useRef<HTMLDivElement>(null);
  const input = useRef<HTMLInputElement>(null);
  const sitekey = process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY;
  useEffect(() => {
    if (!sitekey || !container.current) return;
    const render = () => {
      if (!window.turnstile || !container.current) return;
      window.turnstile.render(container.current, {
        sitekey,
        callback: (token) => { if (input.current) input.current.value = token; },
        "expired-callback": () => { if (input.current) input.current.value = ""; },
      });
    };
    const existing = document.querySelector<HTMLScriptElement>('script[data-iamimpact-turnstile]');
    if (existing) { render(); return; }
    const script = document.createElement("script");
    script.src = "https://challenges.cloudflare.com/turnstile/v0/api.js?render=explicit";
    script.async = true;
    script.defer = true;
    script.dataset.iamimpactTurnstile = "true";
    script.addEventListener("load", render, { once: true });
    document.head.appendChild(script);
  }, [sitekey]);
  if (!sitekey) return null;
  return <div className="mt-5"><input ref={input} type="hidden" name="turnstileToken" /><div ref={container} /></div>;
}
