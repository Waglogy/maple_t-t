import type { Metadata } from "next";
import { buildMetadata, breadcrumbLd } from "@/lib/seo";
import { JsonLd } from "@/components/seo/json-ld";

export const metadata: Metadata = buildMetadata({
  title: "Reviews & Testimonials — Maple Leaf Tours Sikkim",
  description:
    "Read genuine reviews and testimonials from travellers who explored Sikkim and Gangtok with Maple Leaf Tours & Travels. See why we're a trusted Sikkim tour operator.",
  path: "/testimonials",
});

export default function TestimonialsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <JsonLd
        data={breadcrumbLd([
          { name: "Home", path: "/" },
          { name: "Testimonials", path: "/testimonials" },
        ])}
      />
      {children}
    </>
  );
}
