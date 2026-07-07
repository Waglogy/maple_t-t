"use client";

import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { adminApi } from "@/utils/adminApi";
import { Card, CardContent } from "@/components/ui/card";

interface Booking {
  _id: string;
  user?: { firstName: string; lastName: string; email: string };
  package?: { title: string };
  startDate: string;
  numberOfPeople?: { adults: number; children: number };
  totalAmount: number;
  paymentStatus: string;
  bookingStatus: string;
  contactDetails?: { phone: string; email: string };
  createdAt: string;
}

// Only statuses the Booking model actually allows (enum: pending/confirmed/cancelled).
const STATUSES = ["pending", "confirmed", "cancelled"];

const statusColor: Record<string, string> = {
  pending: "bg-amber-100 text-amber-700",
  confirmed: "bg-green-100 text-green-700",
  cancelled: "bg-red-100 text-red-700",
  completed: "bg-blue-100 text-blue-700",
};

const payColor: Record<string, string> = {
  pending: "bg-amber-100 text-amber-700",
  completed: "bg-green-100 text-green-700",
  failed: "bg-red-100 text-red-700",
};

const inr = (n?: number) => `₹${(n || 0).toLocaleString("en-IN")}`;

export default function AdminBookingsPage() {
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState<string | null>(null);

  const load = () => {
    setLoading(true);
    adminApi
      .get("/bookings")
      .then((res) => setBookings(res.data || []))
      .catch((err) => toast.error(err.message))
      .finally(() => setLoading(false));
  };

  useEffect(load, []);

  const updateStatus = async (id: string, status: string) => {
    setSaving(id);
    try {
      await adminApi.patch(`/bookings/${id}/status`, { status });
      setBookings((prev) =>
        prev.map((b) => (b._id === id ? { ...b, bookingStatus: status } : b))
      );
      toast.success("Booking status updated");
    } catch (err: any) {
      toast.error(err.message);
    } finally {
      setSaving(null);
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-slate-900">Bookings</h1>
        <p className="text-sm text-slate-500">
          {bookings.length} total booking{bookings.length === 1 ? "" : "s"}
        </p>
      </div>

      <Card>
        <CardContent className="overflow-x-auto p-0">
          {loading ? (
            <p className="p-6 text-slate-500">Loading…</p>
          ) : bookings.length === 0 ? (
            <p className="p-6 text-slate-500">No bookings found.</p>
          ) : (
            <table className="w-full text-left text-sm">
              <thead>
                <tr className="border-b bg-slate-50 text-slate-500">
                  <th className="p-4 font-medium">Customer</th>
                  <th className="p-4 font-medium">Package</th>
                  <th className="p-4 font-medium">Travel date</th>
                  <th className="p-4 font-medium">Guests</th>
                  <th className="p-4 font-medium">Amount</th>
                  <th className="p-4 font-medium">Payment</th>
                  <th className="p-4 font-medium">Status</th>
                </tr>
              </thead>
              <tbody>
                {bookings.map((b) => (
                  <tr key={b._id} className="border-b last:border-0">
                    <td className="p-4">
                      <div className="font-medium text-slate-900">
                        {b.user
                          ? `${b.user.firstName} ${b.user.lastName}`
                          : "—"}
                      </div>
                      <div className="text-xs text-slate-400">
                        {b.contactDetails?.email || b.user?.email}
                      </div>
                      <div className="text-xs text-slate-400">
                        {b.contactDetails?.phone}
                      </div>
                    </td>
                    <td className="p-4 text-slate-600">
                      {b.package?.title || "—"}
                    </td>
                    <td className="p-4 text-slate-600">
                      {b.startDate
                        ? new Date(b.startDate).toLocaleDateString("en-IN")
                        : "—"}
                    </td>
                    <td className="p-4 text-slate-600">
                      {b.numberOfPeople
                        ? `${b.numberOfPeople.adults}A${
                            b.numberOfPeople.children
                              ? ` + ${b.numberOfPeople.children}C`
                              : ""
                          }`
                        : "—"}
                    </td>
                    <td className="p-4 font-medium text-slate-900">
                      {inr(b.totalAmount)}
                    </td>
                    <td className="p-4">
                      <span
                        className={`inline-block rounded-full px-2.5 py-0.5 text-xs font-medium ${
                          payColor[b.paymentStatus] || "bg-slate-100 text-slate-600"
                        }`}
                      >
                        {b.paymentStatus}
                      </span>
                    </td>
                    <td className="p-4">
                      <select
                        value={b.bookingStatus}
                        disabled={saving === b._id}
                        onChange={(e) => updateStatus(b._id, e.target.value)}
                        className={`rounded-md border-0 px-2.5 py-1 text-xs font-medium focus:ring-2 focus:ring-primary ${
                          statusColor[b.bookingStatus] ||
                          "bg-slate-100 text-slate-600"
                        }`}
                      >
                        {STATUSES.map((s) => (
                          <option key={s} value={s}>
                            {s}
                          </option>
                        ))}
                      </select>
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
