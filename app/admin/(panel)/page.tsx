"use client";

import { useEffect, useState } from "react";
import {
  CalendarCheck,
  Package,
  Users,
  IndianRupee,
  MessageSquareQuote,
  Mail,
} from "lucide-react";
import { adminApi } from "@/utils/adminApi";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface Dashboard {
  totalBookings: number;
  activePackages: number;
  totalUsers: number;
  totalRevenue: number;
  testimonialCount: number;
  contactFormCount: number;
  monthlyStats: { bookings: number; revenue: number; users: number };
  recentBookings: {
    _id: string;
    bookingId?: string;
    customerName: string;
    packageName: string;
    bookingDate: string;
    amount?: number;
    status?: string;
  }[];
}

const inr = (n?: number) =>
  `₹${(n || 0).toLocaleString("en-IN")}`;

export default function AdminDashboardPage() {
  const [data, setData] = useState<Dashboard | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    adminApi
      .get("/admin/dashboard")
      .then((res) => setData(res.data))
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }, []);

  const cards = data
    ? [
        {
          label: "Total Bookings",
          value: data.totalBookings,
          sub: `${data.monthlyStats.bookings} this month`,
          icon: CalendarCheck,
        },
        {
          label: "Active Packages",
          value: data.activePackages,
          sub: "currently live",
          icon: Package,
        },
        {
          label: "Total Users",
          value: data.totalUsers,
          sub: `${data.monthlyStats.users} this month`,
          icon: Users,
        },
        {
          label: "Total Revenue",
          value: inr(data.totalRevenue),
          sub: `${inr(data.monthlyStats.revenue)} this month`,
          icon: IndianRupee,
        },
        {
          label: "Testimonials",
          value: data.testimonialCount,
          sub: "total submitted",
          icon: MessageSquareQuote,
        },
        {
          label: "New Contacts",
          value: data.contactFormCount,
          sub: "awaiting response",
          icon: Mail,
        },
      ]
    : [];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-slate-900">Dashboard</h1>
        <p className="text-sm text-slate-500">
          Overview of bookings, packages and users.
        </p>
      </div>

      {loading && <p className="text-slate-500">Loading…</p>}
      {error && (
        <p className="rounded-md bg-red-50 p-4 text-sm text-red-600">{error}</p>
      )}

      {data && (
        <>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-3">
            {cards.map((c) => {
              const Icon = c.icon;
              return (
                <Card key={c.label}>
                  <CardContent className="flex items-center gap-4 p-6">
                    <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary">
                      <Icon className="h-6 w-6" />
                    </div>
                    <div>
                      <p className="text-sm text-slate-500">{c.label}</p>
                      <p className="text-2xl font-bold text-slate-900">
                        {c.value}
                      </p>
                      <p className="text-xs text-slate-400">{c.sub}</p>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>

          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Recent Bookings</CardTitle>
            </CardHeader>
            <CardContent className="overflow-x-auto">
              {data.recentBookings.length === 0 ? (
                <p className="text-sm text-slate-500">No bookings yet.</p>
              ) : (
                <table className="w-full text-left text-sm">
                  <thead>
                    <tr className="border-b text-slate-500">
                      <th className="pb-2 pr-4 font-medium">Customer</th>
                      <th className="pb-2 pr-4 font-medium">Package</th>
                      <th className="pb-2 pr-4 font-medium">Date</th>
                      <th className="pb-2 pr-4 font-medium">Amount</th>
                    </tr>
                  </thead>
                  <tbody>
                    {data.recentBookings.map((b) => (
                      <tr key={b._id} className="border-b last:border-0">
                        <td className="py-3 pr-4 font-medium text-slate-900">
                          {b.customerName}
                        </td>
                        <td className="py-3 pr-4 text-slate-600">
                          {b.packageName}
                        </td>
                        <td className="py-3 pr-4 text-slate-600">
                          {b.bookingDate
                            ? new Date(b.bookingDate).toLocaleDateString("en-IN")
                            : "—"}
                        </td>
                        <td className="py-3 pr-4 text-slate-600">
                          {b.amount != null ? inr(b.amount) : "—"}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              )}
            </CardContent>
          </Card>
        </>
      )}
    </div>
  );
}
