"use client";

import { useState, type FormEvent } from "react";
import { AdminRolePermissions } from "@/components/admin/admin-role-permissions";
import { Button } from "@/components/ui/button";
import type { AdminUser, AdminUserRole, AdminUserStatus } from "@/types/admin";

const USER_ROLES: AdminUserRole[] = ["Admin", "Sales", "Inventory", "Marketing"];
const USER_STATUSES: AdminUserStatus[] = ["active", "inactive", "suspended"];

type EditableUserField = "department" | "email" | "fullName" | "id" | "username";
type UserFormErrors = Partial<Record<"email" | "fullName" | "role" | "status", string>>;

type AdminUserFormProps = {
  initialValues: AdminUser;
  onCancel: () => void;
  onSubmit: (values: AdminUser) => void;
  submitLabel?: string;
};

export function AdminUserForm({ initialValues, onCancel, onSubmit, submitLabel = "Save user" }: AdminUserFormProps) {
  const [draft, setDraft] = useState(initialValues);
  const [errors, setErrors] = useState<UserFormErrors>({});

  const updateField = (field: EditableUserField, value: string) => {
    setDraft((current) => ({ ...current, [field]: value }));
  };

  const validate = () => {
    const nextErrors: UserFormErrors = {};
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!draft.fullName.trim()) {
      nextErrors.fullName = "Full name is required.";
    }

    if (!draft.email.trim()) {
      nextErrors.email = "Email is required.";
    } else if (!emailPattern.test(draft.email)) {
      nextErrors.email = "Enter a valid email address.";
    }

    if (!draft.role) {
      nextErrors.role = "Role is required.";
    }

    if (!draft.status) {
      nextErrors.status = "Account status is required.";
    }

    setErrors(nextErrors);
    return Object.keys(nextErrors).length === 0;
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!validate()) {
      return;
    }

    onSubmit({
      ...draft,
      email: draft.email.trim(),
      fullName: draft.fullName.trim(),
      username: draft.username.trim(),
    });
  };

  return (
    <form className="grid gap-4 sm:grid-cols-2" noValidate onSubmit={handleSubmit}>
      <label className="block text-sm font-semibold" htmlFor="user-full-name">
        Full name
        <input
          aria-describedby={errors.fullName ? "user-full-name-error" : undefined}
          aria-invalid={errors.fullName ? "true" : "false"}
          className="mt-1 h-10 w-full rounded-xl border bg-background px-3 font-normal"
          id="user-full-name"
          onChange={(event) => updateField("fullName", event.target.value)}
          required
          value={draft.fullName}
        />
        {errors.fullName ? (
          <span className="mt-1 block text-xs font-normal text-destructive" id="user-full-name-error">
            {errors.fullName}
          </span>
        ) : null}
      </label>

      <label className="block text-sm font-semibold" htmlFor="user-email">
        Email
        <input
          aria-describedby={errors.email ? "user-email-error" : undefined}
          aria-invalid={errors.email ? "true" : "false"}
          className="mt-1 h-10 w-full rounded-xl border bg-background px-3 font-normal"
          id="user-email"
          onChange={(event) => updateField("email", event.target.value)}
          required
          type="email"
          value={draft.email}
        />
        {errors.email ? (
          <span className="mt-1 block text-xs font-normal text-destructive" id="user-email-error">
            {errors.email}
          </span>
        ) : null}
      </label>

      <label className="block text-sm font-semibold" htmlFor="user-username">
        Username
        <input
          className="mt-1 h-10 w-full rounded-xl border bg-background px-3 font-normal"
          id="user-username"
          onChange={(event) => updateField("username", event.target.value)}
          value={draft.username}
        />
      </label>

      <label className="block text-sm font-semibold" htmlFor="user-department">
        Department
        <input
          className="mt-1 h-10 w-full rounded-xl border bg-background px-3 font-normal"
          id="user-department"
          onChange={(event) => updateField("department", event.target.value)}
          value={draft.department}
        />
      </label>

      <label className="block text-sm font-semibold" htmlFor="user-role">
        Role
        <select
          aria-describedby={errors.role ? "user-role-error" : undefined}
          aria-invalid={errors.role ? "true" : "false"}
          className="mt-1 h-10 w-full rounded-xl border bg-background px-3 font-normal"
          id="user-role"
          onChange={(event) => setDraft((current) => ({ ...current, role: event.target.value as AdminUserRole }))}
          required
          value={draft.role}
        >
          {USER_ROLES.map((role) => (
            <option key={role} value={role}>
              {role}
            </option>
          ))}
        </select>
        {errors.role ? (
          <span className="mt-1 block text-xs font-normal text-destructive" id="user-role-error">
            {errors.role}
          </span>
        ) : null}
      </label>

      <label className="block text-sm font-semibold" htmlFor="user-status">
        Account status
        <select
          aria-describedby={errors.status ? "user-status-error" : undefined}
          aria-invalid={errors.status ? "true" : "false"}
          className="mt-1 h-10 w-full rounded-xl border bg-background px-3 font-normal"
          id="user-status"
          onChange={(event) => setDraft((current) => ({ ...current, status: event.target.value as AdminUserStatus }))}
          required
          value={draft.status}
        >
          {USER_STATUSES.map((status) => (
            <option key={status} value={status}>
              {status}
            </option>
          ))}
        </select>
        {errors.status ? (
          <span className="mt-1 block text-xs font-normal text-destructive" id="user-status-error">
            {errors.status}
          </span>
        ) : null}
      </label>

      <div className="sm:col-span-2">
        <AdminRolePermissions role={draft.role} />
      </div>

      <p className="text-xs text-muted-foreground sm:col-span-2">
        Passwords, invitations, sessions, and enforced permissions are Phase 5 capabilities and are not represented here.
      </p>

      <div className="flex justify-end gap-2 sm:col-span-2">
        <Button onClick={onCancel} type="button" variant="outline">
          Cancel
        </Button>
        <Button type="submit">{submitLabel}</Button>
      </div>
    </form>
  );
}
