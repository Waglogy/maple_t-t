"use client";

import { FaUsers, FaClipboardList, FaChartLine } from "react-icons/fa";

const DashboardAnalytics = () => {
  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">Dashboard Analytics</h2>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Total Users */}
        <div className="bg-white shadow-lg rounded-lg p-6 flex items-center gap-4">
          <FaUsers className="text-3xl text-blue-600" />
          <div>
            <p className="text-gray-500">Total Users</p>
            <h3 className="text-xl font-bold">1,245</h3>
          </div>
        </div>

        {/* Total Bookings */}
        <div className="bg-white shadow-lg rounded-lg p-6 flex items-center gap-4">
          <FaClipboardList className="text-3xl text-green-600" />
          <div>
            <p className="text-gray-500">Total Bookings</p>
            <h3 className="text-xl font-bold">3,482</h3>
          </div>
        </div>

        {/* Monthly Revenue */}
        <div className="bg-white shadow-lg rounded-lg p-6 flex items-center gap-4">
          <FaChartLine className="text-3xl text-red-600" />
          <div>
            <p className="text-gray-500">Monthly Revenue</p>
            <h3 className="text-xl font-bold">$24,589</h3>
          </div>
        </div>
      </div>

      {/* Analytics Chart Placeholder */}
      <div className="bg-white shadow-lg rounded-lg p-6 mt-6">
        <h3 className="text-lg font-bold mb-2">Revenue Growth</h3>
        <div className="h-40 flex items-center justify-center text-gray-400">
          [Chart will be here]
        </div>
      </div>
    </div>
  );
};

export default DashboardAnalytics;
