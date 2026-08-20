import { listHandlers } from "@/lib/crud";
import { Blog } from "@/models";
import { slugify } from "@/lib/types";

export const dynamic = "force-dynamic";

const transform = (b: any) => ({
  ...b,
  slug: slugify(b.slug || b.title || ""),
  content: (b.content || []).filter((p: string) => p && p.trim()),
});

export const { GET, POST } = listHandlers({
  model: Blog,
  sort: { order: 1, date: -1 },
  searchFields: ["title", "slug", "category", "excerpt"],
  transform,
});
