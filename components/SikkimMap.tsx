"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { MapPin } from "lucide-react"

// Types
interface Location {
  name: string
  description: string
  coordinates: {
    x: number
    y: number
  }
}

interface DistrictData {
  name: string
  capital: string
  color: string
  locations: Location[]
}

const sikkimData: Record<string, DistrictData> = {
  north: {
    name: "North District",
    capital: "Mangan",
    color: "rgba(244, 162, 97, 0.3)",
    locations: [
      {
        name: "Yumthang Valley",
        description:
          "Known as the 'Valley of Flowers', Yumthang is a paradise for nature lovers. It is home to the Shingba Rhododendron Sanctuary, featuring over 24 species of rhododendrons. The valley transforms into a colorful carpet of flowers from April to June. Yumthang also has natural hot springs, believed to have medicinal properties, and offers breathtaking views of snow-capped peaks, making it a must-visit for travelers seeking natural beauty and tranquility.",
        coordinates: { x: 500, y: 150 },
      },
      {
        name: "Lachen",
        description:
          "A scenic mountain village and the gateway to Gurudongmar Lake. Lachen is home to the Lachen Monastery, which reflects the traditional Tibetan Buddhist culture. The village hosts the annual 'Thanka' festival, which showcases Sikkimese traditions through dance, music, and rituals. It serves as a base for treks to Green Lake and Chopta Valley, offering mesmerizing views of the Himalayan ranges.",
        coordinates: { x: 400, y: 150 },
      },
      {
        name: "Gurudongmar Lake",
        description:
          "One of the highest lakes in the world, situated at an altitude of 17,800 ft, Gurudongmar is sacred to both Buddhists and Sikhs. According to legend, Guru Padmasambhava, the founder of Tibetan Buddhism, blessed the lake, ensuring it never completely freezes even in extreme winter. The crystal-clear waters and the surrounding barren yet majestic mountains make it a surreal and spiritual experience for visitors.",
        coordinates: { x: 520, y: 20 },
      },
      {
        name: "Lachung",
        description:
          "A picturesque mountain village with rich Tibetan-Buddhist culture, Lachung is famous for its apple orchards and the centuries-old Lachung Monastery. It serves as a gateway to Yumthang Valley and Zero Point. The village celebrates the annual Saga Dawa festival with traditional mask dances, showcasing the vibrant culture of the indigenous Lepcha and Bhutia communities.",
        coordinates: { x: 560, y: 220 },
      },
    ],
  },
  east: {
    name: "East District",
    capital: "Gangtok",
    color: "rgba(88, 129, 87, 0.3)",
    locations: [
      {
        name: "Tsomgo Lake",
        description:
          "A glacial lake located at an altitude of 12,400 ft, Tsomgo Lake is sacred to the local Sikkimese people. During winter, the lake freezes completely, while in summer, it reflects the surrounding snow-capped peaks. The lake is associated with ancient myths and is said to change colors based on spiritual vibrations. Nearby, visitors can experience Yak rides and enjoy the local delicacy, 'thukpa'.",
        coordinates: { x: 600, y: 500 },
      },
      {
        name: "Nathula Pass",
        description:
          "A historic trade route on the Indo-China border, Nathula was once part of the ancient Silk Route. It stands at 14,140 ft and offers breathtaking views of the Tibetan plateau. The pass is home to the Baba Harbhajan Singh Mandir, dedicated to an Indian soldier believed to protect the region even after his death. Nathula is an important symbol of India's border history and military heritage.",
        coordinates: { x: 600, y: 530 },
      },
      {
        name: "Rumtek Monastery",
        description:
          "The largest and most significant monastery in Sikkim, Rumtek Monastery serves as the seat of the Karma Kagyu lineage of Tibetan Buddhism. It houses rare artifacts, intricate murals, and the sacred Golden Stupa. The monastery is known for its grand masked dances during the annual 'Losar' festival, where monks perform religious dances symbolizing the victory of good over evil.",
        coordinates: { x: 420, y: 530 },
      },
    ],
  },
  south: {
    name: "South District",
    capital: "Namchi",
    color: "rgba(64, 145, 108, 0.3)",
    locations: [
      {
        name: "Samdruptse",
        description:
          "Home to the world's largest statue of Guru Padmasambhava, standing at 135 feet, Samdruptse is a major pilgrimage site. The hill is considered to be a 'wish-fulfilling' hill, deeply revered by Buddhists. The site offers panoramic views of the mountains and valleys and is an important spiritual landmark in Sikkim.",
        coordinates: { x: 350, y: 440 },
      },
      {
        name: "Temi Tea Garden",
        description:
          "The only tea estate in Sikkim, Temi Tea Garden is known for producing high-quality organic tea. The lush green plantation, established in 1969, provides scenic views of the surrounding Himalayan peaks. The garden follows sustainable farming practices, and visitors can take guided tours to understand the tea-making process while enjoying freshly brewed tea.",
        coordinates: { x: 340, y: 600 },
      },
      {
        name: "Ravangla",
        description:
          "A serene hill town known for its spiritual significance, Ravangla is home to the stunning Buddha Park, featuring a 130-foot statue of Lord Buddha. It is also a gateway to Maenam Wildlife Sanctuary, which houses red pandas and exotic bird species. The annual Pang Lhabsol festival, which celebrates the guardian deity of Sikkim, is a major cultural event here.",
        coordinates: { x: 350, y: 500 },
      },
    ],
  },
  west: {
    name: "West District",
    capital: "Gezing",
    color: "rgba(214, 40, 40, 0.3)",
    locations: [
      {
        name: "Pelling",
        description:
          "Pelling is a popular tourist destination offering stunning views of Kanchenjunga, the world's third-highest peak. It is home to the 18th-century Pemayangtse Monastery, a key center of Tibetan Buddhism. The Rabdentse Ruins, the former royal capital of Sikkim, provide a glimpse into the region's royal past. The annual Khangchendzonga Festival celebrates the cultural heritage through traditional music and dance.",
        coordinates: { x: 250, y: 520 },
      },
      {
        name: "Khecheopalri Lake",
        description:
          "A sacred lake known for its pristine waters, Khecheopalri is revered by both Buddhists and Hindus. Local legends say that not a single leaf is found floating on the lake, as birds pick them up instantly. It is a site of pilgrimage and meditation, surrounded by dense forests that add to its mystical aura.",
        coordinates: { x: 200, y: 400 },
      },
      {
        name: "Yuksom",
        description:
          "The first capital of Sikkim, Yuksom is a historical town where the first Chogyal (king) of Sikkim was crowned in 1642. The town is the starting point for treks to Dzongri and Goecha La. Yuksom is home to the Dubdi Monastery, the oldest monastery in Sikkim, and is a center of Buddhist heritage and eco-tourism.",
        coordinates: { x: 250, y: 600 },
      },
    ],
  },
};

interface SikkimMapProps {
  className?: string
  mapImage?: string
}

export default function SikkimInteractiveMap({
  className = "",
  mapImage = "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Blue%20And%20White%20Modern%20And%20Illustrated%20Sikkim%20Travel%20Poster%20(3)-WJlAXctgXAtU5WE5jYfbAUWxiZl2uP.png",
}: SikkimMapProps) {
  const [selectedLocation, setSelectedLocation] = useState<Location | null>(null)
  const [selectedDistrict, setSelectedDistrict] = useState<string | null>(null)
  const [showFullContent, setShowFullContent] = useState(false)

  const handleLocationClick = (location: Location, district: string) => {
    setSelectedLocation(location)
    setSelectedDistrict(district)
  }

  const sikkimIntroContent = `Situated in the eastern Himalayas, Sikkim is bounded in the north by the vast stretches of the Tibetan Plateau and to its west lies the kingdom of Nepal. In the east it is bounded by Bhutan and the Chumbi Valley of Tibet, and India stretches along its southern boundary. With an area of 2,818 square miles and measuring approximately 70 miles from north to south, Sikkim is a land of varied elevations ranging from 800 to over 28,000 feet above sea-level.

The population consists of approximately 1,72,000 inhabitants, of which over 90 percent live in the rural areas. The three main communities in Sikkim are the Lepchas, the Bhutias and the Nepalis. The Lepchas-who call themselves "Rong Pa" (Ravine Folk), are believed to have been the original inhabitants of Sikkim.

Mahayana Buddhism is the State Religion of Sikkim, with 67 monasteries including the historically significant ones at Pemayangtse, Tashiding, Phensang, Phodang, Rumtek and Ralang. The principal languages are Bhutia, Nepali and Lepcha, with English used extensively for official communications.

As a hereditary monarchy, Sikkim's development focuses on agriculture, producing cardamom, oranges, potatoes and apples as principal exports. The country also has significant forest resources, hydel power projects, and minerals including copper, coal, graphite, gypsum and iron.

For tourists, the recommended seasons are between mid-February and late May, during the Khang-chen-dzod-nga worship celebrations in early autumn, and from October to December. The scenic magnificence makes almost anywhere in Sikkim perfect for picnics and outdoor activities.`

  return (
    <div className={`container mx-auto p-4 space-y-6 ${className}`}>
      <div className="grid md:grid-cols-2 gap-6">
        <div className="relative">
          {/* Map Container */}
          <div className="relative w-[400px] h-[600px] mx-auto rounded-lg overflow-hidden 
                sm:w-[400px] md:w-[450px] lg:w-[500px]">

            {/* Background Image */}
            <img
              src={mapImage || "/placeholder.svg"}
              alt="Sikkim Map"
              className="absolute inset-0 w-[80%] h-[80%] object-contain mx-auto"
            />

            {/* SVG Overlay for Districts */}
            <svg viewBox="0 0 800 800" className="absolute inset-0 w-full h-full">
              {Object.entries(sikkimData).map(([key, district]) => (
                <g key={key}>
                  {/* District Locations */}
                  {district.locations.map((location, index) => (
                    <g
                      key={index}
                      transform={`translate(${location.coordinates.x}, ${location.coordinates.y})`}
                      className="cursor-pointer"
                      onClick={() => handleLocationClick(location, key)}
                    >
                      {/* Pulse Animation */}
                      <circle r="10" fill="white" className="animate-ping opacity-75" />
                      {/* Location Pin */}
                      <circle r="6" fill="white" stroke="currentColor" strokeWidth="2" />
                      {/* Location Name */}
                      <text
                        x="10"
                        y="0"
                        fill="white"
                        className="text-lg font-medium"
                        style={{
                          filter: "drop-shadow(1px 1px 1px rgba(0,0,0,0.5))",
                        }}
                      >
                        {location.name}
                      </text>
                    </g>
                  ))}
                </g>
              ))}
            </svg>
          </div>
        </div>

        {/* Location Information */}
        <div>
          {selectedLocation ? (
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <MapPin className="h-5 w-5" />
                  {selectedLocation.name}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-lg mb-4">District: {selectedDistrict && sikkimData[selectedDistrict].name}</p>
                <p className="text-muted-foreground">{selectedLocation.description}</p>
              </CardContent>
            </Card>
          ) : (
            <Card>
              <CardHeader>
                <CardTitle>Welcome to Sikkim</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-muted-foreground">
                  {showFullContent 
                    ? sikkimIntroContent 
                    : sikkimIntroContent.slice(0, 300) + "..."}
                </p>
                <button 
                  onClick={() => setShowFullContent(!showFullContent)}
                  className="text-primary hover:underline font-medium"
                >
                  {showFullContent ? "Read Less" : "Read More"}
                </button>
                <p className="text-sm text-muted-foreground mt-4">
                  Click on any location marker to view details about tourist attractions.
                </p>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  )
}

