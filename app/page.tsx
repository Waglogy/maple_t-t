"use client"; // Mark this file as a client component

import { useEffect,useState } from "react";
import { useRouter } from "next/navigation"; // Make sure this is only used in the client component
import { Button } from "@/components/ui/button";
import { Carousel } from "@/components/carousel";
import { PackageCard } from "@/components/package-card";
import Image from "next/image";
import Link from "next/link";
import SikkimMap from "@/components/SikkimMap";
import PhotoGallery from "@/components/PhotoGallery";
import { toast } from 'react-toastify';

interface Package {
  _id: string;
  title: string;
  description: string;
  destination: string;
  duration: {
    days: number;
    nights: number;
  };
  price: {
    amount: number;
    currency: string;
  };
  images: Array<{
    url: string;
    caption: string;
  }>;
  inclusions: string[];
  createdAt: string;
  featured: boolean;
  pdfBrochure?: {
    url: string;
    filename: string;
  };
}

const slides = [
  {
    url: "/1.png",
    title: "Discover Sacred Sikkim",
    description: "Journey through ancient monasteries and mystical landscapes of the Himalayan realm",
    buttonText: "Explore Sacred Tours"
  },
  {
    url: "/2.png",
    title: "Cultural Heritage Tours",
    description: "Experience the living traditions of Lepcha, Bhutia, and Nepali communities",
    buttonText: "View Heritage Packages"
  },
  {
    url: "/3.png",
    title: "Adventure in Paradise",
    description: "Trek through pristine valleys, serene lakes, and majestic mountain trails",
    buttonText: "Find Adventure Tours"
  }
];
export default function Home() {
  const [recentPackages, setRecentPackages] = useState<Package[]>([]);
  const [loading, setLoading] = useState(true);

  const router = useRouter();

  useEffect(() => {
    const fetchRecentPackages = async () => {
      try {
        const response = await fetch('https://maple-server-e7ye.onrender.com/api/packages');
        const data = await response.json();

        if (data.success) {
          // Sort packages by createdAt date and take the latest 3
          const latestPackages = data.data
            .sort((a: Package, b: Package) => {
              return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
            })
            .slice(0, 3);
          
          setRecentPackages(latestPackages);
        }
      } catch (error) {
        console.error('Error fetching packages:', error);
        toast.error('Failed to load recent packages');
      } finally {
        setLoading(false);
      }
    };

    fetchRecentPackages();
  }, []);

  const handleExploreClick = () => {
    router.push('/packages');
  };

  return (
    <div className="pt-100">
      {/* Hero Section with Carousel */}
      <section className="relative h-[100vh]">
        <Carousel slides={slides} />
        <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/30 to-transparent flex items-center justify-center">
          <div className="text-center text-white space-y-6 px-4 max-w-4xl">
            <div className="space-y-2">
              <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold leading-tight">
                {slides[0].title}
              </h1>
            </div>
            <p className="text-xl md:text-2xl max-w-2xl mx-auto font-light">
              {slides[0].description}
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mt-8">
              <Button
                size="lg"
                className="gradient-button hover:scale-105 transform transition-transform duration-300 min-w-[200px]"
                onClick={handleExploreClick}
              >
                Explore Packages
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="border-2 border-white text-black hover:bg-white hover:text-black transition-colors duration-300 min-w-[200px]"
                asChild
              >
                <Link href="/contact">Contact Us</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Our Story Section */}
      <section className="py-20 ">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">
            <span className="text-zinc-800">
              About Us & <span className="text-[#f45201]">Our Story</span>
            </span>
          </h2>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <h3 className="text-2xl font-semibold text-black dark:text-white">
                Welcome to Maple Leaf Tours and Travels
              </h3>
              <p className="text-black dark:text-white leading-relaxed">
                At Maple Leaf Tours and Travels, we believe that travel should
                be an elegant and effortless experience. We specialize in
                crafting refined journeys, designed for the discerning traveler
                who appreciates simplicity and sophistication. As custodians of
                Sikkim's rich cultural heritage and natural splendor, our
                journey began with a profound vision: to share the mystical
                beauty and ancient traditions of this Himalayan jewel with the
                world.
              </p>
              <h3 className="text-2xl font-semibold text-black dark:text-white">
                <span className="text-[#f45201]"> Our Philosophy</span>
              </h3>
              <p className="text-black dark:text-white leading-relaxed">
                We move away from the hurried and crowded, focusing instead on
                creating serene and memorable experiences. Our approach is
                rooted in personalized service, ensuring that every detail of
                your journey is meticulously planned and executed. From ancient
                Buddhist monasteries to indigenous Lepcha culture, our expertly
                curated journeys traverse through lands where Mahayana Buddhism
                flourishes across 67 historic monasteries, and where the
                harmonious blend of Lepcha, Bhutia, and Nepali communities
                creates a unique cultural tapestry.
              </p>
              <h3 className="text-2xl font-semibold text-black dark:text-white">
                <span className="text-[#f45201]">Our Services</span>
              </h3>
              <p className="text-black dark:text-white leading-relaxed">
                From curated itineraries that highlight the beauty of your
                chosen destinations to seamless travel logistics, we handle
                every aspect of your trip with grace and professionalism.
                Whether you seek tranquil escapes or culturally enriching
                adventures, we tailor our services to your individual
                preferences. Our offerings span from individual travel planning
                to group tours, each crafted with the same attention to detail
                and commitment to excellence that defines the Maple Leaf
                experience.
              </p>
              <Button className="gradient-btn" asChild>
                <Link href="/packages">Explore Our Packages</Link>
              </Button>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-4">
                <div className="relative h-[300px] rounded-sm overflow-hidden  hover:shadow-xl transition-all duration-300">
                  <Image
                    src="/MAPLE LEAF logo design.png"
                    alt="Scenic mountain drive"
                    fill
                    className="object-contain hover:scale-105 transition-transform duration-500 w-full h-full"
                    sizes="(max-width: 480px) 100vw, (max-width: 768px) 50vw, 33vw"
                    quality={100}
                    priority
                    style={{
                      objectFit: 'contain',
                      width: '100%',
                      height: '100%'
                    }}
                  />
                </div>
                <div className="relative h-[200px] rounded-sm shadow-lg overflow-hidden  hover:shadow-xl transition-all duration-300">
                  <Image
                    src="/9.png"
                    alt="Luxury vehicle interior"
                    fill
                    className="object-cover hover:scale-105 transition-transform duration-500"
                    sizes="(max-width: 768px) 100vw, 50vw"
                    priority
                  />
                </div>
              </div>
              <div className="relative h-[520px] rounded-sm overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300">
                <Image
                  src="/crysta5.jpg"
                  alt="Buddhist Monastery in Sikkim"
                  fill
                  className="object-cover hover:scale-105 transition-transform duration-500"
                  sizes="(max-width: 768px) 100vw, 50vw"
                  priority
                />
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* Interactive Map */}
      <SikkimMap />

      {/* photo gallery */}
      <PhotoGallery />
    </div>
  );
}

