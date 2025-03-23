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
    src: "/11.png",
    alt: "Gangtok City View",
    caption: "Panoramic view of Gangtok city with lush green mountains",
    size: "medium",
  },
  {
    id: 2,
    src: "/22.png",
    alt: "Tsomgo Lake",
    caption: "Serene Tsomgo Lake surrounded by snow-capped mountains",
    size: "large",
  },
  {
    id: 3,
    src: "/33.png",
    alt: "Nathula Pass",
    caption: "Historic Nathula Pass on the India-China border",
    size: "medium",
  },
  {
    id: 4,
    src: "/4.png",
    alt: "Rumtek Monastery",
    caption: "Majestic Rumtek Monastery, a center of Tibetan Buddhism",
    size: "small",
  },
  {
    id: 5,
    src: "/9.png",
    alt: "Yumthang Valley",
    caption: "Colorful Yumthang Valley known as the Valley of Flowers",
    size: "large",
  },
  {
    id: 6,
    src: "/5.png",
    alt: "Pelling Skywalk",
    caption: "Thrilling Pelling Skywalk with panoramic mountain views",
    size: "small",
  },
  {
    id: 7,
    src: "/6.png",
    alt: "Lachung Village",
    caption: "Picturesque Lachung Village in North Sikkim",
    size: "medium",
  },
  {
    id: 8,
    src: "/7.png",
    alt: "Khecheopalri Lake",
    caption: "Sacred Khecheopalri Lake surrounded by prayer flags",
    size: "small",
  },
  {
    id: 9,
    src: "/7.png",
    alt: "Khecheopalri Lake",
    caption: "Sacred Khecheopalri Lake surrounded by prayer flags",
    size: "small",
  },
  {
    id: 10,
    src: "/7.png",
    alt: "Khecheopalri Lake",
    caption: "Sacred Khecheopalri Lake surrounded by prayer flags",
    size: "small",
  },
];

// Update the grid layout
export default function PhotoGallery() {
  const [selectedPhoto, setSelectedPhoto] = useState<Photo | null>(null);

  const getSizeClass = (size: Photo["size"]) => {
    switch (size) {
      case "small":
        return "col-span-1 row-span-1";
      case "medium":
        return "col-span-1 md:col-span-1 row-span-1";
      case "large":
        return "col-span-1 md:col-span-2 row-span-1";
      default:
        return "col-span-1 row-span-1";
    }
  };

  return (
    <div className="container mx-auto px-4 py-6">
      <h2 className="text-3xl md:text-4xl font-bold text-center mb-4">
        Explore Sikkim <span className="text-[#f45201]">Through Our Lens</span>
      </h2>
      <p className="text-center text-gray-600 max-w-2xl mx-auto mb-8">
        Discover the breathtaking beauty of Sikkim through our curated
        collection of photographs. From majestic mountains to serene lakes, each
        image captures the essence of this Himalayan paradise.
      </p>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 auto-rows-[200px]">
        {photos.map((photo) => (
          <Card
            key={photo.id}
            className={`relative overflow-hidden group transition-all duration-300 hover:scale-[1.03] ${getSizeClass(
              photo.size
            )}`}
          >
            <button
              className="relative w-full h-full"
              onClick={() => setSelectedPhoto(photo)}
              aria-label={`View ${photo.alt}`}
            >
              <Image
                src={photo.src}
                alt={photo.alt}
                fill
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                className="object-cover"
                priority
              />
              <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            </button>
          </Card>
        ))}
      </div>

      {/* Lightbox remains the same */}
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
  );
}

