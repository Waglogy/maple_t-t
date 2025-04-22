"use client";

import { useState, useEffect } from "react";
import { toast } from "react-toastify";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Card } from "@/components/ui/card";

interface UserProfile {
  firstName: string;
  lastName: string;
  email: string;
}

interface PasswordUpdate {
  currentPassword: string;
  newPassword: string;
  confirmPassword: string;
}

interface Booking {
  _id: string;
  package: {
    title: string;
    duration: string;
    price: {
      amount: number;
      currency: string;
    };
  };
  startDate: string;
  bookingStatus: string;
  totalAmount: number;
}

export default function ProfilePage() {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState<string | null>(null);
  const [userProfile, setUserProfile] = useState<UserProfile>({
    firstName: "",
    lastName: "",
    email: "",
  });
  const [passwordUpdate, setPasswordUpdate] = useState<PasswordUpdate>({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });
  const [showPasswordDialog, setShowPasswordDialog] = useState(false);
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [loadingBookings, setLoadingBookings] = useState(false);
  const [contactEmail, setContactEmail] = useState("");
  const [contactMessage, setContactMessage] = useState("");

  useEffect(() => {
    // Initialize token and user data
    if (typeof window !== "undefined") {
      const storedToken = localStorage.getItem("token");
      const storedUser = localStorage.getItem("user");

      if (storedToken) {
        setToken(storedToken);
      } else {
        toast.error("Please login again");
      }

      if (storedUser) {
        setUser(JSON.parse(storedUser));
      }
    }
  }, []);

  useEffect(() => {
    if (token) {
      fetchProfile();
      fetchBookings();
    }
  }, [token]);

  const fetchBookings = async () => {
    if (!token) return;

    setLoadingBookings(true);
    try {
      const response = await fetch(
        "https://maple-server-e7ye.onrender.com/api/bookings/my-bookings",
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      if (response.ok) {
        const data = await response.json();
        setBookings(data.data);
      } else {
        const errorData = await response.json();
        console.error("API Error:", errorData);
        toast.error(errorData.message || "Failed to fetch bookings");
      }
    } catch (error) {
      console.error("Error fetching bookings:", error);
      toast.error("Error fetching booking history");
    } finally {
      setLoadingBookings(false);
    }
  };

  const fetchProfile = async () => {
    if (!token) return;

    try {
      const response = await fetch(
        "https://maple-server-e7ye.onrender.com/api/user/profile",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.ok) {
        const data = await response.json();
        setUserProfile(data.data);
      }
    } catch (error) {
      console.error("Error fetching profile:", error);
    }
  };

  const handlePasswordUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!token) return;

    if (passwordUpdate.newPassword !== passwordUpdate.confirmPassword) {
      toast.error("Passwords do not match");
      return;
    }

    try {
      const response = await fetch(
        "https://maple-server-e7ye.onrender.com/api/user/password",
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            currentPassword: passwordUpdate.currentPassword,
            newPassword: passwordUpdate.newPassword,
          }),
        }
      );

      if (response.ok) {
        toast.success("Password updated successfully");
        setShowPasswordDialog(false);
        setPasswordUpdate({
          currentPassword: "",
          newPassword: "",
          confirmPassword: "",
        });
      }
    } catch (error) {
      toast.error("Error updating password");
    }
  };

  const handleContactAdmin = async (e: React.FormEvent) => {
    e.preventDefault();
    setContactMessage(
      "Thank you for contacting us! We will reach you within an hour."
    );
    setContactEmail("");
  };

  if (!token) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <p className="text-gray-600">Please login to view your profile</p>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-4 space-y-8 my-24">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Profile Section */}
        <Card className="p-6 col-span-2">
          <h2 className="text-xl font-semibold mb-4">Profile Details</h2>
          <div className="space-y-4">
            <div>
              <p className="text-sm text-gray-500">First Name</p>
              <p className="font-medium">{userProfile.firstName}</p>
            </div>
            <div>
              <p className="text-sm text-gray-500">Last Name</p>
              <p className="font-medium">{userProfile.lastName}</p>
            </div>
            <div>
              <p className="text-sm text-gray-500">Email</p>
              <p className="font-medium">{userProfile.email}</p>
            </div>
          </div>
        </Card>

        {/* Contact Admin Section */}
        <Card className="p-6">
          <h2 className="text-xl font-semibold mb-4">Contact Administration</h2>
          <form onSubmit={handleContactAdmin} className="space-y-4">
            <Input
              type="email"
              placeholder="Enter your email"
              value={contactEmail}
              onChange={(e) => setContactEmail(e.target.value)}
              required
            />
            <Button type="submit" className="w-full">
              Send
            </Button>
          </form>
          {contactMessage && (
            <p className="mt-4 text-sm text-green-600">{contactMessage}</p>
          )}
        </Card>
      </div>

      {/* Booking History Section */}
      <Card className="p-6">
        <h2 className="text-xl font-semibold mb-4">Booking History</h2>
        {loadingBookings ? (
          <div>Loading bookings...</div>
        ) : (
          <div className="space-y-4">
            {bookings.length > 0 ? (
              bookings.map((booking) => (
                <div key={booking._id} className="border rounded-lg p-4">
                  <div className="flex justify-between items-center">
                    <div>
                      <p className="font-medium">{booking.package.title}</p>
                      <p className="text-sm text-gray-500">
                        Booking ID: #{booking._id}
                      </p>
                    </div>
                    <Button variant="outline">View Details</Button>
                  </div>
                  <div className="my-2 border-t border-gray-200"></div>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                    <div>
                      <p className="text-gray-500">Start Date</p>
                      <p>{new Date(booking.startDate).toLocaleDateString()}</p>
                    </div>
                    <div>
                      <p className="text-gray-500">Duration</p>
                      <p>{booking.package.duration}</p>
                    </div>
                    <div>
                      <p className="text-gray-500">Status</p>
                      <p>{booking.bookingStatus}</p>
                    </div>
                    <div>
                      <p className="text-gray-500">Total Cost</p>
                      <p>
                        {booking.package.price.currency} {booking.totalAmount}
                      </p>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <p>No bookings found</p>
            )}
          </div>
        )}
      </Card>

      {/* Password Dialog */}
      <Dialog open={showPasswordDialog} onOpenChange={setShowPasswordDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Change Password</DialogTitle>
          </DialogHeader>
          <form onSubmit={handlePasswordUpdate} className="space-y-4">
            <div>
              <label htmlFor="currentPassword" className="text-sm font-medium">
                Current Password
              </label>
              <Input
                id="currentPassword"
                type="password"
                value={passwordUpdate.currentPassword}
                onChange={(e) =>
                  setPasswordUpdate({
                    ...passwordUpdate,
                    currentPassword: e.target.value,
                  })
                }
                className="mt-1"
              />
            </div>
            <div>
              <label htmlFor="newPassword" className="text-sm font-medium">
                New Password
              </label>
              <Input
                id="newPassword"
                type="password"
                value={passwordUpdate.newPassword}
                onChange={(e) =>
                  setPasswordUpdate({
                    ...passwordUpdate,
                    newPassword: e.target.value,
                  })
                }
                className="mt-1"
              />
            </div>
            <div>
              <label htmlFor="confirmPassword" className="text-sm font-medium">
                Confirm New Password
              </label>
              <Input
                id="confirmPassword"
                type="password"
                value={passwordUpdate.confirmPassword}
                onChange={(e) =>
                  setPasswordUpdate({
                    ...passwordUpdate,
                    confirmPassword: e.target.value,
                  })
                }
                className="mt-1"
              />
            </div>
            <Button type="submit" className="w-full">
              Update Password
            </Button>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
}
