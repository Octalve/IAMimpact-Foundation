import type { Metadata } from "next";
import { commonInvolvementFields, InvolvementFormPage } from "@/features/forms/InvolvementFormPage";

export const metadata: Metadata = { title: "Community Project" };

export default function CommunityProjectPage() {
  return <InvolvementFormPage eyebrow="Community project" title="Propose a locally grounded project." description="Help us understand the challenge, the people affected and the strengths already present in the community." kind="Community project" fields={[...commonInvolvementFields, { name: "location", label: "Community and state", required: true }, { name: "challenge", label: "Challenge, existing assets and proposed response", type: "textarea", required: true }]} />;
}
