"use client"

import { useState, useEffect, useCallback } from "react";
import { useSearchParams, useRouter } from 'next/navigation';
import { toast } from 'react-toastify';
import { useAuth } from '@/contexts/AuthContext';

// Define interfaces for your API responses
interface ApiResponse<T> {
  success: boolean;
  message: string;
  data?: T;
}

// Define proper types for the response and error
interface PaymentResponse {
  success: boolean;
  message: string;
  data?: {
    id: string;
    amount: number;
    currency: string;
    // Add other expected properties
  };
}

interface RazorpayError {
  code: string;
  description: string;
  source: string;
  step: string;
  reason: string;
  metadata: {
    order_id: string;
    payment_id: string;
  };
}

interface RazorpayResponse {
  razorpay_payment_id: string;
  razorpay_order_id: string;
  razorpay_signature: string;
}

interface ErrorResponse {
  message: string;
  code?: number;
  // Add other potential error properties
}

// Define Razorpay window interface
declare global {
  interface Window {
    Razorpay: new (options: RazorpayOptions) => RazorpayInstance;
  }
}

interface RazorpayOptions {
  key: string;
  amount: number;
  currency: string;
  name: string;
  description: string;
  order_id: string;
  handler: (response: RazorpayResponse) => Promise<void>;
  prefill: {
    name: string;
    email: string;
    contact: string;
  };
  modal: {
    ondismiss: () => void;
  };
}

interface RazorpayInstance {
  open: () => void;
}

const Checkout = () => {
  const router = useRouter();
  const { user } = useAuth();
  const [loading, setLoading] = useState(false);
  const searchParams = useSearchParams();
  const amount = searchParams.get('amount');
  const bookingId = searchParams.get('bookingId');

  useEffect(() => {
    if (!amount || !bookingId) {
      toast.error('Invalid payment details');
      router.push('/packages');
    }
  }, [amount, bookingId]);

  // Use useCallback for the handler function
  const handlePayment = useCallback(async () => {
    try {
      setLoading(true);
      
      if (!bookingId || !amount) {
        toast.error('Invalid payment details');
        return;
      }

      const response = await fetch('/api/payment/create-order', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ amount, bookingId }),
      });

      const data: PaymentResponse = await response.json();

      if (!data.success) {
        throw new Error(data.message);
      }

      const options: RazorpayOptions = {
        key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID || '',
        amount: data.data?.amount || 0,
        currency: "INR",
        name: "Maple Tours",
        description: "Package Booking Payment",
        order_id: data.data?.id || '',
        handler: async (response: RazorpayResponse) => {
          try {
            const verificationResponse = await fetch('/api/payment/verify-payment', {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
              },
              body: JSON.stringify({
                ...response,
                bookingId,
              }),
            });

            const verificationData: PaymentResponse = await verificationResponse.json();

            if (verificationData.success) {
              toast.success('Payment successful!');
              router.push(`/booking/success?bookingId=${bookingId}&amount=${amount}`);
            } else {
              toast.error('Payment verification failed');
            }
          } catch (error) {
            if (error instanceof Error) {
              console.error('Verification error:', error.message);
            }
            toast.error('Payment verification failed');
          }
        },
        prefill: {
          name: "Customer Name",
          email: "customer@example.com",
          contact: "9999999999"
        },
        modal: {
          ondismiss: function() {
            setLoading(false);
          }
        }
      };

      const razorpay = new window.Razorpay(options);
      razorpay.open();
    } catch (error) {
      if (error instanceof Error) {
        console.error('Payment error:', error.message);
      }
      toast.error('Failed to initialize payment');
      setLoading(false);
    }
  }, [bookingId, amount, router]);

  useEffect(() => {
    const script = document.createElement('script');
    script.src = 'https://checkout.razorpay.com/v1/checkout.js';
    script.async = true;
    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
    };
  }, []);

  // Helper function to update booking status
  const updateBookingStatus = async (bookingId: string, paymentId: string) => {
    try {
      const response = await fetch(`https://maple-server-e7ye.onrender.com/api/bookings/${bookingId}/payment`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        },
        body: JSON.stringify({
          paymentId,
          status: 'completed'
        })
      });

      if (!response.ok) {
        throw new Error('Failed to update booking status');
      }
    } catch (error) {
      console.error('Error updating booking status:', error);
      toast.error('Payment successful but failed to update booking status');
    }
  };

  function handleError(error: ErrorResponse | Error) {
    console.error(error);
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50">
      <div className="bg-white p-8 rounded-lg shadow-lg max-w-md w-full">
        <h1 className="text-2xl font-bold mb-6 text-center">Complete Your Payment</h1>
        
        <div className="mb-8">
          <p className="text-gray-600 text-center">Booking ID:</p>
          <p className="text-sm font-medium text-center text-gray-500 mb-4">
            {bookingId}
          </p>
          <p className="text-gray-600 text-center">Total Amount:</p>
          <p className="text-3xl font-bold text-center text-[#f45201]">
            ₹{amount ? parseFloat(amount).toLocaleString('en-IN') : '0'}
          </p>
        </div>

        <button
          onClick={handlePayment}
          disabled={loading || !amount}
          className={`w-full py-3 px-4 rounded-lg text-white font-medium
            ${loading || !amount 
              ? 'bg-gray-400 cursor-not-allowed'
              : 'bg-[#f45201] hover:bg-[#d94701] transition-colors'
            }`}
        >
          {loading ? "Processing..." : "Pay Now"}
        </button>

        <p className="mt-4 text-sm text-gray-500 text-center">
          Secure payment powered by Razorpay
        </p>
      </div>
    </div>
  );
};

export default Checkout;
