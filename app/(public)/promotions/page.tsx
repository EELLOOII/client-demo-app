import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { ContentPreviewCard } from "@/components/public/content-preview-card";
import { EmptyState } from "@/components/public/empty-state";
import { PublicContainer } from "@/components/public/public-container";
import { SectionHeading } from "@/components/public/section-heading";
import { mockContentRepository } from "@/mock/content-repository";

export const metadata: Metadata = {
  title: "Promotions",
  description:
    "Browse client's business promotion placeholders while final offers, imagery, and validity details are pending client approval.",
};

export default async function PromotionsPage() {
  const promotions = await mockContentRepository.getPromotions();
  return (
    <section className="py-16 sm:py-20">
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
            description="This complete prototype listing reserves space for client-approved offers, imagery, and validity information."
            eyebrow="Promotions"
            headingLevel={1}
            title="Current opportunities"
            titleId="promotions-heading"
          />
        </div>
        <section aria-labelledby="promotions-heading" className="mt-10">
          {promotions.length ? (
            <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {promotions.map((promotion) => (
                <ContentPreviewCard
                  item={promotion}
                  key={promotion.id}
                  showListingLink={false}
                />
              ))}
            </div>
          ) : (
            <EmptyState
              description="Client-approved promotions will appear here when they are available."
              title="No promotions to show"
            />
          )}
        </section>
      </PublicContainer>
    </section>
  );
}
