import type { Metadata } from "next";
import { buildMetadata, breadcrumbLd, SITE } from "@/lib/seo";
import { JsonLd } from "@/components/seo/json-ld";

export const metadata: Metadata = buildMetadata({
  title: "Contact Maple Leaf Tours — Gangtok, Sikkim",
  description:
    "Contact Maple Leaf Tours & Travels in Tadong, Gangtok, Sikkim. Call +91 70018 95132 or email us to plan your Sikkim tour, get a custom quote or book Gangtok & North Sikkim packages.",
  path: "/contact",
});

const contactPageLd = {
  "@context": "https://schema.org",
  "@type": "ContactPage",
  name: "Contact Maple Leaf Tours & Travels",
  url: `${SITE.url}/contact`,
  mainEntity: { "@id": `${SITE.url}/#organization` },
};

export default function ContactLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <JsonLd
        data={[
          contactPageLd,
          breadcrumbLd([
            { name: "Home", path: "/" },
            { name: "Contact", path: "/contact" },
          ]),
        ]}
      />
      {children}
    </>
  );
}
