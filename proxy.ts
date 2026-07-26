import { auth } from "@/lib/auth/server";

export default auth.middleware({ loginUrl: "/admin/login" });

export const config = {
  matcher: [
    "/admin",
    "/admin/registrations/:path*",
    "/admin/check-in/:path*",
    "/admin/staff/:path*",
    "/admin/audit/:path*",
    "/api/admin/:path*",
  ],
};
