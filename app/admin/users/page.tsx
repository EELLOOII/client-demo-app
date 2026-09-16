import { AdminPageHeader } from "@/components/admin/admin-page-header";
import { AdminUserManager } from "@/components/admin/admin-user-manager";

export default function UsersPage() {
  return (
    <>
      <AdminPageHeader
        description="Manage local user profiles, roles, account status, and permission summaries without authentication enforcement."
        eyebrow="Users"
        title="User manager"
      />
      <AdminUserManager />
    </>
  );
}
