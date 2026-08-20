import { itemHandlers } from "@/lib/crud";
import { Blog } from "@/models";
import { slugify } from "@/lib/types";

export const dynamic = "force-dynamic";

export const { GET, PUT, DELETE } = itemHandlers({
  model: Blog,
  transform: (b: any) => ({
    ...b,
    slug: slugify(b.slug || b.title || ""),
    content: (b.content || []).filter((p: string) => p && p.trim()),
  }),
});
