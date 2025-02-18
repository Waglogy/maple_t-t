"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import Image from "next/image";
import { DownloadButton } from "@/components/download-button";

export default function PackagesPage() {
  const [packages, setPackages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPackages = async () => {
      try {
        const response = await fetch("https://maplesserver.vercel.app/api/package");
        const data = await response.json();
        if (data.success) {
          setPackages(data.data); // Store fetched packages
        } else {
          setError("Failed to fetch packages");
        }
      } catch (err) {
        setError("Error fetching packages");
      } finally {
        setLoading(false);
      }
    };

    fetchPackages();
  }, []);

  return (
    <div className="pt-16">
      {/* Hero Section */}
      <section
        className="relative h-[60vh] bg-gradient-to-r from-[#010001] to-[#f45201] bg-cover bg-center"
        style={{ backgroundImage: "url('/2.png')" }}
      >
        <div className="absolute inset-0 flex items-center justify-center text-white">
          <div className="text-center space-y-4">
            <h1 className="text-4xl md:text-6xl font-bold">Exclusive Travel Packages</h1>
            <p className="text-xl max-w-2xl mx-auto text-white">
              Handpicked journeys through the Eastern Himalayas.
            </p>
          </div>
        </div>
      </section>



      {/* Packages Grid */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          {loading && <p className="text-center text-gray-600">Loading packages...</p>}
          {error && <p className="text-center text-red-500">{error}</p>}

          {!loading && !error && (
            <div className="grid md:grid-cols-2 gap-8">
              {packages.map((pkg) => (
                <Card key={pkg._id} className="overflow-hidden">
                  <div className="relative h-64">
                    <Image
                      src={pkg.image.url}
                      alt={pkg.title}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <CardContent className="p-8">
                    <div className="flex justify-between items-start mb-4">
                      <div className=" mr-10 ">
                        <h3 className="text-2xl font-bold">{pkg.title}</h3>
                        <p className="text-gray-600 ">{pkg.description}</p>
                      </div>
                      <div className="text-right ">
                        <p className="text-sm text-gray-500">From</p>
                        <p className="text-2xl font-bold text-[#f45201]">₹{pkg.price}</p>
                      </div>
                    </div>
                    <ul className="space-y-2 mb-6">
                      {pkg.features.map((feature, i) => (
                        <li key={i} className="flex items-center text-gray-600">
                          <span className="w-2 h-2 bg-[#f45201] rounded-full mr-2" />
                          {feature}
                        </li>
                      ))}
                    </ul>
                    <div className="flex gap-4 mt-6">
                      <Button className="gradient-btn flex items-center gap-2">
                        Book Now
                      </Button>
                      <DownloadButton title={pkg.title} />
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
