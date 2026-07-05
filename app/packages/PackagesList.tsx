"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import Image from "next/image"
import { FaClock, FaMapMarkerAlt } from 'react-icons/fa'
import Slider from "react-slick"
import { ChevronLeft, ChevronRight } from "lucide-react"
import "slick-carousel/slick/slick.css"
import "slick-carousel/slick/slick-theme.css"
import { useAuth } from '@/contexts/AuthContext'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import CustomPackage from "@/components/CustomPackage";

export interface Package {
  _id: string
  title: string
  description: string
  destination: string
  duration: {
    days: number
    nights: number
  }
  price: {
    amount: number
    currency: string
  }
  images: Array<{
    url: string
    caption: string
  }>
  inclusions: string[]
  exclusions: string[]
  itinerary: Array<{
    day: number
    title: string
    description: string
    _id: string
  }>
  cancellationPolicy: string
  pdfBrochure?: {
    url: string
    filename: string
  }
}

// Custom arrow components for the carousel
const PrevArrow = (props: any) => (
  <button
    className="absolute left-2 top-1/2 z-10 -translate-y-1/2 bg-white/80 rounded-full p-2 hover:bg-white"
    onClick={props.onClick}
  >
    <ChevronLeft className="h-6 w-6 text-gray-800" />
  </button>
)

const NextArrow = (props: any) => (
  <button
    className="absolute right-2 top-1/2 z-10 -translate-y-1/2 bg-white/80 rounded-full p-2 hover:bg-white"
    onClick={props.onClick}
  >
    <ChevronRight className="h-6 w-6 text-gray-800" />
  </button>
)

export default function PackagesList({ packages }: { packages: Package[] }) {
  const router = useRouter()
  const { user } = useAuth()
  const [showLoginDialog, setShowLoginDialog] = useState(false)

  const handleBookNow = () => {
    if (!user) {
      setShowLoginDialog(true)
      return
    }
    router.push('/booking')
  }

  // Add carousel settings
  const sliderSettings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    prevArrow: <PrevArrow />,
    nextArrow: <NextArrow />,
  }

  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 justify-items-center">
        {packages.map((pkg) => (
          <div
            key={pkg._id}
            className="bg-white rounded-lg shadow-lg overflow-hidden w-full max-w-[400px]"
          >
            {/* Package Image Carousel */}
            <div className="relative h-48">
              {pkg.images && pkg.images.length > 0 ? (
                <Slider {...sliderSettings}>
                  {pkg.images.map((image, index) => (
                    <div key={index} className="relative h-48">
                      <Image
                        src={
                          image.url.startsWith("http")
                            ? image.url
                            : `https://maple-server-e7ye.onrender.com${image.url}`
                        }
                        alt={image.caption || pkg.title}
                        fill
                        className="object-cover"
                        onError={(e: any) => {
                          console.error(`Error loading image: ${image.url}`);
                          e.target.src = "/placeholder.jpg";
                          e.target.onerror = null;
                        }}
                      />
                    </div>
                  ))}
                </Slider>
              ) : (
                <div className="h-full flex items-center justify-center bg-gray-100">
                  <p className="text-gray-500">No images available</p>
                </div>
              )}
            </div>

            {/* Package Details */}
            <div className="p-4 mt-4">
              <h3 className="text-xl font-semibold mb-2">{pkg.title}</h3>

              {/* Destination */}
              <div className="flex items-center gap-2 text-sm text-gray-600 mb-2">
                <FaMapMarkerAlt />
                <span>{pkg.destination}</span>
              </div>

              {/* Duration */}
              <div className="flex items-center gap-4 mb-3">
                <div className="flex items-center gap-1">
                  <FaClock className="text-gray-600" />
                  <span className="text-sm">
                    {pkg.duration.days} Days | {pkg.duration.nights} Nights
                  </span>
                </div>
              </div>

              {/* Price */}
              <div className="mb-4">
                <p className="text-sm text-gray-600">
                  Starting from {pkg.price.currency} {pkg.price.amount}
                </p>
              </div>

              {/* Description */}
              {pkg.description && (
                <div className="text-sm text-gray-600 mb-4 whitespace-pre-line">
                  {pkg.description}
                </div>
              )}

              {/* Inclusions */}
              {pkg.inclusions && pkg.inclusions.length > 0 && (
                <div className="mb-4">
                  <h4 className="font-semibold mb-2">Inclusions</h4>
                  <ul className="text-sm text-gray-600 space-y-1">
                    {pkg.inclusions.map((item, index) => (
                      <li key={index} className="flex items-start gap-2">
                        <span className="text-green-600">✅</span>
                        {item.replace(/^✅\s*/, '')}
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Exclusions */}
              {pkg.exclusions && pkg.exclusions.length > 0 && (
                <div className="mb-4">
                  <h4 className="font-semibold mb-2">Exclusions</h4>
                  <ul className="text-sm text-gray-600 space-y-1">
                    {pkg.exclusions.map((item, index) => (
                      <li key={index} className="flex items-start gap-2">
                        <span className="text-red-600">❌</span>
                        {item.replace(/^❌\s*/, '')}
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Cancellation Policy */}
              {pkg.cancellationPolicy && (
                <div className="mb-4">
                  <h4 className="font-semibold mb-2">Cancellation Policy</h4>
                  <p className="text-sm text-gray-600 whitespace-pre-line">
                    {pkg.cancellationPolicy}
                  </p>
                </div>
              )}

              {/* Price and Actions */}
              <div className="border-t pt-4 mt-4">
                <button
                  onClick={handleBookNow}
                  className="w-full bg-primary text-white py-2 rounded-md hover:bg-primary-dark transition-colors"
                >
                  Book Now
                </button>
              </div>
            </div>
          </div>
        ))}

        {/* Add Custom Package Card */}
        <div className=" rounded-lg  overflow-hidden w-full max-w-[400px]">
          <CustomPackage />
        </div>
      </div>

      {/* Login Dialog */}
      <Dialog open={showLoginDialog} onOpenChange={setShowLoginDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Login Required</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <p>Please login by visiting the navigation bar at the top of the page to book this package.</p>
            <div className="flex justify-end">
              <button
                onClick={() => setShowLoginDialog(false)}
                className="px-4 py-2 text-gray-600 hover:text-gray-800"
              >
                Close
              </button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}
