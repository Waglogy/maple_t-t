"use client"

import { useState, useEffect } from "react";
import { useSearchParams, useRouter } from 'next/navigation';
import { toast } from 'react-toastify';
import { useAuth } from '@/contexts/AuthContext';

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

  const handlePayment = async () => {
    if (!amount || !bookingId) {
      toast.error('Invalid payment details');
      return;
    }

    setLoading(true);

    try {
      // Create order
      const orderResponse = await fetch("https://maple-server-e7ye.onrender.com/api/payment/create-order", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${localStorage.getItem('token')}`
        },
        body: JSON.stringify({
          amount: parseFloat(amount),
          receipt: `booking_${bookingId}`,
          currency: "INR"
        }),
      });

      const orderData = await orderResponse.json();

      if (!orderData.id) {
        throw new Error("Failed to create order");
      }

      // Initialize Razorpay
      const options = {
        key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID,
        amount: orderData.amount,
        currency: orderData.currency,
        name: "Maple Leaf Tours",
        description: `Booking ID: ${bookingId}`,
        order_id: orderData.id,
        prefill: {
          name: user?.firstName ? `${user.firstName} ${user.lastName}` : '',
          email: user?.email || '',
          contact: "",
        },
        notes: {
          bookingId: bookingId
        },
        handler: async function (response: any) {
          try {
            console.log("Payment response:", response); // Debug log

            const verifyResponse = await fetch("https://maple-server-e7ye.onrender.com/api/payment/verify-payment", {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${localStorage.getItem('token')}`
              },
              body: JSON.stringify({
                razorpay_order_id: response.razorpay_order_id,
                razorpay_payment_id: response.razorpay_payment_id,
                razorpay_signature: response.razorpay_signature,
                bookingId: bookingId // Include bookingId in verification
              }),
            });

            if (!verifyResponse.ok) {
              throw new Error(`Verification failed: ${verifyResponse.statusText}`);
            }

            const verifyData = await verifyResponse.json();

            console.log("Verification request:", {
              razorpay_order_id: response.razorpay_order_id,
              razorpay_payment_id: response.razorpay_payment_id,
              razorpay_signature: response.razorpay_signature,
              bookingId
            });

            console.log("Verification response:", verifyData);

            if (verifyData.success) {
              toast.success("Payment successful!");
              router.push(`/booking/success?bookingId=${bookingId}&amount=${amount}`);
            } else {
              throw new Error(verifyData.message || "Payment verification failed");
            }
          } catch (error) {
            console.error("Verification error:", error);
            toast.error("Payment verification failed");
          }
        },
        modal: {
          ondismiss: function() {
            setLoading(false);
          }
        },
        theme: {
          color: "#f45201"
        }
      };

      const razorpay = new (window as any).Razorpay(options);
      razorpay.open();
    } catch (error) {
      console.error("Payment error:", error);
      toast.error("Failed to initialize payment");
    } finally {
      setLoading(false);
    }
  };

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
