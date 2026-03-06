export default function StatsCard({ icon, label, value, color = "bg-blue-500" }) {
  return (
    <div className="bg-white rounded-xl p-5 shadow-sm border border-gray-100">
      <div className={`w-10 h-10 ${color} bg-opacity-10 rounded-lg flex items-center justify-center mb-3`}>
        <div className={`text-${color.split('-')[1]}-600`}>{icon}</div>
      </div>
      <p className="text-sm text-gray-500 mb-1">{label}</p>
      <p className="text-2xl font-bold text-gray-900">{value}</p>
    </div>
  );
}