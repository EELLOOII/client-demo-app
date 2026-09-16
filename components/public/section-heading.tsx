import { cn } from "@/lib/utils";

interface SectionHeadingProps {
  eyebrow?: string;
  title: string;
  titleId?: string;
  headingLevel?: 1 | 2;
  description?: string;
  action?: React.ReactNode;
  className?: string;
}

export function SectionHeading({ eyebrow, title, titleId, headingLevel = 2, description, action, className }: SectionHeadingProps) {
  const Heading = headingLevel === 1 ? "h1" : "h2";

  return (
    <div className={cn("flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between", className)}>
      <div className="max-w-2xl">
        {eyebrow ? <p className="text-sm font-semibold uppercase tracking-[0.14em] text-primary">{eyebrow}</p> : null}
        <Heading id={titleId} className="mt-3 text-3xl font-bold tracking-tight text-foreground sm:text-4xl">{title}</Heading>
        {description ? <p className="mt-4 text-base leading-7 text-muted-foreground">{description}</p> : null}
      </div>
      {action ? <div className="shrink-0">{action}</div> : null}
    </div>
  );
}
