"use client"

import * as React from "react"
import Image from "next/image"
import { ChevronLeft, ChevronRight } from 'lucide-react'
import { cn } from "@/lib/utils"
import { useCallback, useEffect } from "react"

interface Slide {
  url: string
  title: string
  description?: string
}

interface CarouselProps {
  slides: Slide[]
}

export function Carousel({ slides }: CarouselProps) {
  const [currentIndex, setCurrentIndex] = React.useState(0)

  const prevSlide = () => {
    const isFirstSlide = currentIndex === 0
    const newIndex = isFirstSlide ? slides.length - 1 : currentIndex - 1
    setCurrentIndex(newIndex)
  }

  const nextSlide = useCallback(() => {
    setCurrentIndex((prevIndex) => 
      prevIndex === slides.length - 1 ? 0 : prevIndex + 1
    );
  }, [slides.length]);

  useEffect(() => {
    const timer = setInterval(() => {
      nextSlide();
    }, 3000);

    return () => clearInterval(timer);
  }, [nextSlide]);

  return (
    <div className="h-full w-full relative group">
      <Image
        src={slides[currentIndex].url}
        alt={slides[currentIndex].title}
        fill
        className="object-cover"
        priority
      />
      
      <div className="hidden group-hover:block absolute top-[50%] -translate-x-0 translate-y-[-50%] left-5 text-2xl rounded-full p-2 bg-black/20 text-white cursor-pointer">
        <ChevronLeft onClick={prevSlide} size={30} />
      </div>
      
      <div className="hidden group-hover:block absolute top-[50%] -translate-x-0 translate-y-[-50%] right-5 text-2xl rounded-full p-2 bg-black/20 text-white cursor-pointer">
        <ChevronRight onClick={nextSlide} size={30} />
      </div>
      
      <div className="absolute bottom-4 left-0 right-0 flex justify-center gap-2">
        {slides.map((_, slideIndex) => (
          <div
            key={slideIndex}
            onClick={() => setCurrentIndex(slideIndex)}
            className={cn(
              "text-2xl cursor-pointer",
              "w-3 h-3 rounded-full",
              currentIndex === slideIndex ? "bg-white" : "bg-white/50"
            )}
          />
        ))}
      </div>
    </div>
  )
}

