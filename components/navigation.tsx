"use client"

import * as React from "react"
import Link from "next/link"
import Image from "next/image"
import { Menu, X } from 'lucide-react'
import { cn } from "@/lib/utils"

export function Navigation() {
  const [isOpen, setIsOpen] = React.useState(false)

  return (
    <header className="fixed top-0 w-full z-50 bg-white/75 backdrop-blur-md border-b">
      <div 
        className="fixed inset-0 top-16 bg-white/85 backdrop-blur-md -z-10"
        style={{
          backgroundImage: `url("https://cdn.pixabay.com/photo/2017/01/31/22/07/autumn-2027456_1280.png")`,
          backgroundSize: '200px auto',
          backgroundRepeat: 'repeat',
          transform: 'rotate(-45deg)',
          animation: 'falling-leaves 30s linear infinite',
          opacity: '0.15'
        }}
      />
      <nav className="container mx-auto px-4 h-16 flex items-center justify-between relative z-10">
        <Link href="/" className="flex items-center gap-3">
          <div className="relative w-[60px] h-[60px]">
            <Image
              src="/MAPLE LEAF logo design.png"
              alt="Maple Leaf Tours Logo"
              width={60}
              height={60}
              className="object-contain"
              priority
            />
          </div>
          <div className="flex flex-col">
            <span className="font-bold text-xl gradient-text whitespace-nowrap">
              Maple Leaf Tours
            </span>
            <span className="text-sm italic font-light text-[#010001]/75" style={{ fontFamily: 'Palatino, serif' }}>
              Simple. Elegant. Classy
            </span>
          </div>
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center gap-6">
          <Link href="/" className="text-[#010001] hover:text-[#f45201] transition-colors">
            Home
          </Link>
          <Link href="/about" className="text-[#010001] hover:text-[#f45201] transition-colors">
            About
          </Link>
          <Link href="/packages" className="text-[#010001] hover:text-[#f45201] transition-colors">
            Packages
          </Link>
          <Link href="/contact" className="text-[#010001] hover:text-[#f45201] transition-colors">
            Contact
          </Link>
          <Link href="/booking" className="gradient-button">
            Book Now
          </Link>
        </div>

        {/* Mobile Navigation */}
        <button
          className="md:hidden"
          onClick={() => setIsOpen(!isOpen)}
          aria-label={isOpen ? "Close menu" : "Open menu"}
        >
          {isOpen ? <X /> : <Menu />}
        </button>
      </nav>

      {/* Mobile Menu */}
      <div
        className={cn(
          "fixed inset-0 top-16 bg-white/75 backdrop-blur-md z-50 md:hidden transition-transform duration-300",
          isOpen ? "translate-x-0" : "translate-x-full"
        )}
      >
        <div className="flex flex-col p-4 space-y-4">
          <Link
            href="/"
            className="text-lg font-medium text-[#010001] hover:text-[#f45201]"
            onClick={() => setIsOpen(false)}
          >
            Home
          </Link>
          <Link
            href="/about"
            className="text-lg font-medium text-[#010001] hover:text-[#f45201]"
            onClick={() => setIsOpen(false)}
          >
            About
          </Link>
          <Link
            href="/packages"
            className="text-lg font-medium text-[#010001] hover:text-[#f45201]"
            onClick={() => setIsOpen(false)}
          >
            Packages
          </Link>
          <Link
            href="/contact"
            className="text-lg font-medium text-[#010001] hover:text-[#f45201]"
            onClick={() => setIsOpen(false)}
          >
            Contact
          </Link>
          <Link href="/booking" className="gradient-button w-full text-center">
            Book Now
          </Link>
        </div>
      </div>
      <style jsx>{`
        @keyframes falling-leaves {
          from {
            background-position: 0 0;
          }
          to {
            background-position: 200px 200px;
          }
        }
      `}</style>
    </header>
  )
}

