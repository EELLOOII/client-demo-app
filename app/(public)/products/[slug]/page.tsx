import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ChevronRight } from "lucide-react";
import { EmptyState } from "@/components/public/empty-state";
import { ProductAvailability } from "@/components/public/product-availability";
import { ProductCard } from "@/components/public/product-card";
import { ProductGalleryPlaceholder } from "@/components/public/product-gallery-placeholder";
import { ProductSpecifications } from "@/components/public/product-specifications";
import { PublicContainer } from "@/components/public/public-container";
import { SectionHeading } from "@/components/public/section-heading";
import { Button } from "@/components/ui/button";
import { mockCatalogRepository } from "@/mock/catalog-repository";

const RELATED_PRODUCT_LIMIT = 3;

interface ProductDetailPageProps {
  params: Promise<{ slug: string }>;
}

function getSafeSlug(value: string) {
  try {
    const decodedValue = decodeURIComponent(value);
    return /^(?=.{1,120}$)[a-z0-9]+(?:-[a-z0-9]+)*$/.test(decodedValue) ? decodedValue : undefined;
  } catch {
    return undefined;
  }
}

async function getProductForParams(params: ProductDetailPageProps["params"]) {
  const { slug } = await params;
  const safeSlug = getSafeSlug(slug);

  if (!safeSlug) return undefined;

  return mockCatalogRepository.getProductBySlug(safeSlug);
}

export async function generateMetadata({ params }: ProductDetailPageProps): Promise<Metadata> {
  const product = await getProductForParams(params);

  if (!product) return { title: "Product not found" };

  return { title: product.name, description: product.description };
}

export default async function ProductDetailPage({ params }: ProductDetailPageProps) {
  const product = await getProductForParams(params);

  if (!product) notFound();

  const [categories, relatedProducts] = await Promise.all([
    mockCatalogRepository.getCategories(),
    mockCatalogRepository.getRelatedProducts(product, RELATED_PRODUCT_LIMIT),
  ]);
  const category = categories.find((item) => item.id === product.categoryId);
  const quotationHref = `/request-quotation?product=${encodeURIComponent(product.slug)}`;

  return (
    <PublicContainer className="py-10 sm:py-14 lg:py-16">
      <nav aria-label="Breadcrumb" className="text-sm text-muted-foreground">
        <ol className="flex flex-wrap items-center gap-2">
          <li><Link className="focus-visible:rounded-sm hover:text-primary" href="/">Home</Link></li>
          <li><ChevronRight aria-hidden="true" className="size-4" /></li>
          <li><Link className="focus-visible:rounded-sm hover:text-primary" href="/products">Products</Link></li>
          <li><ChevronRight aria-hidden="true" className="size-4" /></li>
          <li aria-current="page" className="font-medium text-foreground">{product.name}</li>
        </ol>
      </nav>

      <div className="mt-8 grid gap-10 lg:grid-cols-2 lg:items-start lg:gap-14">
        <ProductGalleryPlaceholder images={product.images} productName={product.name} />
        <section aria-labelledby="product-title">
          <p className="text-sm font-semibold uppercase tracking-[0.14em] text-primary">{category?.name ?? "Industrial product"}</p>
          <h1 id="product-title" className="mt-3 text-3xl font-bold tracking-tight text-foreground sm:text-4xl">{product.name}</h1>
          <div className="mt-5"><ProductAvailability stockStatus={product.stockStatus} /></div>
          <p className="mt-6 text-lg leading-8 text-muted-foreground">{product.description}</p>
          <div className="mt-8 rounded-2xl border bg-card p-5">
            <p className="text-sm font-medium text-muted-foreground">Price</p>
            <p className="mt-1 text-2xl font-bold">{new Intl.NumberFormat("en-PH", { style: "currency", currency: product.currency, maximumFractionDigits: 0 }).format(product.price)}</p>
            <p className="mt-2 text-sm leading-6 text-muted-foreground">Pricing may vary. Please request a quotation for current pricing.</p>
          </div>
          <Button asChild className="mt-8 w-full sm:w-auto" size="lg"><Link href={quotationHref}>Request a quotation</Link></Button>
        </section>
      </div>

      <section aria-labelledby="specifications-heading" className="mt-16">
        <SectionHeading description="Product details and specifications." eyebrow="Product information" title="Specifications" titleId="specifications-heading" />
        <div className="mt-8"><ProductSpecifications specifications={product.specifications} /></div>
      </section>

      <section aria-labelledby="related-products-heading" className="mt-16">
        <SectionHeading description="Explore additional products from the catalog." eyebrow="Explore more" title="Related products" titleId="related-products-heading" />
        {relatedProducts.length > 0 ? <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">{relatedProducts.map((relatedProduct) => <ProductCard key={relatedProduct.id} product={relatedProduct} />)}</div> : <div className="mt-8"><EmptyState description="More products will appear here when related catalog entries are available." title="No related products are available" /></div>}
      </section>
    </PublicContainer>
  );
}
