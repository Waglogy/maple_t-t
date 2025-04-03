"use client"

import { useState } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { toast } from "react-toastify"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { useAuth } from '@/contexts/AuthContext'

interface AuthModalProps {
  isOpen: boolean
  onClose: () => void
  onLoginSuccess: () => void
}

export function AuthModal({ isOpen, onClose, onLoginSuccess }: AuthModalProps) {
  const { login } = useAuth()
  const [isLoading, setIsLoading] = useState(false)
  const [activeTab, setActiveTab] = useState('login')
  const [signupStep, setSignupStep] = useState(1)

  const [loginData, setLoginData] = useState({
    email: '',
    password: ''
  })

  const [signupData, setSignupData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: '',
    age: 0,
    state: '',
    country: '',
    pinCode: '',
    address: '',
    profession: '',
    gender: '',
    mobileNo: ''
  })

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    try {
      const response = await fetch(
        "https://maple-server-e7ye.onrender.com/api/auth/login",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(loginData),
          credentials: "include", // Important for cookies
        }
      );

      const data = await response.json()

      if (response.ok && data.success) {
        login(data.token, data.user)
        toast.success('Login successful!')
        onLoginSuccess()
        onClose()
      } else {
        throw new Error(data.message || 'Login failed')
      }
    } catch (error) {
      console.error('Login error:', error)
      toast.error(error instanceof Error ? error.message : 'An error occurred')
    } finally {
      setIsLoading(false)
    }
  }

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault()
    if (signupData.password !== signupData.confirmPassword) {
      toast.error('Passwords do not match')
      return
    }

    setIsLoading(true)

    try {
      const response = await fetch(
        "https://maple-server-e7ye.onrender.com/api/auth/register",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(signupData),
          credentials: "include", // Important for cookies
        }
      );

      const data = await response.json()

      if (response.ok && data.success) {
        toast.success('Registration successful! Please log in.')
        setActiveTab('login')
      } else {
        throw new Error(data.message || 'Registration failed')
      }
    } catch (error) {
      toast.error(error instanceof Error ? error.message : 'An error occurred')
    } finally {
      setIsLoading(false)
    }
  }

  const nextStep = () => {
    setSignupStep((prevStep) => prevStep + 1)
  }

  const prevStep = () => {
    setSignupStep((prevStep) => prevStep - 1)
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Welcome to Maple Leaf Tours</DialogTitle>
        </DialogHeader>
        
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="login">Login</TabsTrigger>
            <TabsTrigger value="signup">Sign Up</TabsTrigger>
          </TabsList>

          <TabsContent value="login">
            <form onSubmit={handleLogin} className="space-y-4">
              <div>
                <label htmlFor="email" className="text-sm font-medium">Email</label>
                <Input
                  id="email"
                  type="email"
                  required
                  value={loginData.email}
                  onChange={(e) => setLoginData({ ...loginData, email: e.target.value })}
                />
              </div>
              <div>
                <label htmlFor="password" className="text-sm font-medium">Password</label>
                <Input
                  id="password"
                  type="password"
                  required
                  value={loginData.password}
                  onChange={(e) => setLoginData({ ...loginData, password: e.target.value })}
                />
              </div>
              <Button type="submit" className="w-full" disabled={isLoading}>
                {isLoading ? 'Logging in...' : 'Login'}
              </Button>
            </form>
          </TabsContent>

          <TabsContent value="signup">
            <form onSubmit={handleSignup} className="space-y-4">
              {signupStep === 1 && (
                <>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label htmlFor="firstName" className="text-sm font-medium">First Name</label>
                      <Input
                        id="firstName"
                        required
                        value={signupData.firstName}
                        onChange={(e) => setSignupData({ ...signupData, firstName: e.target.value })}
                      />
                    </div>
                    <div>
                      <label htmlFor="lastName" className="text-sm font-medium">Last Name</label>
                      <Input
                        id="lastName"
                        required
                        value={signupData.lastName}
                        onChange={(e) => setSignupData({ ...signupData, lastName: e.target.value })}
                      />
                    </div>
                  </div>
                  <div>
                    <label htmlFor="signupEmail" className="text-sm font-medium">Email</label>
                    <Input
                      id="signupEmail"
                      type="email"
                      required
                      value={signupData.email}
                      onChange={(e) => setSignupData({ ...signupData, email: e.target.value })}
                    />
                  </div>
                  <div>
                    <label htmlFor="signupPassword" className="text-sm font-medium">Password</label>
                    <Input
                      id="signupPassword"
                      type="password"
                      required
                      value={signupData.password}
                      onChange={(e) => setSignupData({ ...signupData, password: e.target.value })}
                    />
                  </div>
                  <Button onClick={nextStep} className="w-full">
                    Next
                  </Button>
                </>
              )}

              {signupStep === 2 && (
                <>
                  <div>
                    <label htmlFor="confirmPassword" className="text-sm font-medium">Confirm Password</label>
                    <Input
                      id="confirmPassword"
                      type="password"
                      required
                      value={signupData.confirmPassword}
                      onChange={(e) => setSignupData({ ...signupData, confirmPassword: e.target.value })}
                    />
                  </div>
                  <div>
                    <label htmlFor="age" className="text-sm font-medium">Age</label>
                    <Input
                      id="age"
                      type="number"
                      required
                      value={signupData.age}
                      onChange={(e) => setSignupData({ ...signupData, age: Number(e.target.value) })}
                    />
                  </div>
                  <div>
                    <label htmlFor="state" className="text-sm font-medium">State</label>
                    <Input
                      id="state"
                      required
                      value={signupData.state}
                      onChange={(e) => setSignupData({ ...signupData, state: e.target.value })}
                    />
                  </div>
                  <div>
                    <label htmlFor="country" className="text-sm font-medium">Country</label>
                    <Input
                      id="country"
                      required
                      value={signupData.country}
                      onChange={(e) => setSignupData({ ...signupData, country: e.target.value })}
                    />
                  </div>
                  <div className="flex justify-between">
                    <Button onClick={prevStep} className="w-full">
                      Previous
                    </Button>
                    <Button onClick={nextStep} className="w-full">
                      Next
                    </Button>
                  </div>
                </>
              )}

              {signupStep === 3 && (
                <>
                  <div>
                    <label htmlFor="pinCode" className="text-sm font-medium">Pin Code</label>
                    <Input
                      id="pinCode"
                      required
                      value={signupData.pinCode}
                      onChange={(e) => setSignupData({ ...signupData, pinCode: e.target.value })}
                    />
                  </div>
                  <div>
                    <label htmlFor="address" className="text-sm font-medium">Address</label>
                    <Input
                      id="address"
                      required
                      value={signupData.address}
                      onChange={(e) => setSignupData({ ...signupData, address: e.target.value })}
                    />
                  </div>
                  <div>
                    <label htmlFor="profession" className="text-sm font-medium">Profession</label>
                    <Input
                      id="profession"
                      required
                      value={signupData.profession}
                      onChange={(e) => setSignupData({ ...signupData, profession: e.target.value })}
                    />
                  </div>
                  <div>
                    <label htmlFor="gender" className="text-sm font-medium">Gender</label>
                    <Input
                      id="gender"
                      required
                      value={signupData.gender}
                      onChange={(e) => setSignupData({ ...signupData, gender: e.target.value })}
                    />
                  </div>
                  <div className="flex justify-between">
                    <Button onClick={prevStep} className="w-full">
                      Previous
                    </Button>
                    <Button onClick={nextStep} className="w-full">
                      Next
                    </Button>
                  </div>
                </>
              )}

              {signupStep === 4 && (
                <>
                  <div>
                    <label htmlFor="mobileNo" className="text-sm font-medium">Mobile No</label>
                    <Input
                      id="mobileNo"
                      required
                      value={signupData.mobileNo}
                      onChange={(e) => setSignupData({ ...signupData, mobileNo: e.target.value })}
                    />
                  </div>
                  <div className="flex justify-between">
                    <Button onClick={prevStep} className="w-full">
                      Previous
                    </Button>
                    <Button type="submit" className="w-full" disabled={isLoading}>
                      {isLoading ? 'Signing up...' : 'Sign Up'}
                    </Button>
                  </div>
                </>
              )}
            </form>
          </TabsContent>
        </Tabs>
      </DialogContent>
    </Dialog>
  )
}