import Link from "next/link";
import Image from "next/image";
import { Facebook, Instagram, Twitter, Heart } from "lucide-react";

export function Footer() {
  return (
    <footer className="relative bg-[#010001] text-white">
      {/* Background Image */}
      <div
        className="absolute inset-0 z-0"
        style={{
          backgroundImage: 'url("/1.png")',
          backgroundSize: "cover",
          backgroundPosition: "center",
          opacity: "0.15",
        }}
      />

      {/* Footer Content */}
      <div className="relative z-10 container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <div className="mb-2">
              <div className="flex items-center gap-2">
                <Image
                  src="/MAPLE LEAF logo design.png"
                  alt="Maple Leaf Tours Logo"
                  width={60}
                  height={60}
                  className="object-contain"
                />
                <div className="flex flex-col">
                  <h3 className="text-xl font-bold">Maple Leaf Tours</h3>
                  <p className="text-gray-400 text-sm italic font-light text-[#010001]/75">
                    Simple. Elegant. Classy
                  </p>
                </div>
              </div>
            </div>
          </div>
          <div>
            <h4 className="text-lg font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2">
              <li>
                <Link href="/about" className="text-gray-400 hover:text-white">
                  About Us
                </Link>
              </li>
              <li>
                <Link
                  href="/packages"
                  className="text-gray-400 hover:text-white"
                >
                  Packages
                </Link>
              </li>
              <li>
                <Link
                  href="/contact"
                  className="text-gray-400 hover:text-white"
                >
                  Contact
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h4 className="text-lg font-semibold mb-4">Contact Info</h4>
            <ul className="space-y-2 text-gray-400">
              <li>Maple Building,</li>
              <li>Behind S-Mart Departmental Store,</li>
              <li>Near Krishi Bhawan, Tadong</li>
              <li>Phone: +91 7001895132</li>
              <li>Email: Travelwithmaple2023@gmail.com</li>
            </ul>
          </div>
          <div>
            <h4 className="text-lg font-semibold mb-4">Follow Us</h4>
            <div className="flex space-x-4">
              <Link href="#" className="text-gray-400 hover:text-white">
                <Facebook />
              </Link>
              <Link href="#" className="text-gray-400 hover:text-white">
                <Twitter />
              </Link>
              <Link href="#" className="text-gray-400 hover:text-white">
                <Instagram />
              </Link>
            </div>
          </div>
        </div>
        <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
          <p>
            &copy; {new Date().getFullYear()} Maple Leaf Tours. All rights
            reserved.
          </p>
          <div className="mt-2 flex items-center justify-center gap-1">
            <span>Made with</span>
            <Heart className="h-4 w-4 text-red-500 fill-red-500" />
            <span>by</span>
            <Link
              href="https://www.waglogy.in"
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-400 hover:text-blue-300"
            >
              Waglogy
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
