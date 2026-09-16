export function AdminNewsImagePlaceholder() {
  return (
    <div
      aria-label="Article image placeholder"
      className="rounded-xl border border-dashed bg-muted/30 p-4 text-sm"
      role="img"
    >
      <p className="font-medium text-foreground">Article image placeholder</p>
      <p className="mt-1 text-muted-foreground">Recommended size: 1200 x 630px.</p>
      <p className="mt-1 text-muted-foreground">Supported formats: JPG, PNG, WebP.</p>
    </div>
  );
}
