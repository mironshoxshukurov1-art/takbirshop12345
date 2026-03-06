import React, { useState } from "react";
import { Link, Outlet, useNavigate } from "react-router-dom";
import { 
  FiHome, FiPackage, FiShoppingCart, FiUsers, FiSettings,
  FiBarChart2, FiLogOut, FiMenu, FiTag, FiCreditCard,
  FiBell, FiSearch, FiChevronDown, FiStar, FiTruck,
  FiUpload, FiImage, FiCamera, FiUser
} from "react-icons/fi";

export default function AdminLayout() {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [profileOpen, setProfileOpen] = useState(false);
  const [adminPhoto, setAdminPhoto] = useState("https://randomuser.me/api/portraits/men/32.jpg");
  const [showPhotoUpload, setShowPhotoUpload] = useState(false);
  const navigate = useNavigate();

  const menuItems = [
    { icon: <FiBarChart2 size={20} />, label: "Dashboard", path: "/admin" },
    { icon: <FiPackage size={20} />, label: "Mahsulotlar", path: "/admin/products" },
    { icon: <FiShoppingCart size={20} />, label: "Buyurtmalar", path: "/admin/orders" },
    { icon: <FiUsers size={20} />, label: "Foydalanuvchilar", path: "/admin/users" },
    { icon: <FiTag size={20} />, label: "Kategoriyalar", path: "/admin/categories" },
    { icon: <FiStar size={20} />, label: "Sharhlar", path: "/admin/reviews" },
    { icon: <FiCreditCard size={20} />, label: "To'lovlar", path: "/admin/payments" },
    { icon: <FiTruck size={20} />, label: "Yetkazib berish", path: "/admin/delivery" },
    { icon: <FiSettings size={20} />, label: "Sozlamalar", path: "/admin/settings" },
  ];

  // Rasm yuklash funksiyasi
  const handlePhotoUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setAdminPhoto(reader.result);
        setShowPhotoUpload(false);
      };
      reader.readAsDataURL(file);
    }
  };

  // Rasmni o'chirish
  const handlePhotoRemove = () => {
    setAdminPhoto("https://randomuser.me/api/portraits/men/32.jpg");
    setShowPhotoUpload(false);
  };

  return (
    <div className="min-h-screen bg-gray-50 flex">
      {/* Sidebar */}
      <div className={`${sidebarOpen ? 'w-64' : 'w-20'} bg-white border-r border-gray-200 transition-all duration-300 flex flex-col fixed h-full`}>
        <div className="h-16 flex items-center px-4 border-b border-gray-200">
          <button onClick={() => setSidebarOpen(!sidebarOpen)} className="mr-2">
            <FiMenu size={22} className="text-gray-600" />
          </button>
          {sidebarOpen && (
            <div className="flex items-center gap-2">
              <img src="/takbir.png" alt="Takbir Shop" className="h-8" />
            </div>
          )}
        </div>

        <nav className="flex-1 overflow-y-auto py-4">
          {menuItems.map((item, index) => (
            <Link
              key={index}
              to={item.path}
              className="flex items-center px-4 py-3 text-gray-700 hover:bg-gray-50 hover:text-amber-600 transition-colors"
            >
              <span className="text-gray-500">{item.icon}</span>
              {sidebarOpen && <span className="ml-3 text-sm font-medium">{item.label}</span>}
            </Link>
          ))}
        </nav>

        {/* Logout button */}
        <div className="border-t border-gray-200 p-4">
          <button
            onClick={() => navigate('/login')}
            className="flex items-center text-gray-700 hover:text-red-500 transition-colors w-full"
          >
            <FiLogOut size={20} />
            {sidebarOpen && <span className="ml-3 text-sm font-medium">Chiqish</span>}
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className={`${sidebarOpen ? 'ml-64' : 'ml-20'} flex-1 transition-all duration-300`}>
        {/* Top Bar */}
        <header className="bg-white border-b border-gray-200 h-16 flex items-center justify-between px-6 sticky top-0 z-10">
          <div className="flex-1 max-w-md">
            <div className="relative">
              <FiSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
              <input
                type="text"
                placeholder="Qidirish..."
                className="w-full pl-10 pr-4 py-2 rounded-lg border border-gray-200 focus:outline-none focus:border-amber-400 text-sm"
              />
            </div>
          </div>

          <div className="flex items-center gap-4">
            {/* Notifications */}
            <button className="relative p-2 hover:bg-gray-100 rounded-full">
              <FiBell size={20} className="text-gray-600" />
              <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
            </button>
            
            {/* Profile dropdown */}
            <div className="relative">
              <button
                onClick={() => setProfileOpen(!profileOpen)}
                className="flex items-center gap-2 hover:bg-gray-100 rounded-lg px-2 py-1 transition"
              >
                <div className="relative">
                  <img 
                    src={adminPhoto} 
                    alt="Admin" 
                    className="w-8 h-8 rounded-full object-cover border-2 border-amber-400"
                  />
                  <span className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-green-500 border-2 border-white rounded-full"></span>
                </div>
                <div className="hidden sm:block text-left">
                  <p className="text-sm font-semibold text-gray-700">Admin User</p>
                  <p className="text-xs text-gray-500">admin@takbirshop.uz</p>
                </div>
                <FiChevronDown size={16} className="text-gray-500" />
              </button>

              {/* Profile dropdown menu */}
              {profileOpen && (
                <div className="absolute right-0 mt-2 w-64 bg-white rounded-lg shadow-lg border py-2 z-20">
                  {/* Profile header */}
                  <div className="px-4 py-3 border-b">
                    <p className="text-sm font-semibold text-gray-900">Admin User</p>
                    <p className="text-xs text-gray-500">admin@takbirshop.uz</p>
                  </div>

                  {/* Photo upload section */}
                  <div className="px-4 py-3 border-b">
                    <div className="flex items-center gap-3 mb-2">
                      <img 
                        src={adminPhoto} 
                        alt="Admin" 
                        className="w-12 h-12 rounded-full object-cover"
                      />
                      <div>
                        <p className="text-sm font-medium text-gray-700">Profil rasmi</p>
                        <button
                          onClick={() => setShowPhotoUpload(!showPhotoUpload)}
                          className="text-xs text-amber-600 hover:text-amber-700"
                        >
                          {showPhotoUpload ? 'Yopish' : 'Rasmni o\'zgartirish'}
                        </button>
                      </div>
                    </div>

                    {/* Photo upload controls */}
                    {showPhotoUpload && (
                      <div className="mt-2 space-y-2">
                        <input
                          type="file"
                          accept="image/*"
                          onChange={handlePhotoUpload}
                          className="hidden"
                          id="photo-upload"
                        />
                        <label
                          htmlFor="photo-upload"
                          className="flex items-center gap-2 w-full px-3 py-2 text-sm bg-gray-50 hover:bg-gray-100 rounded-lg cursor-pointer transition"
                        >
                          <FiUpload size={14} />
                          Yangi rasm yuklash
                        </label>
                        
                        <button
                          onClick={handlePhotoRemove}
                          className="flex items-center gap-2 w-full px-3 py-2 text-sm text-red-600 hover:bg-red-50 rounded-lg transition"
                        >
                          <FiImage size={14} />
                          Standart rasmga qaytarish
                        </button>

                        <p className="text-[10px] text-gray-400">
                          Rasm formati: JPG, PNG, GIF. Max 2MB
                        </p>
                      </div>
                    )}
                  </div>

                  {/* Menu items */}
                  <Link
                    to="/admin/profile"
                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50"
                    onClick={() => setProfileOpen(false)}
                  >
                    Profil sozlamalari
                  </Link>
                  <Link
                    to="/admin/settings"
                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50"
                    onClick={() => setProfileOpen(false)}
                  >
                    Sozlamalar
                  </Link>
                  <hr className="my-1" />
                  <button
                    onClick={() => {
                      setProfileOpen(false);
                      navigate('/login');
                    }}
                    className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-50"
                  >
                    Chiqish
                  </button>
                </div>
              )}
            </div>
          </div>
        </header>

        {/* Page Content */}
        <main className="p-6">
          <Outlet />
        </main>
      </div>
    </div>
  );
}