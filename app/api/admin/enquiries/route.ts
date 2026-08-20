import { listHandlers } from "@/lib/crud";
import { Enquiry } from "@/models";

export const dynamic = "force-dynamic";

export const { GET, POST } = listHandlers({
  model: Enquiry,
  sort: { createdAt: -1 },
  searchFields: ["name", "email", "phone", "product", "message", "company"],
});
