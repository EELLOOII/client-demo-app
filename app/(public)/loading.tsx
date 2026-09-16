import { PublicContainer } from "@/components/public/public-container";

export default function PublicLoading() {
  return <PublicContainer className="py-16 sm:py-20"><div className="animate-pulse space-y-8 motion-reduce:animate-none" role="status"><span className="sr-only">Loading page content</span><div className="h-10 w-48 rounded bg-muted" /><div className="h-16 max-w-2xl rounded bg-muted" /><div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">{Array.from({ length: 6 }, (_, index) => <div className="h-80 rounded-2xl bg-muted" key={index} />)}</div></div></PublicContainer>;
}
