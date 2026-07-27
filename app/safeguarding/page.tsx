import { PolicyPage } from "@/features/shared/PolicyPage";
import { siteConfig } from "@/content/site";

export default function Page() {
  return (
    <PolicyPage
      title="Safeguarding"
      summary="The safety, dignity and rights of children, young people and vulnerable participants shape every IAMimpact activity."
    >
      <p>
        <strong>Last reviewed:</strong> 24 July 2026
      </p>
      <h2 className="text-2xl font-bold text-slate-900">Our commitment</h2>
      <p>
        IAMimpact takes reasonable, proactive steps to prevent harm connected
        with our people, programmes, partnerships, communications and digital
        services. Safeguarding is everyone’s responsibility and concerns will be
        treated seriously, sensitively and without retaliation against a person
        who reports in good faith.
      </p>
      <h2 className="text-2xl font-bold text-slate-900">Expected conduct</h2>
      <p>
        Staff, volunteers, facilitators and partners must treat participants
        with dignity; maintain appropriate physical and digital boundaries;
        avoid being alone with a child where this can reasonably be prevented;
        never exchange sexual, exploitative or humiliating messages; never
        request unnecessary personal information; and never photograph or
        identify a child without the required consent and programme approval.
      </p>
      <h2 className="text-2xl font-bold text-slate-900">
        Programme safeguards
      </h2>
      <p>
        Activities involving children require a documented risk assessment,
        age-appropriate information, informed parent or guardian consent where
        applicable, child assent, approved facilitators, attendance and
        emergency arrangements, safe reporting options and controlled use of
        images and participant data.
      </p>
      <h2 className="text-2xl font-bold text-slate-900">Report a concern</h2>
      <p>
        Report an immediate danger to the appropriate emergency or statutory
        authority first. For a concern connected with IAMimpact, email{" "}
        <a
          className="font-bold text-[var(--brand-blue)]"
          href={`mailto:${siteConfig.safeguardingEmail}`}
        >
          {siteConfig.safeguardingEmail}
        </a>
        . Include only information necessary to explain the concern. Do not
        investigate the matter yourself or circulate allegations.
      </p>
      <h2 className="text-2xl font-bold text-slate-900">Response</h2>
      <p>
        We will acknowledge reports, assess immediate safety, restrict access
        where necessary, preserve confidentiality on a need-to-know basis,
        document decisions and refer matters to competent authorities when
        required. This public statement supports, but does not replace, detailed
        internal procedures, safer-recruitment checks and partner due diligence.
      </p>
    </PolicyPage>
  );
}
