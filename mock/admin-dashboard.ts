import type { DashboardActivityPoint, DashboardMetric, DashboardNotification, DashboardRecentActivity, DashboardStockItem } from "@/types/admin";

export const DASHBOARD_METRICS: DashboardMetric[] = [
  { id: "total-products", label: "Total products", value: 50, context: "Across 20 categories" },
  { id: "low-stock-products", label: "Low stock products", value: 6, context: "Requires attention" },
  { id: "pending-quotations", label: "Pending quotations", value: 15, context: "Awaiting follow-up" },
  { id: "open-inquiries", label: "Open inquiries", value: 30, context: "Customer requests to review" },
  { id: "active-promotions", label: "Active promotions", value: 5, context: "Currently scheduled" },
];

export const DASHBOARD_STOCK_OVERVIEW: DashboardStockItem[] = [
  { label: "In stock", count: 40 },
  { label: "Low stock", count: 6 },
  { label: "Out of stock", count: 4 },
];

export const DASHBOARD_ACTIVITY_SERIES: DashboardActivityPoint[] = [
  { label: "Mar 10", inquiries: 4, quotations: 2 }, { label: "Mar 11", inquiries: 7, quotations: 3 }, { label: "Mar 12", inquiries: 5, quotations: 2 }, { label: "Mar 13", inquiries: 8, quotations: 4 }, { label: "Mar 14", inquiries: 6, quotations: 3 }, { label: "Mar 15", inquiries: 9, quotations: 5 },
];

export const DASHBOARD_RECENT_ACTIVITIES: DashboardRecentActivity[] = [
  { id: "activity-1", description: "New quotation request received for hydraulic pumps.", module: "Quotations", timestamp: "12 minutes ago", status: "pending" },
  { id: "activity-2", description: "Industrial Motor IM-750 stock was updated.", module: "Inventory", timestamp: "38 minutes ago", status: "low-stock" },
  { id: "activity-3", description: "March maintenance offer was scheduled.", module: "Promotions", timestamp: "1 hour ago", status: "active" },
  { id: "activity-4", description: "New company news article was published.", module: "News", timestamp: "3 hours ago", status: "published" },
];

export const DASHBOARD_NOTIFICATIONS: DashboardNotification[] = [
  { id: "notification-1", title: "Low stock alert", description: "6 products are at or below their prototype stock threshold.", status: "low-stock", isRead: false },
  { id: "notification-2", title: "New inquiries", description: "3 customer inquiries are awaiting a first response.", status: "pending", isRead: false },
  { id: "notification-3", title: "Promotion reminder", description: "One active promotion is scheduled to end this week.", status: "active", isRead: true },
];
