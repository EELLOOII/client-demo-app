"use client";

import { Archive, Eye, Pencil } from "lucide-react";
import { useMemo, useState } from "react";
import { AdminDialog } from "@/components/admin/admin-dialog";
import { AdminPromotionDetail } from "@/components/admin/admin-promotion-detail";
import { AdminPromotionForm } from "@/components/admin/admin-promotion-form";
import { AdminStatusBadge } from "@/components/admin/admin-status-badge";
import {
  AdminTable,
  AdminTableActions,
  AdminTableEmpty,
  AdminTableError,
  AdminTableLoading,
} from "@/components/admin/admin-table";
import { Button } from "@/components/ui/button";
import { ADMIN_PROMOTIONS } from "@/mock/admin-promotions";
import type { AdminPromotion, AdminPromotionStatus, AdminPromotionType } from "@/types/admin";

const PROMOTION_STATUSES: AdminPromotionStatus[] = ["draft", "scheduled", "active", "expired", "archived"];
const PROMOTION_TYPES: AdminPromotionType[] = ["Banner", "Product Promotion", "Seasonal Campaign", "Announcement"];

const createBlankPromotion = (): AdminPromotion => ({
  cta: "",
  description: "",
  destination: "",
  endDate: "",
  id: "",
  lastUpdated: "Just now (local prototype)",
  startDate: "",
  status: "draft",
  title: "",
  type: "Banner",
});

export function AdminPromotionManager() {
  const [items, setItems] = useState(ADMIN_PROMOTIONS);
  const [query, setQuery] = useState("");
  const [status, setStatus] = useState("all");
  const [type, setType] = useState("all");
  const [detail, setDetail] = useState<AdminPromotion | null>(null);
  const [edit, setEdit] = useState<AdminPromotion | null>(null);
  const [createOpen, setCreateOpen] = useState(false);
  const [createKey, setCreateKey] = useState(0);
  const [mode, setMode] = useState<"data" | "error" | "loading">("data");

  const rows = useMemo(
    () =>
      items.filter(
        (promotion) =>
          (promotion.title + promotion.id).toLowerCase().includes(query.toLowerCase()) &&
          (status === "all" || promotion.status === status) &&
          (type === "all" || promotion.type === type),
      ),
    [items, query, status, type],
  );

  const resetFilters = () => {
    setQuery("");
    setStatus("all");
    setType("all");
  };

  const openCreate = () => {
    setCreateKey((current) => current + 1);
    setCreateOpen(true);
  };

  const createPromotion = (promotion: AdminPromotion) => {
    setItems((current) => [...current, promotion]);
    setCreateOpen(false);
  };

  const updatePromotion = (promotion: AdminPromotion) => {
    setItems((current) => current.map((item) => (item.id === edit?.id ? promotion : item)));
    setDetail((current) => (current?.id === edit?.id ? promotion : current));
    setEdit(null);
  };

  const archivePromotion = (promotion: AdminPromotion) => {
    const archivedPromotion: AdminPromotion = {
      ...promotion,
      lastUpdated: "Just now (local prototype)",
      status: "archived",
    };

    setItems((current) => current.map((item) => (item.id === promotion.id ? archivedPromotion : item)));
    setDetail((current) => (current?.id === promotion.id ? archivedPromotion : current));
    setEdit((current) => (current?.id === promotion.id ? archivedPromotion : current));
  };

  return (
    <>
      <div className="mt-6 flex flex-wrap gap-2">
        <Button onClick={() => setMode("data")} size="sm" variant={mode === "data" ? "default" : "outline"}>
          Promotions
        </Button>
        <Button onClick={() => setMode("loading")} size="sm" variant="outline">
          Loading
        </Button>
        <Button onClick={() => setMode("error")} size="sm" variant="outline">
          Error
        </Button>
        <Button onClick={openCreate} size="sm" variant="outline">
          Create Promotion
        </Button>
      </div>

      {mode === "loading" ? (
        <div className="mt-6">
          <AdminTableLoading label="Loading promotions" />
        </div>
      ) : null}

      {mode === "error" ? (
        <div className="mt-6">
          <AdminTableError description="Local retry only." onRetry={() => setMode("data")} />
        </div>
      ) : null}

      {mode === "data" ? (
        <>
          <div className="mt-6 grid gap-3 rounded-2xl border bg-background p-4 sm:grid-cols-4">
            <input
              aria-label="Search promotions"
              className="h-10 rounded-xl border px-3"
              onChange={(event) => setQuery(event.target.value)}
              placeholder="Search title or ID"
              value={query}
            />
            <select
              aria-label="Filter promotion status"
              className="h-10 rounded-xl border px-3"
              onChange={(event) => setStatus(event.target.value)}
              value={status}
            >
              <option value="all">All statuses</option>
              {PROMOTION_STATUSES.map((item) => (
                <option key={item} value={item}>
                  {item}
                </option>
              ))}
            </select>
            <select
              aria-label="Filter promotion type"
              className="h-10 rounded-xl border px-3"
              onChange={(event) => setType(event.target.value)}
              value={type}
            >
              <option value="all">All types</option>
              {PROMOTION_TYPES.map((item) => (
                <option key={item} value={item}>
                  {item}
                </option>
              ))}
            </select>
            <Button onClick={resetFilters} variant="outline">
              Reset
            </Button>
          </div>

          {!items.length ? (
            <div className="mt-5">
              <AdminTableEmpty description="Create a local promotion to populate this prototype list." title="No promotions" />
            </div>
          ) : null}

          {items.length && !rows.length ? (
            <div className="mt-5">
              <AdminTableEmpty description="Reset filters to view local promotions." title="No matching promotions" />
            </div>
          ) : null}

          {rows.length ? (
            <div className="mt-5">
              <AdminTable caption="Promotion list">
                <thead>
                  <tr>
                    {["Promotion", "Type", "Schedule", "Status", "Actions"].map((heading) => (
                      <th className="border-b bg-muted px-4 py-3 text-left text-xs" key={heading}>
                        {heading}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {rows.map((promotion) => (
                    <tr className="border-b" key={promotion.id}>
                      <td className="px-4 py-3">
                        <b>{promotion.title}</b>
                        <span className="block text-xs text-muted-foreground">{promotion.id}</span>
                      </td>
                      <td className="px-4 py-3">{promotion.type}</td>
                      <td className="px-4 py-3">
                        {promotion.startDate} - {promotion.endDate}
                      </td>
                      <td className="px-4 py-3">
                        <AdminStatusBadge status={promotion.status} />
                      </td>
                      <td className="px-4 py-3">
                        <AdminTableActions>
                          <Button
                            aria-label={`View ${promotion.title}`}
                            onClick={() => setDetail(promotion)}
                            size="sm"
                            variant="ghost"
                          >
                            <Eye aria-hidden="true" className="size-4" />
                          </Button>
                          <Button
                            aria-label={`Edit ${promotion.title}`}
                            onClick={() => setEdit(promotion)}
                            size="sm"
                            variant="ghost"
                          >
                            <Pencil aria-hidden="true" className="size-4" />
                          </Button>
                          <Button
                            aria-label={`Archive ${promotion.title}`}
                            onClick={() => archivePromotion(promotion)}
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
          ) : null}
        </>
      ) : null}

      <AdminDialog
        description="Frontend-only promotion details."
        onOpenChange={(open) => {
          if (!open) setDetail(null);
        }}
        open={detail !== null}
        title={detail?.title ?? "Promotion details"}
      >
        {detail ? <AdminPromotionDetail promotion={detail} /> : null}
      </AdminDialog>

      <AdminDialog
        description="Adds a promotion to this local prototype session only."
        onOpenChange={setCreateOpen}
        open={createOpen}
        title="Create promotion"
      >
        {createOpen ? (
          <AdminPromotionForm
            key={createKey}
            initialValues={createBlankPromotion()}
            onCancel={() => setCreateOpen(false)}
            onSubmit={createPromotion}
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
        title={edit ? `Edit ${edit.title}` : "Edit promotion"}
      >
        {edit ? (
          <AdminPromotionForm
            key={edit.id}
            initialValues={edit}
            onCancel={() => setEdit(null)}
            onSubmit={updatePromotion}
            submitLabel="Save locally"
          />
        ) : null}
      </AdminDialog>
    </>
  );
}
