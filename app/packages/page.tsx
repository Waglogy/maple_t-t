import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import Image from "next/image"
import { DownloadIcon } from "@/components/icons/download-icon"
import { DownloadButton } from "@/components/download-button"

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
    {/* Hero Section */}
<section 
  className="relative h-[60vh] bg-gradient-to-r from-[#010001] to-[#f45201] bg-cover bg-center" 
  style={{ backgroundImage: "url('/2.png')" }}
>
  <div className="absolute inset-0 flex items-center justify-center text-white">
    <div className="text-center space-y-4">
      <h1 className="text-4xl md:text-6xl font-bold">Exclusive Travel Packages</h1>
      <p className="text-xl max-w-2xl mx-auto text-white">
        Handpicked journeys through the Eastern Himalayas.
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
                  <div className="flex gap-4 mt-6">
                    <Button className="gradient-btn flex items-center gap-2">
                      Book Now
                    </Button>
                    <DownloadButton title={pkg.title} />
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

     
    </div>
  )
}

