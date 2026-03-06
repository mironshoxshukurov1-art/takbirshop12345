// src/Admin/Components/StatusBadge.jsx
export default function BadgeStatus({ status }) {
  const colors = {
    pending: 'bg-yellow-100 text-yellow-700',
    processing: 'bg-blue-100 text-blue-700',
    delivered: 'bg-green-100 text-green-700',
    cancelled: 'bg-red-100 text-red-700',
    active: 'bg-green-100 text-green-700',
    inactive: 'bg-gray-100 text-gray-700'
  };

  const labels = {
    pending: 'Kutilmoqda',
    processing: 'Jarayonda',
    delivered: 'Yetkazilgan',
    cancelled: 'Bekor qilingan',
    active: 'Faol',
    inactive: 'No faol'
  };

  return (
    <span className={`px-2 py-1 rounded-full text-xs font-medium ${colors[status] || 'bg-gray-100 text-gray-700'}`}>
      {labels[status] || status}
    </span>
  );
}