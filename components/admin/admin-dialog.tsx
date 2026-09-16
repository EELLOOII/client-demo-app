"use client";

import { X } from "lucide-react";
import { useEffect, useRef, type ReactNode } from "react";
import { Button } from "@/components/ui/button";

interface AdminDialogProps {
  children: ReactNode;
  description?: string;
  onOpenChange: (open: boolean) => void;
  open: boolean;
  title: string;
}

export function AdminDialog({ children, description, onOpenChange, open, title }: AdminDialogProps) {
  const dialogRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (!open) return;
    const previousFocus = document.activeElement instanceof HTMLElement ? document.activeElement : null;
    const dialog = dialogRef.current;
    const focusable = () => Array.from(dialog?.querySelectorAll<HTMLElement>('button:not([disabled]), [href], input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])') ?? []);
    focusable()[0]?.focus();
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") { event.preventDefault(); onOpenChange(false); return; }
      if (event.key !== "Tab") return;
      const elements = focusable();
      if (!elements.length) { event.preventDefault(); return; }
      const first = elements[0];
      const last = elements[elements.length - 1];
      if (event.shiftKey && document.activeElement === first) { event.preventDefault(); last.focus(); }
      if (!event.shiftKey && document.activeElement === last) { event.preventDefault(); first.focus(); }
    };
    document.addEventListener("keydown", onKeyDown);
    return () => { document.removeEventListener("keydown", onKeyDown); previousFocus?.focus(); };
  }, [onOpenChange, open]);
  if (!open) return null;
  return <div aria-modal="true" className="fixed inset-0 z-50 flex items-end justify-center bg-slate-950/40 p-4 sm:items-center" onMouseDown={(event) => { if (event.target === event.currentTarget) onOpenChange(false); }} role="dialog"><div aria-describedby={description ? "admin-dialog-description" : undefined} aria-labelledby="admin-dialog-title" className="w-full max-w-lg rounded-2xl bg-background p-6 shadow-xl" ref={dialogRef}><div className="flex items-start justify-between gap-4"><div><h2 className="text-xl font-bold" id="admin-dialog-title">{title}</h2>{description ? <p className="mt-2 text-sm text-muted-foreground" id="admin-dialog-description">{description}</p> : null}</div><Button aria-label="Close dialog" onClick={() => onOpenChange(false)} size="sm" variant="ghost"><X aria-hidden="true" className="size-4" /></Button></div><div className="mt-6">{children}</div></div></div>;
}
