import type { Metadata } from "next";
import { ClipboardList, FileText, ShieldCheck } from "lucide-react";
import { QuotationRequestForm } from "@/components/public/quotation-request-form";
import { PublicContainer } from "@/components/public/public-container";
import { SectionHeading } from "@/components/public/section-heading";
import { mockCatalogRepository } from "@/mock/catalog-repository";

export const metadata: Metadata = { title: "Request a quotation | KQ Emporium", description: "Create a frontend-only quotation request prototype for KQ Emporium industrial supplies." };

interface RequestQuotationPageProps {
  searchParams: Promise<{ product?: string | string[] }>;
}

export default async function RequestQuotationPage({ searchParams }: RequestQuotationPageProps) {
  const productParam = (await searchParams).product;
  const selectedProduct = typeof productParam === "string" ? await mockCatalogRepository.getProductBySlug(productParam) : undefined;
  return <PublicContainer className="py-16 sm:py-20">
    <SectionHeading description="Share the product and requirements you would like priced. This frontend prototype does not send or save request information." eyebrow="Quotation" headingLevel={1} title="Request a quotation" />
    <div className="mt-10 grid gap-10 lg:grid-cols-[minmax(0,0.8fr)_minmax(0,1.2fr)] lg:items-start">
      <aside className="space-y-6">
        <section aria-labelledby="quotation-process-title" className="rounded-2xl border bg-card p-6 shadow-sm sm:p-8"><ClipboardList aria-hidden="true" className="size-8 text-primary" /><h2 className="mt-5 text-2xl font-bold" id="quotation-process-title">What to include</h2><ul className="mt-4 space-y-3 text-sm leading-6 text-muted-foreground"><li>Product or service needed</li><li>Estimated quantity</li><li>Required specifications and delivery expectations</li></ul></section>
        <section aria-labelledby="quotation-prototype-title" className="rounded-2xl border bg-muted p-6 sm:p-8"><ShieldCheck aria-hidden="true" className="size-8 text-primary" /><h2 className="mt-5 text-xl font-bold" id="quotation-prototype-title">Prototype only</h2><p className="mt-3 text-sm leading-6 text-muted-foreground">This form demonstrates the quotation-request flow. It does not create a quotation or transmit information.</p><FileText aria-hidden="true" className="mt-5 size-6 text-muted-foreground" /></section>
      </aside>
      <QuotationRequestForm product={selectedProduct?.name} />
    </div>
  </PublicContainer>;
}
