import React, { useState } from "react";
import { FiEye, FiCheckCircle, FiXCircle, FiTruck, FiSearch, FiFilter } from "react-icons/fi";
import DataTable from "./Components/DataTable";
import StatusBadge from "./Components/StatusBadge";


export default function AdminOrders() {
  const [orders, setOrders] = useState([
    { 
      id: "#12345", 
      customer: "Ali Karimov", 
      date: "2024-03-15", 
      total: 245, 
      status: "delivered", 
      items: 3, 
      payment: "click",
      paymentStatus: "paid"
    },
    { 
      id: "#12346", 
      customer: "Zarina Abdullaeva", 
      date: "2024-03-15", 
      total: 129, 
      status: "processing", 
      items: 2, 
      payment: "payme",
      paymentStatus: "paid"
    },
    { 
      id: "#12347", 
      customer: "Bobur Rahimov", 
      date: "2024-03-14", 
      total: 567, 
      status: "pending", 
      items: 4, 
      payment: "card",
      paymentStatus: "unpaid"
    },
    { 
      id: "#12348", 
      customer: "Dilnoza Xasanova", 
      date: "2024-03-14", 
      total: 89, 
      status: "delivered", 
      items: 1, 
      payment: "uzcard",
      paymentStatus: "paid"
    },
    { 
      id: "#12349", 
      customer: "Jasur Tursunov", 
      date: "2024-03-13", 
      total: 432, 
      status: "processing", 
      items: 3, 
      payment: "click",
      paymentStatus: "paid"
    },
    { 
      id: "#12350", 
      customer: "Malika Rahimova", 
      date: "2024-03-13", 
      total: 178, 
      status: "cancelled", 
      items: 2, 
      payment: "payme",
      paymentStatus: "refunded"
    },
  ]);

  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [showDetails, setShowDetails] = useState(false);

  const getPaymentIcon = (payment) => {
    switch(payment) {
      case 'click': return '💙';
      case 'payme': return '💚';
      case 'uzcard': return '🟡';
      case 'card': return '💳';
      default: return '💳';
    }
  };

  const getPaymentStatusColor = (status) => {
    switch(status) {
      case 'paid': return 'text-green-600 bg-green-50';
      case 'unpaid': return 'text-red-600 bg-red-50';
      case 'refunded': return 'text-purple-600 bg-purple-50';
      default: return 'text-gray-600 bg-gray-50';
    }
  };

  const filterOrders = () => {
    return orders.filter(order => {
      const matchesSearch = order.customer.toLowerCase().includes(search.toLowerCase()) ||
                           order.id.toLowerCase().includes(search.toLowerCase());
      const matchesStatus = statusFilter === "all" || order.status === statusFilter;
      return matchesSearch && matchesStatus;
    });
  };

  const updateOrderStatus = (orderId, newStatus) => {
    setOrders(orders.map(order => 
      order.id === orderId ? {...order, status: newStatus} : order
    ));
  };

  const columns = [
    { 
      header: "Buyurtma ID", 
      accessor: "id",
      render: (row) => (
        <span className="font-medium text-gray-900">{row.id}</span>
      )
    },
    { 
      header: "Mijoz", 
      accessor: "customer",
      render: (row) => (
        <div>
          <p className="font-medium text-gray-900">{row.customer}</p>
          <p className="text-xs text-gray-500">{row.items} ta mahsulot</p>
        </div>
      )
    },
    { 
      header: "Sana", 
      accessor: "date",
      render: (row) => <span className="text-gray-600">{row.date}</span>
    },
    { 
      header: "Summa", 
      accessor: "total",
      render: (row) => <span className="font-semibold text-gray-900">${row.total}</span>
    },
    { 
      header: "To'lov", 
      accessor: "payment",
      render: (row) => (
        <div className="flex items-center gap-2">
          <span className="text-xl" title={row.payment}>{getPaymentIcon(row.payment)}</span>
          <span className={`text-xs px-2 py-1 rounded-full ${getPaymentStatusColor(row.paymentStatus)}`}>
            {row.paymentStatus === 'paid' ? "To'langan" : 
             row.paymentStatus === 'unpaid' ? "To'lanmagan" : "Qaytarilgan"}
          </span>
        </div>
      )
    },
    { 
      header: "Status", 
      accessor: "status",
      render: (row) => <StatusBadge status={row.status} />
    },
    {
      header: "Amallar",
      accessor: "id",
      render: (row) => (
        <div className="flex items-center gap-2">
          <button 
            onClick={() => {
              setSelectedOrder(row);
              setShowDetails(true);
            }}
            className="p-2 hover:bg-blue-50 rounded-lg text-blue-600 transition"
            title="Ko'rish"
          >
            <FiEye size={16} />
          </button>
          <button 
            onClick={() => updateOrderStatus(row.id, 'processing')}
            className="p-2 hover:bg-green-50 rounded-lg text-green-600 transition"
            title="Qayta ishlash"
          >
            <FiCheckCircle size={16} />
          </button>
          <button 
            onClick={() => updateOrderStatus(row.id, 'delivered')}
            className="p-2 hover:bg-amber-50 rounded-lg text-amber-600 transition"
            title="Yetkazish"
          >
            <FiTruck size={16} />
          </button>
          <button 
            onClick={() => updateOrderStatus(row.id, 'cancelled')}
            className="p-2 hover:bg-red-50 rounded-lg text-red-600 transition"
            title="Bekor qilish"
          >
            <FiXCircle size={16} />
          </button>
        </div>
      )
    }
  ];

  const statusCounts = {
    all: orders.length,
    pending: orders.filter(o => o.status === 'pending').length,
    processing: orders.filter(o => o.status === 'processing').length,
    delivered: orders.filter(o => o.status === 'delivered').length,
    cancelled: orders.filter(o => o.status === 'cancelled').length,
  };

  return (
    <div>
      <h2 className="text-2xl font-bold text-gray-900 mb-6">Buyurtmalar</h2>

      {/* Status Cards */}
      <div className="grid grid-cols-5 gap-3 mb-6">
        {[
          { label: "Barchasi", value: statusCounts.all, color: "bg-gray-500", filter: "all" },
          { label: "Kutilmoqda", value: statusCounts.pending, color: "bg-yellow-500", filter: "pending" },
          { label: "Jarayonda", value: statusCounts.processing, color: "bg-blue-500", filter: "processing" },
          { label: "Yetkazilgan", value: statusCounts.delivered, color: "bg-green-500", filter: "delivered" },
          { label: "Bekor qilingan", value: statusCounts.cancelled, color: "bg-red-500", filter: "cancelled" },
        ].map((stat, i) => (
          <div 
            key={i}
            onClick={() => setStatusFilter(stat.filter)}
            className={`bg-white rounded-xl p-4 shadow-sm border cursor-pointer transition hover:shadow-md ${
              statusFilter === stat.filter ? 'ring-2 ring-amber-400 border-transparent' : 'border-gray-100'
            }`}
          >
            <p className="text-sm text-gray-500 mb-1">{stat.label}</p>
            <p className={`text-2xl font-bold ${stat.color.split(' ')[0]} text-gray-900`}>{stat.value}</p>
          </div>
        ))}
      </div>

      {/* Search and Filter */}
      <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100 mb-6">
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="flex-1 relative">
            <FiSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
            <input
              type="text"
              placeholder="Buyurtma ID yoki mijoz ismi bo'yicha qidirish..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-10 pr-4 py-2 rounded-lg border border-gray-200 focus:outline-none focus:border-amber-400"
            />
          </div>
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="px-4 py-2 rounded-lg border border-gray-200 focus:outline-none focus:border-amber-400"
          >
            <option value="all">Barcha statuslar</option>
            <option value="pending">Kutilmoqda</option>
            <option value="processing">Jarayonda</option>
            <option value="delivered">Yetkazilgan</option>
            <option value="cancelled">Bekor qilingan</option>
          </select>
        </div>
      </div>

      {/* Orders Table */}
      <DataTable 
        columns={columns}
        data={filterOrders()}
      />

      {/* Order Details Modal */}
      {showDetails && selectedOrder && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl w-full max-w-2xl">
            <div className="flex items-center justify-between p-6 border-b">
              <h3 className="text-xl font-bold text-gray-900">
                Buyurtma tafsilotlari {selectedOrder.id}
              </h3>
              <button 
                onClick={() => setShowDetails(false)}
                className="p-1 hover:bg-gray-100 rounded-lg"
              >
                <FiXCircle size={20} className="text-gray-500" />
              </button>
            </div>
            
            <div className="p-6">
              <div className="grid grid-cols-2 gap-4 mb-4">
                <div>
                  <p className="text-sm text-gray-500">Mijoz</p>
                  <p className="font-semibold">{selectedOrder.customer}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Sana</p>
                  <p className="font-semibold">{selectedOrder.date}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">To'lov usuli</p>
                  <p className="font-semibold capitalize">{selectedOrder.payment}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Status</p>
                  <StatusBadge status={selectedOrder.status} />
                </div>
              </div>

              <div className="border-t pt-4">
                <h4 className="font-semibold mb-3">Mahsulotlar</h4>
                {[1,2,3].slice(0, selectedOrder.items).map((item, i) => (
                  <div key={i} className="flex items-center justify-between py-2 border-b">
                    <div className="flex items-center gap-3">
                      <img 
                        src={`https://images.unsplash.com/photo-${1500000000000 + i}?w=50&q=80`} 
                        alt="" 
                        className="w-12 h-12 rounded-lg object-cover"
                      />
                      <div>
                        <p className="font-medium">Mahsulot nomi {i+1}</p>
                        <p className="text-sm text-gray-500">1 x $45</p>
                      </div>
                    </div>
                    <span className="font-semibold">$45</span>
                  </div>
                ))}
              </div>

              <div className="mt-4 pt-4 border-t flex justify-between">
                <span className="font-semibold">Jami:</span>
                <span className="text-xl font-bold">${selectedOrder.total}</span>
              </div>

              <div className="flex gap-3 mt-6">
                <button 
                  onClick={() => {
                    updateOrderStatus(selectedOrder.id, 'delivered');
                    setShowDetails(false);
                  }}
                  className="flex-1 bg-green-500 text-white py-2 rounded-lg hover:bg-green-600"
                >
                  Yetkazildi
                </button>
                <button 
                  onClick={() => {
                    updateOrderStatus(selectedOrder.id, 'cancelled');
                    setShowDetails(false);
                  }}
                  className="flex-1 bg-red-500 text-white py-2 rounded-lg hover:bg-red-600"
                >
                  Bekor qilish
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}