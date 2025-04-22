"use client"

import * as React from "react"
import Link from "next/link"
import Image from "next/image"
import { UserCircle, LogOut, Settings, User, Key } from "lucide-react"
import { cn } from "@/lib/utils"
import { useRouter, usePathname } from "next/navigation"
import { logout } from "../app/actions"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { useState } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { toast } from "react-toastify"
import { AuthModal } from "@/components/auth-model"
import { useAuth } from '@/contexts/AuthContext'

// Add these interfaces
interface UserProfile {
  firstName: string;
  lastName: string;
  email: string;
}

interface PasswordUpdate {
  currentPassword: string;
  newPassword: string;
  confirmPassword: string;
}

export function Navigation() {
  const { isAuthenticated, user, logout } = useAuth()
  const [isOpen, setIsOpen] = React.useState(false)
  const [showAuthModal, setShowAuthModal] = useState(false)
  const router = useRouter()
  const pathname = usePathname()

  const handleProtectedRoute = (e: React.MouseEvent<HTMLAnchorElement>, path: string) => {
    e.preventDefault()
    if (!isAuthenticated) {
      localStorage.setItem('redirectAfterLogin', path)
      setShowAuthModal(true)
    } else {
      router.push(path)
    }
  }

  const handleLogout = () => {
    logout()
    toast.success('Logged out successfully')
  }

  const AuthButton = () => {
    if (isAuthenticated) {
      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <button className="text-white hover:text-[#f45201] transition-colors flex items-center gap-2">
              <UserCircle className="w-6 h-6" />
              <span>{user?.firstName || 'Profile'}</span>
            </button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-56">
            <DropdownMenuItem onClick={() => router.push('/profile')}>
              <User className="mr-2 h-4 w-4" />
              <span>Profile</span>
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={handleLogout}>
              <LogOut className="mr-2 h-4 w-4" />
              <span>Logout</span>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      )
    }

    return (
      <button 
        onClick={() => setShowAuthModal(true)}
        className="text-white hover:text-[#f45201] transition-colors flex items-center gap-2"
      >
        <UserCircle className="w-6 h-6" />
        <span>Login</span>
      </button>
    )
  }

  return (
    <>
      <header className="fixed top-0 w-full md:w-[95%] z-50 bg-black/75 backdrop-blur-md rounded-lg mx-2 md:mx-8 my-2 shadow-lg transition-transform duration-300">
        <nav className="container mx-auto px-2 md:px-4 py-2 h-24 flex items-center justify-between relative z-10">
          <Link href="/" className="flex items-center gap-2 min-w-max">
            <div className="relative w-[90px] h-[90px] flex-shrink-0">
              <Image
                src="/MAPLE LEAF logo design.png"
                alt="Maple Leaf Tours Logo"
                width={90}
                height={90}
                className="object-contain "
                priority
              />
            </div>
            <div className="flex flex-col justify-center">
              <span className="font-bold text-xl text-white whitespace-nowrap tracking-wide">
                Maple Leaf Tours
              </span>
              <span
                className="text-sm italic font-light text-[#ffffff]/90"
                style={{
                  fontFamily: "Palatino, serif",
                  textShadow: "0px 1px 2px rgba(0,0,0,0.1)",
                }}
              >
                Simple. Elegant. Classy
              </span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-6">
            <Link
              href="/"
              className="text-[#ffffff] hover:text-[#f45201] transition-colors"
            >
              Home
            </Link>
            <Link
              href="/about"
              className="text-[#ffffff] hover:text-[#f45201] transition-colors"
            >
              Tourist spots
            </Link>
            <Link
              href="/packages"
              className="text-[#ffffff] hover:text-[#f45201] transition-colors"
            >
              Packages
            </Link>

            <Link
              href="/contact"
              className="text-[#ffffff] hover:text-[#f45201] transition-colors"
            >
              Contact
            </Link>
            <Link
              href="/testimonials"
              className="text-[#ffffff] hover:text-[#f45201] transition-colors"
            >
              Testimonials
            </Link>
            <a
              href="/booking"
              onClick={(e) => handleProtectedRoute(e, "/booking")}
              className="gradient-button"
            >
              <span className="text-[#f45201]"> Book Now</span>
            </a>
            <AuthButton />
          </div>

          {/* Mobile Navigation */}
          <button
            className="md:hidden mr-4" // Added margin-left to shift the button to the right
            onClick={() => setIsOpen(!isOpen)}
            aria-label="Toggle menu"
          >
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M4 6H20M4 12H20M4 18H20"
                stroke="white"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </button>
        </nav>

        {/* Mobile Menu */}
        <div
          className={cn(
            "fixed inset-0 mt-6 top-16 bg-black/75 backdrop-blur-md z-50 md:hidden transition-transform duration-300 h-80",
            isOpen ? "translate-x-0" : "translate-x-full"
          )}
        >
          <div className="flex flex-col p-4 space-y-4">
            <Link
              href="/"
              className="text-lg font-medium text-[#ffffff] hover:text-[#f45201]"
              onClick={() => setIsOpen(false)}
            >
              Home
            </Link>
            <Link
              href="/about"
              className="text-lg font-medium text-[#ffffff] hover:text-[#f45201]"
              onClick={() => setIsOpen(false)}
            >
              Tourist spots
            </Link>
            <Link
              href="/packages"
              className="text-lg font-medium text-[#ffffff] hover:text-[#f45201]"
              onClick={() => setIsOpen(false)}
            >
              Packages
            </Link>
            <Link
              href="/contact"
              className="text-lg font-medium text-[#ffffff] hover:text-[#f45201]"
              onClick={() => setIsOpen(false)}
            >
              Contact
            </Link>
            <Link
              href="/testimonials"
              className="text-lg font-medium text-[#ffffff] hover:text-[#f45201]"
              onClick={() => setIsOpen(false)}
            >
              Testimonials
            </Link>
            <a
              href="/booking"
              onClick={(e) => {
                setIsOpen(false);
                handleProtectedRoute(e, "/booking");
              }}
              className="gradient-button w-full text-center"
            >
              <span className="text-[#f45201]"> Book Now</span>
            </a>
            <div onClick={() => setIsOpen(false)}>
              <AuthButton />
            </div>
          </div>
        </div>
      </header>

      {/* Auth Modal */}
      <AuthModal
        isOpen={showAuthModal}
        onClose={() => setShowAuthModal(false)}
        onLoginSuccess={() => setShowAuthModal(false)}
      />
    </>
  );
}

