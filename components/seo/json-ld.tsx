/**
 * Renders a JSON-LD structured-data <script> tag.
 * Server-safe: no "use client". Pass any schema.org object (or array).
 */
export function JsonLd({ data }: { data: object | object[] }) {
  return (
    <script
      type="application/ld+json"
      // JSON-LD must be raw JSON inside a script tag.
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}
