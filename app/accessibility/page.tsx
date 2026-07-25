import { PolicyPage } from "@/features/shared/PolicyPage";
import { siteConfig } from "@/content/site";

export default function Page() {
  return <PolicyPage title="Accessibility" summary="Our commitment to making IAMimpact information and participation pathways usable by as many people as possible.">
    <p><strong>Last reviewed:</strong> 24 July 2026</p>
    <h2 className="text-2xl font-bold text-slate-900">Our target</h2>
    <p>We aim to meet Web Content Accessibility Guidelines (WCAG) 2.2 Level AA as the website develops. This includes semantic headings, keyboard access, visible focus, meaningful link text, text alternatives, readable contrast, responsive layouts, clear form labels, useful error messages and respect for reduced-motion preferences.</p>
    <h2 className="text-2xl font-bold text-slate-900">Known limitations</h2>
    <p>Some third-party content, downloaded documents or embedded services may not yet meet the same standard. Event details may also rely on venue information supplied by partners. We review high-use journeys first and record improvements as issues are identified.</p>
    <h2 className="text-2xl font-bold text-slate-900">Request an adjustment</h2>
    <p>If you need information in another format, assistance with a form, captioning, mobility support, interpretation or another reasonable adjustment, tell us through the contact form or email <a className="font-bold text-[var(--brand-blue)]" href={`mailto:${siteConfig.publicEmail}`}>{siteConfig.publicEmail}</a>. Please describe the page, event or resource and the format or support that would help.</p>
    <h2 className="text-2xl font-bold text-slate-900">Feedback</h2>
    <p>Report an accessibility barrier with the page address, the device or assistive technology used and what you were trying to do. We aim to acknowledge accessibility feedback within five working days and provide an update or practical alternative.</p>
  </PolicyPage>;
}

