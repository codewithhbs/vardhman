import { itemHandlers } from "@/lib/crud";
import { Industry } from "@/models";
import { slugify } from "@/lib/types";

export const dynamic = "force-dynamic";

export const { GET, PUT, DELETE } = itemHandlers({
  model: Industry,
  transform: (b: any) => ({ ...b, slug: slugify(b.slug || b.name || "") }),
});
