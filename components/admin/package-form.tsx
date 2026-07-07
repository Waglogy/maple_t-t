"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import { Plus, Trash2 } from "lucide-react";
import { adminApi, assetUrl } from "@/utils/adminApi";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent } from "@/components/ui/card";

export interface PackageData {
  _id?: string;
  title: string;
  destination: string;
  description: string;
  duration: { days: number; nights: number };
  price: { amount: number; currency: string };
  itinerary: { day: number; title: string; description: string }[];
  inclusions: string[];
  exclusions: string[];
  cancellationPolicy: string;
  featured: boolean;
  active: boolean;
  images?: { url: string; caption?: string }[];
  pdfBrochure?: { url: string; filename?: string };
}

const empty: PackageData = {
  title: "",
  destination: "",
  description: "",
  duration: { days: 1, nights: 0 },
  price: { amount: 0, currency: "₹" },
  itinerary: [],
  inclusions: [],
  exclusions: [],
  cancellationPolicy: "",
  featured: false,
  active: true,
};

export function PackageForm({ initial }: { initial?: PackageData }) {
  const router = useRouter();
  const isEdit = Boolean(initial?._id);
  const [form, setForm] = useState<PackageData>(initial || empty);
  const [inclusionsText, setInclusionsText] = useState(
    (initial?.inclusions || []).join("\n")
  );
  const [exclusionsText, setExclusionsText] = useState(
    (initial?.exclusions || []).join("\n")
  );
  const [images, setImages] = useState<FileList | null>(null);
  const [pdf, setPdf] = useState<File | null>(null);
  const [saving, setSaving] = useState(false);

  const set = <K extends keyof PackageData>(key: K, value: PackageData[K]) =>
    setForm((f) => ({ ...f, [key]: value }));

  const addDay = () =>
    set("itinerary", [
      ...form.itinerary,
      { day: form.itinerary.length + 1, title: "", description: "" },
    ]);

  const updateDay = (i: number, patch: Partial<PackageData["itinerary"][0]>) =>
    set(
      "itinerary",
      form.itinerary.map((d, idx) => (idx === i ? { ...d, ...patch } : d))
    );

  const removeDay = (i: number) =>
    set(
      "itinerary",
      form.itinerary
        .filter((_, idx) => idx !== i)
        .map((d, idx) => ({ ...d, day: idx + 1 }))
    );

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    try {
      const packageData = {
        ...form,
        inclusions: inclusionsText
          .split("\n")
          .map((s) => s.trim())
          .filter(Boolean),
        exclusions: exclusionsText
          .split("\n")
          .map((s) => s.trim())
          .filter(Boolean),
      };
      // strip fields the API assigns from uploaded files
      delete (packageData as any)._id;
      delete (packageData as any).images;
      delete (packageData as any).pdfBrochure;

      const fd = new FormData();
      fd.append("packageData", JSON.stringify(packageData));
      if (images) Array.from(images).slice(0, 3).forEach((f) => fd.append("images", f));
      if (pdf) fd.append("pdfBrochure", pdf);

      if (isEdit) {
        await adminApi.upload(`/packages/${initial!._id}`, "PUT", fd);
        toast.success("Package updated");
      } else {
        await adminApi.upload("/packages", "POST", fd);
        toast.success("Package created");
      }
      router.push("/admin/packages");
      router.refresh();
    } catch (err: any) {
      toast.error(err.message || "Failed to save package");
    } finally {
      setSaving(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <Card>
        <CardContent className="grid grid-cols-1 gap-4 p-6 md:grid-cols-2">
          <div className="space-y-2 md:col-span-2">
            <Label htmlFor="title">Title</Label>
            <Input
              id="title"
              required
              value={form.title}
              onChange={(e) => set("title", e.target.value)}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="destination">Destination</Label>
            <Input
              id="destination"
              required
              value={form.destination}
              onChange={(e) => set("destination", e.target.value)}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="price">Price (₹)</Label>
            <Input
              id="price"
              type="number"
              min={0}
              required
              value={form.price.amount}
              onChange={(e) =>
                set("price", { ...form.price, amount: Number(e.target.value) })
              }
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="days">Days</Label>
            <Input
              id="days"
              type="number"
              min={1}
              required
              value={form.duration.days}
              onChange={(e) =>
                set("duration", {
                  ...form.duration,
                  days: Number(e.target.value),
                })
              }
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="nights">Nights</Label>
            <Input
              id="nights"
              type="number"
              min={0}
              required
              value={form.duration.nights}
              onChange={(e) =>
                set("duration", {
                  ...form.duration,
                  nights: Number(e.target.value),
                })
              }
            />
          </div>
          <div className="space-y-2 md:col-span-2">
            <Label htmlFor="description">Description</Label>
            <Textarea
              id="description"
              required
              rows={4}
              value={form.description}
              onChange={(e) => set("description", e.target.value)}
            />
          </div>
          <div className="space-y-2 md:col-span-2">
            <Label htmlFor="cancellation">Cancellation policy</Label>
            <Textarea
              id="cancellation"
              required
              rows={2}
              value={form.cancellationPolicy}
              onChange={(e) => set("cancellationPolicy", e.target.value)}
            />
          </div>
          <div className="flex items-center gap-6 md:col-span-2">
            <label className="flex items-center gap-2 text-sm">
              <input
                type="checkbox"
                checked={form.featured}
                onChange={(e) => set("featured", e.target.checked)}
              />
              Featured
            </label>
            <label className="flex items-center gap-2 text-sm">
              <input
                type="checkbox"
                checked={form.active}
                onChange={(e) => set("active", e.target.checked)}
              />
              Active (visible on site)
            </label>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardContent className="grid grid-cols-1 gap-4 p-6 md:grid-cols-2">
          <div className="space-y-2">
            <Label htmlFor="inclusions">Inclusions (one per line)</Label>
            <Textarea
              id="inclusions"
              rows={5}
              value={inclusionsText}
              onChange={(e) => setInclusionsText(e.target.value)}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="exclusions">Exclusions (one per line)</Label>
            <Textarea
              id="exclusions"
              rows={5}
              value={exclusionsText}
              onChange={(e) => setExclusionsText(e.target.value)}
            />
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardContent className="space-y-4 p-6">
          <div className="flex items-center justify-between">
            <Label>Itinerary</Label>
            <Button type="button" variant="outline" size="sm" onClick={addDay}>
              <Plus className="h-4 w-4" /> Add day
            </Button>
          </div>
          {form.itinerary.length === 0 && (
            <p className="text-sm text-slate-400">No days added yet.</p>
          )}
          {form.itinerary.map((d, i) => (
            <div
              key={i}
              className="grid grid-cols-1 gap-3 rounded-lg border p-3 md:grid-cols-[80px_1fr_auto]"
            >
              <div>
                <Label className="text-xs">Day</Label>
                <Input value={d.day} disabled />
              </div>
              <div className="space-y-2">
                <Input
                  placeholder="Title"
                  value={d.title}
                  onChange={(e) => updateDay(i, { title: e.target.value })}
                />
                <Textarea
                  placeholder="Description"
                  rows={2}
                  value={d.description}
                  onChange={(e) =>
                    updateDay(i, { description: e.target.value })
                  }
                />
              </div>
              <button
                type="button"
                onClick={() => removeDay(i)}
                className="self-start text-red-500 hover:text-red-600"
                aria-label="Remove day"
              >
                <Trash2 className="h-5 w-5" />
              </button>
            </div>
          ))}
        </CardContent>
      </Card>

      <Card>
        <CardContent className="grid grid-cols-1 gap-4 p-6 md:grid-cols-2">
          <div className="space-y-2">
            <Label htmlFor="images">Images (up to 3)</Label>
            <Input
              id="images"
              type="file"
              accept="image/*"
              multiple
              onChange={(e) => setImages(e.target.files)}
            />
            {initial?.images && initial.images.length > 0 && (
              <div className="flex gap-2 pt-2">
                {initial.images.map((img, i) => (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img
                    key={i}
                    src={assetUrl(img.url)}
                    alt={img.caption || ""}
                    className="h-16 w-16 rounded object-cover"
                  />
                ))}
              </div>
            )}
            <p className="text-xs text-slate-400">
              Uploading new images replaces the existing set.
            </p>
          </div>
          <div className="space-y-2">
            <Label htmlFor="pdf">PDF brochure</Label>
            <Input
              id="pdf"
              type="file"
              accept="application/pdf"
              onChange={(e) => setPdf(e.target.files?.[0] || null)}
            />
            {initial?.pdfBrochure?.url && (
              <a
                href={assetUrl(initial.pdfBrochure.url)}
                target="_blank"
                rel="noopener noreferrer"
                className="text-xs text-primary underline"
              >
                Current: {initial.pdfBrochure.filename || "brochure.pdf"}
              </a>
            )}
          </div>
        </CardContent>
      </Card>

      <div className="flex gap-3">
        <Button type="submit" disabled={saving}>
          {saving ? "Saving…" : isEdit ? "Update package" : "Create package"}
        </Button>
        <Button
          type="button"
          variant="outline"
          onClick={() => router.push("/admin/packages")}
        >
          Cancel
        </Button>
      </div>
    </form>
  );
}
