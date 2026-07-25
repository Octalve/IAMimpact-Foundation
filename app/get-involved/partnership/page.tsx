import type { Metadata } from "next";
import { commonInvolvementFields, InvolvementFormPage } from "@/features/forms/InvolvementFormPage";

export const metadata: Metadata = { title: "Partnership" };

export default function PartnershipPage() {
  return <InvolvementFormPage eyebrow="Partnership" title="Build useful impact with us." description="Explore a clear, responsible collaboration around programmes, research, technology, funding or implementation." kind="Partnership" fields={[...commonInvolvementFields, { name: "partnershipType", label: "Partnership area", type: "select", required: true, options: ["Programme delivery", "Funding or sponsorship", "Research and learning", "Technology", "Employee volunteering", "Media and communications", "Other"] }, { name: "proposal", label: "Proposed collaboration and shared value", type: "textarea", required: true }]} />;
}
