"use client";

import { Archive, Eye, Pencil } from "lucide-react";
import { useMemo, useState } from "react";
import { AdminDialog } from "@/components/admin/admin-dialog";
import { AdminNewsDetail } from "@/components/admin/admin-news-detail";
import { AdminNewsForm } from "@/components/admin/admin-news-form";
import { AdminStatusBadge } from "@/components/admin/admin-status-badge";
import {
  AdminTable,
  AdminTableActions,
  AdminTableEmpty,
  AdminTableError,
  AdminTableLoading,
} from "@/components/admin/admin-table";
import { Button } from "@/components/ui/button";
import { ADMIN_NEWS } from "@/mock/admin-news";
import type { AdminNewsArticle, AdminNewsStatus } from "@/types/admin";

const NEWS_STATUSES: AdminNewsStatus[] = ["draft", "scheduled", "published", "archived"];

const createBlankArticle = (): AdminNewsArticle => ({
  author: "KQ Emporium Admin",
  content: "",
  id: "",
  isFeatured: false,
  lastUpdated: "Just now (local prototype)",
  publishedAt: "",
  slug: "",
  status: "draft",
  summary: "",
  title: "",
});

export function AdminNewsManager() {
  const [articles, setArticles] = useState(ADMIN_NEWS);
  const [query, setQuery] = useState("");
  const [status, setStatus] = useState("all");
  const [mode, setMode] = useState<"data" | "error" | "loading">("data");
  const [detail, setDetail] = useState<AdminNewsArticle | null>(null);
  const [edit, setEdit] = useState<AdminNewsArticle | null>(null);
  const [createOpen, setCreateOpen] = useState(false);
  const [createKey, setCreateKey] = useState(0);

  const rows = useMemo(
    () =>
      articles.filter(
        (article) =>
          (article.title + article.slug + article.id + article.author).toLowerCase().includes(query.toLowerCase()) &&
          (status === "all" || article.status === status),
      ),
    [articles, query, status],
  );

  const resetFilters = () => {
    setQuery("");
    setStatus("all");
  };

  const openCreate = () => {
    setCreateKey((current) => current + 1);
    setCreateOpen(true);
  };

  const createArticle = (article: AdminNewsArticle) => {
    setArticles((current) => [...current, { ...article, lastUpdated: "Just now (local prototype)" }]);
    setCreateOpen(false);
  };

  const updateArticle = (article: AdminNewsArticle) => {
    const updatedArticle = { ...article, lastUpdated: "Just now (local prototype)" };

    setArticles((current) => current.map((item) => (item.id === edit?.id ? updatedArticle : item)));
    setDetail((current) => (current?.id === edit?.id ? updatedArticle : current));
    setEdit(null);
  };

  const archiveArticle = (article: AdminNewsArticle) => {
    const archivedArticle: AdminNewsArticle = {
      ...article,
      lastUpdated: "Just now (local prototype)",
      status: "archived",
    };

    setArticles((current) => current.map((item) => (item.id === article.id ? archivedArticle : item)));
    setDetail((current) => (current?.id === article.id ? archivedArticle : current));
    setEdit((current) => (current?.id === article.id ? archivedArticle : current));
  };

  return (
    <>
      <div className="mt-6 flex flex-wrap gap-2">
        <Button onClick={() => setMode("data")} size="sm" variant={mode === "data" ? "default" : "outline"}>
          Articles
        </Button>
        <Button onClick={() => setMode("loading")} size="sm" variant="outline">
          Loading
        </Button>
        <Button onClick={() => setMode("error")} size="sm" variant="outline">
          Error
        </Button>
        <Button onClick={openCreate} size="sm" variant="outline">
          Create Article
        </Button>
      </div>

      {mode === "loading" ? (
        <div className="mt-6">
          <AdminTableLoading label="Loading news articles" />
        </div>
      ) : null}

      {mode === "error" ? (
        <div className="mt-6">
          <AdminTableError description="Local retry only; no publishing service is connected." onRetry={() => setMode("data")} />
        </div>
      ) : null}

      {mode === "data" ? (
        <>
          <div className="mt-6 grid gap-3 rounded-2xl border bg-background p-4 sm:grid-cols-[1fr_12rem_auto]">
            <input
              aria-label="Search news articles"
              className="h-10 rounded-xl border px-3"
              onChange={(event) => setQuery(event.target.value)}
              placeholder="Search title, slug, or author"
              value={query}
            />
            <select
              aria-label="Filter publication status"
              className="h-10 rounded-xl border px-3"
              onChange={(event) => setStatus(event.target.value)}
              value={status}
            >
              <option value="all">All statuses</option>
              {NEWS_STATUSES.map((item) => (
                <option key={item} value={item}>
                  {item}
                </option>
              ))}
            </select>
            <Button onClick={resetFilters} variant="outline">
              Reset
            </Button>
          </div>

          {!articles.length ? (
            <div className="mt-5">
              <AdminTableEmpty description="Create a local article to populate this prototype newsroom." title="No articles" />
            </div>
          ) : null}

          {articles.length && !rows.length ? (
            <div className="mt-5">
              <AdminTableEmpty description="Reset filters to view local news articles." title="No matching articles" />
            </div>
          ) : null}

          {rows.length ? (
            <NewsTable onArchive={archiveArticle} onEdit={setEdit} onView={setDetail} rows={rows} />
          ) : null}
        </>
      ) : null}

      <AdminDialog
        description="Frontend-only article details."
        onOpenChange={(open) => {
          if (!open) setDetail(null);
        }}
        open={detail !== null}
        title={detail?.title ?? "Article details"}
      >
        {detail ? <AdminNewsDetail article={detail} /> : null}
      </AdminDialog>

      <AdminDialog
        description="Adds an article to this local prototype session only."
        onOpenChange={setCreateOpen}
        open={createOpen}
        title="Create article"
      >
        {createOpen ? (
          <AdminNewsForm
            key={createKey}
            initialValues={createBlankArticle()}
            onCancel={() => setCreateOpen(false)}
            onSubmit={createArticle}
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
        title={edit ? `Edit ${edit.title}` : "Edit article"}
      >
        {edit ? (
          <AdminNewsForm
            key={edit.id}
            initialValues={edit}
            onCancel={() => setEdit(null)}
            onSubmit={updateArticle}
            submitLabel="Save locally"
          />
        ) : null}
      </AdminDialog>
    </>
  );
}

function NewsTable({
  onEdit,
  onArchive,
  onView,
  rows,
}: {
  onArchive: (article: AdminNewsArticle) => void;
  onEdit: (article: AdminNewsArticle) => void;
  onView: (article: AdminNewsArticle) => void;
  rows: AdminNewsArticle[];
}) {
  return (
    <div className="mt-5">
      <AdminTable caption="News article list">
        <thead>
          <tr>
            {["Article", "Author", "Publication date", "Last updated", "Status", "Featured", "Actions"].map((heading) => (
              <th className="border-b bg-muted px-4 py-3 text-left text-xs" key={heading}>
                {heading}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((article) => (
            <tr className="border-b" key={article.id}>
              <td className="px-4 py-3">
                <b>{article.title}</b>
                <span className="block text-xs text-muted-foreground">{article.slug}</span>
              </td>
              <td className="px-4 py-3">{article.author}</td>
              <td className="px-4 py-3">{article.publishedAt || "Not scheduled"}</td>
              <td className="px-4 py-3">{article.lastUpdated}</td>
              <td className="px-4 py-3">
                <AdminStatusBadge status={article.status} />
              </td>
              <td className="px-4 py-3">{article.isFeatured ? "Featured" : "Not featured"}</td>
              <td className="px-4 py-3">
                <AdminTableActions>
                  <Button aria-label={`View ${article.title}`} onClick={() => onView(article)} size="sm" variant="ghost">
                    <Eye aria-hidden="true" className="size-4" />
                  </Button>
                  <Button aria-label={`Edit ${article.title}`} onClick={() => onEdit(article)} size="sm" variant="ghost">
                    <Pencil aria-hidden="true" className="size-4" />
                  </Button>
                  <Button
                    aria-label={`Archive ${article.title}`}
                    onClick={() => onArchive(article)}
                    size="sm"
                    variant="ghost"
                  >
                    <Archive aria-hidden="true" className="size-4" />
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
