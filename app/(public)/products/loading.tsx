import { PublicContainer } from "@/components/public/public-container";

export default function ProductsLoading() {
  return <PublicContainer className="py-16 sm:py-20"><p role="status" className="sr-only">Loading products</p><div aria-hidden="true" className="animate-pulse motion-reduce:animate-none"><div className="h-10 w-64 rounded bg-muted" /><div className="mt-8 h-28 rounded-2xl bg-muted" /><div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">{Array.from({ length: 8 }, (_, index) => <div className="h-96 rounded-2xl bg-muted" key={index} />)}</div></div></PublicContainer>;
}
