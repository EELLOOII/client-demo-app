"use client";

import { useEffect } from "react";
import { PublicContainer } from "@/components/public/public-container";
import { Button } from "@/components/ui/button";

export default function PublicError({ error, reset }: Readonly<{ error: Error & { digest?: string }; reset: () => void }>) {
  useEffect(() => { console.error(error); }, [error]);
  return <PublicContainer className="py-16 sm:py-20"><section className="rounded-2xl border bg-card p-8 text-center sm:p-12"><h1 className="text-2xl font-bold">We could not load this page</h1><p className="mx-auto mt-3 max-w-md text-muted-foreground">Please try again. If the problem continues, the prototype content may need to be refreshed.</p><Button className="mt-6" onClick={reset}>Try again</Button></section></PublicContainer>;
}
