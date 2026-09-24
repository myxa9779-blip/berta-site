import { RichText } from "@payloadcms/richtext-lexical/react";
import type { Page } from "@/payload-types";

export function CMSRichText({ data }: { data: NonNullable<Page["body"]> }) {
  return (
    <div className="cms-richtext max-w-none text-steel">
      <RichText data={data} />
    </div>
  );
}
