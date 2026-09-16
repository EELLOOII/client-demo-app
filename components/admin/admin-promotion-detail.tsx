import { AdminPromotionBannerPlaceholder } from "@/components/admin/admin-promotion-banner-placeholder";
import type { AdminPromotion } from "@/types/admin";

type AdminPromotionDetailProps = {
  promotion: AdminPromotion;
};

export function AdminPromotionDetail({ promotion }: AdminPromotionDetailProps) {
  return (
    <div className="grid gap-4 text-sm">
      <div>
        <h2 className="text-lg font-semibold text-foreground">{promotion.title}</h2>
        <p className="text-muted-foreground">{promotion.id}</p>
      </div>

      <dl className="grid gap-3 sm:grid-cols-2">
        <div>
          <dt className="text-xs font-medium uppercase text-muted-foreground">Type</dt>
          <dd>{promotion.type}</dd>
        </div>
        <div>
          <dt className="text-xs font-medium uppercase text-muted-foreground">Status</dt>
          <dd>{promotion.status}</dd>
        </div>
        <div>
          <dt className="text-xs font-medium uppercase text-muted-foreground">Start date</dt>
          <dd>{promotion.startDate}</dd>
        </div>
        <div>
          <dt className="text-xs font-medium uppercase text-muted-foreground">End date</dt>
          <dd>{promotion.endDate}</dd>
        </div>
        <div>
          <dt className="text-xs font-medium uppercase text-muted-foreground">Destination URL</dt>
          <dd>{promotion.destination || "Not set"}</dd>
        </div>
        <div>
          <dt className="text-xs font-medium uppercase text-muted-foreground">CTA label</dt>
          <dd>{promotion.cta || "Not set"}</dd>
        </div>
      </dl>

      <div>
        <h3 className="text-sm font-medium text-foreground">Description</h3>
        <p className="mt-1 text-muted-foreground">{promotion.description}</p>
      </div>

      <AdminPromotionBannerPlaceholder />
    </div>
  );
}
