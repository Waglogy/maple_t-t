"use client";

import { usePathname } from "next/navigation";

// Renders public site chrome (navbar, footer, chatbot) everywhere EXCEPT the
// admin panel, which has its own full-screen layout.
export function PublicOnly({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  if (pathname?.startsWith("/admin")) return null;
  return <>{children}</>;
}
