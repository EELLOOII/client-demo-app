import { PublicContainer } from "@/components/public/public-container";

export function ContentListingSkeleton() {
  return (
    <PublicContainer className="py-16 sm:py-20">
      <div className="animate-pulse space-y-8 motion-reduce:animate-none" role="status">
        <span className="sr-only">Loading content</span>
        <div className="h-5 w-28 rounded bg-muted" />
        <div className="h-12 max-w-xl rounded bg-muted" />
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {Array.from({ length: 6 }, (_, index) => <div className="h-80 rounded-2xl bg-muted" key={index} />)}
        </div>
      </div>
    </PublicContainer>
  );
}
