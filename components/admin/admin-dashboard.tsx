"use client";

import { ClipboardList, FileText, Megaphone, Package, TriangleAlert } from "lucide-react";
import { useState } from "react";
import { Bar, BarChart, CartesianGrid, Legend, Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import { AdminStatusBadge } from "@/components/admin/admin-status-badge";
import { AdminTableEmpty, AdminTableError, AdminTableLoading } from "@/components/admin/admin-table";
import { Button } from "@/components/ui/button";
import { DASHBOARD_ACTIVITY_SERIES, DASHBOARD_METRICS, DASHBOARD_NOTIFICATIONS, DASHBOARD_RECENT_ACTIVITIES, DASHBOARD_STOCK_OVERVIEW } from "@/mock/admin-dashboard";
import type { DashboardMetricId, DashboardNotification } from "@/types/admin";

type DashboardView = "data" | "empty" | "error" | "loading";

const METRIC_ICONS: Record<DashboardMetricId, typeof Package> = { "total-products": Package, "low-stock-products": TriangleAlert, "pending-quotations": FileText, "open-inquiries": ClipboardList, "active-promotions": Megaphone };

function DashboardMetricCards() {
  return <section aria-label="Dashboard summary" className="grid gap-4 sm:grid-cols-2 xl:grid-cols-5">{DASHBOARD_METRICS.map((metric) => { const Icon = METRIC_ICONS[metric.id]; return <article className="rounded-2xl border bg-background p-5 shadow-sm" key={metric.id}><Icon aria-hidden="true" className="size-5 text-primary" /><p className="mt-5 text-2xl font-bold">{metric.value}</p><h2 className="mt-1 text-sm font-semibold">{metric.label}</h2><p className="mt-1 text-sm text-muted-foreground">{metric.context}</p></article>; })}</section>;
}

function DashboardCharts() {
  const stockSummary = DASHBOARD_STOCK_OVERVIEW.map(({ count, label }) => `${label}: ${count}`).join(", ");
  const activitySummary = DASHBOARD_ACTIVITY_SERIES.map(({ inquiries, label, quotations }) => `${label}: ${inquiries} inquiries and ${quotations} quotations`).join(". ");
  return <section aria-label="Dashboard charts" className="mt-8 grid gap-6 xl:grid-cols-2"><article className="rounded-2xl border bg-background p-5 shadow-sm sm:p-6"><div><h2 className="text-lg font-bold">Inventory overview</h2><p className="mt-1 text-sm text-muted-foreground">Current prototype stock distribution.</p></div><p className="sr-only">{stockSummary}</p><div aria-label={`Inventory overview. ${stockSummary}`} className="mt-6 h-72" role="img"><ResponsiveContainer height="100%" width="100%"><BarChart data={DASHBOARD_STOCK_OVERVIEW} margin={{ top: 8, right: 8, left: -20, bottom: 0 }}><CartesianGrid strokeDasharray="3 3" vertical={false} /><XAxis dataKey="label" tick={{ fontSize: 12 }} /><YAxis allowDecimals={false} tick={{ fontSize: 12 }} /><Tooltip /><Bar dataKey="count" fill="#1769d1" name="Products" radius={[6, 6, 0, 0]} /></BarChart></ResponsiveContainer></div></article><article className="rounded-2xl border bg-background p-5 shadow-sm sm:p-6"><div><h2 className="text-lg font-bold">Inquiry and quotation activity</h2><p className="mt-1 text-sm text-muted-foreground">Recent prototype activity over six days.</p></div><p className="sr-only">{activitySummary}</p><div aria-label={`Inquiry and quotation activity. ${activitySummary}`} className="mt-6 h-72" role="img"><ResponsiveContainer height="100%" width="100%"><LineChart data={DASHBOARD_ACTIVITY_SERIES} margin={{ top: 8, right: 8, left: -20, bottom: 0 }}><CartesianGrid strokeDasharray="3 3" vertical={false} /><XAxis dataKey="label" tick={{ fontSize: 12 }} /><YAxis allowDecimals={false} tick={{ fontSize: 12 }} /><Tooltip /><Legend /><Line dataKey="inquiries" name="Inquiries" stroke="#1769d1" strokeWidth={2} type="monotone" /><Line dataKey="quotations" name="Quotations" stroke="#c2410c" strokeWidth={2} type="monotone" /></LineChart></ResponsiveContainer></div></article></section>;
}

function RecentActivity() {
  return <section aria-labelledby="recent-activity-title" className="rounded-2xl border bg-background p-5 shadow-sm sm:p-6"><div><h2 className="text-lg font-bold" id="recent-activity-title">Recent activity</h2><p className="mt-1 text-sm text-muted-foreground">Presentation-only administrative events.</p></div><ol className="mt-6 space-y-4">{DASHBOARD_RECENT_ACTIVITIES.map((activity) => <li className="flex gap-3" key={activity.id}><span aria-hidden="true" className="mt-2 size-2 shrink-0 rounded-full bg-primary" /><div className="min-w-0 flex-1"><p className="text-sm font-medium">{activity.description}</p><div className="mt-2 flex flex-wrap items-center gap-2"><span className="text-xs text-muted-foreground">{activity.module} · {activity.timestamp}</span><AdminStatusBadge status={activity.status} /></div></div></li>)}</ol></section>;
}

function Notifications() {
  const [notifications, setNotifications] = useState<DashboardNotification[]>(DASHBOARD_NOTIFICATIONS);
  const unreadCount = notifications.filter((notification) => !notification.isRead).length;
  return <section aria-labelledby="notifications-title" className="rounded-2xl border bg-background p-5 shadow-sm sm:p-6"><div className="flex flex-wrap items-start justify-between gap-3"><div><h2 className="text-lg font-bold" id="notifications-title">Notifications</h2><p className="mt-1 text-sm text-muted-foreground">{unreadCount ? `${unreadCount} unread prototype alert${unreadCount === 1 ? "" : "s"}.` : "All prototype alerts are read."}</p></div>{unreadCount ? <Button onClick={() => setNotifications((current) => current.map((notification) => ({ ...notification, isRead: true })))} size="sm" variant="outline">Mark all read</Button> : null}</div>{notifications.length ? <ul className="mt-6 space-y-3">{notifications.map((notification) => <li className={notification.isRead ? "rounded-xl border p-4" : "rounded-xl border border-primary/30 bg-blue-50 p-4"} key={notification.id}><div className="flex flex-wrap items-start justify-between gap-3"><div><p className="text-sm font-semibold">{notification.title}</p><p className="mt-1 text-sm leading-6 text-muted-foreground">{notification.description}</p></div><AdminStatusBadge status={notification.status} /></div><p className="mt-3 text-xs font-medium text-muted-foreground">{notification.isRead ? "Read" : "Unread"}</p></li>)}</ul> : <div className="mt-6"><AdminTableEmpty description="There are no prototype notifications to display." title="No notifications" /></div>}</section>;
}

function DashboardContent() {
  return <><DashboardMetricCards /><DashboardCharts /><section className="mt-8 grid gap-6 xl:grid-cols-2"><RecentActivity /><Notifications /></section></>;
}

export function AdminDashboard() {
  const [view, setView] = useState<DashboardView>("data");
  const viewLabels: DashboardView[] = ["data", "loading", "empty", "error"];
  return <><div aria-label="Dashboard state preview" className="mt-6 flex flex-wrap gap-2"><span className="self-center text-sm text-muted-foreground">Prototype state:</span>{viewLabels.map((item) => <Button aria-pressed={view === item} key={item} onClick={() => setView(item)} size="sm" variant={view === item ? "default" : "outline"}>{item[0].toUpperCase() + item.slice(1)}</Button>)}</div><div className="mt-6">{view === "data" ? <DashboardContent /> : null}{view === "loading" ? <AdminTableLoading label="Loading dashboard information" /> : null}{view === "empty" ? <AdminTableEmpty description="This presentation state is available when a dashboard has no activity or notification data." title="No dashboard data" /> : null}{view === "error" ? <AdminTableError description="This local retry returns to the prototype dashboard and does not make a request." onRetry={() => setView("data")} /> : null}</div></>;
}
