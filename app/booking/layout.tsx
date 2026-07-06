import type { Metadata } from "next";
import { buildMetadata } from "@/lib/seo";

// Transactional flow — should not be indexed. Applies to /booking and all
// nested routes (success, [id]/payment).
export const metadata: Metadata = buildMetadata({
  title: "Booking",
  path: "/booking",
  noindex: true,
});

export default function BookingLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
