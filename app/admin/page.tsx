import { AdminDashboard } from "@/components/admin/admin-dashboard";
import { AdminPageHeader } from "@/components/admin/admin-page-header";

export default function AdminDashboardPage() {
  return <><AdminPageHeader description="Review presentation-only summaries of product, inquiry, quotation, and promotion activity. All figures use local mock data." eyebrow="Admin portal" title="Dashboard" /><AdminDashboard /></>;
}
