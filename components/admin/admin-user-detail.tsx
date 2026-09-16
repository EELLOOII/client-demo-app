import { AdminRolePermissions } from "@/components/admin/admin-role-permissions";
import { AdminStatusBadge } from "@/components/admin/admin-status-badge";
import type { AdminUser, AdminUserRole, AdminUserStatus } from "@/types/admin";

const USER_ROLES: AdminUserRole[] = ["Admin", "Sales", "Inventory", "Marketing"];
const USER_STATUSES: AdminUserStatus[] = ["active", "inactive", "suspended"];

type AdminUserDetailProps = {
  onRoleChange: (role: AdminUserRole) => void;
  onStatusChange: (status: AdminUserStatus) => void;
  user: AdminUser;
};

export function AdminUserDetail({ onRoleChange, onStatusChange, user }: AdminUserDetailProps) {
  return (
    <div className="grid gap-4 text-sm">
      <div>
        <h2 className="text-lg font-semibold text-foreground">{user.fullName}</h2>
        <p className="text-muted-foreground">{user.email}</p>
      </div>

      <dl className="grid gap-3 sm:grid-cols-2">
        <div>
          <dt className="text-xs font-medium uppercase text-muted-foreground">Username</dt>
          <dd>@{user.username}</dd>
        </div>
        <div>
          <dt className="text-xs font-medium uppercase text-muted-foreground">Department</dt>
          <dd>{user.department}</dd>
        </div>
        <label className="block text-sm font-semibold" htmlFor="detail-user-role">
          Role
          <select
            className="mt-1 h-10 w-full rounded-xl border bg-background px-3 font-normal"
            id="detail-user-role"
            onChange={(event) => onRoleChange(event.target.value as AdminUserRole)}
            value={user.role}
          >
            {USER_ROLES.map((role) => (
              <option key={role} value={role}>
                {role}
              </option>
            ))}
          </select>
        </label>
        <label className="block text-sm font-semibold" htmlFor="detail-user-status">
          Account status
          <select
            className="mt-1 h-10 w-full rounded-xl border bg-background px-3 font-normal"
            id="detail-user-status"
            onChange={(event) => onStatusChange(event.target.value as AdminUserStatus)}
            value={user.status}
          >
            {USER_STATUSES.map((status) => (
              <option key={status} value={status}>
                {status}
              </option>
            ))}
          </select>
          <span className="mt-2 inline-block">
            <AdminStatusBadge status={user.status} />
          </span>
        </label>
        <div>
          <dt className="text-xs font-medium uppercase text-muted-foreground">Last active</dt>
          <dd>{user.lastActive}</dd>
        </div>
        <div>
          <dt className="text-xs font-medium uppercase text-muted-foreground">Created</dt>
          <dd>{user.createdAt}</dd>
        </div>
      </dl>

      <AdminRolePermissions role={user.role} />
      <p className="text-xs text-muted-foreground">
        Role and account status changes update this local prototype only. They do not alter navigation, sessions, or access control.
      </p>
    </div>
  );
}
