"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import Image from "next/image"
import { FaStar, FaClock, FaMapMarkerAlt, FaDownload } from 'react-icons/fa'
import { toast } from 'react-toastify'
import Slider from "react-slick"
import { ChevronLeft, ChevronRight } from "lucide-react"
import "slick-carousel/slick/slick.css"
import "slick-carousel/slick/slick-theme.css"

interface Package {
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

export default function PackagesPage() {
  const router = useRouter()
  const [packages, setPackages] = useState<Package[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchPackages()
  }, [])

  const fetchPackages = async () => {
    try {
      const response = await fetch('https://maple-server-e7ye.onrender.com/api/packages')
      const data = await response.json()
      if (data.success) {
        setPackages(data.data)
      }
    } catch (error) {
      console.error('Error fetching packages:', error)
      toast.error('Failed to load packages')
    } finally {
      setLoading(false)
    }
  }

  const handleBookNow = (pkg: Package) => {
    // Navigate to booking page with package details
    router.push(`/booking?packageId=${pkg._id}&title=${encodeURIComponent(pkg.title)}`)
  }

  const handleDownloadBrochure = async (pdfUrl: string, filename: string) => {
    try {
      const fullUrl = pdfUrl.startsWith('http') ? pdfUrl : `https://maple-server-e7ye.onrender.com${pdfUrl}`
      const response = await fetch(fullUrl)
      const blob = await response.blob()
      const url = window.URL.createObjectURL(blob)
      const link = document.createElement('a')
      link.href = url
      link.download = filename
      document.body.appendChild(link)
      link.click()
      document.body.removeChild(link)
      window.URL.revokeObjectURL(url)
      toast.success('Brochure downloaded successfully!')
    } catch (error) {
      toast.error('Failed to download brochure')
    }
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

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
      </div>
    )
  }

  return (<>
    <section 
      className="relative h-[60vh] bg-gradient-to-r from-[#010001] to-[#f45201] bg-cover bg-center" 
      style={{ backgroundImage: "url('/3.png')" }}
    >
      <div className="absolute inset-0 flex items-center justify-center text-white">
        <div className="text-center space-y-4">
          <h1 className="text-4xl md:text-6xl font-bold">Your Journey, Your Way</h1>
          <p className="text-xl max-w-2xl mx-auto">
            Let's plan your perfect journey together
          </p>
        </div>
      </div>
    </section>

    <div className="container mx-auto px-4 py-8">
     <h1 className="text-3xl font-bold mb-8 bg-zinc-200 p-3 rounded-lg"> Our Travel <span className="text-[#f45201]">Packages</span></h1>
   
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {packages.map((pkg) => (
          <div key={pkg._id} className="bg-white rounded-lg shadow-lg overflow-hidden">
            {/* Package Image Carousel */}
            <div className="relative h-48">
              {pkg.images && pkg.images.length > 0 ? (
                <Slider {...sliderSettings}>
                  {pkg.images.map((image, index) => (
                    <div key={index} className="relative h-48">
                      <Image
                        src={image.url.startsWith('http') 
                          ? image.url 
                          : `https://maple-server-e7ye.onrender.com${image.url}`}
                        alt={image.caption || pkg.title}
                        fill
                        className="object-cover"
                        onError={(e: any) => {
                          console.error(`Error loading image: ${image.url}`);
                          e.target.src = '/placeholder.jpg';
                          e.target.onerror = null; // Prevent infinite loop if placeholder also fails
                        }}
                      />
                      {image.caption && (
                        <div className="absolute bottom-0 left-0 right-0 bg-black/50 text-white p-2 text-sm">
                          {image.caption}
                        </div>
                      )}
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
            <div className="p-4">
              <h3 className="text-xl font-semibold mb-2">{pkg.title}</h3>
              
              <div className="flex items-center gap-2 text-sm text-gray-600 mb-2">
                <FaMapMarkerAlt />
                <span>{pkg.destination}</span>
              </div>

              <div className="flex items-center gap-4 mb-3">
                <div className="flex items-center gap-1">
                  <FaClock className="text-gray-600" />
                  <span className="text-sm">
                    {pkg.duration.days} Days | {pkg.duration.nights} Nights
                  </span>
                </div>
              </div>

              {/* Inclusions */}
              <ul className="text-sm text-gray-600 mb-4">
                {pkg.inclusions.slice(0, 3).map((inclusion, index) => (
                  <li key={index} className="flex items-center gap-2">
                    <span className="w-1 h-1 bg-primary rounded-full"></span>
                    {inclusion}
                  </li>
                ))}
              </ul>

              {/* Price and Actions */}
              <div className="border-t pt-4 mt-4">
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <p className="text-sm text-gray-600">Contact For Pricing</p>
                  </div>
                  {pkg.pdfBrochure && (
                    <button
                      onClick={() => handleDownloadBrochure(pkg.pdfBrochure!.url, pkg.pdfBrochure!.filename)}
                      className="text-primary hover:text-primary-dark"
                      title="Download Brochure"
                    >
                      <FaDownload size={20} />
                    </button>
                  )}
                </div>
                <button
                  onClick={() => handleBookNow(pkg)}
                  className="w-full bg-primary text-white py-2 rounded-md hover:bg-primary-dark transition-colors"
                >
                  Book Now
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  </>)
}