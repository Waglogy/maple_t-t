"use client";

import { PackageForm } from "@/components/admin/package-form";

export default function NewPackagePage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-slate-900">New Package</h1>
        <p className="text-sm text-slate-500">
          Create a new tour package.
        </p>
      </div>
      <PackageForm />
    </div>
  );
}
