"use client";  // This is necessary for client-side rendering

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";  // Use 'next/navigation' for Next.js 13+

const ProtectedPage = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(null); // null = loading, true = authenticated, false = not authenticated
  const router = useRouter();

  useEffect(() => {
    // Check if window object exists (client-side)
    if (typeof window === "undefined") return;
  
    const checkAuth = async () => {
      try {
        const token = localStorage.getItem("token");
  
        if (!token) {
          // No token found, redirect to login page
          console.log("No token found, redirecting to login...");
          router.replace("/login");
          return;
        }
  
        console.log("Checking token before request:", token);
  
        const response = await fetch("https://maplesserver.vercel.app/api/user", {
          method: "GET",
          headers: {
            "Authorization": `Bearer ${token}`,
          },
        });
  
        console.log("Auth Response Status:", response.status);
  
        if (response.ok) {
          const data = await response.json();
          console.log("Auth Data:", data);
  
          if (data.success) {
            console.log("Authenticated user, showing protected content...");
            setIsAuthenticated(true);
          } else {
            // User is not authenticated, redirect to login
            console.log("Not authenticated. Redirecting...");
            localStorage.removeItem("token");
            router.replace("/login");
          }
        } else {
          // API call failed, redirect to login
          console.log("API call failed. Redirecting...");
          localStorage.removeItem("token");
          router.replace("/login");
        }
      } catch (error) {
        console.error("Authentication error:", error);
        router.replace("/login");
      }
    };
  
    checkAuth();
  }, [router]);
  

  // While the authentication status is loading, show a loading screen or message
  if (isAuthenticated === null) {
    return <div>Loading...</div>;
  }

  // Return the protected content only if the user is authenticated
  if (isAuthenticated) {
    return (
      <div>
        <h1>Protected Content</h1>
        <p>Only accessible to logged-in users!</p>
        {/* Add more protected content here */}
      </div>
    );
  }

  // If not authenticated, redirecting should have already occurred, no need to render anything here
  return null;
};

export default ProtectedPage;
