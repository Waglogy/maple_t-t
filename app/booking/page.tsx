"use client"

import { useEffect, useState } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import { toast } from 'react-toastify'

// Match the schema exactly
interface BookingFormData {
  package: string; // This will be the package ID
  startDate: string;
  numberOfPeople: {
    adults: number;
    children: number;
  };
  totalAmount: number;
  contactDetails: {
    phone: string;
    alternatePhone?: string;
    email: string;
  };
  specialRequirements?: string;
  // These will be handled by backend
  bookingStatus?: 'pending' | 'confirmed' | 'cancelled';
  paymentStatus?: 'pending' | 'completed' | 'failed';
}

interface PackageDetails {
  _id: string;
  title: string;
  price: {
    amount: number;
    currency: string;
  };
  duration: {
    days: number;
    nights: number;
  };
}

interface BookingResponse {
  success: boolean;
  data: {
    _id: string;
    paymentStatus: string;
  };
}

interface BookingData {
  // Define your booking data structure
}

export default function BookingPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const packageId = searchParams.get('packageId');
  const packageTitle = searchParams.get('title');

  const [packageDetails, setPackageDetails] = useState<PackageDetails | null>(null);
  const [loading, setLoading] = useState(true);
  const [bookingData, setBookingData] = useState<BookingData | null>(null);

  const [formData, setFormData] = useState<BookingFormData>({
    package: packageId || '',
    startDate: '',
    numberOfPeople: {
      adults: 1,
      children: 0
    },
    totalAmount: 0,
    contactDetails: {
      phone: '',
      alternatePhone: '',
      email: ''
    },
    specialRequirements: ''
  });

  // Add new state for booking confirmation modal
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [bookingId, setBookingId] = useState<string>('');

  useEffect(() => {
    if (!packageId) {
      toast.error('No package selected');
      router.push('/packages');
      return;
    }

    const fetchPackageDetails = async () => {
      try {
        const response = await fetch(`https://maple-server-e7ye.onrender.com/api/packages/${packageId}`);
        
        if (!response.ok) {
          throw new Error('Failed to fetch package details');
        }
        
        const data = await response.json();
        
        if (data.success) {
          setPackageDetails(data.data);
          setFormData(prev => ({
            ...prev,
            package: data.data._id,
            totalAmount: data.data.price.amount
          }));
        } else {
          throw new Error(data.message);
        }
      } catch (error) {
        toast.error('Failed to load package details');
        router.push('/packages');
      } finally {
        setLoading(false);
      }
    };

    fetchPackageDetails();
  }, [packageId]);

  useEffect(() => {
    const fetchBookingData = async () => {
      try {
        // Your fetch logic here
        setLoading(false);
      } catch (err) {
        setLoading(false);
        if (err instanceof Error) {
          console.error('Fetch error:', err.message);
        }
      }
    };

    fetchBookingData();
  }, [router]); // Added router as dependency

  const calculateTotalAmount = () => {
    if (!packageDetails) return 0;
    const { adults, children } = formData.numberOfPeople;
    return packageDetails.price.amount * (adults + (children * 0.5));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        toast.error('Please login to make a booking');
        router.push('/login');
        return;
      }

      const totalAmount = calculateTotalAmount();
      const bookingData = {
        ...formData,
        totalAmount,
        startDate: new Date(formData.startDate).toISOString(),
        paymentStatus: 'pending'
      };

      const response = await fetch('https://maple-server-e7ye.onrender.com/api/bookings', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(bookingData)
      });

      const data: BookingResponse = await response.json();

      if (data.success) {
        setBookingId(data.data._id);
        // Store booking details in localStorage for payment reference
        localStorage.setItem('currentBooking', JSON.stringify({
          bookingId: data.data._id,
          amount: totalAmount,
          packageTitle: packageTitle
        }));
        setShowConfirmation(true);
        toast.success('Booking created successfully!');
      } else {
throw new Error('Failed to create booking');
      }
    } catch (error) {
      toast.error('Failed to create booking');
    }
  };

  const handlePaymentRedirect = () => {
    if (bookingId) {
      const totalAmount = calculateTotalAmount();
      router.push(`/booking/${bookingId}/payment?amount=${totalAmount}&bookingId=${bookingId}`);
    }
  };

  // Confirmation Modal Component
  const BookingConfirmationModal = () => {
    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
        <div className="bg-white rounded-lg p-8 max-w-md w-full mx-4">
          <h2 className="text-2xl font-bold mb-4">Booking Confirmed!</h2>
          <p className="text-gray-600 mb-6">
            Your booking has been successfully created. Please complete the payment to confirm your reservation.
          </p>
          <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 mb-6">
            <div className="flex">
              <div className="flex-shrink-0">
                <svg className="h-5 w-5 text-yellow-400" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                </svg>
              </div>
              <div className="ml-3">
                <p className="text-sm text-yellow-700">
                  Payment Status: <span className="font-semibold">Not Paid</span>
                </p>
              </div>
            </div>
          </div>
          <div className="flex justify-end space-x-4">
            <button
              onClick={() => setShowConfirmation(false)}
              className="px-4 py-2 text-gray-600 hover:text-gray-800"
            >
              Close
            </button>
            <button
              onClick={handlePaymentRedirect}
              className="bg-primary text-white px-6 py-2 rounded-md hover:bg-primary-dark"
            >
              Complete Payment
            </button>
          </div>
        </div>
      </div>
    );
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
      </div>
    );
  }

  return (<>
  <section 
  className="relative h-[60vh] bg-gradient-to-r from-[#010001] to-[#f45201] bg-cover bg-center" 
  style={{ backgroundImage: "url('/3.png')" }}
>
        <div className="absolute inset-0 flex items-center justify-center text-white">
          <div className="text-center space-y-4">
            <h1 className="text-4xl md:text-6xl font-bold"> {packageTitle}</h1>
            <p className="text-xl max-w-2xl mx-auto">
              Let's plan your perfect journey together
            </p>
          </div>
        </div>
      </section>
    <div className="max-w-4xl mx-auto p-6 ">
      <div className="bg-white rounded-lg shadow-lg p-6">
        <h1 className="text-2xl font-bold mb-6">Book Your Package</h1>

        {/* Package Summary */}
        <div className="bg-gray-50 p-4 rounded-md mb-6">
          <h2 className="text-lg font-semibold mb-2">{packageTitle}</h2>
          {packageDetails && (
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div>
                <p className="text-gray-600">Duration</p>
                <p className="font-medium">{packageDetails.duration.days} Days, {packageDetails.duration.nights} Nights</p>
              </div>
              <div>
                <p className="text-gray-600">Price </p>
                <p className="font-medium">{packageDetails.price.currency} {packageDetails.price.amount.toLocaleString()}</p>
              </div>
            </div>
          )}
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Start Date */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Start Date</label>
            <input
              type="date"
              min={new Date().toISOString().split('T')[0]}
              value={formData.startDate}
              onChange={(e) => setFormData({ ...formData, startDate: e.target.value })}
              required
              className="w-full p-2 border rounded-md"
            />
          </div>

          {/* Number of People */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Adults</label>
              <input
                type="number"
                min="1"
                value={formData.numberOfPeople.adults}
                onChange={(e) => setFormData({
                  ...formData,
                  numberOfPeople: {
                    ...formData.numberOfPeople,
                    adults: parseInt(e.target.value)
                  },
                  totalAmount: calculateTotalAmount()
                })}
                required
                className="w-full p-2 border rounded-md"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Children</label>
              <input
                type="number"
                min="0"
                value={formData.numberOfPeople.children}
                onChange={(e) => setFormData({
                  ...formData,
                  numberOfPeople: {
                    ...formData.numberOfPeople,
                    children: parseInt(e.target.value)
                  },
                  totalAmount: calculateTotalAmount()
                })}
                className="w-full p-2 border rounded-md"
              />
            </div>
          </div>

          {/* Contact Details */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
            <input
              type="email"
              value={formData.contactDetails.email}
              onChange={(e) => setFormData({
                ...formData,
                contactDetails: { ...formData.contactDetails, email: e.target.value }
              })}
              required
              className="w-full p-2 border rounded-md"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Phone Number</label>
              <input
                type="tel"
                value={formData.contactDetails.phone}
                onChange={(e) => setFormData({
                  ...formData,
                  contactDetails: { ...formData.contactDetails, phone: e.target.value }
                })}
                required
                className="w-full p-2 border rounded-md"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Alternate Phone</label>
              <input
                type="tel"
                value={formData.contactDetails.alternatePhone}
                onChange={(e) => setFormData({
                  ...formData,
                  contactDetails: { ...formData.contactDetails, alternatePhone: e.target.value }
                })}
                className="w-full p-2 border rounded-md"
              />
            </div>
          </div>

          {/* Special Requirements */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Special Requirements</label>
            <textarea
              value={formData.specialRequirements}
              onChange={(e) => setFormData({ ...formData, specialRequirements: e.target.value })}
              rows={3}
              className="w-full p-2 border rounded-md"
              placeholder="Any special requests or requirements..."
            />
          </div>

          {/* Total Amount */}
          <div className="border-t pt-4">
            <div className="flex justify-between items-center">
              <div>
                <p className="text-gray-600">Total Amount</p>
                <p className="text-2xl font-bold">
                  {packageDetails?.price.currency} {calculateTotalAmount().toLocaleString()}
                </p>
              </div>
              <button
                type="submit"
                className="bg-primary text-white px-6 py-2 rounded-md hover:bg-primary-dark"
              >
                Proceed to Payment
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>

    {/* Render confirmation modal when showConfirmation is true */}
    {showConfirmation && <BookingConfirmationModal />}
    </>
  );
}