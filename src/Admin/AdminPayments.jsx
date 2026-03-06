import React, { useState } from 'react';

export default function AdminPayments() {
  const [payments] = useState([
    { id: "#T12345", user: "Ali Karimov", amount: 245, method: "Click", date: "2024-03-15", status: "completed" },
    { id: "#T12346", user: "Zarina Abdullaeva", amount: 129, method: "Payme", date: "2024-03-15", status: "pending" },
  ]);

  return (
    <div>
      <h2 className="text-2xl font-bold text-gray-900 mb-6">To'lovlar</h2>
      
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
        <table className="w-full">
          <thead className="bg-gray-50">
            <tr>
              <th className="text-left py-4 px-6">ID</th>
              <th className="text-left py-4 px-6">Foydalanuvchi</th>
              <th className="text-left py-4 px-6">Summa</th>
              <th className="text-left py-4 px-6">To'lov usuli</th>
              <th className="text-left py-4 px-6">Sana</th>
              <th className="text-left py-4 px-6">Status</th>
            </tr>
          </thead>
          <tbody>
            {payments.map(payment => (
              <tr key={payment.id} className="border-t border-gray-100">
                <td className="py-4 px-6 font-medium">{payment.id}</td>
                <td className="py-4 px-6">{payment.user}</td>
                <td className="py-4 px-6 font-semibold">${payment.amount}</td>
                <td className="py-4 px-6">{payment.method}</td>
                <td className="py-4 px-6">{payment.date}</td>
                <td className="py-4 px-6">
                  <span className={`px-2 py-1 rounded-full text-xs ${
                    payment.status === 'completed' ? 'bg-green-100 text-green-700' : 'bg-yellow-100 text-yellow-700'
                  }`}>
                    {payment.status === 'completed' ? "To'langan" : "Kutilmoqda"}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}