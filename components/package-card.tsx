import { Star } from 'lucide-react'
import { Button } from "@/components/ui/button"
import Image from "next/image"

interface PackageCardProps {
  image: string
  title: string
  description: string
  price: number
  rating: number
  duration: string
  features: string[]
}

const defaultProps: PackageCardProps = {
  image: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4",
  title: "Sikkim Mountain Retreat",
  description: "Luxury Mountain Getaway",
  price: 89999,
  rating: 4.9,
  duration: "5 Days | All Inclusive",
  features: ["5-star accommodation", "Private tours", "Luxury transport", "Gourmet dining"]
}

export function PackageCard(props: Partial<PackageCardProps> = {}) {
  const { image, title, description, price, rating, duration, features } = { ...defaultProps, ...props }

  return (
    <div className="gradient-card overflow-hidden group">
      <div className="relative h-56">
        <Image
          src={image}
          alt={title}
          fill
          className="object-cover transition-transform group-hover:scale-105 duration-500"
        />
      </div>
      <div className="p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-xl font-semibold">{title}</h3>
          <div className="flex items-center">
            <Star className="w-5 h-5 text-[#f45201] fill-current" />
            <span className="ml-1 text-gray-600">{rating}</span>
          </div>
        </div>
        <p className="text-gray-600 mb-4">{duration}</p>
        <ul className="space-y-2 mb-6">
          {features.map((feature, index) => (
            <li key={index} className="flex items-center text-gray-600">
              <span className="w-2 h-2 bg-[#f45201] rounded-full mr-2" />
              {feature}
            </li>
          ))}
        </ul>
        <div className="flex items-center justify-between">
          <div>
            <span className="text-sm text-gray-500">Starting from</span>
            <p className="text-2xl font-bold text-[#f45201]">₹{price.toLocaleString('en-IN')}</p>
          </div>
          <Button className="gradient-button">
            Book Now
          </Button>
        </div>
      </div>
    </div>
  )
}

