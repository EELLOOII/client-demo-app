import type { Product } from "@/types";

interface ProductAvailabilityProps {
  stockStatus: Product["stockStatus"];
}

const availability: Record<Product["stockStatus"], { label: string; className: string }> = {
  "in-stock": { label: "Available", className: "bg-green-100 text-green-800" },
  "low-stock": { label: "Limited availability", className: "bg-orange-100 text-orange-800" },
  "out-of-stock": { label: "Availability on request", className: "bg-slate-100 text-slate-700" },
};

export function ProductAvailability({ stockStatus }: ProductAvailabilityProps) {
  const status = availability[stockStatus];

  return <p className={`inline-flex rounded-full px-3 py-1 text-sm font-semibold ${status.className}`}>{status.label}</p>;
}
