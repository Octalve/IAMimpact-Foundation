export type AdminNavigationItem = {
  href: string;
  label: string;
  description: string;
  icon: "overview" | "registrations" | "check-in" | "staff" | "audit";
};

export const adminNavigation = {
  overview: {
    href: "/admin",
    label: "Overview",
    description: "Dashboard summary",
    icon: "overview",
  },
  registrations: {
    href: "/admin/registrations",
    label: "Registrations",
    description: "Participants and records",
    icon: "registrations",
  },
  checkIn: {
    href: "/admin/check-in",
    label: "Check in",
    description: "Record attendance",
    icon: "check-in",
  },
  staff: {
    href: "/admin/staff",
    label: "Staff",
    description: "Access and roles",
    icon: "staff",
  },
  audit: {
    href: "/admin/audit",
    label: "Audit log",
    description: "Administrative activity",
    icon: "audit",
  },
} satisfies Record<string, AdminNavigationItem>;
