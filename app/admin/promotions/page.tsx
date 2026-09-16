import { AdminPageHeader } from "@/components/admin/admin-page-header"; import { AdminPromotionManager } from "@/components/admin/admin-promotion-manager";
export default function AdminPromotionsPage(){return <><AdminPageHeader eyebrow="Promotions" title="Promotion manager" description="Manage local promotion metadata, schedules, and presentation placeholders."/><AdminPromotionManager/></>}
