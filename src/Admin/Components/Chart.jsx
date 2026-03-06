// AdminDashboard.jsx da ishlatish
import Chart from './components/Chart';

export default function AdminDashboard() {
  return (
    <div>
      <h2>Dashboard</h2>
      
      {/* Oddiy diagramma */}
      <Chart 
        title="Oylik sotuvlar"
        data={{
          labels: ['Yan', 'Fev', 'Mar', 'Apr', 'May', 'Iyun'],
          values: [65, 78, 90, 85, 110, 95]
        }}
      />

      {/* Yana bir diagramma */}
      <Chart 
        type="bar"
        title="Kategoriyalar bo'yicha"
        data={{
          labels: ['Telefon', 'Kompyuter', 'Aksessuar'],
          values: [45, 32, 67]
        }}
      />
    </div>
  );
}