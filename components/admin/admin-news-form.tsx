"use client";

import { useState, type FormEvent } from "react";
import { AdminNewsEditorPlaceholder } from "@/components/admin/admin-news-editor-placeholder";
import { AdminNewsImagePlaceholder } from "@/components/admin/admin-news-image-placeholder";
import { Button } from "@/components/ui/button";
import type { AdminNewsArticle, AdminNewsStatus } from "@/types/admin";

const NEWS_STATUSES: AdminNewsStatus[] = ["draft", "scheduled", "published", "archived"];

type EditableNewsField = "author" | "content" | "id" | "publishedAt" | "slug" | "summary" | "title";

type NewsFormErrors = Partial<Record<"content" | "id" | "publishedAt" | "slug" | "title", string>>;

type AdminNewsFormProps = {
  initialValues: AdminNewsArticle;
  onCancel: () => void;
  onSubmit: (values: AdminNewsArticle) => void;
  submitLabel?: string;
};

export function AdminNewsForm({ initialValues, onCancel, onSubmit, submitLabel = "Save article" }: AdminNewsFormProps) {
  const [draft, setDraft] = useState(initialValues);
  const [errors, setErrors] = useState<NewsFormErrors>({});

  const updateField = (field: EditableNewsField, value: string) => {
    setDraft((current) => ({ ...current, [field]: value }));
  };

  const validate = () => {
    const nextErrors: NewsFormErrors = {};

    if (!draft.title.trim()) {
      nextErrors.title = "Article title is required.";
    }

    if (!draft.id.trim()) {
      nextErrors.id = "Article reference is required.";
    }

    if (!draft.slug.trim()) {
      nextErrors.slug = "Slug is required.";
    }

    if (!draft.content.trim()) {
      nextErrors.content = "Article content is required.";
    }

    if ((draft.status === "published" || draft.status === "scheduled") && !draft.publishedAt) {
      nextErrors.publishedAt = "Publication date is required for published or scheduled articles.";
    }

    if (draft.status === "scheduled" && draft.publishedAt) {
      const today = new Date();
      today.setHours(0, 0, 0, 0);
      const publicationDate = new Date(`${draft.publishedAt}T00:00:00`);

      if (publicationDate <= today) {
        nextErrors.publishedAt = "Scheduled articles should use a future publication date.";
      }
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
      slug: draft.slug.trim(),
      title: draft.title.trim(),
    });
  };

  return (
    <form className="grid gap-4 sm:grid-cols-2" noValidate onSubmit={handleSubmit}>
      <label className="block text-sm font-semibold" htmlFor="news-title">
        Article title
        <input
          aria-describedby={errors.title ? "news-title-error" : undefined}
          aria-invalid={errors.title ? "true" : "false"}
          className="mt-1 h-10 w-full rounded-xl border bg-background px-3 font-normal"
          id="news-title"
          onChange={(event) => updateField("title", event.target.value)}
          required
          value={draft.title}
        />
        {errors.title ? (
          <span className="mt-1 block text-xs font-normal text-destructive" id="news-title-error">
            {errors.title}
          </span>
        ) : null}
      </label>

      <label className="block text-sm font-semibold" htmlFor="news-id">
        Article reference
        <input
          aria-describedby={errors.id ? "news-id-error" : undefined}
          aria-invalid={errors.id ? "true" : "false"}
          className="mt-1 h-10 w-full rounded-xl border bg-background px-3 font-normal"
          id="news-id"
          onChange={(event) => updateField("id", event.target.value)}
          required
          value={draft.id}
        />
        {errors.id ? (
          <span className="mt-1 block text-xs font-normal text-destructive" id="news-id-error">
            {errors.id}
          </span>
        ) : null}
      </label>

      <label className="block text-sm font-semibold" htmlFor="news-slug">
        Slug
        <input
          aria-describedby={errors.slug ? "news-slug-error" : undefined}
          aria-invalid={errors.slug ? "true" : "false"}
          className="mt-1 h-10 w-full rounded-xl border bg-background px-3 font-normal"
          id="news-slug"
          onChange={(event) => updateField("slug", event.target.value)}
          required
          value={draft.slug}
        />
        {errors.slug ? (
          <span className="mt-1 block text-xs font-normal text-destructive" id="news-slug-error">
            {errors.slug}
          </span>
        ) : null}
      </label>

      <label className="block text-sm font-semibold" htmlFor="news-author">
        Author
        <input
          className="mt-1 h-10 w-full rounded-xl border bg-background px-3 font-normal"
          id="news-author"
          onChange={(event) => updateField("author", event.target.value)}
          value={draft.author}
        />
      </label>

      <label className="block text-sm font-semibold" htmlFor="news-status">
        Status
        <select
          className="mt-1 h-10 w-full rounded-xl border bg-background px-3 font-normal"
          id="news-status"
          onChange={(event) => setDraft((current) => ({ ...current, status: event.target.value as AdminNewsStatus }))}
          value={draft.status}
        >
          {NEWS_STATUSES.map((status) => (
            <option key={status} value={status}>
              {status}
            </option>
          ))}
        </select>
      </label>

      <label className="block text-sm font-semibold" htmlFor="news-published-at">
        Publication date
        <input
          aria-describedby={errors.publishedAt ? "news-published-at-error" : undefined}
          aria-invalid={errors.publishedAt ? "true" : "false"}
          className="mt-1 h-10 w-full rounded-xl border bg-background px-3 font-normal"
          id="news-published-at"
          onChange={(event) => updateField("publishedAt", event.target.value)}
          type="date"
          value={draft.publishedAt}
        />
        {errors.publishedAt ? (
          <span className="mt-1 block text-xs font-normal text-destructive" id="news-published-at-error">
            {errors.publishedAt}
          </span>
        ) : null}
      </label>

      <label className="flex items-center gap-3 rounded-xl border p-3 text-sm font-semibold sm:col-span-2">
        <input
          checked={draft.isFeatured}
          onChange={(event) => setDraft((current) => ({ ...current, isFeatured: event.target.checked }))}
          type="checkbox"
        />
        Featured article
      </label>

      <label className="block text-sm font-semibold sm:col-span-2" htmlFor="news-summary">
        Summary
        <textarea
          className="mt-1 min-h-20 w-full rounded-xl border bg-background p-3 font-normal"
          id="news-summary"
          onChange={(event) => updateField("summary", event.target.value)}
          value={draft.summary}
        />
      </label>

      <div className="sm:col-span-2">
        <span className="mb-1 block text-sm font-semibold">Article content</span>
        <AdminNewsEditorPlaceholder
          error={errors.content}
          onChange={(value) => updateField("content", value)}
          value={draft.content}
        />
      </div>

      <div className="sm:col-span-2">
        <AdminNewsImagePlaceholder />
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
