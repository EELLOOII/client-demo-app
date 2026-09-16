import type { AdminInventoryRecord } from "@/types/admin";
export const ADMIN_INVENTORY: AdminInventoryRecord[] = [
  { id: "i1", name: "Hydraulic Pump HP-220", sku: "HP-220", category: "Hydraulics", currentStock: 12, reservedStock: 3, minimumStock: 5, lastUpdated: "Today, 9:20 AM" },
  { id: "i2", name: "Industrial Motor IM-750", sku: "IM-750", category: "Electric Motors", currentStock: 3, reservedStock: 1, minimumStock: 3, lastUpdated: "Today, 8:45 AM" },
  { id: "i3", name: "Diaphragm Pump DP-25", sku: "DP-25", category: "Pumps", currentStock: 0, reservedStock: 0, minimumStock: 2, lastUpdated: "Yesterday" },
  { id: "i4", name: "Safety Helmet SH-100", sku: "SH-100", category: "Safety", currentStock: 28, reservedStock: 6, minimumStock: 10, lastUpdated: "Yesterday" },
  { id: "i5", name: "Worm Gearbox WG-90", sku: "WG-90", category: "Gearboxes", currentStock: 9, reservedStock: 0, minimumStock: 4, lastUpdated: "Mar 14" },
];
