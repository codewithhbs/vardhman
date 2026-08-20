import { listHandlers } from "@/lib/crud";
import { Testimonial } from "@/models";

export const dynamic = "force-dynamic";

export const { GET, POST } = listHandlers({
  model: Testimonial,
  sort: { order: 1 },
  searchFields: ["name", "designation", "text"],
});
