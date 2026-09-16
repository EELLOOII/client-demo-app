import Link from "next/link";
import { PublicContainer } from "@/components/public/public-container";

export function PublicFooter() {
  return (
    <footer className="border-t bg-card">
      <PublicContainer className="grid gap-10 py-12 md:grid-cols-2 lg:grid-cols-[2fr_1fr_1fr]">
        <div><p className="text-lg font-bold tracking-tight text-foreground">DEMO<span className="text-primary"> SYSTEM</span></p><p className="mt-4 max-w-sm text-sm leading-6 text-muted-foreground">Industrial product, company profile, and contact details are placeholder content for prototype review.</p></div>
        <div><h2 className="text-sm font-semibold text-foreground">Explore</h2><ul className="mt-4 space-y-3 text-sm text-muted-foreground"><li><Link className="hover:text-foreground" href="/products">Products</Link></li><li><Link className="hover:text-foreground" href="/promotions">Promotions</Link></li><li><Link className="hover:text-foreground" href="/news">News</Link></li></ul></div>
        <div><h2 className="text-sm font-semibold text-foreground">Get in touch</h2><ul className="mt-4 space-y-3 text-sm text-muted-foreground"><li><Link className="hover:text-foreground" href="/contact">Contact placeholder</Link></li><li><Link className="hover:text-foreground" href="/request-quotation">Request a quote</Link></li><li><Link className="hover:text-foreground" href="/admin/login">Admin</Link></li></ul></div>
      </PublicContainer>
      <div className="border-t"><PublicContainer className="py-5 text-sm text-muted-foreground">© {new Date().getFullYear()} DEMO System. Client-provided details pending.</PublicContainer></div>
    </footer>
  );
}
