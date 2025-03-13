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
  const [showProfileDialog, setShowProfileDialog] = useState(false)
  const [showPasswordDialog, setShowPasswordDialog] = useState(false)
  const router = useRouter()
  const pathname = usePathname()

  const [userProfile, setUserProfile] = useState<UserProfile>({
    firstName: '',
    lastName: '',
    email: ''
  })
  const [passwordUpdate, setPasswordUpdate] = useState<PasswordUpdate>({
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  })

  // Handle protected route access
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

  const handleProfileUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem('token');
      
      if (!token) {
        toast.error('Please login again');
        return;
      }

      const response = await fetch('https://maple-server-e7ye.onrender.com/api/user/profile', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        credentials: 'include',
        body: JSON.stringify(userProfile)
      });

      if (response.ok) {
        const data = await response.json();
        setUserProfile(data.data);
        toast.success('Profile updated successfully');
        setShowProfileDialog(false);
      } else if (response.status === 401) {
        localStorage.removeItem('token');
        setIsAuthenticated(false);
        toast.error('Session expired. Please login again.');
      } else {
        const error = await response.json();
        toast.error(error.message || 'Failed to update profile');
      }
    } catch (error) {
      console.error('Profile update error:', error);
      toast.error('Error updating profile');
    }
  };

  const handlePasswordUpdate = async (e: React.FormEvent) => {
    e.preventDefault()
    if (passwordUpdate.newPassword !== passwordUpdate.confirmPassword) {
      toast.error('Passwords do not match')
      return
    }

    try {
      const response = await fetch('https://maple-server-e7ye.onrender.com/api/user/password', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify({
          currentPassword: passwordUpdate.currentPassword,
          newPassword: passwordUpdate.newPassword
        })
      })

      if (response.ok) {
        toast.success('Password updated successfully')
        setShowPasswordDialog(false)
        setPasswordUpdate({
          currentPassword: '',
          newPassword: '',
          confirmPassword: ''
        })
      } else {
        toast.error('Failed to update password')
      }
    } catch (error) {
      toast.error('Error updating password')
    }
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
            <DropdownMenuItem onClick={() => setShowProfileDialog(true)}>
              <User className="mr-2 h-4 w-4" />
              <span>Update Profile</span>
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => setShowPasswordDialog(true)}>
              <Key className="mr-2 h-4 w-4" />
              <span>Change Password</span>
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
      <header className="fixed top-0 w-full z-50 bg-black/75 backdrop-blur-md">
        <nav className="container mx-auto px-2 h-24 flex items-center justify-between relative z-10">
          <Link href="/" className="flex items-center gap-2 min-w-max">
            <div className="relative w-[90px] h-[90px] flex-shrink-0">
              <Image
                src="/logo2.png"
                alt="Maple Leaf Tours Logo"
                width={90}
                height={90}
                className="object-contain mt-2"
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
                  textShadow: "0px 1px 2px rgba(0,0,0,0.1)"
                }}
              >
                Simple. Elegant. Classy
              </span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-6">
            <Link href="/" className="text-[#ffffff] hover:text-[#f45201] transition-colors">
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
            <a
              href="/booking"
              onClick={(e) => handleProtectedRoute(e, '/booking')}
              className="gradient-button"
            >
              Book Now
            </a>
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
            <a
              href="/booking"
              onClick={(e) => {
                setIsOpen(false)
                handleProtectedRoute(e, '/booking')
              }}
              className="gradient-button w-full text-center"
            >
              Book Now
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

      {/* Profile Update Dialog */}
      <Dialog open={showProfileDialog} onOpenChange={setShowProfileDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Update Profile</DialogTitle>
          </DialogHeader>
          <form onSubmit={handleProfileUpdate} className="space-y-4">
            <div>
              <label htmlFor="firstName" className="text-sm font-medium">First Name</label>
              <Input
                id="firstName"
                value={userProfile.firstName}
                onChange={(e) => setUserProfile({...userProfile, firstName: e.target.value})}
                className="mt-1"
              />
            </div>
            <div>
              <label htmlFor="lastName" className="text-sm font-medium">Last Name</label>
              <Input
                id="lastName"
                value={userProfile.lastName}
                onChange={(e) => setUserProfile({...userProfile, lastName: e.target.value})}
                className="mt-1"
              />
            </div>
            <div>
              <label htmlFor="email" className="text-sm font-medium">Email</label>
              <Input
                id="email"
                type="email"
                value={userProfile.email}
                onChange={(e) => setUserProfile({...userProfile, email: e.target.value})}
                className="mt-1"
              />
            </div>
            <Button type="submit" className="w-full">Update Profile</Button>
          </form>
        </DialogContent>
      </Dialog>

      {/* Password Update Dialog */}
      <Dialog open={showPasswordDialog} onOpenChange={setShowPasswordDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Change Password</DialogTitle>
          </DialogHeader>
          <form onSubmit={handlePasswordUpdate} className="space-y-4">
            <div>
              <label htmlFor="currentPassword" className="text-sm font-medium">Current Password</label>
              <Input
                id="currentPassword"
                type="password"
                value={passwordUpdate.currentPassword}
                onChange={(e) => setPasswordUpdate({...passwordUpdate, currentPassword: e.target.value})}
                className="mt-1"
              />
            </div>
            <div>
              <label htmlFor="newPassword" className="text-sm font-medium">New Password</label>
              <Input
                id="newPassword"
                type="password"
                value={passwordUpdate.newPassword}
                onChange={(e) => setPasswordUpdate({...passwordUpdate, newPassword: e.target.value})}
                className="mt-1"
              />
            </div>
            <div>
              <label htmlFor="confirmPassword" className="text-sm font-medium">Confirm New Password</label>
              <Input
                id="confirmPassword"
                type="password"
                value={passwordUpdate.confirmPassword}
                onChange={(e) => setPasswordUpdate({...passwordUpdate, confirmPassword: e.target.value})}
                className="mt-1"
              />
            </div>
            <Button type="submit" className="w-full">Update Password</Button>
          </form>
        </DialogContent>
      </Dialog>
    </>
  )
}

