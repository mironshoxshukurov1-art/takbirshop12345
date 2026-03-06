import React, { useState } from 'react';
import { 
  FiSave, FiRefreshCw, FiUpload, FiImage, FiMail, FiPhone, 
  FiMapPin, FiDollarSign, FiPercent, FiGlobe, FiClock,
  FiToggleLeft, FiToggleRight, FiShield, FiBell, FiLock,
  FiCheck, FiX, FiEye, FiEyeOff, FiSmartphone, FiMonitor,
  FiCreditCard, FiTruck, FiStar, FiHeart
} from 'react-icons/fi';

export default function AdminSettings() {
  const [settings, setSettings] = useState({
    // Asosiy sozlamalar
    siteName: "Takbir Shop",
    siteDescription: "Eng yaxshi mahsulotlar bir joyda",
    email: "info@takbirshop.uz",
    phone: "+998901234567",
    address: "Toshkent, O'zbekiston",
    currency: "UZS",
    tax: 12,
    deliveryPrice: 25000,
    freeDeliveryFrom: 100000,
    
    // Dizayn sozlamalari
    primaryColor: "#f59e0b",
    secondaryColor: "#111111",
    logo: "/takbir.png",
    favicon: "/favicon.ico",
    
    // To'lov sozlamalari
    clickEnabled: true,
    paymeEnabled: true,
    uzcardEnabled: true,
    cashEnabled: true,
    
    // Bildirishnomalar
    emailNotifications: true,
    smsNotifications: false,
    orderNotifications: true,
    marketingEmails: false,
    
    // Xavfsizlik
    twoFactorAuth: false,
    captchaEnabled: true,
    sslEnabled: true
  });

  const [activeTab, setActiveTab] = useState('general');
  const [isSaving, setIsSaving] = useState(false);
  const [saveSuccess, setSaveSuccess] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [logoPreview, setLogoPreview] = useState(settings.logo);

  // Sozlamalarni saqlash
  const handleSave = () => {
    setIsSaving(true);
    
    // Simulate API call
    setTimeout(() => {
      setIsSaving(false);
      setSaveSuccess(true);
      
      setTimeout(() => {
        setSaveSuccess(false);
      }, 3000);
    }, 1500);
  };

  // Sozlamalarni qayta tiklash
  const handleReset = () => {
    if (window.confirm("Barcha o'zgarishlarni bekor qilishni xohlaysizmi?")) {
      window.location.reload();
    }
  };

  // Logo yuklash
  const handleLogoUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setLogoPreview(reader.result);
        setSettings({...settings, logo: reader.result});
      };
      reader.readAsDataURL(file);
    }
  };

  // Boolean qiymatni toggle qilish
  const toggleSetting = (key) => {
    setSettings({...settings, [key]: !settings[key]});
  };

  // Tabs
  const tabs = [
    { id: 'general', label: 'Asosiy', icon: <FiGlobe size={16} /> },
    { id: 'payment', label: "To'lov", icon: <FiCreditCard size={16} /> },
    { id: 'delivery', label: 'Yetkazib berish', icon: <FiTruck size={16} /> },
    { id: 'design', label: 'Dizayn', icon: <FiMonitor size={16} /> },
    { id: 'notifications', label: 'Bildirishnomalar', icon: <FiBell size={16} /> },
    { id: 'security', label: 'Xavfsizlik', icon: <FiShield size={16} /> },
  ];

  return (
    <div>
      {/* Header with save button */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Sozlamalar</h2>
          <p className="text-sm text-gray-500 mt-1">
            Sayt sozlamalarini boshqaring
          </p>
        </div>
        
        <div className="flex items-center gap-3">
          <button
            onClick={handleReset}
            className="flex items-center gap-2 px-4 py-2 border border-gray-200 rounded-lg hover:bg-gray-50 transition"
          >
            <FiRefreshCw size={16} />
            Bekor qilish
          </button>
          
          <button
            onClick={handleSave}
            disabled={isSaving}
            className={`flex items-center gap-2 px-6 py-2 rounded-lg transition ${
              saveSuccess 
                ? 'bg-green-500 text-white' 
                : 'bg-amber-400 text-gray-900 hover:bg-amber-500'
            }`}
          >
            {isSaving ? (
              <>
                <div className="w-4 h-4 border-2 border-gray-900 border-t-transparent rounded-full animate-spin" />
                Saqlanmoqda...
              </>
            ) : saveSuccess ? (
              <>
                <FiCheck size={16} />
                Saqlandi!
              </>
            ) : (
              <>
                <FiSave size={16} />
                Saqlash
              </>
            )}
          </button>
        </div>
      </div>

      {/* Tabs */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 mb-6 overflow-x-auto">
        <div className="flex p-1 min-w-max">
          {tabs.map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center gap-2 px-4 py-2.5 rounded-lg text-sm font-medium transition ${
                activeTab === tab.id
                  ? 'bg-amber-400 text-gray-900'
                  : 'text-gray-600 hover:bg-gray-50'
              }`}
            >
              {tab.icon}
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {/* Settings Content */}
      <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
        
        {/* Asosiy sozlamalar */}
        {activeTab === 'general' && (
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Asosiy ma'lumotlar</h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Sayt nomi
                </label>
                <input
                  type="text"
                  value={settings.siteName}
                  onChange={(e) => setSettings({...settings, siteName: e.target.value})}
                  className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:border-amber-400"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Sayt tavsifi
                </label>
                <input
                  type="text"
                  value={settings.siteDescription}
                  onChange={(e) => setSettings({...settings, siteDescription: e.target.value})}
                  className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:border-amber-400"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  <FiMail className="inline mr-1" size={14} />
                  Email
                </label>
                <input
                  type="email"
                  value={settings.email}
                  onChange={(e) => setSettings({...settings, email: e.target.value})}
                  className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:border-amber-400"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  <FiPhone className="inline mr-1" size={14} />
                  Telefon
                </label>
                <input
                  type="text"
                  value={settings.phone}
                  onChange={(e) => setSettings({...settings, phone: e.target.value})}
                  className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:border-amber-400"
                />
              </div>
              
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  <FiMapPin className="inline mr-1" size={14} />
                  Manzil
                </label>
                <input
                  type="text"
                  value={settings.address}
                  onChange={(e) => setSettings({...settings, address: e.target.value})}
                  className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:border-amber-400"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  <FiDollarSign className="inline mr-1" size={14} />
                  Valyuta
                </label>
                <select
                  value={settings.currency}
                  onChange={(e) => setSettings({...settings, currency: e.target.value})}
                  className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:border-amber-400"
                >
                  <option value="UZS">UZS (So'm)</option>
                  <option value="USD">USD ($)</option>
                  <option value="RUB">RUB (₽)</option>
                </select>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  <FiPercent className="inline mr-1" size={14} />
                  Soliq (%)
                </label>
                <input
                  type="number"
                  value={settings.tax}
                  onChange={(e) => setSettings({...settings, tax: parseInt(e.target.value)})}
                  className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:border-amber-400"
                />
              </div>
            </div>
          </div>
        )}

        {/* To'lov sozlamalari */}
        {activeTab === 'payment' && (
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">To'lov tizimlari</h3>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {[
                { key: 'clickEnabled', label: 'Click', icon: '💙' },
                { key: 'paymeEnabled', label: 'Payme', icon: '💚' },
                { key: 'uzcardEnabled', label: 'Uzcard', icon: '🟡' },
                { key: 'cashEnabled', label: 'Naqd pul', icon: '💵' },
              ].map(item => (
                <div key={item.key} className="flex items-center justify-between p-4 border rounded-lg">
                  <div className="flex items-center gap-3">
                    <span className="text-2xl">{item.icon}</span>
                    <span className="font-medium">{item.label}</span>
                  </div>
                  <button
                    onClick={() => toggleSetting(item.key)}
                    className={`relative w-12 h-6 rounded-full transition ${
                      settings[item.key] ? 'bg-amber-400' : 'bg-gray-200'
                    }`}
                  >
                    <span
                      className={`absolute top-1 left-1 w-4 h-4 bg-white rounded-full transition ${
                        settings[item.key] ? 'translate-x-6' : ''
                      }`}
                    />
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Yetkazib berish sozlamalari */}
        {activeTab === 'delivery' && (
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Yetkazib berish</h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Yetkazib berish narxi (so'm)
                </label>
                <input
                  type="number"
                  value={settings.deliveryPrice}
                  onChange={(e) => setSettings({...settings, deliveryPrice: parseInt(e.target.value)})}
                  className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:border-amber-400"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Bepul yetkazib berish (so'm dan)
                </label>
                <input
                  type="number"
                  value={settings.freeDeliveryFrom}
                  onChange={(e) => setSettings({...settings, freeDeliveryFrom: parseInt(e.target.value)})}
                  className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:border-amber-400"
                />
              </div>
            </div>
            
            <div className="bg-blue-50 p-4 rounded-lg">
              <p className="text-sm text-blue-600">
                <FiTruck className="inline mr-1" />
                {settings.freeDeliveryFrom.toLocaleString()} so'm dan yuqori buyurtmalar bepul yetkaziladi
              </p>
            </div>
          </div>
        )}

        {/* Dizayn sozlamalari */}
        {activeTab === 'design' && (
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Dizayn</h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Asosiy rang
                </label>
                <div className="flex gap-2">
                  <input
                    type="color"
                    value={settings.primaryColor}
                    onChange={(e) => setSettings({...settings, primaryColor: e.target.value})}
                    className="w-12 h-10 border rounded"
                  />
                  <input
                    type="text"
                    value={settings.primaryColor}
                    onChange={(e) => setSettings({...settings, primaryColor: e.target.value})}
                    className="flex-1 px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:border-amber-400"
                  />
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Ikkilamchi rang
                </label>
                <div className="flex gap-2">
                  <input
                    type="color"
                    value={settings.secondaryColor}
                    onChange={(e) => setSettings({...settings, secondaryColor: e.target.value})}
                    className="w-12 h-10 border rounded"
                  />
                  <input
                    type="text"
                    value={settings.secondaryColor}
                    onChange={(e) => setSettings({...settings, secondaryColor: e.target.value})}
                    className="flex-1 px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:border-amber-400"
                  />
                </div>
              </div>
              
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Logo
                </label>
                <div className="flex items-center gap-4">
                  <div className="w-20 h-20 bg-gray-100 rounded-lg flex items-center justify-center overflow-hidden border">
                    {logoPreview ? (
                      <img src={logoPreview} alt="Logo" className="w-full h-full object-contain" />
                    ) : (
                      <FiImage size={30} className="text-gray-400" />
                    )}
                  </div>
                  <div className="flex-1">
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleLogoUpload}
                      className="hidden"
                      id="logo-upload"
                    />
                    <label
                      htmlFor="logo-upload"
                      className="inline-flex items-center gap-2 px-4 py-2 border border-gray-200 rounded-lg hover:bg-gray-50 cursor-pointer"
                    >
                      <FiUpload size={16} />
                      Yangi logo yuklash
                    </label>
                    <p className="text-xs text-gray-400 mt-1">
                      Tavsiya etilgan o'lcham: 200x50px
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Bildirishnomalar */}
        {activeTab === 'notifications' && (
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Bildirishnomalar</h3>
            
            <div className="space-y-3">
              {[
                { key: 'emailNotifications', label: 'Email bildirishnomalari', desc: 'Yangi buyurtmalar haqida email orqali xabardor bo\'lish' },
                { key: 'smsNotifications', label: 'SMS bildirishnomalari', desc: 'Mijozlarga SMS orqali bildirishnomalar yuborish' },
                { key: 'orderNotifications', label: 'Buyurtma bildirishnomalari', desc: 'Yangi buyurtmalar haqida bildirishnoma olish' },
                { key: 'marketingEmails', label: 'Marketing emaillari', desc: 'Foydalanuvchilarga marketing emaillari yuborish' },
              ].map(item => (
                <div key={item.key} className="flex items-center justify-between p-4 border rounded-lg">
                  <div>
                    <p className="font-medium">{item.label}</p>
                    <p className="text-sm text-gray-500">{item.desc}</p>
                  </div>
                  <button
                    onClick={() => toggleSetting(item.key)}
                    className={`relative w-12 h-6 rounded-full transition ${
                      settings[item.key] ? 'bg-amber-400' : 'bg-gray-200'
                    }`}
                  >
                    <span
                      className={`absolute top-1 left-1 w-4 h-4 bg-white rounded-full transition ${
                        settings[item.key] ? 'translate-x-6' : ''
                      }`}
                    />
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Xavfsizlik */}
        {activeTab === 'security' && (
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Xavfsizlik</h3>
            
            <div className="space-y-3">
              {[
                { key: 'twoFactorAuth', label: 'Ikki faktorli autentifikatsiya', desc: 'Admin panelga kirish uchun qo\'shimcha xavfsizlik' },
                { key: 'captchaEnabled', label: 'CAPTCHA', desc: 'Ro\'yxatdan o\'tish va login qilishda captcha talab qilish' },
                { key: 'sslEnabled', label: 'SSL sertifikat', desc: 'Saytni SSL orqali himoyalash' },
              ].map(item => (
                <div key={item.key} className="flex items-center justify-between p-4 border rounded-lg">
                  <div>
                    <p className="font-medium">{item.label}</p>
                    <p className="text-sm text-gray-500">{item.desc}</p>
                  </div>
                  <button
                    onClick={() => toggleSetting(item.key)}
                    className={`relative w-12 h-6 rounded-full transition ${
                      settings[item.key] ? 'bg-amber-400' : 'bg-gray-200'
                    }`}
                  >
                    <span
                      className={`absolute top-1 left-1 w-4 h-4 bg-white rounded-full transition ${
                        settings[item.key] ? 'translate-x-6' : ''
                      }`}
                    />
                  </button>
                </div>
              ))}
            </div>

            <div className="mt-6 p-4 bg-amber-50 rounded-lg">
              <h4 className="font-medium text-amber-800 mb-2">Admin paroli</h4>
              <div className="relative">
                <input
                  type={showPassword ? 'text' : 'password'}
                  value="Admin123!"
                  readOnly
                  className="w-full px-4 py-2 pr-10 border border-amber-200 rounded-lg bg-white"
                />
                <button
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                >
                  {showPassword ? <FiEyeOff size={16} /> : <FiEye size={16} />}
                </button>
              </div>
              <p className="text-xs text-amber-600 mt-2">
                Parolni o'zgartirish uchun profil sahifasiga o'ting
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}