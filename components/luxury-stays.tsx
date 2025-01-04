import Image from "next/image"
import { Card, CardContent } from "@/components/ui/card"

const luxuryStays = [
  {
    name: "Taj Tashi, Bhutan",
    image: "https://images.unsplash.com/photo-1566073771259-6a8506099945",
    description: "Experience Bhutanese architecture with modern luxury"
  },
  {
    name: "Mayfair Spa Resort, Gangtok",
    image: "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b",
    description: "Luxury amid the Himalayas"
  },
  {
    name: "Dwarika's Hotel, Kathmandu",
    image: "https://images.unsplash.com/photo-1601918774946-25832a4be0d6",
    description: "Heritage luxury in Nepal's capital"
  },
  {
    name: "Morgan House, Kalimpong",
    image: "https://images.unsplash.com/photo-1542314831-068cd1dbfeeb",
    description: "Colonial charm meets modern comfort"
  },
  {
    name: "Norkhil Boutique Hotel",
    image: "https://images.unsplash.com/photo-1520250497591-112f2f40a3f4",
    description: "Contemporary luxury in Bhutan"
  },
  {
    name: "Club Mahindra Gangtok",
    image: "https://images.unsplash.com/photo-1445019980597-93fa8acb246c",
    description: "Mountain views and premium amenities"
  }
]

export function LuxuryStays() {
  return (
    <section className="py-20 bg-gradient-to-br from-[#f8f7da] via-white to-[#f8f7da]">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">
          <span className="bg-gradient-to-r from-[#f45201] to-[#010001] bg-clip-text text-transparent">
            Luxurious Stays
          </span>
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {luxuryStays.map((stay, index) => (
            <Card key={index} className="overflow-hidden bg-gradient-to-b from-white to-[#f8f7da]/20">
              <div className="relative h-64">
                <Image
                  src={stay.image}
                  alt={stay.name}
                  fill
                  className="object-cover transition-transform hover:scale-105 duration-300"
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
  )
}

