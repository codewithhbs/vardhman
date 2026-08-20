import { listHandlers } from "@/lib/crud";
import { Category } from "@/models";
import { slugify } from "@/lib/types";

export const dynamic = "force-dynamic";

const transform = (b: any) => ({ ...b, slug: slugify(b.slug || b.name || "") });

export const { GET, POST } = listHandlers({
  model: Category,
  sort: { order: 1, name: 1 },
  searchFields: ["name", "slug", "tagline"],
  transform,
});
