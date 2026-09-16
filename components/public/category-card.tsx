import Link from "next/link";
import { ArrowRight, Layers3 } from "lucide-react";
import type { Category } from "@/types";

interface CategoryCardProps {
  category: Category;
}

export function CategoryCard({ category }: CategoryCardProps) {
  return (
    <article className="rounded-2xl border bg-background p-5 shadow-sm transition-shadow hover:shadow-md">
      <Layers3 aria-hidden="true" className="size-6 text-primary" />
      <h3 className="mt-5 text-lg font-bold"><Link className="focus-visible:rounded-sm" href={`/products?category=${encodeURIComponent(category.id)}`}>{category.name}</Link></h3>
      <p className="mt-2 text-sm leading-6 text-muted-foreground">{category.description}</p>
      <Link className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-primary hover:text-blue-700" href={`/products?category=${encodeURIComponent(category.id)}`}>Browse category <ArrowRight aria-hidden="true" className="size-4" /></Link>
    </article>
  );
}
