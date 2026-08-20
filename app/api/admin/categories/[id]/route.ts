import { itemHandlers } from "@/lib/crud";
import { Category } from "@/models";
import { slugify } from "@/lib/types";

export const dynamic = "force-dynamic";

export const { GET, PUT, DELETE } = itemHandlers({
  model: Category,
  transform: (b: any) => ({ ...b, slug: slugify(b.slug || b.name || "") }),
});
