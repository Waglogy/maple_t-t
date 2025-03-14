"use client"

import { useState } from "react"
import { X } from "lucide-react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import Image from "next/image"

interface Photo {
  id: number
  src: string
  alt: string
  caption: string
  size: "small" | "medium" | "large"
}

const photos: Photo[] = [
  {
    id: 1,
    src: "/11.png?height=300&width=300",
    alt: "Small photo 1",
    caption: "Beautiful landscape",
    size: "small",
  },
  {
    id: 2,
    src: "/22.png?height=600&width=400",
    alt: "Medium photo 1",
    caption: "City skyline",
    size: "medium",
  },
  {
    id: 3,
    src: "/33.png?height=400&width=600",
    alt: "Large photo 1",
    caption: "Mountain view",
    size: "large",
  },
  { id: 4, src: "/4.png?height=300&width=300", alt: "Small photo 2", caption: "Serene beach", size: "small" },
  {
    id: 5,
    src: "/9.png?height=600&width=400",
    alt: "Medium photo 2",
    caption: "Forest trail",
    size: "medium",
  },
  {
    id: 6,
    src: "/5.png?height=300&width=300",
    alt: "Small photo 3",
    caption: "Desert sunset",
    size: "small",
  },
  { id: 7, src: "/6.png?height=400&width=600", alt: "Large photo 2", caption: "Ocean waves", size: "large" },
  {
    id: 8,
    src: "/7.png?height=300&width=300",
    alt: "Small photo 4",
    caption: "Autumn leaves",
    size: "small",
  },
  
]

export default function PhotoGallery() {
  const [selectedPhoto, setSelectedPhoto] = useState<Photo | null>(null)

  const getSizeClass = (size: Photo["size"]) => {
    switch (size) {
      case "small":
        return "col-span-1 row-span-1"
      case "medium":
        return "col-span-1 md:col-span-1 row-span-1 md:row-span-2"
      case "large":
        return "col-span-1 md:col-span-2 row-span-1 md:row-span-2"
      default:
        return "col-span-1 row-span-1"
    }
  }

  return (
    <div className="container mx-auto px-4 py-6">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 auto-rows-[200px] md:auto-rows-[250px]">
        {photos.map((photo) => (
          <Card 
            key={photo.id} 
            className={`overflow-hidden transition-transform duration-300 hover:scale-[1.02] ${getSizeClass(photo.size)}`}
          >
            <button 
              className="relative w-full h-full" 
              onClick={() => setSelectedPhoto(photo)} 
              aria-label={`View ${photo.alt}`}
            >
              <div className="relative w-full h-full">
                <Image
                  src={photo.src}
                  alt={photo.alt}
                  fill
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  className="object-cover"
                  priority
                  onError={(e) => {
                    const target = e.target as HTMLImageElement;
                    target.src = '/placeholder.svg';
                  }}
                />
              </div>
            </button>
          </Card>
        ))}
      </div>

      {/* Lightbox with Next/Image */}
      {selectedPhoto && (
        <div className="fixed inset-0 bg-black/90 flex items-center justify-center z-50 p-4">
          <div className="relative max-w-4xl w-full h-[80vh] flex flex-col items-center">
            <div className="relative w-full h-full">
              <Image
                src={selectedPhoto.src}
                alt={selectedPhoto.alt}
                fill
                sizes="100vw"
                className="object-contain"
                priority
                quality={100}
              />
            </div>
            <p className="text-white text-center mt-4 text-sm md:text-base">
              {selectedPhoto.caption}
            </p>
            <Button
              variant="outline"
              size="icon"
              className="absolute top-2 right-2 bg-black/50 hover:bg-black/75 text-white"
              onClick={() => setSelectedPhoto(null)}
              aria-label="Close lightbox"
            >
              <X className="h-4 w-4" />
            </Button>
          </div>
        </div>
      )}
    </div>
  )
}

