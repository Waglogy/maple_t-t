import Image from "next/image"
import { Button } from "@/components/ui/button"

export default function TestimonialsPage() {
  return (
    <div className="pt-16">
      {/* Hero Section */}
      <section className="relative h-[60vh] ">
        <div className="absolute inset-0 flex items-center justify-center text-white">
          <div className="text-center space-y-4">
            <h1 className="text-4xl md:text-6xl font-bold text-black">Testimonials</h1>
            <p className="text-xl max-w-2xl mx-auto text-black">
              Hear from our satisfied travelers
            </p>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">What Our Clients Say</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="bg-white p-6 rounded-lg shadow-lg">
              <p className="text-gray-600 mb-4">
                "Maple Leaf Tours provided an unforgettable experience. The attention to detail and personalized service were exceptional."
              </p>
              <div className="flex items-center">
                <Image
                  src="/path/to/client1.jpg"
                  alt="Client 1"
                  width={50}
                  height={50}
                  className="rounded-full"
                />
                <div className="ml-4">
                  <h3 className="text-xl font-semibold">John Doe</h3>
                  <p className="text-gray-500">Traveler</p>
                </div>
              </div>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-lg">
              <p className="text-gray-600 mb-4">
                "The luxury accommodations and local expertise made our trip to the Eastern Himalayas truly special."
              </p>
              <div className="flex items-center">
                <Image
                  src="/path/to/client2.jpg"
                  alt="Client 2"
                  width={50}
                  height={50}
                  className="rounded-full"
                />
                <div className="ml-4">
                  <h3 className="text-xl font-semibold">Jane Smith</h3>
                  <p className="text-gray-500">Traveler</p>
                </div>
              </div>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-lg">
              <p className="text-gray-600 mb-4">
                "I highly recommend Maple Leaf Tours for anyone looking to explore the beauty of the Eastern Himalayas."
              </p>
              <div className="flex items-center">
                <Image
                  src="/path/to/client3.jpg"
                  alt="Client 3"
                  width={50}
                  height={50}
                  className="rounded-full"
                />
                <div className="ml-4">
                  <h3 className="text-xl font-semibold">Emily Johnson</h3>
                  <p className="text-gray-500">Traveler</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20  text-black">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Ready to Share Your Experience?
          </h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto">
            We would love to hear about your journey with Maple Leaf Tours
          </p>
          <Button size="lg" variant="outline" className="bg-transparent text-black hover:bg-white hover:text-[#f45201]">
            Submit Your Testimonial
          </Button>
        </div>
      </section>
    </div>
  )
}

