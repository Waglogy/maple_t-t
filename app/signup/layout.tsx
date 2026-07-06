import type { Metadata } from "next";
import { buildMetadata } from "@/lib/seo";

// Auth page — not indexed.
export const metadata: Metadata = buildMetadata({
  title: "Sign Up",
  path: "/signup",
  noindex: true,
});

export default function SignupLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
