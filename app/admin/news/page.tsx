import { AdminNewsManager } from "@/components/admin/admin-news-manager";
import { AdminPageHeader } from "@/components/admin/admin-page-header";

export default function AdminNewsPage() {
  return (
    <>
      <AdminPageHeader
        description="Manage local article drafts, publication dates, featured state, and CMS placeholders."
        eyebrow="News"
        title="News manager"
      />
      <AdminNewsManager />
    </>
  );
}
