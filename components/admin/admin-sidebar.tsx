"use client";

import Link from "next/link";
import {
  Boxes,
  FileText,
  LayoutDashboard,
  Menu,
  MessageSquare,
  Newspaper,
  Package,
  Tag,
  Users,
  X,
} from "lucide-react";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const items = [
  { href: "/admin", label: "Dashboard", icon: LayoutDashboard },
  { href: "/admin/products", label: "Products", icon: Package },
  { href: "/admin/inventory", label: "Inventory", icon: Boxes },
  { href: "/admin/quotations", label: "Quotations", icon: FileText },
  { href: "/admin/inquiries", label: "Inquiries", icon: MessageSquare },
  { href: "/admin/promotions", label: "Promotions", icon: Tag },
  { href: "/admin/news", label: "News", icon: Newspaper },
  { href: "/admin/users", label: "Users", icon: Users },
];

function NavItems({ onNavigate }: { onNavigate?: () => void }) {
  const pathname = usePathname();
  return (
    <>
      {items.map(({ href, label, icon: Icon }) => {
        const isActive =
          href === "/admin" ? pathname === href : pathname.startsWith(href);
        return (
          <Link
            aria-current={isActive ? "page" : undefined}
            className={cn(
              "flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition-colors",
              isActive
                ? "bg-primary text-primary-foreground"
                : "text-muted-foreground hover:bg-muted hover:text-foreground",
            )}
            href={href}
            key={href}
            onClick={onNavigate}
          >
            <Icon aria-hidden="true" className="size-4" />
            {label}
          </Link>
        );
      })}
    </>
  );
}

export function AdminSidebar() {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <>
      <aside className="hidden h-screen w-64 shrink-0 overflow-y-auto border-r bg-background p-4 lg:sticky lg:top-0 lg:block">
        <Link
          className="block rounded-xl px-3 py-3 text-lg font-bold focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
          href="/admin"
        >
          DEMO <span className="text-primary">ADMIN</span>
        </Link>
        <nav aria-label="Admin navigation" className="mt-5 space-y-1">
          <NavItems />
        </nav>
      </aside>
      <div className="border-b bg-background p-3 lg:hidden">
        <Button
          aria-controls="mobile-admin-navigation"
          aria-expanded={isOpen}
          onClick={() => setIsOpen(!isOpen)}
          size="sm"
          variant="ghost"
        >
          {isOpen ? <X aria-hidden="true" /> : <Menu aria-hidden="true" />}
          <span className="ml-2">Admin menu</span>
        </Button>
      </div>
      {isOpen ? (
        <div
          className="border-b bg-background p-4 lg:hidden"
          id="mobile-admin-navigation"
        >
          <nav aria-label="Admin navigation" className="space-y-1">
            <NavItems onNavigate={() => setIsOpen(false)} />
          </nav>
        </div>
      ) : null}
    </>
  );
}
