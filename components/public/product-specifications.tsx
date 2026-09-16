import type { ProductSpecification } from "@/types";

interface ProductSpecificationsProps {
  specifications: ProductSpecification[];
}

export function ProductSpecifications({ specifications }: ProductSpecificationsProps) {
  const validSpecifications = specifications.filter((specification) => specification.label.trim() && specification.value.trim());

  if (validSpecifications.length === 0) {
    return <p className="text-sm leading-6 text-muted-foreground">Specifications are currently unavailable.</p>;
  }

  return (
    <dl className="divide-y overflow-hidden rounded-2xl border bg-card">
      {validSpecifications.map((specification) => (
        <div className="grid gap-1 px-5 py-4 sm:grid-cols-3 sm:gap-6" key={`${specification.label}-${specification.value}`}>
          <dt className="text-sm font-semibold text-foreground">{specification.label}</dt>
          <dd className="text-sm leading-6 text-muted-foreground sm:col-span-2">{specification.value}</dd>
        </div>
      ))}
    </dl>
  );
}
