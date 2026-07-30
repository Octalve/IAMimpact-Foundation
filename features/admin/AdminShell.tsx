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
    <main id="main-content" className="min-h-[calc(100vh-5rem)] bg-[#f5f7fb]">
      <div className="grid min-h-[calc(100vh-5rem)] lg:grid-cols-[19rem_minmax(0,1fr)]">
        <div className="relative hidden bg-[#0a1830] lg:block">
          <div className="sticky top-20 h-[calc(100vh-5rem)]">
            <AdminSidebar
              email={email}
              roleLabel={roleLabel}
              navigation={navigation}
            />
          </div>
        </div>

        <div className="min-w-0">
        <AdminTopbar
          navigation={navigation}
          onOpenNavigation={() => setMobileOpen(true)}
        />
          <div className="min-w-0">{children}</div>
        </div>
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
