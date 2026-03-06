import React, { useState } from 'react';
import { FaStar } from 'react-icons/fa';
import { FiCheck, FiX } from 'react-icons/fi';

export default function AdminReviews() {
  const [reviews] = useState([
    { id: 1, user: "Ali Karimov", product: "iPhone 13", rating: 5, comment: "Ajoyib telefon!", date: "2024-03-15", status: "published" },
    { id: 2, user: "Zarina Abdullaeva", product: "Samsung TV", rating: 4, comment: "Yaxshi, lekin biroz qimmat", date: "2024-03-14", status: "pending" },
  ]);

  return (
    <div>
      <h2 className="text-2xl font-bold text-gray-900 mb-6">Sharhlar</h2>
      
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
        <table className="w-full">
          <thead className="bg-gray-50">
            <tr>
              <th className="text-left py-4 px-6">Foydalanuvchi</th>
              <th className="text-left py-4 px-6">Mahsulot</th>
              <th className="text-left py-4 px-6">Reyting</th>
              <th className="text-left py-4 px-6">Sharh</th>
              <th className="text-left py-4 px-6">Sana</th>
              <th className="text-left py-4 px-6">Status</th>
              <th className="text-left py-4 px-6">Amallar</th>
            </tr>
          </thead>
          <tbody>
            {reviews.map(review => (
              <tr key={review.id} className="border-t border-gray-100">
                <td className="py-4 px-6">{review.user}</td>
                <td className="py-4 px-6">{review.product}</td>
                <td className="py-4 px-6">
                  <div className="flex items-center gap-1">
                    {[...Array(5)].map((_, i) => (
                      <FaStar key={i} size={12} className={i < review.rating ? "text-amber-400" : "text-gray-200"} />
                    ))}
                  </div>
                </td>
                <td className="py-4 px-6 max-w-xs truncate">{review.comment}</td>
                <td className="py-4 px-6">{review.date}</td>
                <td className="py-4 px-6">
                  <span className={`px-2 py-1 rounded-full text-xs ${
                    review.status === 'published' ? 'bg-green-100 text-green-700' : 'bg-yellow-100 text-yellow-700'
                  }`}>
                    {review.status === 'published' ? 'Chop etilgan' : 'Kutilmoqda'}
                  </span>
                </td>
                <td className="py-4 px-6">
                  <button className="p-1 hover:bg-green-50 rounded text-green-600 mr-2">
                    <FiCheck size={16} />
                  </button>
                  <button className="p-1 hover:bg-red-50 rounded text-red-600">
                    <FiX size={16} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}