"use client"

import * as React from "react"
import Link from "next/link"
import Image from "next/image"
import { UserCircle, LogOut } from "lucide-react"
import { cn } from "@/lib/utils"
import { useRouter } from "next/navigation"
import { logout } from "../app/actions"

export function Navigation() {
  const [isOpen, setIsOpen] = React.useState(false)
  const [isLoggedIn, setIsLoggedIn] = React.useState(false)
  const router = useRouter()

  // Check for auth token in cookies on component mount
  React.useEffect(() => {
    const checkAuth = () => {
      const cookies = document.cookie.split(";")
      const hasToken = cookies.some((cookie) => cookie.trim().startsWith("token="))
      setIsLoggedIn(hasToken)
    }

    checkAuth()
    // Listen for storage events to sync auth state across tabs
    window.addEventListener("storage", checkAuth)
    return () => window.removeEventListener("storage", checkAuth)
  }, [])

  const handleLogout = async () => {
    await logout()
    setIsLoggedIn(false)
    router.refresh()
  }

  const AuthButton = () => {
    if (isLoggedIn) {
      return (
        <button
          onClick={handleLogout}
          className="text-white hover:text-[#f45201] transition-colors flex items-center gap-2"
        >
          <LogOut className="w-6 h-6" />
          <span>Logout</span>
        </button>
      )
    }

    return (
      <Link href="/login" className="text-white hover:text-[#f45201] transition-colors flex items-center gap-2">
        <UserCircle className="w-6 h-6" />
        <span>Login</span>
      </Link>
    )
  }

  return (
    <header className="fixed top-0 w-full z-50 bg-black/75 backdrop-blur-md">
      <nav className="container mx-auto px-4 h-24 flex items-center justify-between relative z-10">
        <Link href="/home" className="flex items-center gap-3">
          <div className="relative w-[100px] h-[100px]">
            <Image
              src="/MAPLE LEAF logo design.png"
              alt="Maple Leaf Tours Logo"
              width={100}
              height={100}
              className="object-contain"
              priority
            />
          </div>
          <div className="flex flex-col">
            <span className="font-bold text-xl text-white whitespace-nowrap">Maple Leaf Tours</span>
            <span className="text-sm italic font-light text-[#ffffff]/75" style={{ fontFamily: "Palatino, serif" }}>
              Simple. Elegant. Classy
            </span>
          </div>
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center gap-6">
          <Link href="/home" className="text-[#ffffff] hover:text-[#f45201] transition-colors">
            Home
          </Link>
          <Link href="/packages" className="text-[#ffffff] hover:text-[#f45201] transition-colors">
            Packages
          </Link>
          <Link href="/contact" className="text-[#ffffff] hover:text-[#f45201] transition-colors">
            Contact
          </Link>
          <Link href="/testimonials" className="text-[#ffffff] hover:text-[#f45201] transition-colors">
            Testimonials
          </Link>
          <Link href="/booking" className="gradient-button">
            Book Now
          </Link>
          <AuthButton />
        </div>

        {/* Mobile Navigation */}
        <button className="md:hidden" onClick={() => setIsOpen(!isOpen)} aria-label="Toggle menu">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
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
          isOpen ? "translate-x-0" : "translate-x-full",
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
          <Link href="/booking" className="gradient-button w-full text-center" onClick={() => setIsOpen(false)}>
            Book Now
          </Link>
          <div onClick={() => setIsOpen(false)}>
            <AuthButton />
          </div>
        </div>
      </div>
    </header>
  )
}

