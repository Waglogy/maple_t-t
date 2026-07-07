import type { Metadata } from "next";

// Keep the whole admin area out of search indexes.
export const metadata: Metadata = {
  title: "Admin | Maple Leaf Tours",
  robots: { index: false, follow: false },
};

export default function AdminRootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
