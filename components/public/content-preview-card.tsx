import Link from "next/link";
import { ArrowRight, CalendarDays, Megaphone, Newspaper } from "lucide-react";
import type { ContentPreview } from "@/types";

interface ContentPreviewCardProps {
  item: ContentPreview;
  showListingLink?: boolean;
}

export function ContentPreviewCard({ item, showListingLink = true }: ContentPreviewCardProps) {
  const isPromotion = item.type === "promotion";
  const href = isPromotion ? "/promotions" : "/news";
  const Icon = isPromotion ? Megaphone : Newspaper;

  return (
    <article className="group flex h-full flex-col overflow-hidden rounded-2xl border bg-background shadow-sm transition-shadow hover:shadow-md">
      <div className="flex aspect-[16/8] items-center justify-center bg-card text-muted-foreground">
        <Icon aria-hidden="true" className="size-9 text-primary" />
        <span className="sr-only">Client-provided {item.type} image pending</span>
      </div>
      <div className="flex flex-1 flex-col p-5">
        <p className="text-xs font-semibold uppercase tracking-[0.12em] text-primary">{item.label}</p>
        <h3 className="mt-3 text-lg font-bold leading-6">{showListingLink ? <Link className="focus-visible:rounded-sm" href={href}>{item.title}</Link> : item.title}</h3>
        <p className="mt-3 flex-1 text-sm leading-6 text-muted-foreground">{item.summary}</p>
        <div className="mt-5 flex items-center justify-between gap-3 border-t pt-4">
          <p className="inline-flex items-center gap-2 text-xs text-muted-foreground"><CalendarDays aria-hidden="true" className="size-4" />{item.publishedLabel}</p>
          {showListingLink ? <Link className="inline-flex items-center gap-1 text-sm font-semibold text-primary hover:text-blue-700" href={href}>Learn more <ArrowRight aria-hidden="true" className="size-4" /></Link> : <span className="text-sm font-semibold text-muted-foreground">Client content pending</span>}
        </div>
      </div>
    </article>
  );
}
