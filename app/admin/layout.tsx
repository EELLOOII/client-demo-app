import { AdminThemeProvider } from "@/components/admin/admin-theme-provider";
import { AdminHeader } from "@/components/admin/admin-header";
import { AdminSidebar } from "@/components/admin/admin-sidebar";

export default function AdminLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <AdminThemeProvider><div className="min-h-screen bg-muted lg:flex"><AdminSidebar /><div className="min-w-0 flex-1"><AdminHeader /><main className="mx-auto max-w-7xl p-4 sm:p-6 lg:p-8">{children}</main></div></div></AdminThemeProvider>;
}
