"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { adminApi } from "@/utils/adminApi";
import { PackageForm, PackageData } from "@/components/admin/package-form";

export default function EditPackagePage() {
  const params = useParams();
  const id = params?.id as string;
  const [pkg, setPkg] = useState<PackageData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!id) return;
    adminApi
      .get(`/packages/${id}`)
      .then((res) => setPkg(res.data))
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }, [id]);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-slate-900">Edit Package</h1>
        <p className="text-sm text-slate-500">{pkg?.title || ""}</p>
      </div>
      {loading && <p className="text-slate-500">Loading…</p>}
      {error && (
        <p className="rounded-md bg-red-50 p-4 text-sm text-red-600">{error}</p>
      )}
      {pkg && <PackageForm initial={pkg} />}
    </div>
  );
}
