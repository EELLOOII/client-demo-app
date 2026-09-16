"use client";

import { ContentListingError } from "@/components/public/content-listing-error";

export default function ContactError({ reset }: Readonly<{ error: Error & { digest?: string }; reset: () => void }>) {
  return <ContentListingError reset={reset} />;
}
