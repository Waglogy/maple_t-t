import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Carousel } from "@/components/carousel"
import { PackageCard } from "@/components/package-card"
import Image from "next/image"
import Link from "next/link"

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
]

const luxuryStays = [
  {
    name: "Taj Tashi Bhutan",
    image: "https://images.unsplash.com/photo-1582719508461-905c673771fd",
    description: "Experience Bhutanese architecture with modern luxury"
  },
  {
    name: "Mayfair Gangtok",
    image: "https://images.unsplash.com/photo-1566073771259-6a8506099945",
    description: "Luxury amid the Himalayas"
  },
  {
    name: "Dwarika's Kathmandu",
    image: "https://images.unsplash.com/photo-1542314831-068cd1dbfeeb",
    description: "Heritage luxury in Nepal"
  },
  {
    name: "Elgin Mount Pandim",
    image: "https://images.unsplash.com/photo-1520250497591-112f2f40a3f4",
    description: "Heritage hotel with mountain views"
  },
  {
    name: "The Oberoi Cecil",
    image: "https://images.unsplash.com/photo-1584132967334-10e028bd69f7",
    description: "Colonial grandeur meets modern comfort"
  },
  {
    name: "Uma Paro Bhutan",
    image: "https://images.unsplash.com/photo-1445019980597-93fa8acb246c",
    description: "Intimate luxury in the heart of Paro"
  }
]

const vehicles = [
  {
    name: "Mercedes S-Class",
    image: "https://images.unsplash.com/photo-1583121274602-3e2820c69888",
    description: "Ultimate luxury sedan"
  },
  {
    name: "Toyota Land Cruiser",
    image: "https://images.unsplash.com/photo-1533473359331-0135ef1b58bf",
    description: "Premium SUV for mountain terrain"
  },
  {
    name: "BMW 7 Series",
    image: "https://images.unsplash.com/photo-1556189250-72ba954cfc2b",
    description: "Executive luxury car"
  },
  {
    name: "Range Rover",
    image: "https://images.unsplash.com/photo-1606664515524-ed2f786a0bd6",
    description: "Luxury all-terrain vehicle"
  }
]

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
]

export default function Home() {
  return (
    <div className="pt-100">
      {/* Hero Section with Carousel */}
      <section className="relative h-[90vh]">
        <Carousel slides={slides} />
        <div className="absolute inset-0 bg-black/30 flex items-center justify-center">
          <div className="text-center text-white space-y-4">
            <h1 className="text-4xl md:text-6xl font-bold">
              Discover Luxury Travel
            </h1>
            <p className="text-xl md:text-2xl max-w-2xl mx-auto">
              Experience the world's most breathtaking destinations with unparalleled comfort
            </p>
            <Button size="lg" className="gradient-button">
              Explore Packages
            </Button>
          </div>
        </div>
      </section>

      {/* Luxury Stays Section */}
      <section className="py-20 bg-gradient-to-br from-[#f8f7da] via-white to-[#f8f7da]">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">
            <span className="gradient-text">Luxurious Stays</span>
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {luxuryStays.map((stay, index) => (
              <Card key={index} className="gradient-card overflow-hidden group">
                <div className="relative h-64">
                  <Image
                    src={stay.image}
                    alt={stay.name}
                    fill
                    className="object-cover transition-transform group-hover:scale-105 duration-500"
                  />
                </div>
                <CardContent className="p-6">
                  <h3 className="text-xl font-semibold mb-2">{stay.name}</h3>
                  <p className="text-gray-600">{stay.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Luxury Vehicles Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">
            <span className="gradient-text">Luxury Vehicle Experience</span>
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <h3 className="text-2xl font-semibold">
                Travel in Ultimate Style
              </h3>
              <p className="text-gray-600">
                Choose from our fleet of premium vehicles for your journey. From luxury sedans to comfortable SUVs, 
                we ensure your travel is as memorable as your destination. Each vehicle comes with a professional 
                chauffeur and is maintained to the highest standards of comfort and safety.
              </p>
              <Button className="gradient-button" asChild>
                <Link href="/fleet">View Fleet</Link>
              </Button>
            </div>
            <div className="grid grid-cols-2 gap-4">
              {vehicles.map((vehicle, index) => (
                <div key={index} className="relative h-48 rounded-lg overflow-hidden group">
                  <Image
                    src={vehicle.image}
                    alt={vehicle.name}
                    fill
                    className="object-cover transition-transform group-hover:scale-110 duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <div className="absolute bottom-0 left-0 right-0 p-4">
                      <h4 className="text-white font-semibold">{vehicle.name}</h4>
                      <p className="text-white/80 text-sm">{vehicle.description}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Top Rated Packages */}
      <section className="py-20 bg-[#f8f7da]">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">
            <span className="gradient-text">Top Rated Packages</span>
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
          <div className="text-center mt-12">
            <Button size="lg" className="gradient-button">
              View All Packages
            </Button>
          </div>
        </div>
      </section>
    </div>
  )
}

