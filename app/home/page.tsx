"use client"; // Mark this file as a client component

import { useEffect } from "react";
import { useRouter } from "next/navigation"; // Make sure this is only used in the client component
import { Button } from "@/components/ui/button";
import { Carousel } from "@/components/carousel";
import { PackageCard } from "@/components/package-card";
import Image from "next/image";
import Link from "next/link";
import SikkimMap from "@/components/SikkimMap";
import PhotoGallery from "@/components/PhotoGallery";

const packages = [
  {
    title: "Sikkim Mountain Retreat",
    image: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4",
    price: 89999,
    duration: "5 Days | All Inclusive",
    features: ["5-star accommodation", "Private tours", "Luxury transport", "Gourmet dining"]
  },
  {
    title: "Bhutan Heritage Tour",
    image: "https://images.unsplash.com/photo-1553856622-d1b352e9a211",
    price: 149999,
    duration: "7 Days | Premium Package",
    features: ["Luxury dzong stays", "Cultural experiences", "Private guide", "Traditional spa"]
  },
  {
    title: "Nepal Valley Explorer",
    image: "https://images.unsplash.com/photo-1544735716-392fe2489ffa",
    price: 99999,
    duration: "6 Days | Deluxe Package",
    features: ["Heritage hotels", "Temple tours", "Mountain flights", "Authentic cuisine"]
  }
];

const slides = [
  {
    url: "/1.png",
    title: "Sikkim Mountains",
    description: "Experience the majesty of the Eastern Himalayas"
  },
  {
    url: "/2.png",
    title: "Nepal Temples",
    description: "Discover ancient spiritual heritage"
  },
  {
    url: "/3.png",
    title: "Kalimpong Hills",
    description: "Explore the scenic beauty of Kalimpong"
  }
];

export default function Home() {
  const router = useRouter();

  useEffect(() => {
    // Check if the user is logged in
    const isLoggedIn = localStorage.getItem("isLoggedIn"); // This should be replaced with your actual login logic
    if (!isLoggedIn) {
      router.push("/login"); // Redirect to login if not logged in
    }
  }, [router]);

  return (
    <div className="pt-100">
      {/* Hero Section with Carousel */}
      <section className="relative h-[100vh]">
        <Carousel slides={slides} />
        <div className="absolute inset-0 bg-black/30 flex items-center justify-center">
          <div className="text-center text-white space-y-4">
            <h1 className="text-4xl md:text-6xl font-bold">
              Elegance in Every Journey
            </h1>
            <p className="text-xl md:text-2xl max-w-2xl mx-auto">
              Travel with grace and sophistication—where simplicity meets timeless class.
            </p>
            <Button size="lg" className="gradient-button">
              Explore Packages
            </Button>
          </div>
        </div>
      </section>

    

      {/* Our Story Section */}
      <section className="py-20 ">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">
            <span className="text-zinc-800">About Us & Our Story</span>
          </h2>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <h3 className="text-2xl font-semibold text-black">
                About Maple Leafs
              </h3>
              <p className="text-black">
                Since our inception, we've been dedicated to providing unparalleled luxury 
                transportation experiences in Nepal. Our journey began with a simple vision: 
                to transform ordinary travel into extraordinary memories.
              </p>
              <h3 className="text-2xl font-semibold text-black">
                Our Story
              </h3>
              <p className="text-black">
                Today, we pride ourselves on our fleet of meticulously maintained luxury 
                vehicles and our team of professional chauffeurs. Whether it's a mountain 
                expedition, city tour, or airport transfer, we ensure every journey with us 
                is marked by comfort, safety, and sophistication.
              </p>
              <Button className="gradient-btn" asChild>
                <Link href="/contact">Contact Us</Link>
              </Button>
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-4">
                <div className="relative h-[300px] rounded-lg overflow-hidden">
                  <Image
                    src="/11.png"
                    alt="Scenic mountain drive"
                    fill
                    className="object-cover hover:scale-110 transition-transform duration-500"
                  />
                </div>
                <div className="relative h-[200px] rounded-lg overflow-hidden">
                  <Image
                    src="/33.png"
                    alt="Luxury vehicle interior"
                    fill
                    className="object-cover hover:scale-110 transition-transform duration-500"
                  />
                </div>
              </div>
              <div className="relative h-[520px] rounded-lg overflow-hidden">
                <Image
                  src="/22.png"
                  alt="Buddhist Monastery in Sikkim"
                  fill
                  className="object-cover hover:scale-110 transition-transform duration-500"
                />
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* Interactive Map */}
      <SikkimMap />

 {/* Top Rated Packages */}
 <section className="py-20 bg-[#f8f7da]">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">
            <span className="text-zinc-800">Top Rated Packages</span>
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {packages.map((pkg, index) => (
              <PackageCard
                key={index}
                title={pkg.title}
                image={pkg.image}
                price={pkg.price}
                duration={pkg.duration}
                features={pkg.features}
                rating={4.9}
              />
            ))}
          </div>
         
        </div>
      </section>

      {/* photo gallery */}
     <PhotoGallery/>



     
    </div>
  )
}

