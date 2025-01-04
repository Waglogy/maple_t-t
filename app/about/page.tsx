import Image from "next/image"
import { Button } from "@/components/ui/button"

export default function AboutPage() {
  return (
    <div className="pt-16">
      {/* Hero Section */}
      <section className="relative h-[60vh] bg-gradient-to-r from-[#010001] to-[#f45201]">
        <div className="absolute inset-0 flex items-center justify-center text-white">
          <div className="text-center space-y-4">
            <h1 className="text-4xl md:text-6xl font-bold">About Maple Leaf Tours</h1>
            <p className="text-xl max-w-2xl mx-auto">
              Your Gateway to Eastern Himalayan Luxury Travel
            </p>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <Image
                src="/MAPLE LEAF logo design.png"
                alt="Maple Leaf Tours & Travels"
                width={400}
                height={400}
                className="w-full max-w-md mx-auto"
              />
            </div>
            <div className="space-y-6">
              <h2 className="text-3xl font-bold">Our Story</h2>
              <p className="text-gray-600">
                Founded with a passion for showcasing the breathtaking beauty of the Eastern Himalayas, 
                Maple Leaf Tours has been crafting exceptional travel experiences since 2010. We specialize 
                in luxury tours across Sikkim, Nepal, Kalimpong, and Bhutan, offering our clients 
                unparalleled access to the region's most stunning locations and cultural treasures.
              </p>
              <p className="text-gray-600">
                Our commitment to excellence, attention to detail, and deep local knowledge sets us apart 
                in creating memorable journeys that combine comfort, adventure, and cultural immersion.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-20 bg-gradient-to-b from-[#f8f7da] to-white">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">Why Choose Us</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white p-6 rounded-lg shadow-lg">
              <h3 className="text-xl font-semibold mb-4">Local Expertise</h3>
              <p className="text-gray-600">
                Our team's deep knowledge of the Eastern Himalayas ensures authentic and immersive experiences.
              </p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-lg">
              <h3 className="text-xl font-semibold mb-4">Luxury Accommodations</h3>
              <p className="text-gray-600">
                We partner with the finest hotels and resorts to provide unmatched comfort and hospitality.
              </p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-lg">
              <h3 className="text-xl font-semibold mb-4">Personalized Service</h3>
              <p className="text-gray-600">
                Every itinerary is tailored to meet your specific preferences and requirements.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Destinations */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">Our Destinations</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="relative h-80 rounded-lg overflow-hidden group">
              <Image
                src="https://images.unsplash.com/photo-1506905925346-21bda4d32df4"
                alt="Sikkim"
                fill
                className="object-cover transition-transform group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent flex items-end">
                <div className="p-6 text-white">
                  <h3 className="text-2xl font-bold mb-2">Sikkim</h3>
                  <p>Discover the mystical land of monasteries</p>
                </div>
              </div>
            </div>
            <div className="relative h-80 rounded-lg overflow-hidden group">
              <Image
                src="https://images.unsplash.com/photo-1544735716-392fe2489ffa"
                alt="Nepal"
                fill
                className="object-cover transition-transform group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent flex items-end">
                <div className="p-6 text-white">
                  <h3 className="text-2xl font-bold mb-2">Nepal</h3>
                  <p>Experience the majesty of the Himalayas</p>
                </div>
              </div>
            </div>
            <div className="relative h-80 rounded-lg overflow-hidden group">
              <Image
                src="https://images.unsplash.com/photo-1623238913973-21e45cced554"
                alt="Kalimpong"
                fill
                className="object-cover transition-transform group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent flex items-end">
                <div className="p-6 text-white">
                  <h3 className="text-2xl font-bold mb-2">Kalimpong</h3>
                  <p>Explore the hill station's colonial charm</p>
                </div>
              </div>
            </div>
            <div className="relative h-80 rounded-lg overflow-hidden group">
              <Image
                src="https://images.unsplash.com/photo-1553856622-d1b352e9a211"
                alt="Bhutan"
                fill
                className="object-cover transition-transform group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent flex items-end">
                <div className="p-6 text-white">
                  <h3 className="text-2xl font-bold mb-2">Bhutan</h3>
                  <p>Visit the last Shangri-La on Earth</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-[#f45201] to-[#010001] text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Ready to Start Your Journey?
          </h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto">
            Let us help you plan your perfect Eastern Himalayan adventure
          </p>
          <Button size="lg" variant="outline" className="bg-transparent text-white hover:bg-white hover:text-[#f45201]">
            Contact Us Today
          </Button>
        </div>
      </section>
    </div>
  )
}

