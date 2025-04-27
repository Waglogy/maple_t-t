import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Script from "next/script"; // Import Script from Next.js
import "./globals.css";
import { Navigation } from "@/components/navigation";
import { Footer } from "@/components/footer";
import { Chatbot } from "@/components/chatbot";
import { AuthProvider } from "@/contexts/AuthContext";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Maple Tours & Travels",
  description: "Experience luxury travel with Maple Tours & Travels",
  icons: {
    icon: "/MAPLE LEAF logo design.png",
    shortcut: "/MAPLE LEAF logo design.png",
    apple: "/MAPLE LEAF logo design.png",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/MAPLE LEAF logo design.png" />
        <link rel="apple-touch-icon" href="/MAPLE LEAF logo design.png" />
        {/* Razorpay Checkout Script */}
        <Script
          src="https://checkout.razorpay.com/v1/checkout.js"
          strategy="beforeInteractive"
        />
      </head>
      <body className={inter.className} style={{ backgroundColor: "#f9f7da" }}>
        <AuthProvider>
          <Navigation />
          <main>{children}</main>
          <Chatbot />
          <Footer />
          <ToastContainer />
        </AuthProvider>
      </body>
    </html>
  );
}
