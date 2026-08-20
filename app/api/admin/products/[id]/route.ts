import { itemHandlers } from "@/lib/crud";
import { Product } from "@/models";
import { slugify } from "@/lib/types";

export const dynamic = "force-dynamic";

export const { GET, PUT, DELETE } = itemHandlers({
  model: Product,
  transform: (b: any) => {
    const images: string[] = (b.images || []).filter(Boolean);
    const image = b.image || images[0] || "";
    return {
      ...b,
      slug: slugify(b.slug || b.name || ""),
      image,
      images: images.length ? images : image ? [image] : [],
    };
  },
});
