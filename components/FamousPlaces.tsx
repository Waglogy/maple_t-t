"use client";

import Image from "next/image";
import { useState } from "react";

const places = [
  {
    name: "Baba Harbhajan Singh Memorial Temple",
    image: "/baba-temple.jpg",
    description: "Baba Harbhajan Mandir is located between Nathula and Jelepla Pass with an altitude of 13000 ft from the sea level. It is located at a distance of 50km from the capital of Sikkim, Gangtok. It is a memorial and a temple honoring Indian army soldier, folk hero, saint Baba Harbhajan Singh. The legend of baba goes 35 years back when the Sepoy Harbhajan Singh of the 23rd Punjab regiment went missing. A man hunt was launched and it took 3 days for his body to be found. It is believed that he himself led the soldiers to the site that the spirit of Baba Harbhajan protects all the soldiers in the high altitude terrain of the Eastern Himalayas.",
    location: "East Sikkim"
  },
  {
    name: "Dubdi Monastery",
    image: "/dubdi.jpg",
    description: "Dubdi Monastery, the first monastery of Sikkim occasionally called Yuksom Monastery is located at West Sikkim. It is a Buddhist monastery of the Nyingma sect of Tibetan Buddhism, established by Chogyal Namgyal in 1701. The literal meaning of 'Dubdi' in local language is 'the retreat'. This was the first monastery established soon after the consecration ceremony of the first Chogyal. It is an ideal place for lamas seeking meditation and was also known as the Hermit's Cell. Images of divinities, saints, other symbols and collection of manuscripts and texts are housed in the monastery. The statues of three lamas who were responsible for establishing Yuksom are also installed in the monastery.",
    location: "West Sikkim"
  },
  {
    name: "Nathula Pass",
    image: "/nathula.jpg",
    description: " Nathula, located on the old silk route is a mountain pass in the Himalayan peaks that co-joins Sikkim and China. Situated on the Indo-Tibetan border 14,450 ft above sea level, Nathu La is one of the most important Himalayan passes in the country. Nathu means 'listening ears', and La means 'pass'. Nathula is one of the three open trading border posts between India and China and is famous for its picturesque beauty. Nathula Pass experiences heavy snowfall during winter and a drop in the temperature to -25 degrees Celsius.",
    location: "East Sikkim"
  },
  {
    name: "Gurudongmar Lake",
    image: "/gurudongmar.jpg",
    description: " At an elevation of 17,800 ft, Gurudongmar Lake, situated in North Sikkim, is one of the highest lakes in the world. The lake is located about 5 kilometers south of the Chinese (Tibetan) border in the North District of Sikkim. The Gurudongmar Lake is one of the source streams which joins the Tso Lhamu and then forms the source of river Teesta. The lake has an area of 290 acres with a peripheral area of 5.34 kilometers. The area around the lake is Inhabited by yaks, blue sheep and animals accustomed to high mountain terrains. In the winter months, from November to mid May, the lake remains completely frozen. Indian tourists are allowed to visit the lake while foreigners are required to get a special permit from the Ministry of Home Affairs.",
    location: "North Sikkim"
  },
  {
    name: "Rabdentse Ruins",
    image: "/rabdentse.jpg",
    description: "Rabdentse was the second capital of the former Kingdom of Sikkim from 1870 to 1814. The ruins of Rabdentse Palace is just a walk away through the dense forest The Rabdentse complex also houses the Sidkeong Tulku Bird Park with about 200 of the 550 bird species found in Sikkim This monument has been declared as of national importance by the Archaeologicall Survey of India. During the summer season from March to May, the weather is exceptionally pleasant and the temperature ranges between 7°C to 28°C, a pleasant weather to move around and explore the place.",
    location: "West Sikkim"
  },
  {
    name: "Tsomgo Lake",
    image: "/tsomgo.jpg",
    description: "Tsomgo Lake, also known as Tsongmo Lake or Changgu Lake, is a glacial lake in East Sikkim. It is located at an elevation of 3,753 m (12,313 ft). The lake surface reflects different colors with change of seasons and is held in great reverence by the local people of Sikkim. Between December and March, the lake is surrounded by sheets of ice. During the months of April and May, the pleasant sights of Orchids and Rhododendrons would treat your eyes. Between June and November, the best view of the valley. mountains and the lake can be experienced. Some of the outdoor activities that can be enjoyed around Tsomgo Lake include trekking, yak riding, nature photography, and bird watching.",
    location: "East Sikkim"
  },
  {
    name: "Rumtek Monastery",
    image: "/rumtek.jpg",
    description: "Rumtek Monastery also called the Dharma Chakra Centre is located near the capital Gangtok. It is the seat-in-exile of the Gyalwang Karmapa of the Karma Kagyu sect of Buddhism. It was inaugurated in 1966 by the 16th Karmapa and is currently the largest monastery in Sikkim. The architectural wonder has been constructed in accordance to the traditional design of Tibetan monasteries. Adorned by silk paintings, murals and statues, an intricately decorated prayer hall is available on the ground floor of this main monastery building. May-June and September-November are the most perfect time to visit this monastery as it marks the beginning of Tibetan New Year, but one can visit the monastery anytime on their visit to Sikkim.",
    location: "East Sikkim"
  },
  {
    name: "Pemayangtse Monastery",
    image: "/pemayangtse.jpg",
    description: " The Pemayangtse monastery situated in West Sikkim is one of the oldest and the most important monasteries of Sikkim. The word Pemayangtse means 'Perfect Sublime Lotus'. The unique feature of the monastery is that there is an intricately carved wooden structure located on the top floor displaying a heavenly sphere known as 'Zangdokpalri'. Built as a three storied structure, the monastery depicts paintings on its walls and statues of saints and Rinpoches, deified in various floors. The monastery follows the Nyingma Order of Tibetan Buddhism and controls all other monasteries of that Order in Sikkim.",
    location: "West Sikkim"
  },
  {
    name: "Ranka Monastery",
    image: "/ranka.jpg",
    description: "Ranka Monastery also known as Lingdun Monastery is located 20kms from Gangtok The monastery follows the Zurmang Kagyud lineage of Buddhism and under the direction of the 12th successor of the lineage Zurmang Gharwang Rinpoche. It is surrounded by beautiful forested landscapes and many Bollywood movies have been shot around this monastery. The Sanctum seems to look as a prayer hall with the statue of Buddha situated in the central end of the hall and low tables lying in front of the statue. It is here that the Lamas recite the holy books. The walls of this prayer hall are decorated with beautiful hand paintings. The most celebrated festival at the Ranka Monastery is the Tibetan New Year Celebrations.",
    location: "East Sikkim"
  },
  {
    name: "Khecheopalri Lake",
    image: "/khecheopalri.jpg",
    description: " Amidst the serene atmosphere surrounded by trees, birds and nature at its best one will come across a beautiful magical lake in West Sikkim known as Khecheopalri Lake. Originally the lake was known as Kha-Chot-Palri which meant the heaven of Padmasambhava. The lake is believed to be a wish fulfilling lake and is worshipped by the Hindus and Buddhists. The most amazing feat about the lake is that despite being surrounded by trees, not a single leaf is seen floating on the surface of the lake as the birds around ensure that the lake is kept clean. There are many lively beautiful little fishes you will find playing gently in the mystical lake. This is also a sacred activity among the believers in Sikkim.",
    location: "West Sikkim"
  }
];

export default function FamousPlaces() {
  const [expandedDescriptions, setExpandedDescriptions] = useState<Record<string, boolean>>({});

  const toggleDescription = (id: string) => {
    setExpandedDescriptions(prev => ({
      ...prev,
      [id]: !prev[id]
    }));
  };

  return (
    <section className="py-20 bg-[#f9f7da]">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-8">
          Famous Places in <span className="text-[#f45201]">Sikkim</span>
        </h2>
        <p className="text-gray-600 text-center max-w-2xl mx-auto mb-12">
          Discover the enchanting beauty of Sikkim through its most iconic
          destinations. From ancient monasteries to pristine lakes and mountain
          passes, each location offers a unique glimpse into the region's rich
          cultural heritage and natural splendor.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {places.map((place, index) => {
            const isExpanded = expandedDescriptions[place.name];
            const shortDescription = place.description.substring(0, 150) + "...";
            
            return (
              <div
                key={index}
                className="bg-white rounded-lg shadow-lg overflow-hidden w-full"
              >
                <div className="relative h-48">
                  <Image
                    src={place.image}
                    alt={place.name}
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-semibold text-[#f45201] mb-2">
                    {place.name}
                  </h3>
                  <p className="text-gray-600 mb-2">
                    {isExpanded ? place.description : shortDescription}
                  </p>
                  {!isExpanded && place.description.length > 150 && (
                    <button
                      onClick={() => toggleDescription(place.name)}
                      className="text-[#f45201] hover:underline"
                    >
                      Read More
                    </button>
                  )}
                  {isExpanded && (
                    <button
                      onClick={() => toggleDescription(place.name)}
                      className="text-[#f45201] hover:underline"
                    >
                      Show Less
                    </button>
                  )}
                  <p className="text-sm text-gray-500 mt-2">
                    Location: {place.location}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}