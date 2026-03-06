// src/Admin/AdminUsers.jsx
import React, { useState } from "react";
import { FiMail, FiPhone, FiCalendar, FiStar, FiLock, FiUserCheck, FiSearch, FiEdit2, FiTrash2, FiUserX, FiUserCheck as FiUserActive } from "react-icons/fi";
import BadgeStatus from "./Components/BadgeStatus";
import TableData from "./Components/TableData";
import Modal from "./Components/Modal";

export default function AdminUsers() {
  const [users, setUsers] = useState([
    { 
      id: 1, 
      name: "Ali Karimov", 
      email: "ali.karimov@gmail.com", 
      phone: "+998901234567", 
      joined: "2024-01-15", 
      orders: 12, 
      spent: 1250,
      status: "active",
      role: "user",
      avatar: "https://randomuser.me/api/portraits/men/32.jpg"
    },
    { 
      id: 2, 
      name: "Zarina Abdullaeva", 
      email: "zarina.a@mail.ru", 
      phone: "+998935678901", 
      joined: "2024-02-03", 
      orders: 8, 
      spent: 890,
      status: "active",
      role: "user",
      avatar: "https://randomuser.me/api/portraits/women/44.jpg"
    },
    { 
      id: 3, 
      name: "Bobur Rahimov", 
      email: "bobur.r@gmail.com", 
      phone: "+998977654321", 
      joined: "2023-11-20", 
      orders: 23, 
      spent: 3450,
      status: "active",
      role: "admin",
      avatar: "https://randomuser.me/api/portraits/men/67.jpg"
    },
    { 
      id: 4, 
      name: "Dilnoza Xasanova", 
      email: "dilnoza.kh@yandex.ru", 
      phone: "+998909876543", 
      joined: "2024-01-28", 
      orders: 5, 
      spent: 430,
      status: "inactive",
      role: "user",
      avatar: "https://randomuser.me/api/portraits/women/68.jpg"
    },
    { 
      id: 5, 
      name: "Jasur Tursunov", 
      email: "jasur.t@gmail.com", 
      phone: "+998933216789", 
      joined: "2023-12-10", 
      orders: 15, 
      spent: 1870,
      status: "active",
      role: "user",
      avatar: "https://randomuser.me/api/portraits/men/12.jpg"
    },
  ]);

  const [search, setSearch] = useState("");
  const [roleFilter, setRoleFilter] = useState("all");
  const [statusFilter, setStatusFilter] = useState("all");
  const [selectedUser, setSelectedUser] = useState(null);
  const [showDetails, setShowDetails] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);

  // Statistikalar
  const stats = {
    total: users.length,
    active: users.filter(u => u.status === 'active').length,
    inactive: users.filter(u => u.status === 'inactive').length,
    admins: users.filter(u => u.role === 'admin').length,
    totalSpent: users.reduce((sum, u) => sum + u.spent, 0),
    totalOrders: users.reduce((sum, u) => sum + u.orders, 0)
  };

  // Filtrlash
  const filteredUsers = users.filter(user => {
    const matchesSearch = user.name.toLowerCase().includes(search.toLowerCase()) ||
                         user.email.toLowerCase().includes(search.toLowerCase()) ||
                         user.phone.includes(search);
    const matchesRole = roleFilter === "all" || user.role === roleFilter;
    const matchesStatus = statusFilter === "all" || user.status === statusFilter;
    return matchesSearch && matchesRole && matchesStatus;
  });

  // Statusni o'zgartirish
  const toggleUserStatus = (userId) => {
    setUsers(users.map(user => 
      user.id === userId 
        ? {...user, status: user.status === 'active' ? 'inactive' : 'active'} 
        : user
    ));
  };

  // Rolni o'zgartirish
  const toggleUserRole = (userId) => {
    setUsers(users.map(user => 
      user.id === userId 
        ? {...user, role: user.role === 'user' ? 'admin' : 'user'} 
        : user
    ));
  };

  // Foydalanuvchini o'chirish
  const deleteUser = (userId) => {
    if (window.confirm("Bu foydalanuvchini o'chirmoqchimisiz?")) {
      setUsers(users.filter(user => user.id !== userId));
    }
  };

  // Jadval ustunlari
  const columns = [
    {
      header: "Foydalanuvchi",
      accessor: "name",
      render: (row) => (
        <div className="flex items-center gap-3">
          <img src={row.avatar} alt={row.name} className="w-10 h-10 rounded-full object-cover" />
          <div>
            <p className="font-medium text-gray-900">{row.name}</p>
            <p className="text-xs text-gray-500">{row.email}</p>
          </div>
        </div>
      )
    },
    {
      header: "Telefon",
      accessor: "phone",
      render: (row) => (
        <div className="flex items-center gap-2">
          <FiPhone size={14} className="text-gray-400" />
          <span className="text-sm">{row.phone}</span>
        </div>
      )
    },
    {
      header: "Qo'shilgan",
      accessor: "joined",
      render: (row) => (
        <div className="flex items-center gap-2">
          <FiCalendar size={14} className="text-gray-400" />
          <span className="text-sm">{row.joined}</span>
        </div>
      )
    },
    {
      header: "Buyurtmalar",
      accessor: "orders",
      render: (row) => <span className="font-semibold">{row.orders}</span>
    },
    {
      header: "Xarajat",
      accessor: "spent",
      render: (row) => <span className="font-semibold text-green-600">${row.spent}</span>
    },
    {
      header: "Roli",
      accessor: "role",
      render: (row) => (
        <span className={`px-2 py-1 rounded-full text-xs font-medium ${
          row.role === 'admin' ? 'bg-purple-100 text-purple-700' : 'bg-gray-100 text-gray-700'
        }`}>
          {row.role === 'admin' ? 'Admin' : 'Foydalanuvchi'}
        </span>
      )
    },
    {
      header: "Status",
      accessor: "status",
      render: (row) => <BadgeStatus status={row.status} />
    },
    {
      header: "Amallar",
      accessor: "id",
      render: (row) => (
        <div className="flex items-center gap-2">
          <button 
            onClick={() => {
              setSelectedUser(row);
              setShowDetails(true);
            }}
            className="p-2 hover:bg-blue-50 rounded-lg text-blue-600 transition"
            title="Ko'rish"
          >
            <FiUserCheck size={16} />
          </button>
          <button 
            onClick={() => toggleUserRole(row.id)}
            className="p-2 hover:bg-purple-50 rounded-lg text-purple-600 transition"
            title={row.role === 'admin' ? 'Userni foydalanuvchi qilish' : 'Userni admin qilish'}
          >
            <FiStar size={16} />
          </button>
          <button 
            onClick={() => toggleUserStatus(row.id)}
            className={`p-2 hover:bg-amber-50 rounded-lg transition ${
              row.status === 'active' ? 'text-amber-600' : 'text-green-600'
            }`}
            title={row.status === 'active' ? 'Bloklash' : 'Faollashtirish'}
          >
            {row.status === 'active' ? <FiUserX size={16} /> : <FiUserActive size={16} />}
          </button>
          <button 
            onClick={() => {
              setSelectedUser(row);
              setShowEditModal(true);
            }}
            className="p-2 hover:bg-green-50 rounded-lg text-green-600 transition"
            title="Tahrirlash"
          >
            <FiEdit2 size={16} />
          </button>
          <button 
            onClick={() => deleteUser(row.id)}
            className="p-2 hover:bg-red-50 rounded-lg text-red-600 transition"
            title="O'chirish"
          >
            <FiTrash2 size={16} />
          </button>
        </div>
      )
    }
  ];

  return (
    <div>
      <h2 className="text-2xl font-bold text-gray-900 mb-6">Foydalanuvchilar</h2>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-5 gap-3 mb-6">
        <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100">
          <p className="text-sm text-gray-500 mb-1">Jami</p>
          <p className="text-2xl font-bold text-gray-900">{stats.total}</p>
        </div>
        <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100">
          <p className="text-sm text-gray-500 mb-1">Faol</p>
          <p className="text-2xl font-bold text-green-600">{stats.active}</p>
        </div>
        <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100">
          <p className="text-sm text-gray-500 mb-1">No faol</p>
          <p className="text-2xl font-bold text-gray-400">{stats.inactive}</p>
        </div>
        <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100">
          <p className="text-sm text-gray-500 mb-1">Adminlar</p>
          <p className="text-2xl font-bold text-purple-600">{stats.admins}</p>
        </div>
        <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100">
          <p className="text-sm text-gray-500 mb-1">Jami xarajat</p>
          <p className="text-2xl font-bold text-amber-600">${stats.totalSpent}</p>
        </div>
      </div>

      {/* Search and Filters */}
      <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100 mb-6">
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="flex-1 relative">
            <FiSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
            <input
              type="text"
              placeholder="Ism, email yoki telefon bo'yicha qidirish..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-10 pr-4 py-2 rounded-lg border border-gray-200 focus:outline-none focus:border-amber-400"
            />
          </div>
          <select
            value={roleFilter}
            onChange={(e) => setRoleFilter(e.target.value)}
            className="px-4 py-2 rounded-lg border border-gray-200 focus:outline-none focus:border-amber-400"
          >
            <option value="all">Barcha rollar</option>
            <option value="user">Foydalanuvchilar</option>
            <option value="admin">Adminlar</option>
          </select>
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="px-4 py-2 rounded-lg border border-gray-200 focus:outline-none focus:border-amber-400"
          >
            <option value="all">Barcha statuslar</option>
            <option value="active">Faol</option>
            <option value="inactive">No faol</option>
          </select>
        </div>
      </div>

      {/* Users Table */}
      <TableData 
        columns={columns}
        data={filteredUsers}
      />

      {/* User Details Modal */}
      {showDetails && selectedUser && (
        <Modal onClose={() => setShowDetails(false)} title="Foydalanuvchi ma'lumotlari">
          <div className="space-y-4">
            <div className="flex items-center gap-4">
              <img src={selectedUser.avatar} alt={selectedUser.name} className="w-20 h-20 rounded-full object-cover" />
              <div>
                <h3 className="text-xl font-bold">{selectedUser.name}</h3>
                <p className="text-gray-500">{selectedUser.email}</p>
                <p className="text-gray-500">{selectedUser.phone}</p>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4 pt-4 border-t">
              <div>
                <p className="text-sm text-gray-500">Ro'yxatdan o'tgan</p>
                <p className="font-semibold">{selectedUser.joined}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Buyurtmalar soni</p>
                <p className="font-semibold">{selectedUser.orders}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Jami xarajat</p>
                <p className="font-semibold text-green-600">${selectedUser.spent}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Roli</p>
                <p className="font-semibold capitalize">{selectedUser.role}</p>
              </div>
            </div>

            <div className="flex gap-3 pt-4 border-t">
              <button 
                onClick={() => toggleUserStatus(selectedUser.id)}
                className="flex-1 bg-amber-500 text-white py-2 rounded-lg hover:bg-amber-600"
              >
                {selectedUser.status === 'active' ? 'Bloklash' : 'Faollashtirish'}
              </button>
              <button 
                onClick={() => toggleUserRole(selectedUser.id)}
                className="flex-1 bg-purple-500 text-white py-2 rounded-lg hover:bg-purple-600"
              >
                {selectedUser.role === 'user' ? 'Admin qilish' : 'Foydalanuvchi qilish'}
              </button>
            </div>
          </div>
        </Modal>
      )}

      {/* Edit User Modal */}
      {showEditModal && selectedUser && (
        <Modal onClose={() => setShowEditModal(false)} title="Foydalanuvchini tahrirlash">
          <form className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Ism</label>
              <input 
                type="text" 
                defaultValue={selectedUser.name}
                className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:border-amber-400"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
              <input 
                type="email" 
                defaultValue={selectedUser.email}
                className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:border-amber-400"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Telefon</label>
              <input 
                type="text" 
                defaultValue={selectedUser.phone}
                className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:border-amber-400"
              />
            </div>
            <div className="flex gap-3 pt-4">
              <button 
                type="button"
                onClick={() => setShowEditModal(false)}
                className="flex-1 px-4 py-2 border border-gray-200 rounded-lg hover:bg-gray-50"
              >
                Bekor qilish
              </button>
              <button 
                type="submit"
                className="flex-1 bg-amber-400 text-gray-900 py-2 rounded-lg hover:bg-amber-500"
              >
                Saqlash
              </button>
            </div>
          </form>
        </Modal>
      )}
    </div>
  );
}