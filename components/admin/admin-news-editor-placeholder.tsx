import type { ChangeEvent } from "react";

type AdminNewsEditorPlaceholderProps = {
  error?: string;
  onChange: (value: string) => void;
  value: string;
};

const TOOLBAR_ITEMS = ["Bold", "Italic", "Heading", "List", "Link"];

export function AdminNewsEditorPlaceholder({ error, onChange, value }: AdminNewsEditorPlaceholderProps) {
  return (
    <div>
      <div aria-label="Prototype rich-text toolbar" className="flex flex-wrap gap-2 rounded-t-xl border border-b-0 p-2">
        {TOOLBAR_ITEMS.map((item) => (
          <button
            aria-label={`${item} formatting unavailable in this prototype`}
            className="rounded-lg border px-3 py-1 text-xs text-muted-foreground"
            disabled
            key={item}
            type="button"
          >
            {item}
          </button>
        ))}
      </div>
      <textarea
        aria-describedby={error ? "news-content-error" : undefined}
        aria-invalid={error ? "true" : "false"}
        aria-label="Article content"
        className="min-h-40 w-full rounded-b-xl border bg-background p-3 text-sm"
        onChange={(event: ChangeEvent<HTMLTextAreaElement>) => onChange(event.target.value)}
        placeholder="Write article content as plain text for this frontend prototype."
        value={value}
      />
      {error ? (
        <span className="mt-1 block text-xs font-normal text-destructive" id="news-content-error">
          {error}
        </span>
      ) : null}
    </div>
  );
}
