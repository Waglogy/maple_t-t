import { Button } from "@/components/ui/button"
import Image from "next/image"

const vehicles = [
  {
    name: "Mercedes S-Class",
    image: "https://images.unsplash.com/photo-1583121274602-3e2820c69888",
    description: "Ultimate luxury sedan",
    features: [
      "Leather interior",
      "Climate control",
      "Professional chauffeur",
      "Wi-Fi enabled",
      "Refreshment cooler"
    ],
    capacity: "3 passengers",
    ideal: "Airport transfers, City tours"
  },
  {
    name: "Toyota Land Cruiser",
    image: "https://images.unsplash.com/photo-1533473359331-0135ef1b58bf",
    description: "Premium SUV for mountain terrain",
    features: [
      "All-wheel drive",
      "Elevated seating",
      "Luggage space",
      "Mountain-ready",
      "Premium sound system"
    ],
    capacity: "6 passengers",
    ideal: "Mountain tours, Group travel"
  },
  {
    name: "BMW 7 Series",
    image: "https://images.unsplash.com/photo-1556189250-72ba954cfc2b",
    description: "Executive luxury car",
    features: [
      "Premium leather seats",
      "Ambient lighting",
      "Executive rear seating",
      "Built-in massage",
      "Entertainment system"
    ],
    capacity: "3 passengers",
    ideal: "Business travel, VIP transport"
  },
  {
    name: "Range Rover",
    image: "https://images.unsplash.com/photo-1606664515524-ed2f786a0bd6",
    description: "Luxury all-terrain vehicle",
    features: [
      "Terrain response system",
      "Panoramic roof",
      "Premium meridian sound",
      "Heated/cooled seats",
      "Advanced off-road capability"
    ],
    capacity: "5 passengers",
    ideal: "Luxury safaris, Adventure tours"
  }
]

export default function FleetPage() {
  return (
    <div className="pt-24 pb-20 mt-10">
      <div className="container mx-auto px-4">
        <h1 className="text-4xl md:text-5xl font-bold text-center mb-4">
          <span className="gradient-text">Our Luxury Fleet</span>
        </h1>
        <p className="text-gray-600 text-center max-w-2xl mx-auto mb-16">
          Experience unparalleled comfort and style with our carefully curated collection of premium vehicles,
          each maintained to the highest standards and operated by professional chauffeurs.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {vehicles.map((vehicle, index) => (
            <div key={index} className="bg-white rounded-lg overflow-hidden shadow-lg">
              <div className="relative h-64">
                <Image
                  src={vehicle.image}
                  alt={vehicle.name}
                  fill
                  className="object-cover"
                />
              </div>
              <div className="p-6">
                <h2 className="text-2xl font-semibold mb-2">{vehicle.name}</h2>
                <p className="text-gray-600 mb-4">{vehicle.description}</p>
                
                <div className="space-y-4">
                  <div>
                    <h3 className="text-lg font-medium mb-2">Key Features:</h3>
                    <ul className="grid grid-cols-2 gap-2">
                      {vehicle.features.map((feature, idx) => (
                        <li key={idx} className="flex items-center text-gray-600">
                          <span className="mr-2">•</span>
                          {feature}
                        </li>
                      ))}
                    </ul>
                  </div>
                  
                  <div className="flex justify-between items-center pt-4 border-t">
                    <div>
                      <p className="font-medium">Capacity: {vehicle.capacity}</p>
                      <p className="text-gray-600">Ideal for: {vehicle.ideal}</p>
                    </div>
                    <Button className="gradient-button">
                      Book Now
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
} 