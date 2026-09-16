import type { AdminUserRole } from "@/types/admin";

const ROLE_PERMISSIONS: Record<AdminUserRole, string[]> = {
  Admin: ["Broad visibility across prototype modules", "User and status management presentation", "Admin portal oversight"],
  Inventory: ["Product visibility", "Inventory stock overview", "Inventory adjustment presentation"],
  Marketing: ["Promotion management presentation", "News publishing presentation", "Featured content coordination"],
  Sales: ["Quotation management presentation", "Inquiry handling presentation", "Product visibility"],
};

export function AdminRolePermissions({ role }: { role: AdminUserRole }) {
  return (
    <div className="rounded-xl border bg-muted/30 p-4">
      <h3 className="text-sm font-semibold text-foreground">{role} permission summary</h3>
      <ul className="mt-2 list-disc space-y-1 pl-5 text-sm text-muted-foreground">
        {ROLE_PERMISSIONS[role].map((permission) => (
          <li key={permission}>{permission}</li>
        ))}
      </ul>
      <p className="mt-3 text-xs text-muted-foreground">Displayed only; no route or action access is enforced in Phase 3.</p>
    </div>
  );
}
