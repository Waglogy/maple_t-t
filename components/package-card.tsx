'use client'

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { DownloadButton } from "@/components/download-button"
import Image from "next/image"

interface PackageCardProps {
  title: string
  image: string
  price: number
  duration: string
  features: string[]
  rating: number
}

export function PackageCard({ title, image, price, duration, features, rating }: PackageCardProps) {
  return (
    <Card className="overflow-hidden">
      <div className="relative h-48">
        <Image
          src={image}
          alt={title}
          fill
          className="object-cover"
        />
      </div>
      <CardContent className="p-6">
        <div className="flex justify-between items-start mb-4">
          <h3 className="text-xl font-bold">{title}</h3>
          <div className="text-right">
            <p className="text-sm text-gray-500">From</p>
            <p className="text-xl font-bold text-[#f45201]">₹{price.toLocaleString()}</p>
          </div>
        </div>
        <p className="text-gray-600 mb-4">{duration}</p>
        <ul className="space-y-2 mb-6">
          {features.map((feature, i) => (
            <li key={i} className="flex items-center text-gray-600">
              <span className="w-2 h-2 bg-[#f45201] rounded-full mr-2" />
              {feature}
            </li>
          ))}
        </ul>
        <div className="flex gap-4">
          <Button className="gradient-btn flex-1">Book Now</Button>
          <DownloadButton title={title} />
        </div>
      </CardContent>
    </Card>
  )
}

