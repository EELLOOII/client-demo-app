import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, CheckCircle2, PackageSearch } from "lucide-react";
import { CategoryCard } from "@/components/public/category-card";
import { ContentPreviewCard } from "@/components/public/content-preview-card";
import { EmptyState } from "@/components/public/empty-state";
import { ProductCard } from "@/components/public/product-card";
import { PublicContainer } from "@/components/public/public-container";
import { SectionHeading } from "@/components/public/section-heading";
import { Button } from "@/components/ui/button";
import { mockCatalogRepository } from "@/mock/catalog-repository";
import { mockContentRepository } from "@/mock/content-repository";

export const metadata: Metadata = {
  title: "Industrial supply, product discovery, and quotations",
  description:
    "Explore business prototype industrial product catalogue, promotions, company news, and quotation-request experience.",
};

export default async function HomePage() {
  const [products, categories, promotions, news] = await Promise.all([
    mockCatalogRepository.getFeaturedProducts(),
    mockCatalogRepository.getCategories(),
    mockContentRepository.getFeaturedPromotions(),
    mockContentRepository.getLatestNews(),
  ]);

  return (
    <>
      <section className="overflow-hidden bg-card">
        <PublicContainer className="grid gap-12 py-16 sm:py-20 lg:grid-cols-[1.1fr_0.9fr] lg:items-center lg:py-28">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.16em] text-primary">
              HOMEPAGE BANNER
            </p>
            <h1 className="mt-5 max-w-3xl text-4xl font-bold tracking-tight sm:text-5xl lg:text-6xl">
              Final banner content coming soon.
            </h1>
            <p className="mt-6 max-w-2xl text-lg leading-8 text-muted-foreground">
              The client will provide the final headline, supporting message,
              imagery, and call-to-action details for this area.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Button asChild size="lg">
                <Link href="/products">
                  Explore products{" "}
                  <ArrowRight aria-hidden="true" className="ml-2 size-4" />
                </Link>
              </Button>
              <Button asChild size="lg" variant="outline">
                <Link href="/request-quotation">Request a quotation</Link>
              </Button>
            </div>
          </div>
          <div className="rounded-3xl border bg-background p-8 shadow-sm sm:p-10">
            <PackageSearch
              aria-hidden="true"
              className="size-12 text-primary"
            />
            <p className="mt-8 text-sm font-semibold uppercase tracking-[0.14em] text-primary">
              CLIENT-PROVIDED CONTENT PENDING
            </p>
            <h2 className="mt-3 text-2xl font-bold">
              Banner details will be added here
            </h2>
            <p className="mt-4 leading-7 text-muted-foreground">
              This space is reserved for approved promotional or company
              messaging supplied by the client.
            </p>
            <ul className="mt-8 space-y-4 text-sm text-muted-foreground">
              <li className="flex gap-3">
                <CheckCircle2
                  aria-hidden="true"
                  className="size-5 shrink-0 text-success"
                />
                Final banner headline
              </li>
              <li className="flex gap-3">
                <CheckCircle2
                  aria-hidden="true"
                  className="size-5 shrink-0 text-success"
                />
                Approved banner imagery
              </li>
              <li className="flex gap-3">
                <CheckCircle2
                  aria-hidden="true"
                  className="size-5 shrink-0 text-success"
                />
                Call-to-action details
              </li>
            </ul>
          </div>
        </PublicContainer>
      </section>

      <ContentSection
        action={
          <Button asChild variant="outline">
            <Link href="/products">View all products</Link>
          </Button>
        }
        description="A selection from the prototype catalogue. Final product photography and product information will be supplied by the client."
        eyebrow="Featured products"
        title="Built for demanding operations"
      >
        {products.slice(0, 6).length ? (
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {products.slice(0, 6).map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        ) : (
          <EmptyState
            description="Featured products will appear here when catalogue content is available."
            title="No featured products yet"
          />
        )}
      </ContentSection>
      <ContentSection
        action={
          <Link
            className="text-sm font-semibold text-primary hover:text-blue-700"
            href="/products"
          >
            View product catalogue{" "}
            <ArrowRight aria-hidden="true" className="ml-1 inline size-4" />
          </Link>
        }
        background="card"
        description="Browse industrial supply areas to help locate the products relevant to your operation."
        eyebrow="Product categories"
        title="Find the right supply category"
      >
        {categories.slice(0, 6).length ? (
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {categories.slice(0, 6).map((category) => (
              <CategoryCard key={category.id} category={category} />
            ))}
          </div>
        ) : (
          <EmptyState
            description="Product categories will appear here when catalogue content is available."
            title="No categories available"
          />
        )}
      </ContentSection>
      <ContentSection
        action={
          <Button asChild variant="outline">
            <Link href="/promotions">All promotions</Link>
          </Button>
        }
        description="These clearly labelled previews reserve space for client-approved offers, dates, and imagery."
        eyebrow="Promotions"
        title="Current opportunities"
      >
        {promotions.length ? (
          <div className="grid gap-5 lg:grid-cols-3">
            {promotions.slice(0, 3).map((promotion) => (
              <ContentPreviewCard item={promotion} key={promotion.id} />
            ))}
          </div>
        ) : (
          <EmptyState
            description="Client-approved promotions will appear here when available."
            title="No promotions to show"
          />
        )}
      </ContentSection>
      <ContentSection
        action={
          <Button asChild variant="outline">
            <Link href="/news">All news</Link>
          </Button>
        }
        background="card"
        description="A reusable news preview treatment for future company updates and industrial product guidance."
        eyebrow="Latest news"
        title="Updates from the client's business team"
      >
        {news.length ? (
          <div className="grid gap-5 lg:grid-cols-3">
            {news.slice(0, 3).map((article) => (
              <ContentPreviewCard item={article} key={article.id} />
            ))}
          </div>
        ) : (
          <EmptyState
            description="Company updates will appear here once client content is available."
            title="No news to show"
          />
        )}
      </ContentSection>
      <section className="py-16 sm:py-20">
        <PublicContainer>
          <div className="rounded-3xl bg-primary px-6 py-12 text-primary-foreground sm:px-10 lg:flex lg:items-center lg:justify-between lg:px-14">
            <div className="max-w-2xl">
              <p className="text-sm font-semibold uppercase tracking-[0.14em] text-blue-100">
                Company support
              </p>
              <h2 className="mt-4 text-3xl font-bold tracking-tight sm:text-4xl">
                Need help planning your industrial supply requirements?
              </h2>
              <p className="mt-4 text-base leading-7 text-blue-100">
                Contact and company information are placeholders until KQ
                Emporium provides final details. You can still explore the
                prototype quotation route.
              </p>
            </div>
            <div className="mt-8 flex flex-wrap gap-3 lg:mt-0">
              <Button
                asChild
                className="bg-background text-foreground hover:bg-muted"
                size="lg"
              >
                <Link href="/request-quotation">Request a quote</Link>
              </Button>
              <Button
                asChild
                className="border-blue-200 bg-transparent text-white hover:bg-blue-700"
                size="lg"
                variant="outline"
              >
                <Link href="/contact">Contact placeholder</Link>
              </Button>
            </div>
          </div>
        </PublicContainer>
      </section>
    </>
  );
}

function ContentSection({
  action,
  background,
  children,
  description,
  eyebrow,
  title,
}: Readonly<{
  action: React.ReactNode;
  background?: "card";
  children: React.ReactNode;
  description: string;
  eyebrow: string;
  title: string;
}>) {
  return (
    <section
      className={background ? "bg-card py-16 sm:py-20" : "py-16 sm:py-20"}
    >
      <PublicContainer>
        <SectionHeading
          action={action}
          description={description}
          eyebrow={eyebrow}
          title={title}
        />
        <div className="mt-10">{children}</div>
      </PublicContainer>
    </section>
  );
}
