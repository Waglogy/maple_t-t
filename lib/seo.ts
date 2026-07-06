import type { Metadata } from "next";

/**
 * Central SEO configuration for Maple Leaf Tours & Travels.
 *
 * Everything SEO-related (metadata, sitemap, robots, JSON-LD structured data)
 * reads from this single file. If the domain, phone, address, or social links
 * change, update them here once.
 */

export const SITE = {
  url: "https://www.mapleleaftourstravels.com",
  name: "Maple Leaf Tours & Travels",
  shortName: "Maple Leaf Tours",
  // Used as the home-page title and the OpenGraph site name.
  defaultTitle:
    "Maple Leaf Tours & Travels — Sikkim & Gangtok Tour Packages",
  titleTemplate: "%s | Maple Leaf Tours & Travels",
  description:
    "Maple Leaf Tours & Travels is a trusted tour operator in Gangtok, Sikkim. Book customised North & South Sikkim tour packages, Gangtok sightseeing, Lachung, Lachen, Gurudongmar & Tsomgo Lake trips with reliable cabs and expert local guides.",
  // Location-focused keywords the client wants to rank for.
  keywords: [
    "Maple Tours and Travels",
    "Maple Leaf Tours",
    "Maple Tours Gangtok",
    "Maple Tours Sikkim",
    "Sikkim tour packages",
    "Gangtok tour packages",
    "Sikkim travel agency",
    "Gangtok travel agency",
    "Sikkim tour operator",
    "North Sikkim tour package",
    "Gangtok sightseeing",
    "Sikkim honeymoon packages",
    "Lachung Lachen tour",
    "Gurudongmar Lake tour",
    "Tsomgo Lake Baba Mandir tour",
  ],
  phone: "+917001895132",
  phoneDisplay: "+91 70018 95132",
  email: "Travelwithmaple2023@gmail.com",
  address: {
    street: "Maple Building, Behind S-Mart Departmental Store, Near Krishi Bhawan, Tadong",
    locality: "Gangtok",
    region: "Sikkim",
    postalCode: "737102",
    country: "IN",
  },
  // Approximate coordinates for Tadong, Gangtok. Refine to match your
  // verified Google Business Profile pin for best local-map accuracy.
  geo: { lat: 27.3152, lng: 88.6108 },
  // Default social-share image (1200x630 recommended). Replace `/1.png`
  // with a dedicated branded OG image when you have one.
  ogImage: "/1.png",
  // Public social / listing URLs. Fill these in — they strengthen the
  // "same entity" signal for Google. Include your Google Business Profile
  // "share" URL, Facebook, Instagram, etc.
  sameAs: [] as string[],
  locale: "en_IN",
} as const;

type BuildMetadataArgs = {
  title?: string;
  description?: string;
  /** Path beginning with "/" — used for the canonical URL. */
  path?: string;
  /** Absolute or root-relative image path. Defaults to SITE.ogImage. */
  image?: string;
  /** Set true for pages that must not be indexed (auth, checkout, profile). */
  noindex?: boolean;
  keywords?: string[];
};

/**
 * Build a complete, canonical-aware Metadata object for any page.
 * Server components: `export const metadata = buildMetadata({...})`.
 * Client pages: create a sibling `layout.tsx` server component that exports it.
 */
export function buildMetadata({
  title,
  description = SITE.description,
  path = "/",
  image = SITE.ogImage,
  noindex = false,
  keywords,
}: BuildMetadataArgs = {}): Metadata {
  const canonical = path;
  const ogImageUrl = image.startsWith("http") ? image : `${SITE.url}${image}`;

  return {
    // Omit `title` entirely when absent so a spread never clobbers a
    // parent's title.template (used by the root layout for the home page).
    ...(title ? { title } : {}),
    description,
    keywords: keywords ?? [...SITE.keywords],
    alternates: { canonical },
    robots: noindex
      ? { index: false, follow: false, nocache: true }
      : {
          index: true,
          follow: true,
          googleBot: {
            index: true,
            follow: true,
            "max-image-preview": "large",
            "max-snippet": -1,
            "max-video-preview": -1,
          },
        },
    openGraph: {
      type: "website",
      siteName: SITE.name,
      title: title ? `${title} | ${SITE.name}` : SITE.defaultTitle,
      description,
      url: `${SITE.url}${path}`,
      locale: SITE.locale,
      images: [{ url: ogImageUrl, width: 1200, height: 630, alt: SITE.name }],
    },
    twitter: {
      card: "summary_large_image",
      title: title ? `${title} | ${SITE.name}` : SITE.defaultTitle,
      description,
      images: [ogImageUrl],
    },
  };
}

/* ------------------------------------------------------------------ *
 *  JSON-LD structured data builders
 * ------------------------------------------------------------------ */

/** TravelAgency + LocalBusiness schema — the key signal for local ranking. */
export function travelAgencyLd() {
  return {
    "@context": "https://schema.org",
    "@type": ["TravelAgency", "LocalBusiness"],
    "@id": `${SITE.url}/#organization`,
    name: SITE.name,
    alternateName: SITE.shortName,
    url: SITE.url,
    logo: `${SITE.url}/logo2.png`,
    image: `${SITE.url}${SITE.ogImage}`,
    description: SITE.description,
    telephone: SITE.phone,
    email: SITE.email,
    priceRange: "₹₹",
    address: {
      "@type": "PostalAddress",
      streetAddress: SITE.address.street,
      addressLocality: SITE.address.locality,
      addressRegion: SITE.address.region,
      postalCode: SITE.address.postalCode,
      addressCountry: SITE.address.country,
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: SITE.geo.lat,
      longitude: SITE.geo.lng,
    },
    areaServed: [
      { "@type": "State", name: "Sikkim" },
      { "@type": "City", name: "Gangtok" },
    ],
    openingHoursSpecification: [
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: [
          "Monday",
          "Tuesday",
          "Wednesday",
          "Thursday",
          "Friday",
          "Saturday",
        ],
        opens: "09:00",
        closes: "19:00",
      },
    ],
    ...(SITE.sameAs.length ? { sameAs: SITE.sameAs } : {}),
  };
}

/** WebSite schema — helps Google understand the site entity + branding. */
export function websiteLd() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": `${SITE.url}/#website`,
    url: SITE.url,
    name: SITE.name,
    description: SITE.description,
    publisher: { "@id": `${SITE.url}/#organization` },
    inLanguage: "en-IN",
  };
}

/** Breadcrumb schema for a page. Pass ordered [name, path] pairs. */
export function breadcrumbLd(items: { name: string; path: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: item.name,
      item: `${SITE.url}${item.path}`,
    })),
  };
}
