"use client";

import { Button } from "@/components/ui/button";
import { EmptyState } from "@/components/public/empty-state";
import { PublicContainer } from "@/components/public/public-container";

export default function ProductsError({ reset }: Readonly<{ error: Error & { digest?: string }; reset: () => void }>) {
  return <PublicContainer className="py-16 sm:py-20"><EmptyState description="We could not load the catalog. Please try again." title="Products are temporarily unavailable" /><div className="mt-6 text-center"><Button onClick={reset}>Try again</Button></div></PublicContainer>;
}
