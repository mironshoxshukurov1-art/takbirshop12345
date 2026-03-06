import React, { useState } from 'react';
import { FiMapPin, FiTruck } from 'react-icons/fi';

export default function AdminDelivery() {
  const [zones] = useState([
    { id: 1, city: "Toshkent", price: 0, time: "1 kun", active: true },
    { id: 2, city: "Samarqand", price: 25000, time: "2-3 kun", active: true },
    { id: 3, city: "Buxoro", price: 30000, time: "2-3 kun", active: true },
    { id: 4, city: "Farg'ona", price: 25000, time: "2-3 kun", active: true },
  ]);

  return (
    <div>
      <h2 className="text-2xl font-bold text-gray-900 mb-6">Yetkazib berish</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
        {zones.map(zone => (
          <div key={zone.id} className="bg-white rounded-xl p-5 shadow-sm border border-gray-100">
            <div className="flex items-start justify-between mb-3">
              <div className="flex items-center gap-2">
                <FiMapPin className="text-amber-400" size={20} />
                <h3 className="text-lg font-semibold text-gray-900">{zone.city}</h3>
              </div>
              <span className={`px-2 py-1 rounded-full text-xs ${zone.active ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
                {zone.active ? 'Faol' : 'No faol'}
              </span>
            </div>
            <div className="flex items-center justify-between mt-3 pt-3 border-t border-gray-100">
              <div className="flex items-center gap-2">
                <FiTruck className="text-gray-400" size={16} />
                <span className="text-sm text-gray-600">{zone.time}</span>
              </div>
              <span className="text-lg font-semibold text-gray-900">
                {zone.price === 0 ? 'Bepul' : `${zone.price.toLocaleString()} so'm`}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}