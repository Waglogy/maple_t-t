"use client";

import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { Trash2 } from "lucide-react";
import { adminApi } from "@/utils/adminApi";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

interface Contact {
  _id: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  message: string;
  status: string;
  createdAt: string;
}

const STATUSES = ["new", "read", "responded"];

const statusColor: Record<string, string> = {
  new: "bg-amber-100 text-amber-700",
  read: "bg-blue-100 text-blue-700",
  responded: "bg-green-100 text-green-700",
};

export default function AdminContactsPage() {
  const [contacts, setContacts] = useState<Contact[]>([]);
  const [loading, setLoading] = useState(true);
  const [busy, setBusy] = useState<string | null>(null);

  const load = () => {
    setLoading(true);
    adminApi
      .get("/contacts")
      .then((res) => setContacts(res.data || []))
      .catch((err) => toast.error(err.message))
      .finally(() => setLoading(false));
  };

  useEffect(load, []);

  const setStatus = async (id: string, status: string) => {
    setBusy(id);
    try {
      await adminApi.put(`/contacts/${id}`, { status });
      setContacts((prev) =>
        prev.map((c) => (c._id === id ? { ...c, status } : c))
      );
      toast.success("Status updated");
    } catch (err: any) {
      toast.error(err.message);
    } finally {
      setBusy(null);
    }
  };

  const remove = async (id: string) => {
    if (!confirm("Delete this contact submission?")) return;
    setBusy(id);
    try {
      await adminApi.del(`/contacts/${id}`);
      setContacts((prev) => prev.filter((c) => c._id !== id));
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
        <h1 className="text-2xl font-bold text-slate-900">Contact Submissions</h1>
        <p className="text-sm text-slate-500">
          {contacts.length} message{contacts.length === 1 ? "" : "s"}
        </p>
      </div>

      {loading ? (
        <p className="text-slate-500">Loading…</p>
      ) : contacts.length === 0 ? (
        <p className="text-slate-500">No submissions yet.</p>
      ) : (
        <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
          {contacts.map((c) => (
            <Card key={c._id}>
              <CardContent className="space-y-3 p-5">
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <p className="font-semibold text-slate-900">
                      {c.firstName} {c.lastName}
                    </p>
                    <p className="text-sm text-slate-500">{c.email}</p>
                    <p className="text-sm text-slate-500">{c.phone}</p>
                  </div>
                  <span
                    className={`shrink-0 rounded-full px-2.5 py-0.5 text-xs font-medium ${
                      statusColor[c.status] || "bg-slate-100 text-slate-600"
                    }`}
                  >
                    {c.status}
                  </span>
                </div>
                <p className="whitespace-pre-wrap rounded-md bg-slate-50 p-3 text-sm text-slate-700">
                  {c.message}
                </p>
                <div className="flex items-center justify-between">
                  <span className="text-xs text-slate-400">
                    {new Date(c.createdAt).toLocaleString("en-IN")}
                  </span>
                  <div className="flex items-center gap-2">
                    <select
                      value={c.status}
                      disabled={busy === c._id}
                      onChange={(e) => setStatus(c._id, e.target.value)}
                      className="rounded-md border border-input px-2 py-1 text-xs"
                    >
                      {STATUSES.map((s) => (
                        <option key={s} value={s}>
                          {s}
                        </option>
                      ))}
                    </select>
                    <Button
                      variant="destructive"
                      size="sm"
                      disabled={busy === c._id}
                      onClick={() => remove(c._id)}
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
