import Link from "next/link";
import Image from "next/image";
import { ArrowUpRight, Box } from "lucide-react";
import type { Product } from "@/types";

interface ProductCardProps {
  product: Product;
}

const stockLabels: Record<Product["stockStatus"], string> = {
  "in-stock": "Available",
  "low-stock": "Limited stock",
  "out-of-stock": "Availability on request",
};

export function ProductCard({ product }: ProductCardProps) {
  const price = new Intl.NumberFormat("en-PH", { style: "currency", currency: product.currency, maximumFractionDigits: 0 }).format(product.price);
  const image = product.images?.[0] ?? product.image;

  return (
    <article className="group flex h-full flex-col overflow-hidden rounded-2xl border bg-background shadow-sm transition-shadow hover:shadow-md">
      <div className="relative aspect-[4/3] bg-card">
        {image && !image.includes("placeholder-product.svg") ? <Image alt={product.name} className="object-cover" fill sizes="(min-width: 1280px) 25vw, (min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw" src={image} unoptimized /> : <div className="flex h-full items-center justify-center text-center text-sm text-muted-foreground"><div><Box aria-hidden="true" className="mx-auto size-10 text-primary" /><p className="mt-3">Product image unavailable</p></div></div>}
      </div>
      <div className="flex flex-1 flex-col p-5">
        <p className="text-xs font-semibold uppercase tracking-[0.12em] text-primary">{stockLabels[product.stockStatus]}</p>
        <h3 className="mt-3 text-lg font-bold leading-6"><Link className="focus-visible:rounded-sm" href={`/products/${product.slug}`}>{product.name}</Link></h3>
        <p className="mt-3 flex-1 text-sm leading-6 text-muted-foreground">{product.description}</p>
        <div className="mt-5 flex items-center justify-between gap-3 border-t pt-4">
          <p className="font-semibold text-foreground">{price}</p>
          <Link className="inline-flex items-center gap-1 text-sm font-semibold text-primary hover:text-blue-700" href={`/products/${product.slug}`}>View product <ArrowUpRight aria-hidden="true" className="size-4" /></Link>
        </div>
      </div>
    </article>
  );
}
