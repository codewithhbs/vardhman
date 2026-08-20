import { listHandlers } from "@/lib/crud";
import { Product } from "@/models";
import { slugify } from "@/lib/types";

export const dynamic = "force-dynamic";

const transform = (b: any) => {
  const images: string[] = (b.images || []).filter(Boolean);
  const image = b.image || images[0] || "";
  return {
    ...b,
    slug: slugify(b.slug || b.name || ""),
    image,
    images: images.length ? images : image ? [image] : [],
  };
};

export const { GET, POST } = listHandlers({
  model: Product,
  sort: { order: 1, name: 1 },
  searchFields: ["name", "slug", "blurb", "category"],
  transform,
});
