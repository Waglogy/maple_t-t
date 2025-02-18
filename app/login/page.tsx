"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import axios from "axios";
import { Mail, Lock, XCircle, CheckCircle } from "lucide-react";

export default function LoginPage() {
  const router = useRouter();
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const [showError, setShowError] = useState(false);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [event.target.name]: event.target.value });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "https://maplesserver.vercel.app/api/auth/login",
        formData
      );
  
      const token = response.data.token;
      document.cookie = `token=${token}; path=/; secure;`;
  
      router.push("/home"); // Redirect after successful login
    } catch (err) {
      if (axios.isAxiosError(err)) {
        setError(err.response?.data?.error || "Something went wrong.");
      } else {
        setError("An unexpected error occurred.");
      }
      setShowError(true);
    }
  };
  

  return (
    <div className="min-h-screen flex items-center justify-center px-4 pt-20">
      <div className="max-w-md w-full bg-white rounded-2xl shadow-xl overflow-hidden z-10 my-12">
        <div className="relative h-32">
          <Image src="/MAPLE LEAF logo design.png" alt="Logo" width={80} height={80} className="absolute top-4 left-1/2 transform -translate-x-1/2" />
        </div>

        <div className="px-8 pb-8">
          <h2 className="text-2xl font-bold text-center mb-4">Please login to continue</h2>

          {showError && (
            <div className="bg-red-100 text-red-600 p-3 rounded-lg mb-3 flex items-center">
              <XCircle className="mr-2" size={20} />
              {error}
            </div>
          )}

          <form className="space-y-6" onSubmit={handleSubmit}>
            <div>
              <label className="text-sm font-medium text-gray-700">Email</label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg"
                  placeholder="you@example.com"
                  required
                />
              </div>
            </div>

            <div>
              <label className="text-sm font-medium text-gray-700">Password</label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <input
                  type="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg"
                  placeholder="••••••••"
                  required
                />
              </div>
            </div>

            <button type="submit" className="w-full py-2 rounded-lg gradient-button">Sign In</button>
          </form>

          <div className="mt-6 text-center">
            <Link href="/signup" className="text-sm text-blue-600 hover:text-blue-800">
              Don't have an account? Sign up
            </Link>
          </div>

          <div className="mt-4 text-center">
            <Link href="/" className="text-sm text-gray-600 hover:text-gray-800">
              Back to Home
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
