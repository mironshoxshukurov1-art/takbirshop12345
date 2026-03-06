import React from "react";
import { useState, useRef, useEffect } from "react";
import { 
  FiUser, FiSettings, FiBell, FiLock, FiUpload, FiTrash2, 
  FiChevronRight, FiCalendar, FiChevronDown, FiCheck, FiMenu,
  FiX, FiEdit2, FiSave, FiCamera, FiMapPin, FiMail, FiPhone
} from "react-icons/fi";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";

const navItems = [
  { id: "personal", label: "Personal Info", icon: FiUser, color: "from-rose-400 to-pink-500" },
  { id: "settings", label: "Settings", icon: FiSettings, color: "from-blue-400 to-indigo-500" },
  { id: "notifications", label: "Notifications", icon: FiBell, color: "from-amber-400 to-orange-500" },
  { id: "security", label: "Security", icon: FiLock, color: "from-emerald-400 to-teal-500" },
];

export default function Profil() {
  const [active, setActive] = useState("personal");
  const [photo, setPhoto] = useState(null);
  const [saved, setSaved] = useState(false);
  const [saving, setSaving] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [editMode, setEditMode] = useState({});
  const [hoveredField, setHoveredField] = useState(null);
  const [showSuccessAnimation, setShowSuccessAnimation] = useState(false);
  const fileRef = useRef();
  const formRef = useRef();

  const [form, setForm] = useState({
    firstName: "Ivan",
    lastName: "Norris",
    email: "ivannorris11@gmail.com",
    username: "ivan.norris",
    dob: "1990-01-01",
    country: "United States",
    phone: "+17840363856",
    address: "Craile Cottage, Coupledyke Lane, Kirton",
    bio: "Passionate developer with a love for creating beautiful user experiences.",
  });

  const [formErrors, setFormErrors] = useState({});

  useEffect(() => {
    // Load saved data from localStorage on component mount
    const savedData = localStorage.getItem('userProfile');
    if (savedData) {
      setForm(JSON.parse(savedData));
    }
  }, []);

  const validateForm = () => {
    const errors = {};
    if (!form.firstName.trim()) errors.firstName = "First name is required";
    if (!form.lastName.trim()) errors.lastName = "Last name is required";
    if (!form.email.trim()) errors.email = "Email is required";
    else if (!/\S+@\S+\.\S+/.test(form.email)) errors.email = "Email is invalid";
    if (!form.username.trim()) errors.username = "Username is required";
    if (!form.phone.trim()) errors.phone = "Phone number is required";
    else if (!/^[\+]?[(]?[0-9]{1,4}[)]?[-\s\.]?[(]?[0-9]{1,4}[)]?[-\s\.]?[0-9]{1,4}[-\s\.]?[0-9]{1,9}$/.test(form.phone)) 
      errors.phone = "Phone number is invalid";
    
    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handlePhoto = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    
    // Validate file type and size
    if (!file.type.startsWith('image/')) {
      alert('Please upload an image file');
      return;
    }
    if (file.size > 5 * 1024 * 1024) {
      alert('File size should be less than 5MB');
      return;
    }

    const reader = new FileReader();
    reader.onload = (ev) => {
      setPhoto(ev.target.result);
      // Show success animation
      setShowSuccessAnimation(true);
      setTimeout(() => setShowSuccessAnimation(false), 1500);
    };
    reader.readAsDataURL(file);
  };

  const removePhoto = () => {
    setPhoto(null);
    fileRef.current.value = "";
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((p) => ({ ...p, [name]: value }));
    // Clear error for this field if it exists
    if (formErrors[name]) {
      setFormErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const handleSave = () => {
    if (!validateForm()) return;

    setSaving(true);
    // Simulate API call
    setTimeout(() => {
      setSaving(false);
      setSaved(true);
      setShowSuccessAnimation(true);
      
      // Save to localStorage
      localStorage.setItem('userProfile', JSON.stringify(form));
      
      setTimeout(() => {
        setSaved(false);
        setShowSuccessAnimation(false);
      }, 2500);
    }, 1200);
  };

  const toggleEditMode = (field) => {
    setEditMode(prev => ({ ...prev, [field]: !prev[field] }));
  };

  const isFormTouched = Object.values(form).some((v) => v !== '') || photo;

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: { 
        staggerChildren: 0.1,
        delayChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { 
      y: 0, 
      opacity: 1,
      transition: { type: "spring", stiffness: 100 }
    }
  };

  return (
    <motion.div 
      initial="hidden"
      animate="visible"
      variants={containerVariants}
      className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 p-4 md:p-6 lg:p-10"
    >
      {/* Success Animation Overlay */}
      <AnimatePresence>
        {showSuccessAnimation && (
          <motion.div
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.5 }}
            className="fixed top-4 right-4 z-50 bg-green-500 text-white px-6 py-3 rounded-lg shadow-lg flex items-center gap-2"
          >
            <FiCheck className="animate-bounce" />
            <span>Changes saved successfully!</span>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Breadcrumb */}
      <motion.div 
        variants={itemVariants}
        className="flex items-center gap-1 text-xs text-gray-400 mb-4"
      >
        <Link to={'/'}>
          <span className="hover:text-gray-600 cursor-pointer transition-colors">Home</span>
        </Link>
        <FiChevronRight size={12} />
        <span className="text-gray-700 font-medium">My Profile</span>
      </motion.div>

      {/* Header */}
      <motion.div 
        variants={itemVariants}
        className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6"
      >
        <h1 className="text-2xl md:text-3xl font-bold bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent">
          My Account
        </h1>
        
        {/* Mobile Menu Button */}
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="lg:hidden flex items-center gap-2 px-4 py-2 bg-white rounded-xl shadow-sm border border-gray-200"
        >
          {mobileMenuOpen ? <FiX size={18} /> : <FiMenu size={18} />}
          <span className="text-sm font-medium">Menu</span>
        </button>
      </motion.div>

      <div className="flex flex-col lg:flex-row gap-6">
        {/* Sidebar Navigation */}
        <motion.div 
          variants={itemVariants}
          className={`lg:w-64 shrink-0 ${mobileMenuOpen ? 'block' : 'hidden lg:block'}`}
        >
          <div className="bg-white/80 backdrop-blur-sm rounded-2xl border border-gray-200 shadow-lg p-3 sticky top-4">
            {navItems.map(({ id, label, icon: Icon, color }) => (
              <motion.button
                key={id}
                whileHover={{ scale: 1.02, x: 5 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => {
                  setActive(id);
                  setMobileMenuOpen(false);
                }}
                className={`w-full flex items-center gap-3 px-4 py-3.5 rounded-xl text-sm font-medium transition-all duration-300 mb-1 ${
                  active === id
                    ? `bg-gradient-to-r ${color} text-white shadow-lg`
                    : "text-gray-600 hover:bg-white/50"
                }`}
              >
                <Icon size={18} className={active === id ? "animate-pulse" : ""} />
                <span>{label}</span>
                {active === id && (
                  <motion.div
                    layoutId="activeIndicator"
                    className="ml-auto w-1.5 h-1.5 bg-white rounded-full"
                  />
                )}
              </motion.button>
            ))}
          </div>
        </motion.div>

        {/* Main Content */}
        <motion.div 
          variants={itemVariants}
          className="flex-1 bg-white/90 backdrop-blur-sm rounded-2xl border border-gray-200 shadow-xl p-4 md:p-6 lg:p-8"
        >
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
            <h2 className="text-lg md:text-xl font-semibold bg-gradient-to-r from-gray-800 to-gray-600 bg-clip-text text-transparent">
              {navItems.find(item => item.id === active)?.label || "Personal Information"}
            </h2>
            
            {/* Quick Actions */}
            <div className="flex items-center gap-2">
              {isFormTouched && (
                <motion.button
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  onClick={handleSave}
                  disabled={saving}
                  className="flex items-center gap-2 px-4 py-2 bg-rose-400 hover:bg-rose-500 text-white rounded-xl text-sm font-medium transition-all disabled:opacity-50"
                >
                  {saving ? (
                    <>
                      <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none"/>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"/>
                      </svg>
                      <span>Saving...</span>
                    </>
                  ) : (
                    <>
                      <FiSave size={16} />
                      <span>Save Changes</span>
                    </>
                  )}
                </motion.button>
              )}
            </div>
          </div>

          {/* Profile Photo Section */}
          <motion.div 
            variants={itemVariants}
            className="flex flex-col sm:flex-row items-center gap-6 mb-8 p-4 bg-gradient-to-r from-gray-50 to-rose-50 rounded-xl"
          >
            <div className="relative">
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => fileRef.current.click()}
                className="relative w-24 h-24 md:w-28 md:h-28 rounded-full overflow-hidden border-4 border-white shadow-xl cursor-pointer group"
              >
                {photo ? (
                  <img
                    src={photo}
                    alt="avatar"
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="w-full h-full bg-gradient-to-br from-rose-100 to-pink-100 flex items-center justify-center">
                    <FiUser size={40} className="text-rose-400" />
                  </div>
                )}
                
                {/* Hover Overlay */}
                <div className="absolute inset-0 bg-black/50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                  <FiCamera size={24} className="text-white" />
                </div>
              </motion.div>

              {/* Edit Badge */}
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                className="absolute -bottom-1 -right-1 w-8 h-8 bg-rose-500 rounded-full flex items-center justify-center border-4 border-white"
              >
                <FiEdit2 size={14} className="text-white" />
              </motion.div>
            </div>

            <input
              ref={fileRef}
              type="file"
              accept="image/*"
              onChange={handlePhoto}
              className="hidden"
            />

            <div className="flex flex-col sm:flex-row gap-3">
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => fileRef.current.click()}
                className="flex items-center justify-center gap-2 bg-rose-400 hover:bg-rose-500 text-white text-sm font-medium px-5 py-2.5 rounded-xl transition-all shadow-md hover:shadow-lg"
              >
                <FiUpload size={16} />
                Upload Photo
              </motion.button>

              {photo && (
                <motion.button
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={removePhoto}
                  className="flex items-center justify-center gap-2 border-2 border-gray-200 hover:border-red-300 hover:bg-red-50 text-gray-600 hover:text-red-500 text-sm font-medium px-5 py-2.5 rounded-xl transition-all"
                >
                  <FiTrash2 size={16} />
                  Remove
                </motion.button>
              )}
            </div>
          </motion.div>

          {/* Form Fields */}
          <motion.div 
            variants={containerVariants}
            className="grid grid-cols-1 md:grid-cols-2 gap-5"
          >
            <Field
              label="First Name"
              name="firstName"
              value={form.firstName}
              onChange={handleChange}
              onHover={setHoveredField}
              isHovered={hoveredField === 'firstName'}
              placeholder="Enter first name"
              error={formErrors.firstName}
              icon={FiUser}
              required
            />
            <Field
              label="Last Name"
              name="lastName"
              value={form.lastName}
              onChange={handleChange}
              onHover={setHoveredField}
              isHovered={hoveredField === 'lastName'}
              placeholder="Enter last name"
              error={formErrors.lastName}
              icon={FiUser}
              required
            />
            <Field
              label="Email"
              name="email"
              type="email"
              value={form.email}
              onChange={handleChange}
              onHover={setHoveredField}
              isHovered={hoveredField === 'email'}
              placeholder="Enter email"
              error={formErrors.email}
              icon={FiMail}
              required
            />
            <Field
              label="Username"
              name="username"
              value={form.username}
              onChange={handleChange}
              onHover={setHoveredField}
              isHovered={hoveredField === 'username'}
              placeholder="Enter username"
              error={formErrors.username}
              icon={FiUser}
              required
            />

            <div className="md:col-span-2">
              <Field
                label="Bio"
                name="bio"
                type="textarea"
                value={form.bio}
                onChange={handleChange}
                onHover={setHoveredField}
                isHovered={hoveredField === 'bio'}
                placeholder="Tell us about yourself"
                rows={3}
              />
            </div>

            <div className="md:col-span-2">
              <motion.div variants={itemVariants}>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">
                  Date of Birth <span className="text-rose-400">*</span>
                </label>
                <div className="relative">
                  <FiCalendar
                    size={18}
                    className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
                  />
                  <input
                    type="date"
                    name="dob"
                    value={form.dob}
                    onChange={handleChange}
                    className="w-full border border-gray-200 rounded-xl pl-10 pr-4 py-3 text-sm text-gray-700 outline-none focus:border-rose-300 focus:ring-2 focus:ring-rose-50 transition-all bg-gray-50 hover:bg-white"
                  />
                </div>
              </motion.div>
            </div>

            <motion.div variants={itemVariants}>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">
                Country <span className="text-rose-400">*</span>
              </label>
              <div className="relative">
                <select
                  name="country"
                  value={form.country}
                  onChange={handleChange}
                  className="w-full appearance-none border border-gray-200 rounded-xl px-4 py-3 text-sm text-gray-700 outline-none focus:border-rose-300 focus:ring-2 focus:ring-rose-50 transition-all bg-gray-50 hover:bg-white cursor-pointer"
                >
                  <option value="">Select country</option>
                  {[
                    "Brazil", "United States", "United Kingdom", "Germany",
                    "France", "Japan", "Australia", "Canada", "India", "China"
                  ].map((c) => (
                    <option key={c}>{c}</option>
                  ))}
                </select>
                <FiChevronDown
                  size={18}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none"
                />
              </div>
            </motion.div>

            <Field
              label="Phone Number"
              name="phone"
              type="tel"
              value={form.phone}
              onChange={handleChange}
              onHover={setHoveredField}
              isHovered={hoveredField === 'phone'}
              placeholder="Enter phone number"
              error={formErrors.phone}
              icon={FiPhone}
              required
            />

            <div className="md:col-span-2">
              <Field
                label="Address"
                name="address"
                value={form.address}
                onChange={handleChange}
                onHover={setHoveredField}
                isHovered={hoveredField === 'address'}
                placeholder="Enter address"
                icon={FiMapPin}
                required
              />
            </div>
          </motion.div>
        </motion.div>
      </div>
    </motion.div>
  );
}

function Field({
  label,
  name,
  type = "text",
  value,
  onChange,
  onHover,
  isHovered,
  placeholder,
  required,
  error,
  icon: Icon,
  rows
}) {
  const [focused, setFocused] = useState(false);
  const [charCount, setCharCount] = useState(0);

  useEffect(() => {
    if (type === 'textarea' && value) {
      setCharCount(value.length);
    }
  }, [value, type]);

  const handleChange = (e) => {
    onChange(e);
    if (type === 'textarea') {
      setCharCount(e.target.value.length);
    }
  };

  return (
    <motion.div
      variants={{
        hidden: { opacity: 0, y: 20 },
        visible: { opacity: 1, y: 0 }
      }}
      onMouseEnter={() => onHover?.(name)}
      onMouseLeave={() => onHover?.(null)}
      className="relative"
    >
      <label className="block text-sm font-medium text-gray-700 mb-1.5">
        {label} {required && <span className="text-rose-400">*</span>}
      </label>
      <div className="relative">
        {Icon && (
          <Icon
            size={18}
            className={`absolute left-3 top-1/2 -translate-y-1/2 transition-colors ${
              focused || isHovered ? 'text-rose-400' : 'text-gray-400'
            }`}
          />
        )}
        
        {type === 'textarea' ? (
          <textarea
            name={name}
            value={value}
            onChange={handleChange}
            placeholder={placeholder}
            rows={rows || 3}
            onFocus={() => setFocused(true)}
            onBlur={() => setFocused(false)}
            className={`w-full border rounded-xl px-4 py-3 text-sm text-gray-700 outline-none transition-all bg-gray-50 hover:bg-white placeholder-gray-300 ${
              Icon ? 'pl-10' : ''
            } ${
              focused || isHovered ? 'border-rose-300 ring-2 ring-rose-50' : 'border-gray-200'
            } ${error ? 'border-red-400 ring-2 ring-red-50' : ''}`}
          />
        ) : (
          <input
            type={type}
            name={name}
            value={value}
            onChange={handleChange}
            placeholder={placeholder}
            onFocus={() => setFocused(true)}
            onBlur={() => setFocused(false)}
            className={`w-full border rounded-xl px-4 py-3 text-sm text-gray-700 outline-none transition-all bg-gray-50 hover:bg-white placeholder-gray-300 ${
              Icon ? 'pl-10' : ''
            } ${
              focused || isHovered ? 'border-rose-300 ring-2 ring-rose-50' : 'border-gray-200'
            } ${error ? 'border-red-400 ring-2 ring-red-50' : ''}`}
          />
        )}

        {type === 'textarea' && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="absolute bottom-2 right-2 text-xs text-gray-400"
          >
            {charCount} characters
          </motion.div>
        )}
      </div>
      
      <AnimatePresence>
        {error && (
          <motion.p
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="text-xs text-red-500 mt-1 ml-1"
          >
            {error}
          </motion.p>
        )}
      </AnimatePresence>
    </motion.div>
  );
}