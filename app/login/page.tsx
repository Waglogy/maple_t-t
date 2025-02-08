"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Mail, Lock } from "lucide-react";

export default function LoginPage() {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert("Login functionality is disabled.");
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4 pt-20">
      <div className="fixed inset-0 z-0" style={{ backgroundImage: 'url("/1.png")', backgroundSize: 'cover', backgroundPosition: 'center', opacity: '0.15' }} />
      
      <div className="max-w-md w-full bg-white rounded-2xl shadow-xl overflow-hidden z-10 my-12">
        <div className="relative h-32">
          <Image src="/MAPLE LEAF logo design.png" alt="Maple Leaf Tours Logo" width={80} height={80} className="absolute top-4 left-1/2 transform -translate-x-1/2" />
        </div>
        
        <div className="px-8 pb-8">
          <h2 className="text-2xl font-bold text-center mb-4">Welcome Back</h2>
          {error && <p className="text-red-500 text-center">{error}</p>}

          <form className="space-y-6" onSubmit={handleSubmit}>
            <div>
              <label className="text-sm font-medium text-gray-700">Email</label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <input type="email" name="email" value={formData.email} onChange={handleChange} className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg" placeholder="you@example.com" required />
              </div>
            </div>

            <div>
              <label className="text-sm font-medium text-gray-700">Password</label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <input type="password" name="password" value={formData.password} onChange={handleChange} className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg" placeholder="••••••••" required />
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
            <Link href="/" className="text-sm text-gray-600 hover:text-gray-800">Back to Home</Link>
          </div>
        </div>
      </div>
    </div>
  );
}
