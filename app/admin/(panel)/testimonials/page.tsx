"use client";

import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { Star, Trash2, Check, X } from "lucide-react";
import { adminApi } from "@/utils/adminApi";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

interface Testimonial {
  _id: string;
  name: string;
  testimonial: string;
  rating: number;
  isApproved: boolean;
  createdAt: string;
}

export default function AdminTestimonialsPage() {
  const [items, setItems] = useState<Testimonial[]>([]);
  const [loading, setLoading] = useState(true);
  const [busy, setBusy] = useState<string | null>(null);

  const load = () => {
    setLoading(true);
    adminApi
      .get("/testimonials")
      .then((res) => setItems(res.data || []))
      .catch((err) => toast.error(err.message))
      .finally(() => setLoading(false));
  };

  useEffect(load, []);

  const setApproved = async (id: string, isApproved: boolean) => {
    setBusy(id);
    try {
      await adminApi.put(`/testimonials/${id}`, { isApproved });
      setItems((prev) =>
        prev.map((t) => (t._id === id ? { ...t, isApproved } : t))
      );
      toast.success(isApproved ? "Approved" : "Unapproved");
    } catch (err: any) {
      toast.error(err.message);
    } finally {
      setBusy(null);
    }
  };

  const remove = async (id: string) => {
    if (!confirm("Delete this testimonial?")) return;
    setBusy(id);
    try {
      await adminApi.del(`/testimonials/${id}`);
      setItems((prev) => prev.filter((t) => t._id !== id));
      toast.success("Deleted");
    } catch (err: any) {
      toast.error(err.message);
    } finally {
      setBusy(null);
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-slate-900">Testimonials</h1>
        <p className="text-sm text-slate-500">
          {items.length} submitted · {items.filter((t) => !t.isApproved).length}{" "}
          pending approval
        </p>
      </div>

      {loading ? (
        <p className="text-slate-500">Loading…</p>
      ) : items.length === 0 ? (
        <p className="text-slate-500">No testimonials yet.</p>
      ) : (
        <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
          {items.map((t) => (
            <Card key={t._id}>
              <CardContent className="space-y-3 p-5">
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <p className="font-semibold text-slate-900">{t.name}</p>
                    <div className="flex gap-0.5 pt-1">
                      {Array.from({ length: 5 }).map((_, i) => (
                        <Star
                          key={i}
                          className={`h-4 w-4 ${
                            i < t.rating
                              ? "fill-amber-400 text-amber-400"
                              : "text-slate-300"
                          }`}
                        />
                      ))}
                    </div>
                  </div>
                  <span
                    className={`shrink-0 rounded-full px-2.5 py-0.5 text-xs font-medium ${
                      t.isApproved
                        ? "bg-green-100 text-green-700"
                        : "bg-amber-100 text-amber-700"
                    }`}
                  >
                    {t.isApproved ? "Approved" : "Pending"}
                  </span>
                </div>
                <p className="whitespace-pre-wrap rounded-md bg-slate-50 p-3 text-sm text-slate-700">
                  {t.testimonial}
                </p>
                <div className="flex items-center justify-between">
                  <span className="text-xs text-slate-400">
                    {new Date(t.createdAt).toLocaleDateString("en-IN")}
                  </span>
                  <div className="flex items-center gap-2">
                    {t.isApproved ? (
                      <Button
                        variant="outline"
                        size="sm"
                        disabled={busy === t._id}
                        onClick={() => setApproved(t._id, false)}
                      >
                        <X className="h-4 w-4" /> Unapprove
                      </Button>
                    ) : (
                      <Button
                        size="sm"
                        disabled={busy === t._id}
                        onClick={() => setApproved(t._id, true)}
                      >
                        <Check className="h-4 w-4" /> Approve
                      </Button>
                    )}
                    <Button
                      variant="destructive"
                      size="sm"
                      disabled={busy === t._id}
                      onClick={() => remove(t._id)}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
