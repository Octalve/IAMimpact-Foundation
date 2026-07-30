"use client";

import { useEffect } from "react";
import type { AdminNavigationItem } from "./admin-navigation";
import { AdminSidebar } from "./AdminSidebar";

type AdminMobileNavProps = {
  open: boolean;
  email: string;
  roleLabel: string;
  navigation: AdminNavigationItem[];
  onClose: () => void;
};

export function AdminMobileNav({
  open,
  email,
  roleLabel,
  navigation,
  onClose,
}: AdminMobileNavProps) {
  useEffect(() => {
    if (!open) return;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
    };
    window.addEventListener("keydown", closeOnEscape);

    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", closeOnEscape);
    };
  }, [open, onClose]);

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 lg:hidden">
      <button
        type="button"
        aria-label="Close admin navigation"
        onClick={onClose}
        className="absolute inset-0 bg-slate-950/55 backdrop-blur-[2px]"
      />
      <div className="absolute inset-y-0 left-0">
        <AdminSidebar
          mobile
          email={email}
          roleLabel={roleLabel}
          navigation={navigation}
          onClose={onClose}
        />
      </div>
    </div>
  );
}
