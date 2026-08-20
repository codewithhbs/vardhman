import { listHandlers } from "@/lib/crud";
import { Industry } from "@/models";
import { slugify } from "@/lib/types";

export const dynamic = "force-dynamic";

export const { GET, POST } = listHandlers({
  model: Industry,
  sort: { order: 1 },
  searchFields: ["name", "slug", "desc"],
  transform: (b: any) => ({ ...b, slug: slugify(b.slug || b.name || "") }),
});
