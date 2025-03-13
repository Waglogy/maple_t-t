"use client"

import { useEffect, useState } from 'react'
import { useSearchParams, useRouter } from 'next/navigation'
import Link from 'next/link'
import { CheckCircle, Loader } from 'lucide-react'

interface SuccessPageProps {
  // Define your props if needed
}

export default function SuccessPage({}: SuccessPageProps) {
  const router = useRouter()
  const searchParams = useSearchParams()
  const [loading, setLoading] = useState(true)
  const [bookingDetails, setBookingDetails] = useState<any>(null)
  const bookingId = searchParams.get('bookingId')
  const amount = searchParams.get('amount')

  useEffect(() => {
    const fetchBookingDetails = async () => {
      if (!bookingId) return;

      try {
        const response = await fetch(`https://maple-server-e7ye.onrender.com/api/bookings/${bookingId}`, {
          headers: {
            'Authorization': `Bearer ${localStorage.getItem('token')}`
          }
        });
        const data = await response.json();
        
        if (data.success) {
          setBookingDetails(data.data);
        }
      } catch (error) {
        console.error('Error fetching booking details:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchBookingDetails();
  }, [bookingId]);

  useEffect(() => {
    if (!bookingId || !amount) {
      router.push('/');
    } else {
      setLoading(false);
    }
  }, [router, searchParams]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <Loader className="w-8 h-8 animate-spin text-[#f45201] mx-auto mb-4" />
          <p className="text-gray-600">Loading booking details...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="max-w-md w-full bg-white p-8 rounded-lg shadow-lg text-center">
        <div className="mb-6">
          <CheckCircle className="w-16 h-16 text-green-500 mx-auto" />
        </div>
        
        <h1 className="text-2xl font-bold text-gray-900 mb-4">
          Payment Successful!
        </h1>
        
        <div className="mb-6 text-gray-600">
          <p className="mb-2">Thank you for booking with Maple Leaf Tours!</p>
          <p className="mb-4">Your booking has been confirmed.</p>
          
          <div className="bg-gray-50 p-4 rounded-md mb-4">
            <p className="text-sm text-gray-500">Booking ID</p>
            <p className="font-medium">{bookingId}</p>
            
            <p className="text-sm text-gray-500 mt-2">Amount Paid</p>
            <p className="font-medium">₹{amount ? parseFloat(amount).toLocaleString('en-IN') : '0'}</p>
          </div>
          
          <p className="text-sm text-gray-500">
            A confirmation email has been sent to your registered email address.
          </p>
        </div>

        {bookingDetails && (
          <div className="bg-gray-50 p-4 rounded-md mb-4">
            <p className="text-sm text-gray-500">Package</p>
            <p className="font-medium">{bookingDetails.package.title}</p>
            
            <p className="text-sm text-gray-500 mt-2">Travel Date</p>
            <p className="font-medium">
              {new Date(bookingDetails.startDate).toLocaleDateString()}
            </p>
          </div>
        )}

        <div className="space-y-4">
          <Link 
            href="/packages" 
            className="block w-full bg-[#f45201] text-white py-2 px-4 rounded-md hover:bg-[#d94701] transition-colors"
          >
            Explore More Packages
          </Link>
          
          <Link 
            href="/" 
            className="block w-full border border-gray-300 text-gray-700 py-2 px-4 rounded-md hover:bg-gray-50 transition-colors"
          >
            Return to Home
          </Link>
        </div>
      </div>
    </div>
  )
} 