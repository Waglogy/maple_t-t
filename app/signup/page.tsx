"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import axios from "axios";
import { UserCircle, Mail, Lock, Phone } from "lucide-react";

export default function SignupPage() {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    phone: "",
  });
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setSuccess(""); ;

    try {
      const response = await axios.post("https://maplesserver.vercel.app/api/auth/signup", formData);
      setSuccess("Account created successfully! Please log in.");
      setFormData({ firstName: "", lastName: "", email: "", password: "", phone: "" });
    } catch (err) {
      if (axios.isAxiosError(err)) {
        setError(err.response?.data?.message || "Signup failed. Please try again.");
      } else {
        setError("An unexpected error occurred. Please try again.");
      }
    }
    
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4 pt-20">
      <div className="fixed inset-0 z-0" style={{ backgroundImage: 'url("/1.png")', backgroundSize: 'cover', backgroundPosition: 'center', opacity: '0.15' }} />
      
      <div className="max-w-md w-full bg-white rounded-2xl shadow-xl overflow-hidden z-10 my-12">
        <div className="relative h-32">
          <Image src="/MAPLE LEAF logo design.png" alt="Maple Leaf Tours Logo" width={80} height={80} className="absolute top-4 left-1/2 transform -translate-x-1/2" />
        </div>
        
        <div className="px-8 pb-8">
          <h2 className="text-2xl font-bold text-center mb-4">Create Account</h2>
          {error && <p className="text-red-500 text-center">{error}</p>}
          {success && <p className="text-green-500 text-center">{success}</p>}

          <form className="space-y-6" onSubmit={handleSubmit}>
            <div>
              <label className="text-sm font-medium text-gray-700">First Name</label>
              <input type="text" name="firstName" value={formData.firstName} onChange={handleChange} className="w-full px-4 py-2 border border-gray-300 rounded-lg" placeholder="John" required />
            </div>
            
            <div>
              <label className="text-sm font-medium text-gray-700">Last Name</label>
              <input type="text" name="lastName" value={formData.lastName} onChange={handleChange} className="w-full px-4 py-2 border border-gray-300 rounded-lg" placeholder="Doe" required />
            </div>
            
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

            <div>
              <label className="text-sm font-medium text-gray-700">Phone</label>
              <div className="relative">
                <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <input type="tel" name="phone" value={formData.phone} onChange={handleChange} className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg" placeholder="+91 9876543210" required />
              </div>
            </div>

            <button type="submit" className="w-full py-2 rounded-lg gradient-button">Sign Up</button>
          </form>

          <div className="mt-6 text-center">
            <Link href="/login" className="text-sm text-blue-600 hover:text-blue-800">
              Already have an account? Sign in
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
