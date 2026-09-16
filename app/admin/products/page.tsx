import { AdminPageHeader } from "@/components/admin/admin-page-header";
import { AdminProductManager } from "@/components/admin/admin-product-manager";
export default function AdminProductsPage() { return <><AdminPageHeader description="Manage a local, presentation-only product catalog. Changes last only for this browser session." eyebrow="Products" title="Product management" /><AdminProductManager /></>; }
