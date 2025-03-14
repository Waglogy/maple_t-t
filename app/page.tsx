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
            <div className="flex justify-center items-center bg-white rounded-full p-1 md:p-2">
  <p className="text-sm md:text-xl text-[#000000] font-medium uppercase tracking-wider">
    Welcome to the Land of <span className="text-[#f45201]">Mystical Wonders</span>
  </p>
</div>
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
            <span className="text-zinc-800">About Us & <span className="text-[#f45201]">Our Story</span></span>
          </h2>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <h3 className="text-2xl font-semibold text-black dark:text-white">
                About Maple Leafs
              </h3>
              <p className="text-black dark:text-white leading-relaxed">
                At Maple Leafs, we are passionate custodians of Sikkim's rich cultural heritage 
                and natural splendor. Our journey began with a profound vision: to share the 
                mystical beauty and ancient traditions of this Himalayan jewel with the world. 
                As a locally rooted travel curator, we specialize in crafting immersive 
                experiences that connect travelers with Sikkim's sacred monasteries, pristine 
                landscapes, and vibrant local communities.
              </p>
              <h3 className="text-2xl font-semibold text-black dark:text-white">
                Our Heritage Mission
              </h3>
              <p className="text-black dark:text-white leading-relaxed">
                We are dedicated to preserving and promoting Sikkim's centuries-old traditions, 
                from ancient Buddhist monasteries to indigenous Lepcha culture. Our expertly 
                curated journeys traverse through the land where Mahayana Buddhism flourishes 
                across 67 historic monasteries, and where the harmonious blend of Lepcha, 
                Bhutia, and Nepali communities creates a unique cultural tapestry. Whether 
                it's witnessing the sacred Pang Lhabsol festival, exploring the mystical 
                Khecheopalri Lake, or experiencing the traditional way of life in remote 
                mountain villages, we ensure every journey celebrates Sikkim's living heritage.
              </p>
              <p className="text-black dark:text-white leading-relaxed">
                From the ancient capital of Yuksom to the sacred peaks of Khangchendzonga, 
                our tours are thoughtfully designed to showcase both the tangible and 
                intangible heritage of Sikkim. We work closely with local communities, 
                monastery authorities, and cultural experts to provide authentic, respectful, 
                and enriching travel experiences that contribute to the preservation of 
                Sikkim's cultural legacy for future generations.
              </p>
              <Button className="gradient-btn" asChild>
                <Link href="/contact">Explore Our Heritage Tours</Link>
              </Button>
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-4">
                <div className="relative h-[300px] rounded-lg overflow-hidden border-2 border-[#f45201]/40 shadow-lg hover:shadow-xl transition-all duration-300">
                  <Image
                    src="/about1.jpg"
                    alt="Scenic mountain drive"
                    fill
                    className="object-cover hover:scale-105 transition-transform duration-500"
                    sizes="(max-width: 768px) 100vw, 50vw"
                    priority
                  />
                </div>
                <div className="relative h-[200px] rounded-lg overflow-hidden border-2 border-[#f45201]/40 shadow-lg hover:shadow-xl transition-all duration-300">
                  <Image
                    src="/about2.jpg"
                    alt="Luxury vehicle interior"
                    fill
                    className="object-cover hover:scale-105 transition-transform duration-500"
                    sizes="(max-width: 768px) 100vw, 50vw"
                    priority
                  />
                </div>
              </div>
              <div className="relative h-[520px] rounded-lg overflow-hidden border-2 border-[#f45201]/40 shadow-lg hover:shadow-xl transition-all duration-300">
                <Image
                  src="/about3.jpg"
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

 {/* Top Rated Packages */}
 <section className="py-20">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 bg-zinc-100 p-3 rounded-lg">
            <span className="text-zinc-800 dark:text-white"><span className="text-[#f45201]">Latest</span> Packages</span>
          </h2>
          
          {loading ? (
            <div className="flex justify-center items-center h-40">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#f45201]" />
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {recentPackages.map((pkg) => (
                <PackageCard
                  key={pkg._id}
                  title={pkg.title}
                  image={pkg.images[0]?.url || '/placeholder.jpg'}
                  price={pkg.price.amount}
                  duration={`${pkg.duration.days} Days | ${pkg.duration.nights} Nights`}
                  features={[
                    `Destination: ${pkg.destination}`,
                    ...(pkg.inclusions.slice(0, 3).map(inclusion => inclusion) || [
                      'All Inclusive Package',
                      'Luxury Transport',
                      'Premium Stays'
                    ])
                  ]}
                  rating={4.9}
                  pdfBrochure={pkg.pdfBrochure}
                />
              ))}

              {recentPackages.length === 0 && !loading && (
                <div className="col-span-3 text-center text-gray-500">
                  No packages available
                </div>
              )}
            </div>
          )}

          <div className="text-center mt-8">
            <Button 
              className="gradient-btn"
              asChild
            >
              <Link href="/packages">View All Packages</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* photo gallery */}
     <PhotoGallery/>



     
    </div>
  )
}

