export function AdminPromotionBannerPlaceholder() {
  return (
    <div
      aria-label="Promotion banner placeholder"
      className="rounded-xl border border-dashed bg-muted/30 p-4 text-sm"
      role="img"
    >
      <p className="font-medium text-foreground">Banner image placeholder</p>
      <p className="mt-1 text-muted-foreground">Recommended size: 1200 x 400px.</p>
      <p className="mt-1 text-muted-foreground">Supported formats: JPG, PNG, WebP.</p>
    </div>
  );
}
