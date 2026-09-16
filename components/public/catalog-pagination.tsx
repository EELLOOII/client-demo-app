import Link from "next/link";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface CatalogPaginationProps {
  page: number;
  totalPages: number;
  query: string;
  categoryId?: string;
}

function getPageHref(page: number, query: string, categoryId?: string) {
  const params = new URLSearchParams();
  if (query) params.set("q", query);
  if (categoryId) params.set("category", categoryId);
  if (page > 1) params.set("page", String(page));
  const search = params.toString();
  return search ? `/products?${search}` : "/products";
}

export function CatalogPagination({ page, totalPages, query, categoryId }: CatalogPaginationProps) {
  if (totalPages <= 1) return null;

  const pageNumbers = Array.from({ length: totalPages }, (_, index) => index + 1);
  return (
    <nav aria-label="Product catalog pagination" className="mt-10 flex flex-wrap items-center justify-center gap-2">
      {page > 1 ? (
        <Link aria-label="Go to previous page" className={cn(buttonVariants({ variant: "outline", size: "sm" }), "gap-1")} href={getPageHref(page - 1, query, categoryId)}><ChevronLeft aria-hidden="true" className="size-4" />Previous</Link>
      ) : <span aria-disabled="true" className={cn(buttonVariants({ variant: "outline", size: "sm" }), "cursor-not-allowed gap-1")}><ChevronLeft aria-hidden="true" className="size-4" />Previous</span>}
      <div aria-label={`Page ${page} of ${totalPages}`} className="flex items-center gap-1">
        {pageNumbers.map((pageNumber) => pageNumber === page ? <span aria-current="page" className={cn(buttonVariants({ size: "sm" }), "min-w-9")} key={pageNumber}>{pageNumber}</span> : <Link aria-label={`Go to page ${pageNumber}`} className={cn(buttonVariants({ variant: "outline", size: "sm" }), "min-w-9")} href={getPageHref(pageNumber, query, categoryId)} key={pageNumber}>{pageNumber}</Link>)}
      </div>
      {page < totalPages ? (
        <Link aria-label="Go to next page" className={cn(buttonVariants({ variant: "outline", size: "sm" }), "gap-1")} href={getPageHref(page + 1, query, categoryId)}>Next<ChevronRight aria-hidden="true" className="size-4" /></Link>
      ) : <span aria-disabled="true" className={cn(buttonVariants({ variant: "outline", size: "sm" }), "cursor-not-allowed gap-1")}>Next<ChevronRight aria-hidden="true" className="size-4" /></span>}
    </nav>
  );
}
