"use client";

import Image from "next/image";
import FamousPlaces from "@/components/FamousPlaces";
import AdventureGrid from "@/components/AdventureGrid";
export default function AboutPage() {
  return (
    <div className="">
      {/* Hero Section */}
      <section
        className="relative h-[60vh] bg-gradient-to-r from-[#010001] to-[#f45201] bg-cover bg-center"
        style={{ backgroundImage: "url('/3.png')" }}
      >
        <div className="absolute inset-0 flex items-center justify-center text-white">
          <div className="text-center space-y-4 px-4">
            <h1 className="text-4xl md:text-6xl font-bold">About Us</h1>
            <p className="text-lg md:text-xl max-w-2xl mx-auto">
              Discover the story behind Maple Tours & Travels
            </p>
          </div>
        </div>
      </section>

      {/* Content Section */}
      
          <AdventureGrid />
        
      {/* Famous Places Section */}
      <FamousPlaces />
    </div>
  );
}