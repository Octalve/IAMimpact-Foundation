"use client";

import { useCallback, useState } from "react";
import type { AdminNavigationItem } from "./admin-navigation";
import { AdminMobileNav } from "./AdminMobileNav";
import { AdminSidebar } from "./AdminSidebar";
import { AdminTopbar } from "./AdminTopbar";

type AdminShellProps = {
  children: React.ReactNode;
  email: string;
  roleLabel: string;
  navigation: AdminNavigationItem[];
};

export function AdminShell({
  children,
  email,
  roleLabel,
  navigation,
}: AdminShellProps) {
  const [mobileOpen, setMobileOpen] = useState(false);
  const closeMobileNav = useCallback(() => setMobileOpen(false), []);

  return (
    <main id="main-content" className="min-h-screen bg-[#f5f7fb]">
      <div className="fixed inset-y-0 left-0 z-40 hidden lg:block">
        <AdminSidebar
          email={email}
          roleLabel={roleLabel}
          navigation={navigation}
        />
      </div>

      <div className="min-h-screen lg:pl-[17.5rem]">
        <AdminTopbar
          navigation={navigation}
          onOpenNavigation={() => setMobileOpen(true)}
        />
        <div className="min-w-0">{children}</div>
      </div>

      <AdminMobileNav
        open={mobileOpen}
        email={email}
        roleLabel={roleLabel}
        navigation={navigation}
        onClose={closeMobileNav}
      />
    </main>
  );
}
