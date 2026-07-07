"use client";

import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { adminApi } from "@/utils/adminApi";
import { useAuth } from "@/contexts/AuthContext";
import { Card, CardContent } from "@/components/ui/card";

interface AdminUser {
  _id: string;
  firstName: string;
  lastName: string;
  email: string;
  phone?: string;
  role: string;
  isActive?: boolean;
  createdAt: string;
}

export default function AdminUsersPage() {
  const { user: current } = useAuth();
  const [users, setUsers] = useState<AdminUser[]>([]);
  const [loading, setLoading] = useState(true);
  const [busy, setBusy] = useState<string | null>(null);

  const load = () => {
    setLoading(true);
    adminApi
      .get("/user")
      .then((res) => setUsers(res.data || []))
      .catch((err) => toast.error(err.message))
      .finally(() => setLoading(false));
  };

  useEffect(load, []);

  const changeRole = async (id: string, role: string) => {
    setBusy(id);
    try {
      await adminApi.patch(`/user/${id}/role`, { role });
      setUsers((prev) =>
        prev.map((u) => (u._id === id ? { ...u, role } : u))
      );
      toast.success("Role updated");
    } catch (err: any) {
      toast.error(err.message);
    } finally {
      setBusy(null);
    }
  };

  const toggleActive = async (u: AdminUser) => {
    setBusy(u._id);
    try {
      const next = !(u.isActive ?? true);
      await adminApi.patch(`/user/${u._id}/status`, { isActive: next });
      setUsers((prev) =>
        prev.map((x) => (x._id === u._id ? { ...x, isActive: next } : x))
      );
      toast.success(next ? "User activated" : "User deactivated");
    } catch (err: any) {
      toast.error(err.message);
    } finally {
      setBusy(null);
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-slate-900">Users</h1>
        <p className="text-sm text-slate-500">
          {users.length} registered user{users.length === 1 ? "" : "s"}
        </p>
      </div>

      <Card>
        <CardContent className="overflow-x-auto p-0">
          {loading ? (
            <p className="p-6 text-slate-500">Loading…</p>
          ) : users.length === 0 ? (
            <p className="p-6 text-slate-500">No users found.</p>
          ) : (
            <table className="w-full text-left text-sm">
              <thead>
                <tr className="border-b bg-slate-50 text-slate-500">
                  <th className="p-4 font-medium">Name</th>
                  <th className="p-4 font-medium">Email</th>
                  <th className="p-4 font-medium">Phone</th>
                  <th className="p-4 font-medium">Joined</th>
                  <th className="p-4 font-medium">Role</th>
                  <th className="p-4 font-medium">Active</th>
                </tr>
              </thead>
              <tbody>
                {users.map((u) => {
                  const isSelf = current?.id === u._id;
                  const active = u.isActive ?? true;
                  return (
                    <tr key={u._id} className="border-b last:border-0">
                      <td className="p-4 font-medium text-slate-900">
                        {u.firstName} {u.lastName}
                        {isSelf && (
                          <span className="ml-2 text-xs text-slate-400">
                            (you)
                          </span>
                        )}
                      </td>
                      <td className="p-4 text-slate-600">{u.email}</td>
                      <td className="p-4 text-slate-600">{u.phone || "—"}</td>
                      <td className="p-4 text-slate-600">
                        {u.createdAt
                          ? new Date(u.createdAt).toLocaleDateString("en-IN")
                          : "—"}
                      </td>
                      <td className="p-4">
                        <select
                          value={u.role}
                          disabled={isSelf || busy === u._id}
                          title={
                            isSelf ? "You cannot change your own role" : ""
                          }
                          onChange={(e) => changeRole(u._id, e.target.value)}
                          className="rounded-md border border-input px-2.5 py-1 text-xs font-medium disabled:opacity-50"
                        >
                          <option value="user">user</option>
                          <option value="admin">admin</option>
                        </select>
                      </td>
                      <td className="p-4">
                        <button
                          disabled={busy === u._id}
                          onClick={() => toggleActive(u)}
                          className={`rounded-full px-3 py-1 text-xs font-medium transition-colors disabled:opacity-50 ${
                            active
                              ? "bg-green-100 text-green-700 hover:bg-green-200"
                              : "bg-slate-200 text-slate-600 hover:bg-slate-300"
                          }`}
                        >
                          {active ? "Active" : "Inactive"}
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
