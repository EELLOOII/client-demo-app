import type { AdminNewsArticle } from "@/types/admin";

export const ADMIN_NEWS: AdminNewsArticle[] = [
  {
    author: "Mara Cruz",
    content:
      "KQ Emporium is preparing a curated selection of modular storage, workspace organizers, and home utility items for the holiday shopping period.",
    id: "NEWS-2026-001",
    isFeatured: true,
    lastUpdated: "Aug 25, 2026",
    publishedAt: "2026-08-20",
    slug: "holiday-home-essentials-preview",
    status: "published",
    summary: "A preview of upcoming holiday-ready home essentials and giftable utility products.",
    title: "Holiday home essentials preview",
  },
  {
    author: "Leo Santos",
    content:
      "The warehouse team is preparing updated product-care notes that will help customers compare finishes, sizes, and maintenance guidance before purchasing.",
    id: "NEWS-2026-002",
    isFeatured: false,
    lastUpdated: "Aug 27, 2026",
    publishedAt: "2026-09-10",
    slug: "product-care-guide-update",
    status: "scheduled",
    summary: "New product-care guidance is queued for publication next month.",
    title: "Product-care guide update",
  },
  {
    author: "Mara Cruz",
    content:
      "A short draft announcing improved showroom appointment coordination for customers who want to inspect selected products before ordering.",
    id: "NEWS-2026-003",
    isFeatured: false,
    lastUpdated: "Aug 28, 2026",
    publishedAt: "",
    slug: "showroom-appointment-draft",
    status: "draft",
    summary: "Draft copy for a showroom appointment announcement.",
    title: "Showroom appointment announcement",
  },
  {
    author: "Nina Reyes",
    content:
      "This archived article covered a previous limited assortment update and remains visible for administrative review in the local prototype.",
    id: "NEWS-2026-004",
    isFeatured: false,
    lastUpdated: "Jul 18, 2026",
    publishedAt: "2026-07-01",
    slug: "midyear-assortment-update",
    status: "archived",
    summary: "Archived midyear assortment announcement.",
    title: "Midyear assortment update",
  },
];
