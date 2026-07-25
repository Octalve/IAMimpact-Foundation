"use client";

import { useEffect, useRef, useState } from "react";
import {
  CheckCircle2,
  Download,
  ImageDown,
  LoaderCircle,
  MapPin,
  QrCode,
  UserRound,
} from "lucide-react";

type EventPassProps = {
  registration: {
    fullName: string;
    registrationCode: string;
  };
  event: {
    title: string;
    date: string;
    time: string;
    location: string;
  };
};

export function EventPass({ registration, event }: EventPassProps) {
  const passRef = useRef<HTMLElement>(null);
  const [qrCode, setQrCode] = useState("");
  const [downloading, setDownloading] = useState<"pdf" | "png" | null>(
    null,
  );
  const [downloadError, setDownloadError] = useState("");

  useEffect(() => {
    let active = true;

    const confirmationUrl = `${
      window.location.origin
    }/registration/${encodeURIComponent(registration.registrationCode)}`;

    async function generateQrCode() {
      try {
        const QRCode = await import("qrcode");

        const image = await QRCode.toDataURL(confirmationUrl, {
          width: 320,
          margin: 1,
          errorCorrectionLevel: "H",
          color: {
            dark: "#154f9d",
            light: "#ffffff",
          },
        });

        if (active) {
          setQrCode(image);
        }
      } catch {
        if (active) {
          setDownloadError(
            "The verification QR code could not be generated. Please refresh the page.",
          );
        }
      }
    }

    void generateQrCode();

    return () => {
      active = false;
    };
  }, [registration.registrationCode]);

  async function createPassImage() {
    if (!passRef.current) {
      throw new Error("Event pass is unavailable.");
    }

    const { toPng } = await import("html-to-image");

    return toPng(passRef.current, {
      cacheBust: true,
      pixelRatio: 2,
      backgroundColor: "#ffffff",
    });
  }

  async function saveAsPng() {
    try {
      setDownloading("png");
      setDownloadError("");

      const image = await createPassImage();
      const link = document.createElement("a");

      link.download = `IAMimpact-${registration.registrationCode}.png`;
      link.href = image;
      document.body.appendChild(link);
      link.click();
      link.remove();
    } catch {
      setDownloadError(
        "We could not save the PNG. Please try again or download the PDF.",
      );
    } finally {
      setDownloading(null);
    }
  }

  async function downloadPdf() {
    try {
      setDownloading("pdf");
      setDownloadError("");

      const image = await createPassImage();
      const { jsPDF } = await import("jspdf");

      const pdf = new jsPDF({
        orientation: "landscape",
        unit: "mm",
        format: "a5",
      });

      pdf.addImage(image, "PNG", 0, 0, 210, 148);
      pdf.save(`IAMimpact-${registration.registrationCode}.pdf`);
    } catch {
      setDownloadError(
        "We could not create the PDF. Please try again or save the PNG.",
      );
    } finally {
      setDownloading(null);
    }
  }

  return (
    <div className="mx-auto max-w-4xl">
      <div className="mb-8 text-center">
        <CheckCircle2 className="mx-auto h-14 w-14 text-[var(--brand-green)]" />

        <p className="eyebrow mt-6">Registration successful</p>

        <h1 className="mt-4 text-4xl font-black text-slate-950">
          Your place has been confirmed
        </h1>

        <p className="mx-auto mt-4 max-w-2xl text-slate-600">
          Download your event pass and present its QR code or registration
          code during check-in.
        </p>
      </div>

      <article
        ref={passRef}
        className="overflow-hidden rounded-[2rem] bg-white shadow-xl ring-1 ring-slate-200"
      >
        <header className="bg-[var(--brand-deep-blue)] px-7 py-7 text-white sm:px-10">
          <p className="text-sm font-black uppercase tracking-[0.2em] text-blue-100">
            IAMimpact Foundation
          </p>

          <h2 className="mt-3 text-3xl font-black">{event.title}</h2>

          <p className="mt-2 text-blue-100">Official digital event pass</p>
        </header>

        <div className="grid gap-8 p-7 sm:grid-cols-[1fr_auto] sm:p-10">
          <div className="space-y-6">
            <div>
              <p className="text-xs font-bold uppercase tracking-widest text-slate-500">
                Participant
              </p>

              <p className="mt-2 flex items-center gap-2 text-2xl font-black text-slate-950">
                <UserRound className="h-5 w-5 shrink-0 text-[var(--brand-green)]" />
                {registration.fullName}
              </p>
            </div>

            <div>
              <p className="text-xs font-bold uppercase tracking-widest text-slate-500">
                Date and time
              </p>

              <p className="mt-2 font-bold text-slate-800">
                {event.date} · {event.time}
              </p>
            </div>

            <div>
              <p className="text-xs font-bold uppercase tracking-widest text-slate-500">
                Venue
              </p>

              <p className="mt-2 flex items-start gap-2 font-semibold text-slate-700">
                <MapPin className="mt-0.5 h-5 w-5 shrink-0 text-[var(--brand-green)]" />
                {event.location}
              </p>
            </div>

            <div className="rounded-2xl bg-slate-100 p-5">
              <p className="text-xs font-bold uppercase tracking-widest text-slate-500">
                Registration code
              </p>

              <p className="mt-2 break-all font-mono text-xl font-black text-[var(--brand-deep-blue)]">
                {registration.registrationCode}
              </p>
            </div>
          </div>

          <div className="flex min-w-48 flex-col items-center justify-center rounded-2xl border border-slate-200 p-5 text-center">
            {qrCode ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                src={qrCode}
                alt={`Verification QR code for ${registration.fullName}`}
                className="h-44 w-44"
              />
            ) : (
              <div className="flex h-44 w-44 items-center justify-center">
                <QrCode className="h-12 w-12 text-slate-300" />
              </div>
            )}

            <p className="mt-3 text-xs font-bold text-slate-500">
              Scan to verify this pass
            </p>
          </div>
        </div>

        <footer className="border-t border-dashed border-slate-300 px-7 py-5 text-center text-xs font-semibold text-slate-500">
          This pass is issued exclusively to the registered participant.
        </footer>
      </article>

      {downloadError ? (
        <p
          role="alert"
          className="mx-auto mt-5 max-w-2xl text-center font-semibold text-red-700"
        >
          {downloadError}
        </p>
      ) : null}

      <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
        <button
          type="button"
          onClick={downloadPdf}
          disabled={downloading !== null || !qrCode}
          className="inline-flex min-h-12 items-center justify-center gap-2 rounded-full bg-[var(--brand-deep-blue)] px-7 font-bold text-white transition hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-60"
        >
          {downloading === "pdf" ? (
            <LoaderCircle className="h-5 w-5 animate-spin" />
          ) : (
            <Download className="h-5 w-5" />
          )}

          {downloading === "pdf"
            ? "Preparing PDF..."
            : "Download event pass"}
        </button>

        <button
          type="button"
          onClick={saveAsPng}
          disabled={downloading !== null || !qrCode}
          className="inline-flex min-h-12 items-center justify-center gap-2 rounded-full border-2 border-[var(--brand-deep-blue)] px-7 font-bold text-[var(--brand-deep-blue)] transition hover:bg-blue-50 disabled:cursor-not-allowed disabled:opacity-60"
        >
          {downloading === "png" ? (
            <LoaderCircle className="h-5 w-5 animate-spin" />
          ) : (
            <ImageDown className="h-5 w-5" />
          )}

          {downloading === "png" ? "Preparing PNG..." : "Save as PNG"}
        </button>
      </div>
    </div>
  );
}