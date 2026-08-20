import { itemHandlers } from "@/lib/crud";
import { Faq } from "@/models";

export const dynamic = "force-dynamic";

export const { GET, PUT, DELETE } = itemHandlers({ model: Faq });
