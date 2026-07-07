"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { toast } from "react-toastify";
import { Plus, Pencil, Trash2 } from "lucide-react";
import { adminApi, assetUrl } from "@/utils/adminApi";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

interface Pkg {
  _id: string;
  title: string;
  destination: string;
  duration: { days: number; nights: number };
  price: { amount: number; currency: string };
  featured: boolean;
  active: boolean;
  images?: { url: string }[];
}

const inr = (n?: number) => `₹${(n || 0).toLocaleString("en-IN")}`;

export default function AdminPackagesPage() {
  const [packages, setPackages] = useState<Pkg[]>([]);
  const [loading, setLoading] = useState(true);
  const [deleting, setDeleting] = useState<string | null>(null);

  const load = () => {
    setLoading(true);
    adminApi
      .get("/packages")
      .then((res) => setPackages(res.data || []))
      .catch((err) => toast.error(err.message))
      .finally(() => setLoading(false));
  };

  useEffect(load, []);

  const remove = async (id: string, title: string) => {
    if (!confirm(`Delete package "${title}"? This cannot be undone.`)) return;
    setDeleting(id);
    try {
      await adminApi.del(`/packages/${id}`);
      setPackages((prev) => prev.filter((p) => p._id !== id));
      toast.success("Package deleted");
    } catch (err: any) {
      toast.error(err.message);
    } finally {
      setDeleting(null);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Packages</h1>
          <p className="text-sm text-slate-500">
            {packages.length} package{packages.length === 1 ? "" : "s"}
          </p>
        </div>
        <Link href="/admin/packages/new">
          <Button>
            <Plus className="h-4 w-4" /> New package
          </Button>
        </Link>
      </div>

      <Card>
        <CardContent className="overflow-x-auto p-0">
          {loading ? (
            <p className="p-6 text-slate-500">Loading…</p>
          ) : packages.length === 0 ? (
            <p className="p-6 text-slate-500">No packages yet.</p>
          ) : (
            <table className="w-full text-left text-sm">
              <thead>
                <tr className="border-b bg-slate-50 text-slate-500">
                  <th className="p-4 font-medium">Package</th>
                  <th className="p-4 font-medium">Destination</th>
                  <th className="p-4 font-medium">Duration</th>
                  <th className="p-4 font-medium">Price</th>
                  <th className="p-4 font-medium">Status</th>
                  <th className="p-4 font-medium text-right">Actions</th>
                </tr>
              </thead>
              <tbody>
                {packages.map((p) => (
                  <tr key={p._id} className="border-b last:border-0">
                    <td className="p-4">
                      <div className="flex items-center gap-3">
                        {p.images?.[0]?.url ? (
                          // eslint-disable-next-line @next/next/no-img-element
                          <img
                            src={assetUrl(p.images[0].url)}
                            alt={p.title}
                            className="h-10 w-10 rounded object-cover"
                          />
                        ) : (
                          <div className="h-10 w-10 rounded bg-slate-100" />
                        )}
                        <span className="font-medium text-slate-900">
                          {p.title}
                        </span>
                      </div>
                    </td>
                    <td className="p-4 text-slate-600">{p.destination}</td>
                    <td className="p-4 text-slate-600">
                      {p.duration?.days}D / {p.duration?.nights}N
                    </td>
                    <td className="p-4 font-medium text-slate-900">
                      {inr(p.price?.amount)}
                    </td>
                    <td className="p-4">
                      <div className="flex gap-1">
                        <span
                          className={`rounded-full px-2 py-0.5 text-xs font-medium ${
                            p.active
                              ? "bg-green-100 text-green-700"
                              : "bg-slate-200 text-slate-600"
                          }`}
                        >
                          {p.active ? "Active" : "Inactive"}
                        </span>
                        {p.featured && (
                          <span className="rounded-full bg-amber-100 px-2 py-0.5 text-xs font-medium text-amber-700">
                            Featured
                          </span>
                        )}
                      </div>
                    </td>
                    <td className="p-4">
                      <div className="flex items-center justify-end gap-2">
                        <Link href={`/admin/packages/${p._id}/edit`}>
                          <Button variant="outline" size="sm">
                            <Pencil className="h-4 w-4" />
                          </Button>
                        </Link>
                        <Button
                          variant="destructive"
                          size="sm"
                          disabled={deleting === p._id}
                          onClick={() => remove(p._id, p.title)}
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
