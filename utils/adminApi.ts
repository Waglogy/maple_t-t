// Lightweight admin API client. Mirrors the app's existing pattern:
// Bearer token pulled from localStorage, base URL points at the Render backend.
const BASE_URL = "https://maple-server-e7ye.onrender.com/api";

function authHeader(): Record<string, string> {
  const token =
    typeof window !== "undefined" ? localStorage.getItem("token") : null;
  return token ? { Authorization: `Bearer ${token}` } : {};
}

async function handle(res: Response) {
  let body: any = null;
  try {
    body = await res.json();
  } catch {
    // no JSON body (e.g. 204)
  }
  if (!res.ok || (body && body.success === false)) {
    const message =
      (body && (body.message || body.error)) ||
      `Request failed (${res.status})`;
    throw new Error(message);
  }
  return body;
}

export const adminApi = {
  baseUrl: BASE_URL,

  get: async (endpoint: string) =>
    handle(
      await fetch(`${BASE_URL}${endpoint}`, {
        headers: { ...authHeader() },
      })
    ),

  post: async (endpoint: string, data: any) =>
    handle(
      await fetch(`${BASE_URL}${endpoint}`, {
        method: "POST",
        headers: { "Content-Type": "application/json", ...authHeader() },
        body: JSON.stringify(data),
      })
    ),

  put: async (endpoint: string, data: any) =>
    handle(
      await fetch(`${BASE_URL}${endpoint}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json", ...authHeader() },
        body: JSON.stringify(data),
      })
    ),

  patch: async (endpoint: string, data: any) =>
    handle(
      await fetch(`${BASE_URL}${endpoint}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json", ...authHeader() },
        body: JSON.stringify(data),
      })
    ),

  del: async (endpoint: string) =>
    handle(
      await fetch(`${BASE_URL}${endpoint}`, {
        method: "DELETE",
        headers: { ...authHeader() },
      })
    ),

  // multipart/form-data — do NOT set Content-Type; the browser adds the boundary.
  upload: async (endpoint: string, method: "POST" | "PUT", form: FormData) =>
    handle(
      await fetch(`${BASE_URL}${endpoint}`, {
        method,
        headers: { ...authHeader() },
        body: form,
      })
    ),
};

// Turn a relative /uploads/... path from the backend into an absolute URL.
export function assetUrl(path?: string): string {
  if (!path) return "";
  if (path.startsWith("http")) return path;
  return `https://maple-server-e7ye.onrender.com${path}`;
}
