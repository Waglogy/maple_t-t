"use client"

import { useState } from "react"
import { X } from "lucide-react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"

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
        return "col-span-1 row-span-2"
      case "large":
        return "col-span-2 row-span-2"
      default:
        return "col-span-1 row-span-1"
    }
  }

  return (
    <div className="container mx-auto p-4">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 auto-rows-[200px]">
        {photos.map((photo) => (
          <Card key={photo.id} className={`overflow-hidden ${getSizeClass(photo.size)}`}>
            <button className="w-full h-full" onClick={() => setSelectedPhoto(photo)} aria-label={`View ${photo.alt}`}>
              <img
                src={photo.src || "/placeholder.svg"}
                alt={photo.alt}
                className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
              />
            </button>
          </Card>
        ))}
      </div>

      {/* Lightbox */}
      {selectedPhoto && (
        <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50">
          <div className="max-w-4xl w-full p-4">
            <img
              src={selectedPhoto.src || "/placeholder.svg"}
              alt={selectedPhoto.alt}
              className="w-full h-auto max-h-[80vh] object-contain"
            />
            <p className="text-white text-center mt-2">{selectedPhoto.caption}</p>
            <Button
              variant="outline"
              size="icon"
              className="absolute top-4 right-4 bg-white/10 hover:bg-white/20"
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

