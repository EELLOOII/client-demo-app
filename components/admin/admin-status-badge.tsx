import { cn } from "@/lib/utils";
import type { AdminStatus } from "@/types/admin";

const STATUS_STYLES: Record<AdminStatus, string> = {
  active: "bg-green-100 text-green-800", inactive: "bg-slate-200 text-slate-700", suspended: "bg-red-100 text-red-800", pending: "bg-amber-100 text-amber-800", approved: "bg-green-100 text-green-800", rejected: "bg-red-100 text-red-800", sent: "bg-blue-100 text-blue-800", new: "bg-blue-100 text-blue-800", open: "bg-green-100 text-green-800", "in-progress": "bg-amber-100 text-amber-800", resolved: "bg-green-100 text-green-800", closed: "bg-slate-200 text-slate-700", draft: "bg-slate-200 text-slate-700", scheduled: "bg-blue-100 text-blue-800", published: "bg-blue-100 text-blue-800", archived: "bg-slate-200 text-slate-700", expired: "bg-slate-200 text-slate-700", "in-stock": "bg-green-100 text-green-800", "low-stock": "bg-amber-100 text-amber-800", "out-of-stock": "bg-red-100 text-red-800",
};

const STATUS_LABELS: Record<AdminStatus, string> = {
  active: "Active", inactive: "Inactive", suspended: "Suspended", pending: "Pending", approved: "Approved", rejected: "Rejected", sent: "Sent", new: "New", open: "Open", "in-progress": "In progress", resolved: "Resolved", closed: "Closed", draft: "Draft", scheduled: "Scheduled", published: "Published", archived: "Archived", expired: "Expired", "in-stock": "In stock", "low-stock": "Low stock", "out-of-stock": "Out of stock",
};

export function AdminStatusBadge({ status }: { status: AdminStatus }) {
  return <span className={cn("inline-flex rounded-full px-2.5 py-1 text-xs font-semibold", STATUS_STYLES[status])}>{STATUS_LABELS[status]}</span>;
}
