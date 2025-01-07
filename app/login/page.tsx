"use client"

import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { UserCircle, Mail, Lock } from 'lucide-react'

export default function LoginPage() {
  const [isLogin, setIsLogin] = useState(true)

  return (
    <div className="min-h-screen flex items-center justify-center px-4 pt-20">
      <div 
        className="fixed inset-0 z-0"
        style={{
          backgroundImage: 'url("/1.png")',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          opacity: '0.15'
        }}
      />

      <div className="max-w-md w-full bg-white rounded-2xl shadow-xl overflow-hidden z-10 my-12">
        <div className="relative h-32">
          <Image
            src="/MAPLE LEAF logo design.png"
            alt="Maple Leaf Tours Logo"
            width={80}
            height={80}
            className="absolute top-4 left-1/2 transform -translate-x-1/2"
          />
        </div>

        <div className="px-8 pb-8">
          <h2 className="text-2xl font-bold text-center mb-8">
            {isLogin ? "Welcome Back" : "Create Account"}
          </h2>

          <form className="space-y-6">
            {!isLogin && (
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700">Full Name</label>
                <div className="relative">
                  <UserCircle className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                  <input
                    type="text"
                    className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="John Doe"
                  />
                </div>
              </div>
            )}

            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700">Email</label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <input
                  type="email"
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="you@example.com"
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700">Password</label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <input
                  type="password"
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="••••••••"
                />
              </div>
            </div>

            <button
              type="submit"
              className="w-full py-2 rounded-lg gradient-button"
            >
              {isLogin ? "Sign In" : "Sign Up"}
            </button>
          </form>

          <div className="mt-6 text-center">
            <button
              onClick={() => setIsLogin(!isLogin)}
              className="text-sm text-blue-600 hover:text-blue-800"
            >
              {isLogin 
                ? "Don't have an account? Sign up" 
                : "Already have an account? Sign in"}
            </button>
          </div>

          <div className="mt-4 text-center">
            <Link 
              href="/"
              className="text-sm text-gray-600 hover:text-gray-800"
            >
              Back to Home
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
} 