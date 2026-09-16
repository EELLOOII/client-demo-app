import { PublicContainer } from "@/components/public/public-container";

export default function RequestQuotationLoading() {
  return <PublicContainer className="py-16 sm:py-20"><p className="sr-only" role="status">Loading quotation request</p><div aria-hidden="true" className="animate-pulse motion-reduce:animate-none"><div className="h-10 w-72 rounded bg-muted" /><div className="mt-10 grid gap-10 lg:grid-cols-2"><div className="h-80 rounded-2xl bg-muted" /><div className="h-[42rem] rounded-2xl bg-muted" /></div></div></PublicContainer>;
}
