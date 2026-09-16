export type AdminStatus =
  | "active"
  | "inactive"
  | "suspended"
  | "pending"
  | "approved"
  | "rejected"
  | "sent"
  | "new"
  | "open"
  | "in-progress"
  | "resolved"
  | "closed"
  | "draft"
  | "scheduled"
  | "published"
  | "archived"
  | "expired"
  | "in-stock"
  | "low-stock"
  | "out-of-stock";

export type AdminProductStatus = "active" | "inactive" | "draft";
export type AdminStockStatus = "in-stock" | "low-stock" | "out-of-stock";

export interface AdminProduct {
  category: string;
  currentStock: number;
  description: string;
  id: string;
  image: string;
  images?: string[];
  minimumStock: number;
  name: string;
  price: number;
  sku: string;
  specifications: { label: string; value: string }[];
  status: AdminProductStatus;
}

export interface AdminInventoryRecord {
  id: string;
  name: string;
  sku: string;
  category: string;
  currentStock: number;
  reservedStock: number;
  minimumStock: number;
  lastUpdated: string;
}
export type AdminQuotationStatus = "pending" | "approved" | "rejected" | "sent";
export interface AdminQuotation {
  id: string;
  customer: string;
  email: string;
  company: string;
  phone: string;
  date: string;
  status: AdminQuotationStatus;
  assigned: string;
  note: string;
  items: { name: string; sku: string; quantity: number; unitPrice: number }[];
}
export type AdminInquiryType =
  | "Product Inquiry"
  | "Pricing Inquiry"
  | "Availability Inquiry"
  | "General Inquiry";
export type AdminInquiryStatus =
  | "new"
  | "open"
  | "in-progress"
  | "resolved"
  | "closed";
export interface AdminInquiry {
  id: string;
  customerName: string;
  company: string;
  email: string;
  phone: string;
  subject: string;
  type: AdminInquiryType;
  received: string;
  status: AdminInquiryStatus;
  assigned: string;
  message: string;
  isRead: boolean;
}
export type AdminPromotionStatus =
  | "draft"
  | "scheduled"
  | "active"
  | "expired"
  | "archived";
export type AdminPromotionType =
  | "Banner"
  | "Product Promotion"
  | "Seasonal Campaign"
  | "Announcement";
export interface AdminPromotion {
  id: string;
  title: string;
  type: AdminPromotionType;
  description: string;
  startDate: string;
  endDate: string;
  status: AdminPromotionStatus;
  cta: string;
  destination: string;
  lastUpdated: string;
}
export type AdminNewsStatus = "draft" | "scheduled" | "published" | "archived";
export interface AdminNewsArticle {
  id: string;
  title: string;
  slug: string;
  author: string;
  summary: string;
  content: string;
  status: AdminNewsStatus;
  publishedAt: string;
  lastUpdated: string;
  isFeatured: boolean;
}
export type AdminUserRole = "Admin" | "Sales" | "Inventory" | "Marketing";
export type AdminUserStatus = "active" | "inactive" | "suspended";
export interface AdminUser {
  id: string;
  fullName: string;
  email: string;
  username: string;
  role: AdminUserRole;
  status: AdminUserStatus;
  department: string;
  lastActive: string;
  createdAt: string;
}

export type DashboardMetricId =
  | "total-products"
  | "low-stock-products"
  | "pending-quotations"
  | "open-inquiries"
  | "active-promotions";

export interface DashboardMetric {
  context: string;
  id: DashboardMetricId;
  label: string;
  value: number;
}

export interface DashboardStockItem {
  count: number;
  label: "In stock" | "Low stock" | "Out of stock";
}

export interface DashboardActivityPoint {
  inquiries: number;
  label: string;
  quotations: number;
}

export interface DashboardRecentActivity {
  description: string;
  id: string;
  module: string;
  status: AdminStatus;
  timestamp: string;
}

export interface DashboardNotification {
  description: string;
  id: string;
  isRead: boolean;
  status: AdminStatus;
  title: string;
}
