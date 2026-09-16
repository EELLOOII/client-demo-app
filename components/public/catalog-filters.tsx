import Link from "next/link";
import { Search, SlidersHorizontal } from "lucide-react";
import type { Category } from "@/types";
import { Button } from "@/components/ui/button";

interface CatalogFiltersProps {
  categories: Category[];
  query: string;
  categoryId?: string;
}

export function CatalogFilters({ categories, query, categoryId }: CatalogFiltersProps) {
  const hasActiveFilters = Boolean(query || categoryId);

  return (
    <form action="/products" className="rounded-2xl border bg-card p-4 shadow-sm sm:p-5">
      <div className="grid gap-4 lg:grid-cols-[minmax(0,1fr)_16rem_auto] lg:items-end">
        <div>
          <label className="text-sm font-semibold" htmlFor="product-search">Search products</label>
          <div className="relative mt-2">
            <Search aria-hidden="true" className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
            <input className="h-11 w-full rounded-xl border bg-background pl-10 pr-3 text-sm placeholder:text-muted-foreground" defaultValue={query} id="product-search" name="q" placeholder="Search products or categories" type="search" />
          </div>
        </div>
        <div>
          <label className="text-sm font-semibold" htmlFor="product-category">Category</label>
          <select className="mt-2 h-11 w-full rounded-xl border bg-background px-3 text-sm" defaultValue={categoryId ?? ""} id="product-category" name="category">
            <option value="">All categories</option>
            {categories.map((category) => <option key={category.id} value={category.id}>{category.name}</option>)}
          </select>
        </div>
        <div className="flex flex-wrap gap-3">
          <Button type="submit"><SlidersHorizontal aria-hidden="true" className="size-4" />Apply filters</Button>
          {hasActiveFilters ? <Button asChild variant="outline"><Link href="/products">Clear filters</Link></Button> : null}
        </div>
      </div>
    </form>
  );
}
