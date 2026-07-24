import { PolicyPage } from "@/features/shared/PolicyPage";
import { siteConfig } from "@/content/site";

export default function Page() {
  return <PolicyPage title="Privacy notice" summary="How IAMimpact collects, uses, protects and retains personal information submitted through this website.">
    <p><strong>Effective date:</strong> 24 July 2026</p>
    <h2 className="text-2xl font-bold text-slate-900">Who controls your information</h2>
    <p>IAMimpact Foundation is responsible for personal information collected through this website. Privacy questions and data-rights requests may be sent to <a className="font-bold text-[var(--brand-blue)]" href={`mailto:${siteConfig.publicEmail}`}>{siteConfig.publicEmail}</a>.</p>
    <h2 className="text-2xl font-bold text-slate-900">Information we collect</h2>
    <p>Depending on your request, we may collect your name, contact details, organisation or school, location, skills, availability, project or partnership information, accessibility needs, event choices, consent records, submission metadata and correspondence. We do not ask for sensitive information unless it is necessary and clearly explained.</p>
    <h2 className="text-2xl font-bold text-slate-900">Why we use it</h2>
    <p>We use information to respond to enquiries, assess applications and proposals, administer events, deliver programmes, manage safety, prevent abuse, maintain accurate records, send requested communications and meet legal obligations. Our basis may be consent, steps requested before an engagement, legitimate organisational purposes or a legal duty, depending on the context.</p>
    <h2 className="text-2xl font-bold text-slate-900">Sharing and international processing</h2>
    <p>Access is limited to authorised people and service providers who need the information for the stated purpose. We do not sell personal information. Hosting, email and security providers may process data outside Nigeria; where this occurs, we use appropriate contractual and organisational safeguards.</p>
    <h2 className="text-2xl font-bold text-slate-900">Retention and security</h2>
    <p>We keep information only for as long as the purpose, safeguarding need, dispute period or law requires. We use access controls, encrypted transport, server-side validation, rate limiting, anti-bot checks, backups and data minimisation, but no online system can guarantee absolute security.</p>
    <h2 className="text-2xl font-bold text-slate-900">Your choices and rights</h2>
    <p>Subject to applicable law, you may request access, correction, deletion, restriction, portability or objection, and may withdraw consent for future processing. You may also complain to the Nigeria Data Protection Commission. We may verify your identity before acting on a request.</p>
    <h2 className="text-2xl font-bold text-slate-900">Children</h2>
    <p>Children should use submission pathways with a parent, guardian, school or authorised adult where appropriate. We minimise children’s data and apply additional consent, access and publication controls to programme information.</p>
  </PolicyPage>;
}

