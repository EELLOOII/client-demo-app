"use client";

import { EmptyState } from "@/components/public/empty-state";
import { PublicContainer } from "@/components/public/public-container";
import { Button } from "@/components/ui/button";

export default function ProductDetailError({ reset }: Readonly<{ error: Error & { digest?: string }; reset: () => void }>) {
  return <PublicContainer className="py-16 sm:py-20"><EmptyState description="We could not load this product. Please try again." title="Product details are temporarily unavailable" /><div className="mt-6 text-center"><Button onClick={reset}>Try again</Button></div></PublicContainer>;
}
