"use client"
import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import * as React from "react"
import { ChevronRight, ChevronLeft, Calendar, Users, Plane, CreditCard } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { cn } from "@/lib/utils"

const validateCreditCard = (number: string) => {
  // Remove any spaces or dashes
  const cleanNumber = number.replace(/[\s-]/g, "")

  // Check if the number contains only digits
  if (!/^\d+$/.test(cleanNumber)) return false

  // Check length (most cards are 13-19 digits)
  if (cleanNumber.length < 13 || cleanNumber.length > 19) return false

  // Luhn algorithm (mod 10)
  let sum = 0
  let isEven = false

  // Loop through values starting from the rightmost digit
  for (let i = cleanNumber.length - 1; i >= 0; i--) {
    let digit = Number.parseInt(cleanNumber.charAt(i))

    if (isEven) {
      digit *= 2
      if (digit > 9) {
        digit -= 9
      }
    }

    sum += digit
    isEven = !isEven
  }

  return sum % 10 === 0
}

const steps = [
  { id: 1, name: "Package", icon: Plane },
  { id: 2, name: "Date & Travelers", icon: Calendar },
  { id: 3, name: "Details", icon: Users },
  { id: 4, name: "Payment", icon: CreditCard },
]

export default function BookingPage() {
  const [packages, setPackages] = useState([])
  const [loadingPackages, setLoadingPackages] = useState(true)
  const [packageError, setPackageError] = useState("")
  useEffect(() => {
    const fetchPackages = async () => {
      try {
        const response = await fetch("https://maplesserver.vercel.app/api/package") // Use local API
        const result = await response.json()
        console.log("Fetched Packages:", result)

        // Extract the 'data' array
        if (response.ok && Array.isArray(result.data)) {
          setPackages(result.data) // Set only the 'data' array
        } else {
          setPackageError("Invalid response format")
        }
      } catch (error) {
        console.error("Error fetching packages:", error)
        setPackageError("Network error. Please try again.")
      } finally {
        setLoadingPackages(false)
      }
    }

    fetchPackages()
  }, [])

  const router = useRouter()
  const [currentStep, setCurrentStep] = React.useState(1)
  const [formData, setFormData] = React.useState({
    package: "",
    departure: "",
    arrival: "",
    travelDate: "",
    adults: "2",
    children: "0",
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    cardName: "",
    cardNumber: "",
    expiryDate: "",
    cvv: "",
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

    // Validate required fields
    if (
      !formData.package ||
      !formData.departure ||
      !formData.arrival ||
      !formData.travelDate ||
      !formData.firstName ||
      !formData.lastName ||
      !formData.email ||
      !formData.phone ||
      !formData.cardName ||
      !formData.cardNumber ||
      !formData.expiryDate ||
      !formData.cvv
    ) {
      setError("Please fill in all required fields")
      setLoading(false)
      return
    }

    // Validate credit card
    if (!validateCreditCard(formData.cardNumber)) {
      setError("Please enter a valid credit card number")
      setLoading(false)
      return
    }

    // Format the data exactly as required by the API
    const bookingData = {
      package: formData.package,
      departure: formData.departure,
      arrival: formData.arrival,
      travelDate: formData.travelDate,
      adults: Number(formData.adults),
      children: Number(formData.children),
      firstName: formData.firstName,
      lastName: formData.lastName,
      phone: formData.phone,
      email: formData.email,
      cardName: formData.cardName,
      cardNumber: formData.cardNumber.replace(/\s/g, ""), // Remove spaces before sending
      expiryDate: formData.expiryDate,
      cvv: formData.cvv,
      status: "Confirmed",
    }

    try {
      console.log("Sending booking data:", bookingData) // Debug log

      const response = await fetch("https://maplesserver.vercel.app/api/booking", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify(bookingData),
      })

      // Get the response text first
      const responseText = await response.text()
      console.log("API Response:", responseText) // Debug log

      // Try to parse it as JSON
      let data
      try {
        data = JSON.parse(responseText)
      } catch (e) {
        console.error("Failed to parse response as JSON:", responseText)
        throw new Error("Invalid JSON response from server")
      }

      if (response.ok) {
        setSuccess("Booking Successful! We'll contact you soon.")
        alert("Thank you for booking! We will send you a confirmation mail soon.")
        router.push("/home")
      } else {
        // Show the specific error message from the API
        setError(data.message || data.error || "Failed to create booking. Please try again.")
        console.error("API Error:", data)
      }
    } catch (err) {
      console.error("Booking error:", err)
      setError(err.message || "Network error. Please try again.")
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
                  currentStep < step.id && "text-gray-400",
                )}
              >
                <div className="hidden md:flex items-center">
                  <step.icon className="w-5 h-5 mr-2" />
                  <span>{step.name}</span>
                  {step.id !== steps.length && <ChevronRight className="w-5 h-5 mx-4" />}
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
                    {loadingPackages ? (
                      <p>Loading packages...</p>
                    ) : packageError ? (
                      <p className="text-red-500">{packageError}</p>
                    ) : packages.length > 0 ? (
                      packages.map((pkg) => (
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
                              ₹{pkg.price.toLocaleString("en-IN")}
                            </span>
                          </div>
                        </Label>
                      ))
                    ) : (
                      <p>No packages available.</p>
                    )}
                  </div>
                </RadioGroup>
              </div>
            )}

            {/* Step 2: Date & Travelers */}
            {currentStep === 2 && (
              <div className="space-y-6">
                <h2 className="text-2xl font-semibold mb-4">Choose Date & Travelers</h2>
                <div className="grid gap-4">
                  {/* Departure Date */}
                  <div>
                    <Label htmlFor="departure">Departure Date</Label>
                    <Input
                      type="date"
                      id="departure"
                      name="departure"
                      value={formData.departure}
                      onChange={handleInputChange}
                      min={new Date().toISOString().split("T")[0]}
                    />
                  </div>

                  {/* Arrival Date */}
                  <div>
                    <Label htmlFor="arrival">Arrival Date</Label>
                    <Input
                      type="date"
                      id="arrival"
                      name="arrival"
                      value={formData.arrival}
                      onChange={handleInputChange}
                      min={formData.departure || new Date().toISOString().split("T")[0]}
                    />
                  </div>

                  {/* Preferred Travel Date */}
                  <div>
                    <Label htmlFor="travelDate">Preferred Travel Date</Label>
                    <Input
                      type="date"
                      id="travelDate"
                      name="travelDate"
                      value={formData.travelDate}
                      onChange={handleInputChange}
                      min={formData.departure || new Date().toISOString().split("T")[0]}
                      max={formData.arrival}
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    {/* Adults */}
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
                              {num} {num === 1 ? "Adult" : "Adults"}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>

                    {/* Children */}
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
                              {num} {num === 1 ? "Child" : "Children"}
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
                      <Input id="firstName" name="firstName" value={formData.firstName} onChange={handleInputChange} />
                    </div>
                    <div>
                      <Label htmlFor="lastName">Last Name</Label>
                      <Input id="lastName" name="lastName" value={formData.lastName} onChange={handleInputChange} />
                    </div>
                  </div>
                  <div>
                    <Label htmlFor="email">Email</Label>
                    <Input type="email" id="email" name="email" value={formData.email} onChange={handleInputChange} />
                  </div>
                  <div>
                    <Label htmlFor="phone">Phone</Label>
                    <Input id="phone" name="phone" value={formData.phone} onChange={handleInputChange} />
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
                    <Input id="cardName" name="cardName" value={formData.cardName} onChange={handleInputChange} />
                  </div>
                  <div>
                    <Label htmlFor="cardNumber">Card Number</Label>
                    <Input
                      id="cardNumber"
                      name="cardNumber"
                      value={formData.cardNumber}
                      onChange={(e) => {
                        // Remove any non-digit characters
                        const value = e.target.value.replace(/\D/g, "")
                        // Add spaces every 4 digits
                        const formatted = value.replace(/(\d{4})(?=\d)/g, "$1 ")
                        setFormData({ ...formData, cardNumber: formatted })
                      }}
                      maxLength={19} // 16 digits + 3 spaces
                      className={
                        !formData.cardNumber || validateCreditCard(formData.cardNumber)
                          ? ""
                          : "border-red-500 focus:ring-red-500"
                      }
                    />
                    {formData.cardNumber && !validateCreditCard(formData.cardNumber) && (
                      <p className="text-sm text-red-500 mt-1">Please enter a valid credit card number</p>
                    )}
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
                      <Input id="cvv" name="cvv" value={formData.cvv} onChange={handleInputChange} maxLength={3} />
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
                onClick={currentStep === steps.length ? () => console.log("Submit:", formData) : nextStep}
                className="gradient-button"
              >
                {currentStep === steps.length ? (
                  ""
                ) : (
                  <>
                    Next
                    <ChevronRight className="w-4 h-4 ml-2" />
                  </>
                )}
              </Button>
            </div>
          </CardContent>
        </Card>
        {error && <div className="text-red-500 text-center mt-4">{error}</div>}
        {currentStep === steps.length && (
          <div className="flex justify-center items-center mt-5">
            <Button onClick={submitForm} disabled={loading} className="gradient-button">
              {loading ? "Submitting..." : "Confirm Booking"}
            </Button>
          </div>
        )}
      </div>
    </div>
  )
}

