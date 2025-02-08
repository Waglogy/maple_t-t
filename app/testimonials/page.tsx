"use client"

import { useState } from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";

export default function TestimonialsPage() {
  // State for controlling the modal
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Function to toggle the modal
  const toggleModal = () => {
    setIsModalOpen(!isModalOpen);
  };

  return (
    <div className="pt-16">
      {/* Hero Section with Background Image */}
      <section
        className="relative h-[60vh] bg-cover bg-center"
        style={{
          backgroundImage: "url('/3.png')", // Add your background image URL here
        }}
      >
        <div className="absolute inset-0 flex items-center justify-center text-white bg-black bg-opacity-40">
          <div className="text-center space-y-4">
            <h1 className="text-4xl md:text-6xl font-bold">Testimonials</h1>
            <p className="text-xl max-w-2xl mx-auto">
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
            {/* Sample Testimonial 1 */}
            <div className="bg-white p-6 rounded-lg shadow-lg">
              <p className="text-gray-600 mb-4">
                "Maple Leaf Tours provided an unforgettable experience. The attention to detail and personalized service were exceptional. Every moment was memorable!"
              </p>
              <div className="flex items-center">
                <Image
                  src="/profile.jpg"
                  alt="Client 1"
                  width={50}
                  height={50}
                  className="rounded-full"
                />
                <div className="ml-4">
                  <h3 className="text-xl font-semibold">Bhupesh Sharma</h3>
                  <p className="text-gray-500">Traveler</p>
                </div>
              </div>
            </div>
            {/* Sample Testimonial 2 */}
            <div className="bg-white p-6 rounded-lg shadow-lg">
              <p className="text-gray-600 mb-4">
                "The luxury accommodations and local expertise made our trip to the Eastern Himalayas truly special. The tour guide was knowledgeable, and the experiences were authentic."
              </p>
              <div className="flex items-center">
                <Image
                  src="/profile.jpg"
                  alt="Client 2"
                  width={50}
                  height={50}
                  className="rounded-full"
                />
                <div className="ml-4">
                  <h3 className="text-xl font-semibold">Avishek Adhikari</h3>
                  <p className="text-gray-500">Traveler</p>
                </div>
              </div>
            </div>
            {/* Sample Testimonial 3 */}
            <div className="bg-white p-6 rounded-lg shadow-lg">
              <p className="text-gray-600 mb-4">
                "I highly recommend Maple Leaf Tours for anyone looking to explore the beauty of the Eastern Himalayas. The trip was well-planned, and every detail was taken care of."
              </p>
              <div className="flex items-center">
                <Image
                  src="/profile.jpg"
                  alt="Client 3"
                  width={50}
                  height={50}
                  className="rounded-full"
                />
                <div className="ml-4">
                  <h3 className="text-xl font-semibold">Roshan Chettri</h3>
                  <p className="text-gray-500">Traveler</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 text-black">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Ready to Share Your Experience?
          </h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto">
            We would love to hear about your journey with Maple Leaf Tours
          </p>
          <Button
            size="lg"
            variant="outline"
            className="bg-transparent text-black hover:bg-white hover:text-[#f45201]"
            onClick={toggleModal}
          >
            Submit Your Testimonial
          </Button>
        </div>
      </section>

      {/* Popup Form Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-8 rounded-lg w-11/12 sm:w-1/2 md:w-1/3">
            <h3 className="text-2xl font-semibold text-center mb-6">Submit Your Testimonial</h3>
            <form>
              <div className="mb-4">
                <label className="block text-sm font-medium mb-2" htmlFor="name">
                  Your Name
                </label>
                <input
                  type="text"
                  id="name"
                  className="w-full p-3 border border-gray-300 rounded-md"
                  placeholder="Enter your name"
                />
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium mb-2" htmlFor="testimonial">
                  Your Testimonial
                </label>
                <textarea
                  id="testimonial"
                  className="w-full p-3 border border-gray-300 rounded-md" rows = {4}
                  placeholder="Share your experience with us"
                ></textarea>
              </div>
              <div className="flex justify-end">
                <Button
                  variant="outline"
                  onClick={toggleModal}
                  className="mr-4 bg-transparent text-black hover:bg-white hover:text-[#f45201]"
                >
                  Close
                </Button>
                <Button size="lg" variant="outline" className="bg-transparent text-black hover:bg-white hover:text-[#f45201]">
                  Submit
                </Button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
