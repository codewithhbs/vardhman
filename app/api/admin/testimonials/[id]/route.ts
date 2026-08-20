import { itemHandlers } from "@/lib/crud";
import { Testimonial } from "@/models";

export const dynamic = "force-dynamic";

export const { GET, PUT, DELETE } = itemHandlers({ model: Testimonial });
