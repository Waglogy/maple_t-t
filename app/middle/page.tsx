"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import Link from "next/link";
import { Lock } from "lucide-react";

export default function OTPVerificationPage() {
  const [otp, setOtp] = useState("");
  const router = useRouter();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setOtp(e.target.value);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    console.log("Verifying OTP:", otp); // Debugging log
    
    try {
      const response = await axios.post("https://maplesserver.vercel.app/api/auth/verify-otp", { otp }, {
        headers: { "Content-Type": "application/json" },
      });
      
      console.log("OTP verification successful:", response.data);
      alert("OTP verified successfully! Redirecting to login...");
      
      router.push("/login");
    } catch (err) {
      if (axios.isAxiosError(err)) {
        console.error("OTP verification error:", err.response?.data);
        alert(err.response?.data?.error || "Invalid OTP, please try again");
      } else {
        console.error("Unexpected error:", err);
      }
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4 pt-20">
      <div className="fixed inset-0 z-0" style={{ backgroundImage: 'url("/1.png")', backgroundSize: 'cover', backgroundPosition: 'center', opacity: '0.15' }} />
      
      <div className="max-w-md w-full bg-white rounded-2xl shadow-xl overflow-hidden z-10 my-12">
        <div className="px-8 pb-8">
          <h2 className="text-2xl font-bold text-center mb-4">Verify OTP</h2>
          <p className="text-center text-gray-600 mb-6">Enter the OTP sent to your email</p>
          
          <form className="space-y-6" onSubmit={handleSubmit}>
            <div>
              <label className="text-sm font-medium text-gray-700">OTP</label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <input type="text" name="otp" value={otp} onChange={handleChange} className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg" placeholder="123456" required />
              </div>
            </div>
            
            <button type="submit" className="w-full py-2 rounded-lg gradient-button">Verify OTP</button>
          </form>
          
          <div className="mt-6 text-center">
            <Link href="/signup" className="text-sm text-blue-600 hover:text-blue-800">
              Didn't receive an OTP? Resend
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
