import { AdminNewsImagePlaceholder } from "@/components/admin/admin-news-image-placeholder";
import { AdminStatusBadge } from "@/components/admin/admin-status-badge";
import type { AdminNewsArticle } from "@/types/admin";

type AdminNewsDetailProps = {
  article: AdminNewsArticle;
};

export function AdminNewsDetail({ article }: AdminNewsDetailProps) {
  return (
    <div className="grid gap-4 text-sm">
      <div>
        <h2 className="text-lg font-semibold text-foreground">{article.title}</h2>
        <p className="text-muted-foreground">{article.slug}</p>
      </div>

      <AdminNewsImagePlaceholder />

      <dl className="grid gap-3 sm:grid-cols-2">
        <div>
          <dt className="text-xs font-medium uppercase text-muted-foreground">Reference</dt>
          <dd>{article.id}</dd>
        </div>
        <div>
          <dt className="text-xs font-medium uppercase text-muted-foreground">Author</dt>
          <dd>{article.author}</dd>
        </div>
        <div>
          <dt className="text-xs font-medium uppercase text-muted-foreground">Publication date</dt>
          <dd>{article.publishedAt || "Not scheduled"}</dd>
        </div>
        <div>
          <dt className="text-xs font-medium uppercase text-muted-foreground">Last updated</dt>
          <dd>{article.lastUpdated}</dd>
        </div>
        <div>
          <dt className="text-xs font-medium uppercase text-muted-foreground">Status</dt>
          <dd>
            <AdminStatusBadge status={article.status} />
          </dd>
        </div>
        <div>
          <dt className="text-xs font-medium uppercase text-muted-foreground">Featured</dt>
          <dd>{article.isFeatured ? "Featured article" : "Not featured"}</dd>
        </div>
      </dl>

      <div>
        <h3 className="text-sm font-medium text-foreground">Summary</h3>
        <p className="mt-1 text-muted-foreground">{article.summary}</p>
      </div>

      <div>
        <h3 className="text-sm font-medium text-foreground">Article content</h3>
        <p className="mt-1 leading-7 text-muted-foreground">{article.content}</p>
      </div>
    </div>
  );
}
