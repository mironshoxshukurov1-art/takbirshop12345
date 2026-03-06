import React from 'react';
import { FiUsers, FiPackage, FiShoppingCart, FiDollarSign } from 'react-icons/fi';

export default function AdminDashboard() {
  return (
    <div>
      <h2 className="text-2xl font-bold text-gray-900 mb-6">Dashboard</h2>
      
      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        {[
          { icon: <FiShoppingCart />, label: "Buyurtmalar", value: "156", color: "bg-blue-500" },
          { icon: <FiPackage />, label: "Mahsulotlar", value: "2,345", color: "bg-green-500" },
          { icon: <FiUsers />, label: "Foydalanuvchilar", value: "8,901", color: "bg-purple-500" },
          { icon: <FiDollarSign />, label: "Daromad", value: "$45.2K", color: "bg-amber-500" },
        ].map((stat, i) => (
          <div key={i} className="bg-white rounded-xl p-5 shadow-sm border border-gray-100">
            <div className={`w-10 h-10 ${stat.color} bg-opacity-10 rounded-lg flex items-center justify-center mb-3`}>
              <div className={`text-${stat.color.split('-')[1]}-600`}>{stat.icon}</div>
            </div>
            <p className="text-sm text-gray-500 mb-1">{stat.label}</p>
            <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
          </div>
        ))}
      </div>

      {/* So'nggi buyurtmalar */}
      <div className="bg-white rounded-xl p-5 shadow-sm border border-gray-100">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">So'nggi buyurtmalar</h3>
        {/* Jadval keladi */}
      </div>
    </div>
  );
}