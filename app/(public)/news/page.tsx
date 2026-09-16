import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { ContentPreviewCard } from "@/components/public/content-preview-card";
import { EmptyState } from "@/components/public/empty-state";
import { PublicContainer } from "@/components/public/public-container";
import { SectionHeading } from "@/components/public/section-heading";
import { mockContentRepository } from "@/mock/content-repository";

export const metadata: Metadata = {
  title: "News",
  description:
    "Read client's company-news and industrial-guidance placeholders while final articles and imagery are pending client approval.",
};

export default async function NewsPage() {
  const news = await mockContentRepository.getNews();
  return (
    <section className="bg-card py-16 sm:py-20">
      <PublicContainer>
        <Link
          className="inline-flex items-center gap-2 rounded-sm text-sm font-semibold text-primary hover:text-blue-700"
          href="/"
        >
          <ArrowLeft aria-hidden="true" className="size-4" />
          Back to home
        </Link>
        <div className="mt-8">
          <SectionHeading
            description="A complete prototype listing for future company updates and industrial product guidance."
            eyebrow="News"
            headingLevel={1}
            title="Updates from the client's business team"
            titleId="news-heading"
          />
        </div>
        <section aria-labelledby="news-heading" className="mt-10">
          {news.length ? (
            <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {news.map((article) => (
                <ContentPreviewCard
                  item={article}
                  key={article.id}
                  showListingLink={false}
                />
              ))}
            </div>
          ) : (
            <EmptyState
              description="Company updates will appear here once client content is available."
              title="No news to show"
            />
          )}
        </section>
      </PublicContainer>
    </section>
  );
}
