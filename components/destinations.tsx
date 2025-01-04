import Image from "next/image"
import { Button } from "@/components/ui/button"

const destinations = [
  {
    name: "Sikkim",
    image: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4",
    description: "Buddhist monasteries and mountain vistas"
  },
  {
    name: "Nepal",
    image: "https://images.unsplash.com/photo-1544735716-392fe2489ffa",
    description: "Ancient temples and Himalayan peaks"
  },
  {
    name: "Kalimpong",
    image: "https://images.unsplash.com/photo-1623238913973-21e45cced554",
    description: "Colonial heritage and panoramic views"
  },
  {
    name: "Bhutan",
    image: "https://images.unsplash.com/photo-1553856622-d1b352e9a211",
    description: "Land of the Thunder Dragon"
  }
]

export function Destinations() {
  return (
    <section className="py-20 bg-gradient-to-tr from-[#f8f7da] via-white to-[#f8f7da]">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">
          <span className="gradient-text">
            Featured Destinations
          </span>
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {destinations.map((destination, index) => (
            <div key={index} className="group relative h-[400px] rounded-lg overflow-hidden">
              <Image
                src={destination.image}
                alt={destination.name}
                fill
                className="object-cover transition-transform group-hover:scale-110 duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent">
                <div className="absolute bottom-0 left-0 right-0 p-6">
                  <h3 className="text-2xl font-bold text-white mb-2">{destination.name}</h3>
                  <p className="text-white/90 mb-4">{destination.description}</p>
                  <Button className="bg-gradient-to-r from-[#f45201] to-[#010001] hover:opacity-90">
                    Explore
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

