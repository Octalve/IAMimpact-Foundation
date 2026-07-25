import type { Metadata } from "next";
import { commonInvolvementFields, InvolvementFormPage } from "@/features/forms/InvolvementFormPage";

export const metadata: Metadata = { title: "School Engagement" };

export default function SchoolEngagementPage() {
  return <InvolvementFormPage eyebrow="School engagement" title="Bring future readiness to your school." description="Share your school’s priorities so we can understand the learners, context and responsible delivery requirements." kind="School engagement" fields={[...commonInvolvementFields, { name: "role", label: "Your role at the school", required: true }, { name: "studentGroup", label: "Student age range and estimated number", required: true }, { name: "needs", label: "What would you like the engagement to address?", type: "textarea", required: true }]} />;
}
