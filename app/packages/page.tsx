import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import Image from "next/image"

const packages = [
  {
    title: "Luxury Sikkim Expedition",
    description: "7 Days of royal treatment in the land of monasteries",
    price: "2,999",
    image: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4",
    features: [
      "5-star accommodation",
      "Private helicopter tours",
      "Personal guide",
      "Luxury vehicle"
    ]
  },
  {
    title: "Nepal Heritage Journey",
    description: "10 Days exploring Nepal's cultural treasures",
    price: "3,499",
    image: "https://images.unsplash.com/photo-1544735716-392fe2489ffa",
    features: [
      "Luxury hotel stays",
      "Private tours",
      "Cultural experiences",
      "Gourmet dining"
    ]
  },
  {
    title: "Kalimpong Retreat",
    description: "5 Days in colonial hill station luxury",
    price: "1,999",
    image: "https://images.unsplash.com/photo-1623238913973-21e45cced554",
    features: [
      "Heritage hotel stay",
      "Tea garden tours",
      "Spa treatments",
      "Mountain views"
    ]
  },
  {
    title: "Bhutan Royal Experience",
    description: "8 Days in the Kingdom of Happiness",
    price: "4,999",
    image: "https://images.unsplash.com/photo-1553856622-d1b352e9a211",
    features: [
      "Luxury dzong stays",
      "Private cultural tours",
      "Traditional spa",
      "Royal dining"
    ]
  }
]

export default function PackagesPage() {
  return (
    <div className="pt-16">
      {/* Hero Section */}
      <section className="relative h-[60vh] bg-gradient-to-r from-[#010001] to-[#f45201]">
        <div className="absolute inset-0 flex items-center justify-center text-white">
          <div className="text-center space-y-4">
            <h1 className="text-4xl md:text-6xl font-bold">Luxury Travel Packages</h1>
            <p className="text-xl max-w-2xl mx-auto">
              Curated experiences in the Eastern Himalayas
            </p>
          </div>
        </div>
      </section>

      {/* Packages Grid */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-8">
            {packages.map((pkg, index) => (
              <Card key={index} className="overflow-hidden">
                <div className="relative h-64">
                  <Image
                    src={pkg.image}
                    alt={pkg.title}
                    fill
                    className="object-cover"
                  />
                </div>
                <CardContent className="p-6">
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <h3 className="text-2xl font-bold">{pkg.title}</h3>
                      <p className="text-gray-600">{pkg.description}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-sm text-gray-500">Starting from</p>
                      <p className="text-2xl font-bold text-[#f45201]">${pkg.price}</p>
                    </div>
                  </div>
                  <ul className="space-y-2 mb-6">
                    {pkg.features.map((feature, i) => (
                      <li key={i} className="flex items-center text-gray-600">
                        <span className="w-2 h-2 bg-[#f45201] rounded-full mr-2" />
                        {feature}
                      </li>
                    ))}
                  </ul>
                  <Button className="w-full gradient-button">
                    Book Now
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Luxury Stays */}
      <section className="py-20 bg-gradient-to-b from-[#f8f7da] to-white">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">Luxury Accommodations</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="relative h-96 rounded-lg overflow-hidden group">
              <Image
                src="https://images.unsplash.com/photo-1566073771259-6a8506099945"
                alt="Luxury Resort"
                fill
                className="object-cover transition-transform group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent flex items-end">
                <div className="p-6 text-white">
                  <h3 className="text-2xl font-bold mb-2">5-Star Resorts</h3>
                  <p>Experience unmatched luxury and comfort</p>
                </div>
              </div>
            </div>
            <div className="relative h-96 rounded-lg overflow-hidden group">
              <Image
                src="https://images.unsplash.com/photo-1582719478250-c89cae4dc85b"
                alt="Heritage Hotels"
                fill
                className="object-cover transition-transform group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent flex items-end">
                <div className="p-6 text-white">
                  <h3 className="text-2xl font-bold mb-2">Heritage Hotels</h3>
                  <p>Stay in historic properties with modern amenities</p>
                </div>
              </div>
            </div>
            <div className="relative h-96 rounded-lg overflow-hidden group">
              <Image
                src="https://images.unsplash.com/photo-1601918774946-25832a4be0d6"
                alt="Boutique Lodges"
                fill
                className="object-cover transition-transform group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent flex items-end">
                <div className="p-6 text-white">
                  <h3 className="text-2xl font-bold mb-2">Boutique Lodges</h3>
                  <p>Intimate settings with personalized service</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

