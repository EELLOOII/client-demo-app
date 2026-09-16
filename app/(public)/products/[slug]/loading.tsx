import { PublicContainer } from "@/components/public/public-container";

export default function ProductDetailLoading() {
  return (
    <PublicContainer className="py-10 sm:py-14 lg:py-16">
      <p role="status" className="sr-only">Loading product details</p>
      <div aria-hidden="true" className="animate-pulse motion-reduce:animate-none">
        <div className="h-5 w-56 rounded bg-muted" />
        <div className="mt-8 grid gap-10 lg:grid-cols-2 lg:gap-14"><div className="aspect-[4/3] rounded-3xl bg-muted" /><div><div className="h-5 w-32 rounded bg-muted" /><div className="mt-4 h-12 w-4/5 rounded bg-muted" /><div className="mt-6 h-24 rounded bg-muted" /><div className="mt-8 h-12 w-48 rounded bg-muted" /></div></div>
      </div>
    </PublicContainer>
  );
}
