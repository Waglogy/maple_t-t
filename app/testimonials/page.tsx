"use client"

import { useState, useEffect } from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Loader, Star } from "lucide-react";
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

interface Testimonial {
  _id: string;
  name: string;
  testimonial: string;
  rating: number;
  isApproved: boolean;
  createdAt: string;
}

interface TestimonialFormData {
  name: string;
  testimonial: string;
  rating: number;
}

export default function TestimonialsPage() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
  const [formData, setFormData] = useState<TestimonialFormData>({
    name: "",
    testimonial: "",
    rating: 5
  });
  const [hoverRating, setHoverRating] = useState(0);

  // Fetch approved testimonials
  const fetchTestimonials = async () => {
    try {
      const response = await fetch('https://maple-server-e7ye.onrender.com/api/testimonials/approved');
      const data = await response.json();
      
      if (response.ok) {
        setTestimonials(data.data);
      }
    } catch (error) {
      console.error('Error fetching testimonials:', error);
    }
  };

  useEffect(() => {
    fetchTestimonials();
  }, []);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleRatingClick = (rating: number) => {
    setFormData({ ...formData, rating });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await fetch('https://maple-server-e7ye.onrender.com/api/testimonials', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData)
      });

      const data = await response.json();

      if (response.ok) {
        toast.success(
          "Thank you for your testimonial! It will be displayed after review.",
          { autoClose: 5000 }
        );
        setFormData({ name: "", testimonial: "", rating: 5 });
        setIsModalOpen(false);
      } else {
        throw new Error(data.message || 'Failed to submit testimonial');
      }
    } catch (error) {
      toast.error('Failed to submit testimonial. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  // Star Rating Component
  const StarRating = ({ 
    rating, 
    hover, 
    onRatingClick, 
    onHoverIn, 
    onHoverOut,
    interactive = true
  }: {
    rating: number;
    hover?: number;
    onRatingClick?: (rating: number) => void;
    onHoverIn?: (rating: number) => void;
    onHoverOut?: () => void;
    interactive?: boolean;
  }) => {
    return (
      <div className="flex gap-1">
        {[1, 2, 3, 4, 5].map((star) => (
          <Star
            key={star}
            className={`w-6 h-6 ${
              star <= (hover || rating)
                ? 'fill-yellow-400 text-yellow-400'
                : 'text-gray-300'
            } ${interactive ? 'cursor-pointer' : ''}`}
            onClick={() => interactive && onRatingClick?.(star)}
            onMouseEnter={() => interactive && onHoverIn?.(star)}
            onMouseLeave={() => interactive && onHoverOut?.()}
          />
        ))}
      </div>
    );
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
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {testimonials.map((testimonial) => (
              <div key={testimonial._id} className="bg-white p-6 rounded-lg shadow-lg">
                <div className="mb-4">
                  <StarRating 
                    rating={testimonial.rating} 
                    interactive={false}
                  />
                </div>
                <p className="text-gray-600 mb-4">"{testimonial.testimonial}"</p>
                <div className="flex items-center">
                  <Image
                    src="/profile.jpg"
                    alt={testimonial.name}
                    width={50}
                    height={50}
                    className="rounded-full"
                  />
                  <div className="ml-4">
                    <h3 className="text-xl font-semibold">{testimonial.name}</h3>
                    <p className="text-gray-500">Traveler</p>
                  </div>
                </div>
              </div>
            ))}
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
            onClick={() => setIsModalOpen(true)}
          >
            Submit Your Testimonial
          </Button>
        </div>
      </section>

      {/* Testimonial Form Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="bg-white p-8 rounded-lg w-11/12 sm:w-1/2 md:w-1/3">
            <h3 className="text-2xl font-semibold text-center mb-6">
              Submit Your Testimonial
            </h3>
            <form onSubmit={handleSubmit}>
              <div className="mb-4">
                <label className="block text-sm font-medium mb-2">
                  Your Rating
                </label>
                <StarRating
                  rating={formData.rating}
                  hover={hoverRating}
                  onRatingClick={handleRatingClick}
                  onHoverIn={setHoverRating}
                  onHoverOut={() => setHoverRating(0)}
                />
              </div>

              <div className="mb-4">
                <label className="block text-sm font-medium mb-2" htmlFor="name">
                  Your Name
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
                  placeholder="Enter your name"
                  required
                  disabled={loading}
                />
              </div>

              <div className="mb-4">
                <label className="block text-sm font-medium mb-2" htmlFor="testimonial">
                  Your Testimonial
                </label>
                <textarea
                  id="testimonial"
                  name="testimonial"
                  value={formData.testimonial}
                  onChange={handleChange}
                  className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
                  rows={4}
                  placeholder="Share your experience with us"
                  required
                  disabled={loading}
                ></textarea>
              </div>

              <div className="flex justify-end">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => setIsModalOpen(false)}
                  className="mr-4 bg-transparent text-black hover:bg-white hover:text-[#f45201]"
                  disabled={loading}
                >
                  Close
                </Button>
                <Button
                  type="submit"
                  disabled={loading}
                  className="bg-transparent text-black hover:bg-white hover:text-[#f45201]"
                >
                  {loading ? (
                    <div className="flex items-center">
                      <Loader className="animate-spin mr-2" size={20} />
                      Submitting...
                    </div>
                  ) : (
                    'Submit'
                  )}
                </Button>
              </div>
            </form>
          </div>
        </div>
      )}

      <ToastContainer />
    </div>
  );
}
