import type { Metadata } from "next";
import { commonInvolvementFields, InvolvementFormPage } from "@/features/forms/InvolvementFormPage";

export const metadata: Metadata = { title: "Volunteer" };

export default function VolunteerPage() {
  return <InvolvementFormPage eyebrow="Volunteer" title="Contribute your skills to meaningful work." description="Tell us how you would like to support responsible programmes and community-led impact." kind="Volunteer" fields={[...commonInvolvementFields, { name: "skills", label: "Skills or contribution areas", required: true }, { name: "availability", label: "Availability", required: true }, { name: "motivation", label: "Why would you like to volunteer?", type: "textarea", required: true }]} />;
}
