import { listHandlers } from "@/lib/crud";
import { Faq } from "@/models";

export const dynamic = "force-dynamic";

export const { GET, POST } = listHandlers({ model: Faq, sort: { order: 1 }, searchFields: ["q", "a"] });
