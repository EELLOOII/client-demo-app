import type { Metadata } from "next";
import Link from "next/link";
import { CatalogFilters } from "@/components/public/catalog-filters";
import { CatalogPagination } from "@/components/public/catalog-pagination";
import { EmptyState } from "@/components/public/empty-state";
import { ProductCard } from "@/components/public/product-card";
import { PublicContainer } from "@/components/public/public-container";
import { SectionHeading } from "@/components/public/section-heading";
import { mockCatalogRepository } from "@/mock/catalog-repository";

const PRODUCTS_PER_PAGE = 8;

export const metadata: Metadata = {
  title: "Products | KQ Emporium",
  description: "Browse KQ Emporium's industrial products by category.",
};

interface ProductsPageProps {
  searchParams: Promise<{ q?: string | string[]; category?: string | string[]; page?: string | string[] }>;
}

function getSingleValue(value: string | string[] | undefined) {
  return typeof value === "string" ? value : "";
}

function getRequestedPage(value: string) {
  if (!/^\d+$/.test(value)) return 1;
  const page = Number(value);
  return Number.isSafeInteger(page) && page > 0 ? page : 1;
}

export default async function ProductsPage({ searchParams }: ProductsPageProps) {
  const params = await searchParams;
  const query = getSingleValue(params.q).trim();
  const requestedCategoryId = getSingleValue(params.category).trim();
  const requestedPage = getRequestedPage(getSingleValue(params.page));
  const categories = await mockCatalogRepository.getCategories();
  const categoryId = categories.some((category) => category.id === requestedCategoryId) ? requestedCategoryId : undefined;
  const catalog = await mockCatalogRepository.getProducts({ query, categoryId, page: requestedPage, pageSize: PRODUCTS_PER_PAGE });
  const hasActiveFilters = Boolean(query || categoryId);

  return (
    <PublicContainer className="py-16 sm:py-20">
      <SectionHeading description="Browse appliances, gadgets, and power equipment by category." eyebrow="Product catalog" title="Products" />
      <div className="mt-10"><CatalogFilters categories={categories} categoryId={categoryId} query={query} /></div>
      {catalog.totalProducts === 0 ? <div className="mt-10"><EmptyState description="Products will appear here once the catalog is available." title="The product catalog is being prepared" /></div> : null}
      {catalog.totalProducts > 0 && catalog.totalResults === 0 ? <div className="mt-10"><EmptyState description="Try a different search term or clear your filters to see the full catalog." title="No products match your search" />{hasActiveFilters ? <p className="mt-5 text-center"><Link className="font-semibold text-primary hover:text-blue-700" href="/products">Clear all filters</Link></p> : null}</div> : null}
      {catalog.totalResults > 0 ? <>
        <p aria-live="polite" className="mt-8 text-sm text-muted-foreground">Showing {catalog.products.length} of {catalog.totalResults} {catalog.totalResults === 1 ? "product" : "products"}{catalog.totalPages > 1 ? ` · Page ${catalog.page} of ${catalog.totalPages}` : ""}</p>
        <div className="mt-5 grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">{catalog.products.map((product) => <ProductCard key={product.id} product={product} />)}</div>
        <CatalogPagination categoryId={categoryId} page={catalog.page} query={query} totalPages={catalog.totalPages} />
      </> : null}
    </PublicContainer>
  );
}
