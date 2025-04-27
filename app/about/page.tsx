"use client";

import Image from "next/image";
import FamousPlaces from "@/components/FamousPlaces";
export default function AboutPage() {
  return (
    <div className="">
      {/* Hero Section */}
      <section
        className="relative h-[60vh] bg-gradient-to-r from-[#010001] to-[#f45201] bg-cover bg-center"
        style={{ backgroundImage: "url('/3.png')" }}
      >
        <div className="absolute inset-0 flex items-center justify-center text-white">
          <div className="text-center space-y-4 px-4">
            <h1 className="text-4xl md:text-6xl font-bold">Tourist Spots</h1>
            <p className="text-lg md:text-xl max-w-2xl mx-auto">
              Explore the breathtaking destinations of Sikkim
            </p>
          </div>
        </div>
      </section>

      <div className=" max-w-4xl mx-auto p-6">
        <FamousPlaces />
      </div>

      {/* Content Section */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 grid-rows-none lg:grid-rows-5 gap-4 max-w-4xl mx-auto p-6">
        {/* Heading + Long Content */}
        <div className="lg:col-span-2 lg:row-span-2">
          <h2 className="text-xl font-bold mb-2">Sikkim Adventure Paradise</h2>
          <p className="text-sm">
            Discover Sikkim, a land of rich culture and thrilling adventures.
            From snow-capped mountains to lush valleys, this Himalayan gem
            offers an array of activities including trekking, mountain biking,
            paragliding, and more. Experience the perfect blend of natural
            beauty and cultural heritage in this unique destination.
          </p>
        </div>

        {/* Text: Trekking */}
        <div className="lg:row-span-3 lg:col-start-2 lg:row-start-3">
          <h3 className="text-lg font-semibold mb-1">Trekking</h3>
          <p className="text-sm">
            Experience world-class trekking in the Himalayas with stunning views
            of Mt. Kanchendzonga. Traverse through forests of rhododendron and
            silver fir, encounter rich wildlife, and discover pristine
            landscapes. Choose from various trekking routes suitable for all
            skill levels.
          </p>
        </div>

        {/* Image: Trekking in Sikkim */}
        <div className="lg:row-span-3 lg:col-start-1 lg:row-start-3">
          <img
            src="/traking.jpg"
            alt="Trekking in Sikkim"
            className="w-full h-full object-cover rounded"
          />
        </div>

        {/* Image: Angling and Fishing */}
        <div className="lg:row-span-2 lg:col-start-3 lg:row-start-4">
          <img
            src="/camping.jpg"
            alt="Angling and Fishing in Sikkim"
            className="w-full h-full object-cover rounded"
          />
        </div>

        {/* Text: Mountaineering & Paragliding */}
        <div className="lg:row-span-5 lg:col-start-4 lg:row-start-1">
          <h3 className="text-lg font-semibold mb-1">
            Mountaineering & Paragliding
          </h3>
          <p className="text-sm">
            Conquer the majestic peaks of Sikkim including Frey Peak (5830m) and
            Mt. Jopuno (6010m) with proper permits. For aerial adventures,
            experience paragliding over stunning valleys and get a bird's-eye
            view of the Himalayan landscape. Both activities offer unique
            perspectives of Sikkim's natural beauty.
          </p>
        </div>

        {/* Image: Adventure in Sikkim */}
        <div className="lg:row-span-3 lg:col-start-5 lg:row-start-1">
          <img
            src="/mountaineering.jpg"
            alt="Adventure in Sikkim"
            className="w-full h-full object-cover rounded"
          />
        </div>

        {/* Image: Paragliding */}
        <div className="lg:row-span-2 lg:col-start-5 lg:row-start-4">
          <img
            src="para.jpg"
            alt="Paragliding in Sikkim"
            className="w-full h-full object-cover rounded"
          />
        </div>

        {/* Image: Scenic view */}
        <div className="lg:row-span-3 lg:col-start-3 lg:row-start-1">
          <img
            src="/treking.jpg"
            alt="Scenic view of Sikkim"
            className="w-full h-full object-cover rounded"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 grid-rows-none lg:grid-rows-5 gap-4 max-w-4xl mx-auto p-6">
        {/* Heading + Long Content */}
        <div className="lg:col-span-2 lg:row-span-2">
          <h2 className="text-xl font-bold mb-2">Rope Course</h2>
          <p className="text-sm">
            Experience thrilling rope courses in Sikkim featuring zip lines,
            traversing, and high ropes. These adventure activities combine
            physical challenges with stunning Himalayan views. Perfect for team
            building and personal adventure, suitable for all skill levels.
          </p>
        </div>

        {/* Text: Zip Line */}
        <div className="lg:row-span-3 lg:col-start-2 lg:row-start-3">
          <h3 className="text-lg font-semibold mb-1">Zip Line</h3>
          <p className="text-sm">
            Soar through the air on Sikkim's thrilling zip lines, offering an
            adrenaline-pumping experience with panoramic views of the Himalayan
            landscape. These high-speed rides provide a unique perspective of
            the region's natural beauty, perfect for adventure seekers.
          </p>
        </div>

        {/* Image: Trekking */}
        <div className="lg:row-span-3 lg:col-start-1 lg:row-start-3">
          <img
            src="/ropecourse.jpg"
            alt="Trekking in Sikkim"
            className="w-full h-full object-cover rounded"
          />
        </div>

        {/* Image: Angling and Fishing */}
        <div className="lg:row-span-2 lg:col-start-3 lg:row-start-4">
          <img
            src="/zipline.jpg"
            alt="Angling and Fishing in Sikkim"
            className="w-full h-full object-cover rounded"
          />
        </div>

        {/* Text: Mountain Biking & Angling */}
        <div className="lg:row-span-5 lg:col-start-4 lg:row-start-1">
          <h3 className="text-lg font-semibold mb-1">
            Mountain Biking & Angling
          </h3>
          <p className="text-sm">
            Experience thrilling mountain biking on Sikkim's rugged terrain,
            offering scenic routes through lush hills and traditional villages.
            Popular trails include Gangtok-Rumtek-Sang and
            Gangtok-Phodong-Rangrang. For fishing enthusiasts, Sikkim's rivers
            like Teesta and Rangeet are perfect for catching Mahasheer, Katley,
            and Trout. Best fishing seasons are March-May and August-September.
          </p>
        </div>

        {/* Image: Adventure in Sikkim */}
        <div className="lg:row-span-3 lg:col-start-5 lg:row-start-1">
          <img
            src="/mountb.jpg"
            alt="Adventure in Sikkim"
            className="w-full h-full object-cover rounded"
          />
        </div>

        {/* Image: Paragliding */}
        <div className="lg:row-span-2 lg:col-start-5 lg:row-start-4">
          <img
            src="/ankling.jpg"
            alt="Paragliding in Sikkim"
            className="w-full h-full object-cover rounded"
          />
        </div>

        {/* Image: Scenic View */}
        <div className="lg:row-span-3 lg:col-start-3 lg:row-start-1">
          <img
            src="/5.png"
            alt="Scenic view of Sikkim"
            className="w-full h-full object-cover rounded"
          />
        </div>
      </div>

      {/* Famous Places Section */}
    </div>
  );
}
