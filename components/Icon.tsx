import * as Lucide from "lucide-react";
import { LucideProps } from "lucide-react";

export default function Icon({ name, ...props }: { name: string } & LucideProps) {
  const Cmp = (Lucide as any)[name] || Lucide.Circle;
  return <Cmp {...props} />;
}
