"use client";

import Image from "next/image";

export default function AboutPage() {
  return (
    <div className="pt-16">
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
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            {/* Image Section */}
            <div className="relative h-[300px] w-full rounded-lg overflow-hidden">
              <Image
                src="/MAPLE LEAF logo design.png"
                alt="About Maple Tours"
                fill
                className="object-contain"
                sizes="(max-width: 768px) 100vw, 50vw"
              />
            </div>

            {/* Text Content */}
            <div className="space-y-8">
              <h2 className="text-3xl font-bold">
                Welcome to Maple Leaf Tours and Travels
              </h2>
              <p className="text-black">
                At Maple Leaf Tours and Travels, we believe that travel should
                be an elegant and effortless experience. We specialize in
                crafting refined journeys, designed for the discerning traveler
                who appreciates simplicity and sophistication.
              </p>

              <div className="space-y-6">
                <h3 className="text-2xl font-semibold text-[#f45201]">
                  Our Philosophy
                </h3>
                <p className="text-black">
                  We move away from the hurried and crowded, focusing instead on
                  creating serene and memorable experiences. Our approach is
                  rooted in personalized service, ensuring that every detail of
                  your journey is meticulously planned and executed.
                </p>
                <p className="text-black">
                  From ancient Buddhist monasteries to indigenous Lepcha
                  culture, our expertly curated journeys traverse through lands
                  where Mahayana Buddhism flourishes across 67 historic
                  monasteries, and where the harmonious blend of Lepcha, Bhutia,
                  and Nepali communities creates a unique cultural tapestry.
                </p>
              </div>

              <div className="space-y-6">
                <h3 className="text-2xl font-semibold text-[#f45201]">
                  Our Services
                </h3>
                <p className="text-gray-600">
                  From curated itineraries that highlight the beauty of your
                  chosen destinations to seamless travel logistics, we handle
                  every aspect of your trip with grace and professionalism.
                </p>
                <p className="text-black">
                  Whether you seek tranquil escapes or culturally enriching
                  adventures, we tailor our services to your individual
                  preferences. Our offerings span from individual travel
                  planning to group tours, each crafted with the same attention
                  to detail and commitment to excellence that defines the Maple
                  Leaf experience.
                </p>
              </div>

              <div className="space-y-6">
                <h3 className="text-2xl font-semibold text-[#f45201]">
                  Explore Our Packages
                </h3>
                <p className="text-gray-600">
                  Discover our carefully designed travel packages that showcase
                  the best of Sikkim. From luxury retreats to cultural
                  immersions, each package is a gateway to unforgettable
                  experiences.
                </p>
                <a
                  href="/packages"
                  className="inline-block bg-[#f45201] text-white px-6 py-3 rounded-md hover:bg-[#e64a00] transition-colors"
                >
                  View Packages
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}