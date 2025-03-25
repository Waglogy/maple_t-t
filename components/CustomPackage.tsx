"use client";

import { useState } from "react";

const famousPlaces = [
  "Baba Harbhajan Singh Memorial Temple",
  "Dubdi Monastery",
  "Nathula Pass",
  "Gurudongmar Lake",
  "Rabdentse Ruins",
  "Tsomgo Lake",
  "Rumtek Monastery",
  "Pemayangtse Monastery",
  "Ranka Monastery",
  "Khecheopalri Lake",
  "Yumthang Valley",
  "Lachung",
  "Lachen",
  "Zero Point",
  "MG Marg",
  "Namchi",
  "Pelling Skywalk",
  "Tashi View Point",
  "Ganesh Tok",
  "Hanuman Tok"
];

export default function CustomPackage() {
  const [selectedPlaces, setSelectedPlaces] = useState<string[]>([]);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    startDate: "",
    duration: "",
    budget: "",
    specialRequests: ""
  });

  const handlePlaceSelection = (place: string) => {
    setSelectedPlaces(prev => 
      prev.includes(place) 
        ? prev.filter(p => p !== place) 
        : [...prev, place]
    );
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = () => {
    const message = `Hi, I want to customize a package!
    
Name: ${formData.name}
Email: ${formData.email}
Phone: ${formData.phone}
Start Date: ${formData.startDate}
Duration: ${formData.duration}
Budget: ${formData.budget}
Selected Places: ${selectedPlaces.join(", ")}
Special Requests: ${formData.specialRequests}`;

    const whatsappUrl = `https://wa.me/919733814168?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, "_blank");
  };

  return (
    <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-[400px]">
      <div className="mb-8">
        <h3 className="text-2xl font-bold text-[#f45201] mb-4">
          Customize Your Package
        </h3>
        <p className="text-gray-600 text-sm leading-relaxed">
          For customizable packages, please fill out this form or contact us directly. We're here to help create your perfect travel experience! You can reach us at:
          <br />
          <span className="font-semibold">Phone:</span> +91 7001895132
          <br />
          <span className="font-semibold">Email:</span> Travelwithmaple2023@gmail.com
        </p>
      </div>
      
      <div className="space-y-4">
        <input
          type="text"
          name="name"
          placeholder="Your Name"
          className="w-full p-2 border rounded"
          value={formData.name}
          onChange={handleChange}
        />
        <input
          type="email"
          name="email"
          placeholder="Your Email"
          className="w-full p-2 border rounded"
          value={formData.email}
          onChange={handleChange}
        />
        <input
          type="tel"
          name="phone"
          placeholder="Your Phone Number"
          className="w-full p-2 border rounded"
          value={formData.phone}
          onChange={handleChange}
        />
        <input
          type="date"
          name="startDate"
          placeholder="Start Date"
          className="w-full p-2 border rounded"
          value={formData.startDate}
          onChange={handleChange}
        />
        <input
          type="text"
          name="duration"
          placeholder="Duration (e.g., 5 Days)"
          className="w-full p-2 border rounded"
          value={formData.duration}
          onChange={handleChange}
        />
        <input
          type="text"
          name="budget"
          placeholder="Budget (e.g., ₹20,000)"
          className="w-full p-2 border rounded"
          value={formData.budget}
          onChange={handleChange}
        />

        <div className="max-h-48 overflow-y-auto border p-2 rounded">
          {famousPlaces.map((place, index) => (
            <label key={index} className="flex items-center space-x-2 mb-2">
              <input
                type="checkbox"
                checked={selectedPlaces.includes(place)}
                onChange={() => handlePlaceSelection(place)}
                className="form-checkbox h-4 w-4 text-[#f45201] rounded"
              />
              <span className="text-sm">{place}</span>
            </label>
          ))}
        </div>

        <textarea
          name="specialRequests"
          placeholder="Special Requests"
          className="w-full p-2 border rounded"
          rows={3}
          value={formData.specialRequests}
          onChange={handleChange}
        />

        <button
          onClick={handleSubmit}
          className="w-full bg-[#f45201] text-white py-2 rounded hover:bg-[#e64a00] transition-colors"
        >
          Send via WhatsApp
        </button>
      </div>
    </div>
  );
}