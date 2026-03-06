import React, { useState } from 'react';
import { 
  FiEdit2, FiTrash2, FiPlus, FiSmartphone, FiWatch, FiGift, 
  FiShoppingBag, FiHome, FiMonitor, FiHeadphones, FiCamera,
  FiBook, FiHeart, FiStar, FiSearch, FiX, FiCheck
} from 'react-icons/fi';

import { 
  FaTshirt, FaShoePrints, FaRing, FaBaby, FaBook, FaGamepad, 
  FaCar, FaMotorcycle, FaBicycle, FaCamera as FaCameraIcon,
  FaHeadphones, FaMobile, FaTabletAlt, FaClock, FaCouch,
  FaUtensils, FaBed, FaDog, FaCat, FaFish, FaTree,
  FaApple, FaCarrot, FaBreadSlice, FaCheese, FaCoffee
} from 'react-icons/fa';

import { 
  GiPerfumeBottle, GiSunglasses, GiHandBag, GiNecklace, GiWatch,
  GiRunningShoe, GiDiamondRing, GiLipstick, GiHeartNecklace,
  GiCrown, GiCupcake, GiCoffeeCup, GiDesk, GiLaptop,
  GiSmartphone, GiHeadphones,  GiBookCover,
  GiWineGlass, GiBeerBottle, GiChocolateBar, GiCakeSlice
} from 'react-icons/gi';

import DataTable from './components/DataTable';
import Modal from './components/Modal';

export default function AdminCategories() {
  const [categories, setCategories] = useState([
    { id: 1, name: "Elektronika", count: 45, icon: "FiMonitor", products: 45 },
    { id: 2, name: "Kiyim-kechak", count: 78, icon: "FaTshirt", products: 78 },
    { id: 3, name: "Soatlar", count: 23, icon: "GiWatch", products: 23 },
    { id: 4, name: "Atirlar", count: 34, icon: "GiPerfumeBottle", products: 34 },
    { id: 5, name: "Ko'zoynaklar", count: 12, icon: "GiSunglasses", products: 12 },
    { id: 6, name: "Sumkalar", count: 28, icon: "GiHandBag", products: 28 },
    { id: 7, name: "Poyabzallar", count: 31, icon: "FaShoePrints", products: 31 },
    { id: 8, name: "Zargarlik", count: 19, icon: "GiDiamondRing", products: 19 },
    { id: 9, name: "Telefonlar", count: 42, icon: "FiSmartphone", products: 42 },
    { id: 10, name: "Maishiy texnika", count: 27, icon: "FiHome", products: 27 },
    { id: 11, name: "Avtomobil buyumlari", count: 15, icon: "FaCar", products: 15 },
    { id: 12, name: "Kitoblar", count: 33, icon: "FiBook", products: 33 },
    { id: 13, name: "O'yinchoqlar", count: 21, icon: "FaGamepad", products: 21 },
    { id: 14, name: "Sport buyumlari", count: 18, icon: "GiRunningShoe", products: 18 },
    { id: 15, name: "Bolalar uchun", count: 25, icon: "FaBaby", products: 25 },
  ]);

  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [search, setSearch] = useState("");
  const [newCategory, setNewCategory] = useState({ name: "", icon: "FiGift" });

  // Ikonkalar ro'yxati
  const iconList = [
    // Feather Icons (Fi)
    { name: "FiMonitor", component: <FiMonitor size={20} /> },
    { name: "FiSmartphone", component: <FiSmartphone size={20} /> },
    { name: "FiWatch", component: <FiWatch size={20} /> },
    { name: "FiHeadphones", component: <FiHeadphones size={20} /> },
    { name: "FiCamera", component: <FiCamera size={20} /> },
    { name: "FiBook", component: <FiBook size={20} /> },
    { name: "FiHeart", component: <FiHeart size={20} /> },
    { name: "FiGift", component: <FiGift size={20} /> },
    { name: "FiShoppingBag", component: <FiShoppingBag size={20} /> },
    { name: "FiHome", component: <FiHome size={20} /> },
    
    // Font Awesome (Fa)
    { name: "FaTshirt", component: <FaTshirt size={20} /> },
    { name: "FaShoePrints", component: <FaShoePrints size={20} /> },
    { name: "FaRing", component: <FaRing size={20} /> },
    { name: "FaBaby", component: <FaBaby size={20} /> },
    { name: "FaBook", component: <FaBook size={20} /> },
    { name: "FaGamepad", component: <FaGamepad size={20} /> },
    { name: "FaCar", component: <FaCar size={20} /> },
    { name: "FaMotorcycle", component: <FaMotorcycle size={20} /> },
    { name: "FaClock", component: <FaClock size={20} /> },
    { name: "FaCouch", component: <FaCouch size={20} /> },
    { name: "FaUtensils", component: <FaUtensils size={20} /> },
    { name: "FaBed", component: <FaBed size={20} /> },
    { name: "FaDog", component: <FaDog size={20} /> },
    { name: "FaCat", component: <FaCat size={20} /> },
    { name: "FaCoffee", component: <FaCoffee size={20} /> },
    
    // Game Icons (Gi)
    { name: "GiPerfumeBottle", component: <GiPerfumeBottle size={20} /> },
    { name: "GiSunglasses", component: <GiSunglasses size={20} /> },
    { name: "GiHandBag", component: <GiHandBag size={20} /> },
    { name: "GiNecklace", component: <GiNecklace size={20} /> },
    { name: "GiWatch", component: <GiWatch size={20} /> },
    { name: "GiRunningShoe", component: <GiRunningShoe size={20} /> },
    { name: "GiDiamondRing", component: <GiDiamondRing size={20} /> },
    { name: "GiLipstick", component: <GiLipstick size={20} /> },
    { name: "GiHeartNecklace", component: <GiHeartNecklace size={20} /> },
    { name: "GiCrown", component: <GiCrown size={20} /> },
    { name: "GiCupcake", component: <GiCupcake size={20} /> },
    { name: "GiCoffeeCup", component: <GiCoffeeCup size={20} /> },
    { name: "GiDesk", component: <GiDesk size={20} /> },
    { name: "GiLaptop", component: <GiLaptop size={20} /> },
    { name: "GiWineGlass", component: <GiWineGlass size={20} /> },
    { name: "GiChocolateBar", component: <GiChocolateBar size={20} /> },
    { name: "GiCakeSlice", component: <GiCakeSlice size={20} /> },
  ];

  // Ikonkani chiqarish
  const renderIcon = (iconName) => {
    const icon = iconList.find(i => i.name === iconName);
    return icon ? icon.component : <FiGift size={20} />;
  };

  // Kategoriya qo'shish
  const addCategory = () => {
    if (!newCategory.name.trim()) {
      alert("Kategoriya nomini kiriting!");
      return;
    }

    const newId = Math.max(...categories.map(c => c.id), 0) + 1;
    setCategories([
      ...categories,
      {
        id: newId,
        name: newCategory.name,
        count: 0,
        products: 0,
        icon: newCategory.icon
      }
    ]);
    setNewCategory({ name: "", icon: "FiGift" });
    setShowAddModal(false);
  };

  // Kategoriya tahrirlash
  const editCategory = () => {
    if (!selectedCategory) return;
    
    setCategories(categories.map(cat => 
      cat.id === selectedCategory.id ? selectedCategory : cat
    ));
    setShowEditModal(false);
    setSelectedCategory(null);
  };

  // Kategoriya o'chirish
  const deleteCategory = (id) => {
    if (window.confirm("Bu kategoriyani o'chirmoqchimisiz?")) {
      setCategories(categories.filter(cat => cat.id !== id));
    }
  };

  // Filtrlash
  const filteredCategories = categories.filter(cat => 
    cat.name.toLowerCase().includes(search.toLowerCase())
  );

  // Statistikalar
  const totalProducts = categories.reduce((sum, cat) => sum + cat.products, 0);
  const avgProducts = Math.round(totalProducts / categories.length);

  // Jadval ustunlari
  const columns = [
    {
      header: "Icon",
      accessor: "icon",
      render: (row) => (
        <div className="text-2xl bg-gray-50 w-10 h-10 rounded-lg flex items-center justify-center">
          {renderIcon(row.icon)}
        </div>
      )
    },
    {
      header: "Nomi",
      accessor: "name",
      render: (row) => (
        <div>
          <p className="font-medium text-gray-900">{row.name}</p>
          <p className="text-xs text-gray-400">ID: {row.id}</p>
        </div>
      )
    },
    {
      header: "Mahsulotlar soni",
      accessor: "products",
      render: (row) => (
        <div className="flex items-center gap-2">
          <span className="font-semibold text-gray-900">{row.products}</span>
          <span className="text-xs text-gray-400">ta</span>
        </div>
      )
    },
    {
      header: "Foizi",
      accessor: "products",
      render: (row) => {
        const percentage = totalProducts > 0 ? Math.round((row.products / totalProducts) * 100) : 0;
        return (
          <div className="w-24">
            <div className="flex items-center gap-2">
              <div className="flex-1 h-2 bg-gray-100 rounded-full overflow-hidden">
                <div 
                  className="h-full bg-amber-400 rounded-full"
                  style={{ width: `${percentage}%` }}
                />
              </div>
              <span className="text-xs text-gray-500">{percentage}%</span>
            </div>
          </div>
        );
      }
    },
    {
      header: "Amallar",
      accessor: "id",
      render: (row) => (
        <div className="flex items-center gap-2">
          <button 
            onClick={() => {
              setSelectedCategory(row);
              setShowEditModal(true);
            }}
            className="p-2 hover:bg-blue-50 rounded-lg text-blue-600 transition"
            title="Tahrirlash"
          >
            <FiEdit2 size={16} />
          </button>
          <button 
            onClick={() => deleteCategory(row.id)}
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
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Kategoriyalar</h2>
          <p className="text-sm text-gray-500 mt-1">
            Jami {categories.length} ta kategoriya, {totalProducts} ta mahsulot
          </p>
        </div>
        <button 
          onClick={() => setShowAddModal(true)}
          className="flex items-center gap-2 bg-amber-400 text-gray-900 px-4 py-2 rounded-lg hover:bg-amber-500 transition"
        >
          <FiPlus size={18} /> Yangi kategoriya
        </button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
        <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100">
          <p className="text-sm text-gray-500 mb-1">Jami kategoriyalar</p>
          <p className="text-2xl font-bold text-gray-900">{categories.length}</p>
        </div>
        <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100">
          <p className="text-sm text-gray-500 mb-1">Jami mahsulotlar</p>
          <p className="text-2xl font-bold text-amber-600">{totalProducts}</p>
        </div>
        <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100">
          <p className="text-sm text-gray-500 mb-1">O'rtacha mahsulotlar</p>
          <p className="text-2xl font-bold text-green-600">{avgProducts}</p>
        </div>
      </div>

      {/* Search */}
      <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100 mb-6">
        <div className="relative">
          <FiSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
          <input
            type="text"
            placeholder="Kategoriya qidirish..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-10 pr-4 py-2 rounded-lg border border-gray-200 focus:outline-none focus:border-amber-400"
          />
        </div>
      </div>

      {/* Categories Table */}
      <DataTable 
        columns={columns}
        data={filteredCategories}
      />

      {/* Add Category Modal */}
      {showAddModal && (
        <Modal onClose={() => setShowAddModal(false)} title="Yangi kategoriya qo'shish">
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Kategoriya nomi
              </label>
              <input
                type="text"
                value={newCategory.name}
                onChange={(e) => setNewCategory({...newCategory, name: e.target.value})}
                placeholder="Masalan: Elektronika"
                className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:border-amber-400"
                autoFocus
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Icon tanlang
              </label>
              <div className="grid grid-cols-6 gap-2 max-h-48 overflow-y-auto p-2 border rounded-lg">
                {iconList.map((icon, index) => (
                  <button
                    key={index}
                    type="button"
                    onClick={() => setNewCategory({...newCategory, icon: icon.name})}
                    className={`p-3 rounded-lg hover:bg-amber-50 transition flex items-center justify-center ${
                      newCategory.icon === icon.name ? 'bg-amber-100 border-2 border-amber-400' : 'border border-gray-200'
                    }`}
                  >
                    {icon.component}
                  </button>
                ))}
              </div>
            </div>

            <div className="flex gap-3 pt-4">
              <button
                onClick={() => setShowAddModal(false)}
                className="flex-1 px-4 py-2 border border-gray-200 rounded-lg hover:bg-gray-50 transition"
              >
                Bekor qilish
              </button>
              <button
                onClick={addCategory}
                className="flex-1 bg-amber-400 text-gray-900 py-2 rounded-lg hover:bg-amber-500 transition flex items-center justify-center gap-2"
              >
                <FiCheck size={16} />
                Saqlash
              </button>
            </div>
          </div>
        </Modal>
      )}

      {/* Edit Category Modal */}
      {showEditModal && selectedCategory && (
        <Modal onClose={() => setShowEditModal(false)} title="Kategoriyani tahrirlash">
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Kategoriya nomi
              </label>
              <input
                type="text"
                value={selectedCategory.name}
                onChange={(e) => setSelectedCategory({...selectedCategory, name: e.target.value})}
                className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:border-amber-400"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Icon tanlang
              </label>
              <div className="grid grid-cols-6 gap-2 max-h-48 overflow-y-auto p-2 border rounded-lg">
                {iconList.map((icon, index) => (
                  <button
                    key={index}
                    type="button"
                    onClick={() => setSelectedCategory({...selectedCategory, icon: icon.name})}
                    className={`p-3 rounded-lg hover:bg-amber-50 transition flex items-center justify-center ${
                      selectedCategory.icon === icon.name ? 'bg-amber-100 border-2 border-amber-400' : 'border border-gray-200'
                    }`}
                  >
                    {icon.component}
                  </button>
                ))}
              </div>
            </div>

            <div className="flex gap-3 pt-4">
              <button
                onClick={() => setShowEditModal(false)}
                className="flex-1 px-4 py-2 border border-gray-200 rounded-lg hover:bg-gray-50 transition"
              >
                Bekor qilish
              </button>
              <button
                onClick={editCategory}
                className="flex-1 bg-amber-400 text-gray-900 py-2 rounded-lg hover:bg-amber-500 transition flex items-center justify-center gap-2"
              >
                <FiCheck size={16} />
                Saqlash
              </button>
            </div>
          </div>
        </Modal>
      )}
    </div>
  );
}