import type { Metadata } from "next";
import { buildMetadata } from "@/lib/seo";

// Private user page — not indexed.
export const metadata: Metadata = buildMetadata({
  title: "My Profile",
  path: "/profile",
  noindex: true,
});

export default function ProfileLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
