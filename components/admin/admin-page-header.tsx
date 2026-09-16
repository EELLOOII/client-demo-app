interface AdminPageHeaderProps {
  description: string;
  eyebrow?: string;
  title: string;
}

export function AdminPageHeader({ description, eyebrow = "Admin portal", title }: AdminPageHeaderProps) {
  return <div><p className="text-sm font-semibold uppercase tracking-[0.14em] text-primary">{eyebrow}</p><h1 className="mt-2 text-3xl font-bold tracking-tight">{title}</h1><p className="mt-2 max-w-2xl text-muted-foreground">{description}</p></div>;
}
