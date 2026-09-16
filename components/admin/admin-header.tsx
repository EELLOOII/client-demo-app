"use client";

import Link from "next/link";
import { ChevronRight, Palette } from "lucide-react";
import { usePathname } from "next/navigation";
import { ADMIN_THEMES, useAdminTheme, type AdminTheme } from "@/components/admin/admin-theme-provider";

const PAGE_LABELS: Record<string, string> = {
  inquiries: "Inquiries",
  inventory: "Inventory",
  news: "News",
  products: "Products",
  promotions: "Promotions",
  quotations: "Quotations",
  users: "Users",
};

export function AdminHeader() {
  const pathname = usePathname();
  const { setTheme, theme } = useAdminTheme();
  const pageLabel =
    pathname === "/admin"
      ? "Dashboard"
      : (PAGE_LABELS[pathname.split("/")[2]] ?? "Admin");
  return (
    <header className="flex items-center justify-between gap-4 border-b bg-background px-4 py-3 sm:px-6">
      <nav
        aria-label="Breadcrumb"
        className="flex min-w-0 items-center gap-2 text-sm"
      >
        <Link
          className="rounded-sm font-medium hover:text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
          href="/admin"
        >
          Admin
        </Link>
        <ChevronRight
          aria-hidden="true"
          className="size-4 shrink-0 text-muted-foreground"
        />
        <span aria-current="page" className="truncate text-muted-foreground">
          {pageLabel}
        </span>
      </nav>
      <div className="flex items-center gap-3">
        <label className="flex items-center gap-2" htmlFor="admin-theme">
          <Palette aria-hidden="true" className="hidden size-4 text-muted-foreground sm:block" />
          <span className="sr-only">Admin color theme</span>
          <select
            aria-label="Admin color theme"
            className="h-9 rounded-full border bg-background px-3 text-sm font-semibold focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
            id="admin-theme"
            onChange={(event) => setTheme(event.target.value as AdminTheme)}
            value={theme}
          >
            {ADMIN_THEMES.map((option) => (
              <option key={option} value={option}>
                {option[0].toUpperCase() + option.slice(1)}
              </option>
            ))}
          </select>
        </label>
        <span className="hidden text-sm text-muted-foreground sm:inline">
          Frontend prototype
        </span>
        <Link
          className="rounded-full bg-muted px-3 py-1.5 text-sm font-semibold hover:bg-muted focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
          href="/admin/login"
        >
          Login preview
        </Link>
      </div>
    </header>
  );
}
