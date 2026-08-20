import { itemHandlers } from "@/lib/crud";
import { Enquiry } from "@/models";

export const dynamic = "force-dynamic";

export const { GET, PUT, DELETE } = itemHandlers({ model: Enquiry });
