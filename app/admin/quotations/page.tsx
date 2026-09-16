import { AdminPageHeader } from "@/components/admin/admin-page-header"; import { AdminQuotationManager } from "@/components/admin/admin-quotation-manager";
export default function QuotationsPage(){return <><AdminPageHeader eyebrow="Quotations" title="Quotation management" description="Local prototype requests, totals, status, and PDF workflow preview."/><AdminQuotationManager/></>}
