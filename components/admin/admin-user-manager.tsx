"use client";

import { Eye, Pencil, Plus } from "lucide-react";
import { useMemo, useState } from "react";
import { AdminDialog } from "@/components/admin/admin-dialog";
import { AdminUserDetail } from "@/components/admin/admin-user-detail";
import { AdminUserForm } from "@/components/admin/admin-user-form";
import { AdminStatusBadge } from "@/components/admin/admin-status-badge";
import {
  AdminTable,
  AdminTableActions,
  AdminTableEmpty,
  AdminTableError,
  AdminTableLoading,
} from "@/components/admin/admin-table";
import { Button } from "@/components/ui/button";
import { ADMIN_USERS } from "@/mock/admin-users";
import type { AdminUser, AdminUserRole, AdminUserStatus } from "@/types/admin";

const USER_ROLES: AdminUserRole[] = ["Admin", "Sales", "Inventory", "Marketing"];
const USER_STATUSES: AdminUserStatus[] = ["active", "inactive", "suspended"];

const createBlankUser = (): AdminUser => ({
  createdAt: "Just now (local prototype)",
  department: "",
  email: "",
  fullName: "",
  id: "",
  lastActive: "Never",
  role: "Sales",
  status: "active",
  username: "",
});

export function AdminUserManager() {
  const [users, setUsers] = useState(ADMIN_USERS);
  const [query, setQuery] = useState("");
  const [role, setRole] = useState("all");
  const [status, setStatus] = useState("all");
  const [mode, setMode] = useState<"data" | "error" | "loading">("data");
  const [detail, setDetail] = useState<AdminUser | null>(null);
  const [edit, setEdit] = useState<AdminUser | null>(null);
  const [createOpen, setCreateOpen] = useState(false);
  const [createKey, setCreateKey] = useState(0);

  const rows = useMemo(
    () =>
      users.filter(
        (user) =>
          (user.fullName + user.email + user.username).toLowerCase().includes(query.toLowerCase()) &&
          (role === "all" || user.role === role) &&
          (status === "all" || user.status === status),
      ),
    [users, query, role, status],
  );

  const resetFilters = () => {
    setQuery("");
    setRole("all");
    setStatus("all");
  };

  const openCreate = () => {
    setCreateKey((current) => current + 1);
    setCreateOpen(true);
  };

  const createUser = (user: AdminUser) => {
    setUsers((current) => [...current, user]);
    setCreateOpen(false);
  };

  const updateUser = (user: AdminUser) => {
    setUsers((current) => current.map((item) => (item.id === edit?.id ? user : item)));
    setDetail((current) => (current?.id === edit?.id ? user : current));
    setEdit(null);
  };

  const updateUserRole = (role: AdminUserRole) => {
    setDetail((current) => {
      if (!current) return current;
      const updatedUser = { ...current, role };

      setUsers((users) => users.map((user) => (user.id === current.id ? updatedUser : user)));
      return updatedUser;
    });
  };

  const updateUserStatus = (nextStatus: AdminUserStatus) => {
    setDetail((current) => {
      if (!current) return current;
      const updatedUser = { ...current, status: nextStatus };

      setUsers((users) => users.map((user) => (user.id === current.id ? updatedUser : user)));
      return updatedUser;
    });
  };

  return (
    <>
      <div className="mt-6 flex flex-wrap gap-2">
        <Button onClick={() => setMode("data")} size="sm" variant={mode === "data" ? "default" : "outline"}>
          Users
        </Button>
        <Button onClick={() => setMode("loading")} size="sm" variant="outline">
          Loading
        </Button>
        <Button onClick={() => setMode("error")} size="sm" variant="outline">
          Error
        </Button>
        <Button onClick={openCreate} size="sm" variant="outline">
          <Plus aria-hidden="true" className="mr-2 size-4" />
          Create User
        </Button>
      </div>

      {mode === "loading" ? (
        <div className="mt-6">
          <AdminTableLoading label="Loading users" />
        </div>
      ) : null}

      {mode === "error" ? (
        <div className="mt-6">
          <AdminTableError description="Local retry only; no identity service is connected." onRetry={() => setMode("data")} />
        </div>
      ) : null}

      {mode === "data" ? (
        <>
          <div className="mt-6 grid gap-3 rounded-2xl border bg-background p-4 sm:grid-cols-[1fr_12rem_12rem_auto]">
            <input
              aria-label="Search users"
              className="h-10 rounded-xl border px-3"
              onChange={(event) => setQuery(event.target.value)}
              placeholder="Search name, email, or username"
              value={query}
            />
            <select
              aria-label="Filter user role"
              className="h-10 rounded-xl border px-3"
              onChange={(event) => setRole(event.target.value)}
              value={role}
            >
              <option value="all">All roles</option>
              {USER_ROLES.map((item) => (
                <option key={item} value={item}>
                  {item}
                </option>
              ))}
            </select>
            <select
              aria-label="Filter account status"
              className="h-10 rounded-xl border px-3"
              onChange={(event) => setStatus(event.target.value)}
              value={status}
            >
              <option value="all">All statuses</option>
              {USER_STATUSES.map((item) => (
                <option key={item} value={item}>
                  {item}
                </option>
              ))}
            </select>
            <Button onClick={resetFilters} variant="outline">
              Reset
            </Button>
          </div>

          {!users.length ? (
            <div className="mt-5">
              <AdminTableEmpty description="Create a local user to populate this prototype list." title="No users" />
            </div>
          ) : null}

          {users.length && !rows.length ? (
            <div className="mt-5">
              <AdminTableEmpty description="Reset filters to view local users." title="No matching users" />
            </div>
          ) : null}

          {rows.length ? <UserTable onEdit={setEdit} onView={setDetail} rows={rows} /> : null}
        </>
      ) : null}

      <AdminDialog
        description="Frontend-only user profile and permission summary."
        onOpenChange={(open) => {
          if (!open) setDetail(null);
        }}
        open={detail !== null}
        title={detail?.fullName ?? "User details"}
      >
        {detail ? <AdminUserDetail onRoleChange={updateUserRole} onStatusChange={updateUserStatus} user={detail} /> : null}
      </AdminDialog>

      <AdminDialog
        description="Adds a user to this local prototype session only."
        onOpenChange={setCreateOpen}
        open={createOpen}
        title="Create user"
      >
        {createOpen ? (
          <AdminUserForm
            key={createKey}
            initialValues={createBlankUser()}
            onCancel={() => setCreateOpen(false)}
            onSubmit={createUser}
            submitLabel="Create locally"
          />
        ) : null}
      </AdminDialog>

      <AdminDialog
        description="Updates this local prototype session only."
        onOpenChange={(open) => {
          if (!open) setEdit(null);
        }}
        open={edit !== null}
        title={edit ? `Edit ${edit.fullName}` : "Edit user"}
      >
        {edit ? (
          <AdminUserForm
            key={edit.id}
            initialValues={edit}
            onCancel={() => setEdit(null)}
            onSubmit={updateUser}
            submitLabel="Save locally"
          />
        ) : null}
      </AdminDialog>
    </>
  );
}

function UserTable({
  onEdit,
  onView,
  rows,
}: {
  onEdit: (user: AdminUser) => void;
  onView: (user: AdminUser) => void;
  rows: AdminUser[];
}) {
  return (
    <div className="mt-5">
      <AdminTable caption="User management list">
        <thead>
          <tr>
            {["User", "Role", "Status", "Department", "Last active", "Created", "Actions"].map((heading) => (
              <th className="border-b bg-muted px-4 py-3 text-left text-xs" key={heading}>
                {heading}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((user) => (
            <tr className="border-b" key={user.id}>
              <td className="px-4 py-3">
                <b>{user.fullName}</b>
                <span className="block text-xs text-muted-foreground">{user.email}</span>
                <span className="block text-xs text-muted-foreground">@{user.username}</span>
              </td>
              <td className="px-4 py-3">{user.role}</td>
              <td className="px-4 py-3">
                <AdminStatusBadge status={user.status} />
              </td>
              <td className="px-4 py-3">{user.department}</td>
              <td className="px-4 py-3">{user.lastActive}</td>
              <td className="px-4 py-3">{user.createdAt}</td>
              <td className="px-4 py-3">
                <AdminTableActions>
                  <Button aria-label={`View ${user.fullName}`} onClick={() => onView(user)} size="sm" variant="ghost">
                    <Eye aria-hidden="true" className="size-4" />
                  </Button>
                  <Button aria-label={`Edit ${user.fullName}`} onClick={() => onEdit(user)} size="sm" variant="ghost">
                    <Pencil aria-hidden="true" className="size-4" />
                  </Button>
                </AdminTableActions>
              </td>
            </tr>
          ))}
        </tbody>
      </AdminTable>
    </div>
  );
}
