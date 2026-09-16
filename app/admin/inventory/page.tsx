import { AdminInventoryManager } from "@/components/admin/admin-inventory-manager";
import { AdminPageHeader } from "@/components/admin/admin-page-header";
export default function InventoryPage() { return <><AdminPageHeader description="Monitor local prototype stock, reservations, availability, and minimum thresholds." eyebrow="Inventory" title="Inventory overview" /><AdminInventoryManager /></>; }
