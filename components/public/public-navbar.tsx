"use client";

import Link from "next/link";
import { Menu, X } from "lucide-react";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const NAVIGATION_LINKS = [
  { href: "/products", label: "Products" },
  { href: "/promotions", label: "Promotions" },
  { href: "/news", label: "News" },
  { href: "/contact", label: "Contact" },
];

export function PublicNavbar() {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();
  const isActive = (href: string) =>
    href === "/" ? pathname === href : pathname.startsWith(href);
  return (
    <header className="sticky top-0 z-30 border-b bg-background/95 backdrop-blur">
      <nav
        aria-label="Primary navigation"
        className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 sm:px-6 lg:px-8"
      >
        <Link
          aria-label="DEMO System home"
          aria-current={pathname === "/" ? "page" : undefined}
          className="text-lg font-bold tracking-tight"
          href="/"
        >
          DEMO SYSTEM<span className="text-primary"></span>
        </Link>
        <div className="hidden items-center gap-6 md:flex">
          {NAVIGATION_LINKS.map((link) => (
            <Link
              aria-current={isActive(link.href) ? "page" : undefined}
              className={cn(
                "rounded-sm text-sm font-medium text-muted-foreground hover:text-foreground",
                isActive(link.href) &&
                  "font-semibold text-primary underline decoration-2 underline-offset-8",
              )}
              href={link.href}
              key={link.href}
            >
              {link.label}
            </Link>
          ))}
          <Button asChild size="sm">
            <Link
              aria-current={
                pathname === "/request-quotation" ? "page" : undefined
              }
              href="/request-quotation"
            >
              Request a Quote
            </Link>
          </Button>
        </div>
        <Button
          aria-controls="mobile-primary-navigation"
          aria-expanded={isOpen}
          aria-label={isOpen ? "Close navigation" : "Open navigation"}
          className="md:hidden"
          onClick={() => setIsOpen((open) => !open)}
          size="sm"
          variant="ghost"
        >
          {isOpen ? <X aria-hidden="true" /> : <Menu aria-hidden="true" />}
        </Button>
      </nav>
      {isOpen ? (
        <div
          className="border-t px-4 py-4 md:hidden"
          id="mobile-primary-navigation"
        >
          <div className="mx-auto flex max-w-7xl flex-col gap-3">
            {NAVIGATION_LINKS.map((link) => (
              <Link
                aria-current={isActive(link.href) ? "page" : undefined}
                className={cn(
                  "rounded-lg px-3 py-2 text-sm font-medium hover:bg-muted",
                  isActive(link.href) && "bg-muted text-primary",
                )}
                href={link.href}
                key={link.href}
                onClick={() => setIsOpen(false)}
              >
                {link.label}
              </Link>
            ))}
            <Button asChild>
              <Link
                aria-current={
                  pathname === "/request-quotation" ? "page" : undefined
                }
                href="/request-quotation"
                onClick={() => setIsOpen(false)}
              >
                Request a Quote
              </Link>
            </Button>
          </div>
        </div>
      ) : null}
    </header>
  );
}
