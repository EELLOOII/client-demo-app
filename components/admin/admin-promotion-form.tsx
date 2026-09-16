"use client";

import { useState, type FormEvent } from "react";
import { AdminPromotionBannerPlaceholder } from "@/components/admin/admin-promotion-banner-placeholder";
import { Button } from "@/components/ui/button";
import type { AdminPromotion, AdminPromotionStatus, AdminPromotionType } from "@/types/admin";

const PROMOTION_TYPES: AdminPromotionType[] = [
  "Banner",
  "Product Promotion",
  "Seasonal Campaign",
  "Announcement",
];

const PROMOTION_STATUSES: AdminPromotionStatus[] = [
  "draft",
  "scheduled",
  "active",
  "expired",
  "archived",
];

type EditablePromotionField =
  | "cta"
  | "description"
  | "destination"
  | "endDate"
  | "id"
  | "startDate"
  | "title";

type PromotionFormErrors = Partial<Record<"endDate" | "id" | "startDate" | "title", string>>;

type AdminPromotionFormProps = {
  initialValues: AdminPromotion;
  onCancel: () => void;
  onSubmit: (values: AdminPromotion) => void;
  submitLabel?: string;
};

export function AdminPromotionForm({
  initialValues,
  onCancel,
  onSubmit,
  submitLabel = "Save promotion",
}: AdminPromotionFormProps) {
  const [draft, setDraft] = useState(initialValues);
  const [errors, setErrors] = useState<PromotionFormErrors>({});

  const updateField = (field: EditablePromotionField, value: string) => {
    setDraft((current) => ({ ...current, [field]: value }));
  };

  const validate = () => {
    const nextErrors: PromotionFormErrors = {};

    if (!draft.title.trim()) {
      nextErrors.title = "Promotion title is required.";
    }

    if (!draft.id.trim()) {
      nextErrors.id = "Promotion ID is required.";
    }

    if (!draft.startDate) {
      nextErrors.startDate = "Start date is required.";
    }

    if (!draft.endDate) {
      nextErrors.endDate = "End date is required.";
    } else if (draft.startDate && draft.endDate < draft.startDate) {
      nextErrors.endDate = "End date cannot be earlier than the start date.";
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
      id: draft.id.trim(),
      title: draft.title.trim(),
    });
  };

  return (
    <form className="grid gap-4 sm:grid-cols-2" noValidate onSubmit={handleSubmit}>
      <label className="block text-sm font-semibold" htmlFor="promotion-title">
        Promotion title
        <input
          aria-describedby={errors.title ? "promotion-title-error" : undefined}
          aria-invalid={errors.title ? "true" : "false"}
          className="mt-1 h-10 w-full rounded-xl border bg-background px-3 font-normal"
          id="promotion-title"
          onChange={(event) => updateField("title", event.target.value)}
          required
          value={draft.title}
        />
        {errors.title ? (
          <span className="mt-1 block text-xs font-normal text-destructive" id="promotion-title-error">
            {errors.title}
          </span>
        ) : null}
      </label>

      <label className="block text-sm font-semibold" htmlFor="promotion-id">
        Promotion ID
        <input
          aria-describedby={errors.id ? "promotion-id-error" : undefined}
          aria-invalid={errors.id ? "true" : "false"}
          className="mt-1 h-10 w-full rounded-xl border bg-background px-3 font-normal"
          id="promotion-id"
          onChange={(event) => updateField("id", event.target.value)}
          required
          value={draft.id}
        />
        {errors.id ? (
          <span className="mt-1 block text-xs font-normal text-destructive" id="promotion-id-error">
            {errors.id}
          </span>
        ) : null}
      </label>

      <label className="block text-sm font-semibold" htmlFor="promotion-type">
        Promotion type
        <select
          className="mt-1 h-10 w-full rounded-xl border bg-background px-3 font-normal"
          id="promotion-type"
          onChange={(event) => setDraft((current) => ({ ...current, type: event.target.value as AdminPromotionType }))}
          value={draft.type}
        >
          {PROMOTION_TYPES.map((type) => (
            <option key={type} value={type}>
              {type}
            </option>
          ))}
        </select>
      </label>

      <label className="block text-sm font-semibold" htmlFor="promotion-status">
        Status
        <select
          className="mt-1 h-10 w-full rounded-xl border bg-background px-3 font-normal"
          id="promotion-status"
          onChange={(event) =>
            setDraft((current) => ({ ...current, status: event.target.value as AdminPromotionStatus }))
          }
          value={draft.status}
        >
          {PROMOTION_STATUSES.map((status) => (
            <option key={status} value={status}>
              {status}
            </option>
          ))}
        </select>
      </label>

      <label className="block text-sm font-semibold" htmlFor="promotion-start-date">
        Start date
        <input
          aria-describedby={errors.startDate ? "promotion-start-date-error" : undefined}
          aria-invalid={errors.startDate ? "true" : "false"}
          className="mt-1 h-10 w-full rounded-xl border bg-background px-3 font-normal"
          id="promotion-start-date"
          onChange={(event) => updateField("startDate", event.target.value)}
          required
          type="date"
          value={draft.startDate}
        />
        {errors.startDate ? (
          <span className="mt-1 block text-xs font-normal text-destructive" id="promotion-start-date-error">
            {errors.startDate}
          </span>
        ) : null}
      </label>

      <label className="block text-sm font-semibold" htmlFor="promotion-end-date">
        End date
        <input
          aria-describedby={errors.endDate ? "promotion-end-date-error" : undefined}
          aria-invalid={errors.endDate ? "true" : "false"}
          className="mt-1 h-10 w-full rounded-xl border bg-background px-3 font-normal"
          id="promotion-end-date"
          onChange={(event) => updateField("endDate", event.target.value)}
          required
          type="date"
          value={draft.endDate}
        />
        {errors.endDate ? (
          <span className="mt-1 block text-xs font-normal text-destructive" id="promotion-end-date-error">
            {errors.endDate}
          </span>
        ) : null}
      </label>

      <label className="block text-sm font-semibold" htmlFor="promotion-destination">
        Destination URL
        <input
          className="mt-1 h-10 w-full rounded-xl border bg-background px-3 font-normal"
          id="promotion-destination"
          onChange={(event) => updateField("destination", event.target.value)}
          placeholder="/promotions/example"
          type="url"
          value={draft.destination}
        />
      </label>

      <label className="block text-sm font-semibold" htmlFor="promotion-cta">
        CTA label
        <input
          className="mt-1 h-10 w-full rounded-xl border bg-background px-3 font-normal"
          id="promotion-cta"
          onChange={(event) => updateField("cta", event.target.value)}
          placeholder="Shop now"
          value={draft.cta}
        />
      </label>

      <label className="block text-sm font-semibold sm:col-span-2" htmlFor="promotion-description">
        Description
        <textarea
          className="mt-1 min-h-24 w-full rounded-xl border bg-background p-3 font-normal"
          id="promotion-description"
          onChange={(event) => updateField("description", event.target.value)}
          value={draft.description}
        />
      </label>

      <div className="sm:col-span-2">
        <AdminPromotionBannerPlaceholder />
      </div>

      <div className="flex justify-end gap-2 sm:col-span-2">
        <Button onClick={onCancel} type="button" variant="outline">
          Cancel
        </Button>
        <Button type="submit">{submitLabel}</Button>
      </div>
    </form>
  );
}
