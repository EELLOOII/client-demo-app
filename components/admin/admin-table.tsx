import { AlertCircle, Inbox, LoaderCircle } from "lucide-react";
import type { ReactNode } from "react";
import { Button } from "@/components/ui/button";

interface AdminTableProps {
  caption: string;
  children: ReactNode;
}

export function AdminTable({ caption, children }: AdminTableProps) {
  return <div className="overflow-x-auto rounded-2xl border bg-background shadow-sm"><table className="w-full min-w-[40rem] text-left text-sm"><caption className="sr-only">{caption}</caption>{children}</table></div>;
}

export function AdminTableActions({ children }: { children: ReactNode }) {
  return <div className="flex items-center justify-end gap-2">{children}</div>;
}

export function AdminTableLoading({ label = "Loading records" }: { label?: string }) {
  return <div aria-live="polite" className="flex min-h-48 flex-col items-center justify-center gap-3 rounded-2xl border bg-background p-8 text-center" role="status"><LoaderCircle aria-hidden="true" className="size-6 animate-spin motion-reduce:animate-none text-primary" /><p className="text-sm text-muted-foreground">{label}</p></div>;
}

export function AdminTableEmpty({ description, title = "No records found" }: { description: string; title?: string }) {
  return <div className="flex min-h-48 flex-col items-center justify-center rounded-2xl border bg-background p-8 text-center"><Inbox aria-hidden="true" className="size-8 text-muted-foreground" /><h2 className="mt-4 font-bold">{title}</h2><p className="mt-2 max-w-md text-sm text-muted-foreground">{description}</p></div>;
}

export function AdminTableError({ description, onRetry }: { description: string; onRetry?: () => void }) {
  return <div aria-live="assertive" className="flex min-h-48 flex-col items-center justify-center rounded-2xl border bg-background p-8 text-center" role="alert"><AlertCircle aria-hidden="true" className="size-8 text-danger" /><h2 className="mt-4 font-bold">We could not load these records</h2><p className="mt-2 max-w-md text-sm text-muted-foreground">{description}</p>{onRetry ? <Button className="mt-5" onClick={onRetry} variant="outline">Try again</Button> : null}</div>;
}
