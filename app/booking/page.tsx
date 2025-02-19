"use client"
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import * as React from "react"
import { ChevronRight, ChevronLeft, Calendar, Users, Plane, CreditCard } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { cn } from "@/lib/utils"

const steps = [
  { id: 1, name: "Package", icon: Plane },
  { id: 2, name: "Date & Travelers", icon: Calendar },
  { id: 3, name: "Details", icon: Users },
  { id: 4, name: "Payment", icon: CreditCard },
]




export default function BookingPage() {

  const [packages, setPackages] = useState([]);
const [loadingPackages, setLoadingPackages] = useState(true);
const [packageError, setPackageError] = useState("");

useEffect(() => {
  const fetchPackages = async () => {
    try {
      const response = await fetch("http://localhost:5000/api/packages"); // Replace with actual API URL
      const data = await response.json();
      if (response.ok) {
        setPackages(data);
      } else {
        setPackageError("Failed to load packages");
      }
    } catch (error) {
      setPackageError("Network error. Please try again.");
    } finally {
      setLoadingPackages(false);
    }
  };

  fetchPackages();
}, []);

  const router = useRouter();
  const [currentStep, setCurrentStep] = React.useState(1)
  const [formData, setFormData] = React.useState({
    package: "",
    date: "",
    adults: "2",
    children: "0",
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    cardName: "",
    cardNumber: "",
    expiryDate: "",
    cvv: ""
  })
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")
  const [success, setSuccess] = useState("")
  
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

const submitForm = async () => {
    setLoading(true)
    setError("")
    setSuccess("")

    try {
      const response = await fetch("http://localhost:5000/api/bookings", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData)
      })
      
      const data = await response.json()

      if (response.ok) {
        setSuccess("Booking Successful! We'll contact you soon.")
        alert("Thank you for booking! We will send you a confirmation mail soon.");

        // Redirect to home page
        router.push("/home");
      } else {

        setError(data.message || "Something went wrong")
      }
    } catch (err) {
      setError("Network error. Please try again.")
    } finally {
      setLoading(false)
    }
  }



  const nextStep = () => {
    setCurrentStep((prev) => Math.min(prev + 1, steps.length))
  }

  const prevStep = () => {
    setCurrentStep((prev) => Math.max(prev - 1, 1))
  }

  return (
    <div className="pt-24 mt-8 min-h-screen bg-gradient-to-br from-[#f8f7da]/50 via-white/50 to-[#f8f7da]/50">
      <div className="container mx-auto px-4 pb-12">
        <h1 className="text-4xl font-bold text-center mb-8">
          <span className="text-zinc-800 dark:text-white">Book Your Journey</span>
        </h1>

        {/* Progress Steps */}
        <div className="mb-12">
          <div className="flex items-center justify-center space-x-4 md:space-x-8">
            {steps.map((step) => (
              <div
                key={step.id}
                className={cn(
                  "flex items-center",
                  currentStep > step.id && "text-[#f45201]",
                  currentStep === step.id && "text-[#f45201] font-semibold",
                  currentStep < step.id && "text-gray-400"
                )}
              >
                <div className="hidden md:flex items-center">
                  <step.icon className="w-5 h-5 mr-2" />
                  <span>{step.name}</span>
                  {step.id !== steps.length && (
                    <ChevronRight className="w-5 h-5 mx-4" />
                  )}
                </div>
                <div className="flex md:hidden items-center justify-center w-8 h-8 rounded-full border-2 border-current">
                  {step.id}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Form Steps */}
        <Card className="max-w-4xl mx-auto backdrop-blur-md bg-white/75">
          <CardContent className="p-6">
            {/* Step 1: Package Selection */}
            {currentStep === 1 && (
              <div className="space-y-6">
                <h2 className="text-2xl font-semibold mb-4">Select Your Package</h2>
                <RadioGroup
                  defaultValue={formData.package}
                  onValueChange={(value) => setFormData({ ...formData, package: value })}
                >
                  <div className="grid gap-4">
                    {packages.map((pkg) => (
                      <Label
                        key={pkg.id}
                        htmlFor={pkg.id}
                        className="relative flex cursor-pointer rounded-lg border p-4 hover:bg-gray-50"
                      >
                        <RadioGroupItem value={pkg.title} id={pkg.title} className="mt-1" />
                        <div className="ml-4">
                          <span className="block text-gray-500">{pkg.title}</span>
                          <span className="block text-sm text-gray-500">{pkg.description}</span>
                          <span className="block mt-1 font-semibold text-[#f45201]">
                            ₹{pkg.price.toLocaleString('en-IN')}
                          </span>
                        </div>
                      </Label>
                    ))}
                  </div>
                </RadioGroup>
              </div>
            )}

            {/* Step 2: Date & Travelers */}
            {currentStep === 2 && (
              <div className="space-y-6">
                <h2 className="text-2xl font-semibold mb-4">Choose Date & Travelers</h2>
                <div className="grid gap-4">
                  <div>
                    <Label htmlFor="date">Preferred Travel Date</Label>
                    <Input
                      type="date"
                      id="date"
                      name="date"
                      value={formData.date}
                      onChange={handleInputChange}
                      min={new Date().toISOString().split('T')[0]}
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="adults">Adults</Label>
                      <Select
                        value={formData.adults}
                        onValueChange={(value) => setFormData({ ...formData, adults: value })}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Select" />
                        </SelectTrigger>
                        <SelectContent>
                          {[1, 2, 3, 4, 5, 6].map((num) => (
                            <SelectItem key={num} value={num.toString()}>
                              {num} {num === 1 ? 'Adult' : 'Adults'}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                    <div>
                      <Label htmlFor="children">Children</Label>
                      <Select
                        value={formData.children}
                        onValueChange={(value) => setFormData({ ...formData, children: value })}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Select" />
                        </SelectTrigger>
                        <SelectContent>
                          {[0, 1, 2, 3, 4].map((num) => (
                            <SelectItem key={num} value={num.toString()}>
                              {num} {num === 1 ? 'Child' : 'Children'}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Step 3: Personal Details */}
            {currentStep === 3 && (
              <div className="space-y-6">
                <h2 className="text-2xl font-semibold mb-4">Personal Details</h2>
                <div className="grid gap-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="firstName">First Name</Label>
                      <Input
                        id="firstName"
                        name="firstName"
                        value={formData.firstName}
                        onChange={handleInputChange}
                      />
                    </div>
                    <div>
                      <Label htmlFor="lastName">Last Name</Label>
                      <Input
                        id="lastName"
                        name="lastName"
                        value={formData.lastName}
                        onChange={handleInputChange}
                      />
                    </div>
                  </div>
                  <div>
                    <Label htmlFor="email">Email</Label>
                    <Input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                    />
                  </div>
                  <div>
                    <Label htmlFor="phone">Phone</Label>
                    <Input
                      id="phone"
                      name="phone"
                      value={formData.phone}
                      onChange={handleInputChange}
                    />
                  </div>
                </div>
              </div>
            )}

            {/* Step 4: Payment */}
            {currentStep === 4 && (
              <div className="space-y-6">
                <h2 className="text-2xl font-semibold mb-4">Payment Details</h2>
                <div className="grid gap-4">
                  <div>
                    <Label htmlFor="cardName">Name on Card</Label>
                    <Input
                      id="cardName"
                      name="cardName"
                      value={formData.cardName}
                      onChange={handleInputChange}
                    />
                  </div>
                  <div>
                    <Label htmlFor="cardNumber">Card Number</Label>
                    <Input
                      id="cardNumber"
                      name="cardNumber"
                      value={formData.cardNumber}
                      onChange={handleInputChange}
                      maxLength={16}
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="expiryDate">Expiry Date</Label>
                      <Input
                        id="expiryDate"
                        name="expiryDate"
                        placeholder="MM/YY"
                        value={formData.expiryDate}
                        onChange={handleInputChange}
                      />
                    </div>
                    <div>
                      <Label htmlFor="cvv">CVV</Label>
                      <Input
                        id="cvv"
                        name="cvv"
                        value={formData.cvv}
                        onChange={handleInputChange}
                        maxLength={3}
                      />
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Navigation Buttons */}
            <div className="flex justify-between mt-8">
              <Button
                variant="outline"
                onClick={prevStep}
                disabled={currentStep === 1}
                className="gradient-button bg-transparent"
              >
                <ChevronLeft className="w-4 h-4 mr-2" />
                Previous
              </Button>
              <Button
                onClick={currentStep === steps.length ? () => console.log('Submit:', formData) : nextStep}
                className="gradient-button"
              >
                {currentStep === steps.length ? (
                  'Confirm Booking'
                ) : (
                  <>
                    Next
                    <ChevronRight className="w-4 h-4 ml-2" />
                  </>
                )}
              </Button>
              <Button onClick={submitForm} disabled={loading}>{loading ? "Submitting..." : "Confirm Booking"}</Button>

            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

