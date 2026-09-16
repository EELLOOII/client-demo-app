import { Construction } from "lucide-react";

interface PagePlaceholderProps { eyebrow: string; title: string; description: string }

export function PagePlaceholder({ eyebrow, title, description }: PagePlaceholderProps) {
  return (
    <section className="mx-auto flex min-h-[55vh] max-w-7xl items-center px-4 py-16 sm:px-6 lg:px-8">
      <div className="max-w-2xl rounded-3xl border bg-card p-8 shadow-sm sm:p-12">
        <Construction aria-hidden="true" className="mb-5 size-8 text-primary" />
        <p className="text-sm font-semibold uppercase tracking-[0.16em] text-primary">{eyebrow}</p>
        <h1 className="mt-3 text-3xl font-bold tracking-tight sm:text-4xl">{title}</h1>
        <p className="mt-4 text-lg leading-8 text-muted-foreground">{description}</p>
      </div>
    </section>
  );
}
