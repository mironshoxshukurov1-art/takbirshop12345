import React, { useState, useRef, useEffect, useContext } from "react";
import { useTranslation } from "react-i18next";
import { BiCategoryAlt } from "react-icons/bi";
import { CgProfile } from "react-icons/cg";
import { FaChevronRight, FaCreditCard, FaBoxOpen, FaPhoneAlt, FaInfoCircle, FaUserPlus } from "react-icons/fa";
import { HiOutlineShoppingBag, HiOutlineHome } from "react-icons/hi";
import { IoLocationSharp } from "react-icons/io5";
import { LuLogIn } from "react-icons/lu";
import { MdAddShoppingCart, MdMenu, MdClose } from "react-icons/md";
import { Link, useNavigate, useLocation } from "react-router-dom";
import ThemeToggle from "./Components/ThemeToggle";
import { MyContext } from "./context/MyContext";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const dropdownRef = useRef(null);
  const navigate = useNavigate();
  const location = useLocation();
  const { t, i18n } = useTranslation();

  const { cart } = useContext(MyContext);
  const totalCart = cart.reduce((s, i) => s + i.qty, 0);

  useEffect(() => {
    function handleClickOutside(e) {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setIsOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  useEffect(() => {
    document.body.style.overflow = mobileMenuOpen ? "hidden" : "";
    return () => (document.body.style.overflow = "");
  }, [mobileMenuOpen]);

  const categories = [
    { key: "payment", icon: <FaCreditCard />, path: "/payment" },
    { key: "cart", icon: <FaBoxOpen />, path: "/cart" },
    { key: "contact", icon: <FaPhoneAlt />, path: "/contact" },
    { key: "profile", icon: <CgProfile />, path: "/profile" },
    { key: "about", icon: <FaInfoCircle />, path: "/about" },
    { key: "signup", icon: <FaUserPlus />, path: "/signup" },
  ];

  const bottomNavItems = [
    { key: "home", path: "/", icon: <HiOutlineHome size={22} /> },
    {
      key: "cart",
      path: "/savatcha",
      icon: (
        <div className="relative">
          <HiOutlineShoppingBag size={22} />
          {totalCart > 0 && (
            <span className="absolute -top-2 -right-2 bg-red-500 text-white text-[9px] font-bold min-w-[16px] h-4 px-0.5 rounded-full flex items-center justify-center leading-none">
              {totalCart > 99 ? "99+" : totalCart}
            </span>
          )}
        </div>
      ),
    },
    { key: "Profil", path: "/Profil", icon: <CgProfile size={22} /> },
  ];

  const pageLinks = [
    { key: "home", label: "Bosh sahifa", icon: <HiOutlineHome size={20} />, path: "/" },
    { key: "categories", label: "Kategoriyalar", icon: <BiCategoryAlt size={20} />, path: "/categories" },
    { key: "cart", label: "Savat", icon: <MdAddShoppingCart size={20} />, path: "/cart" },
    { key: "orders", label: "Buyurtmalar", icon: <HiOutlineShoppingBag size={20} />, path: "/savatcha" },
    { key: "Profil", label: "Profil", icon: <CgProfile size={20} />, path: "/Profil" },
    { key: "login", label: "Kirish", icon: <LuLogIn size={20} />, path: "/login" },
  ];

  return (
    <>
      <div className="fixed top-0 left-0 right-0 z-50">
        <div className="bg-[#333] dark:bg-gray-900 h-[45px] hidden md:flex items-center justify-between px-4 lg:px-10">
          <div className="flex items-center gap-2">
            <IoLocationSharp className="text-white" size={18} />
            <span className="text-white text-sm font-light truncate max-w-[200px] lg:max-w-none">
              47, I. Karimov ko'chasi, Jizzax
            </span>
          </div>
          <div className="flex items-center gap-4 lg:gap-6">
            <span className="text-white text-sm hidden lg:block">
              {t("topbar.contact_center")}:
              <strong className="ml-2">+998 90 123 45 67</strong>
            </span>
            <span className="text-white text-sm lg:hidden">
              <strong>+998 90 123 45 67</strong>
            </span>
            <ThemeToggle />
            <select
              value={i18n.language}
              onChange={(e) => i18n.changeLanguage(e.target.value)}
              className="bg-transparent text-white border border-white/30 rounded px-2 py-1 text-sm"
            >
              <option value="uz" className="text-black dark:text-white dark:bg-gray-800">O'zb</option>
              <option value="en" className="text-black dark:text-white dark:bg-gray-800">ENG</option>
            </select>
          </div>
        </div>

        <div className="flex items-center justify-between px-4 lg:px-10 h-16 lg:h-20 border-b border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800">
          <img src="/takbir.png" alt="Logo" className="h-10 lg:h-[50px]" />

          <div className="hidden lg:block relative ml-12" ref={dropdownRef}>
            <div
              onClick={() => setIsOpen(!isOpen)}
              className="flex items-center gap-2 cursor-pointer font-medium text-gray-700 dark:text-gray-300"
            >
              <BiCategoryAlt size={20} />
              {t("navbar.categories")}
              <FaChevronRight
                size={12}
                className={`transition-transform duration-200 ${isOpen ? "rotate-90" : ""}`}
              />
            </div>
            {isOpen && (
              <div className="absolute top-full mt-2 w-56 bg-white dark:bg-gray-800 rounded-xl shadow-xl border border-gray-200 dark:border-gray-700 py-2 z-50">
                {categories.map((cat) => (
                  <div
                    key={cat.key}
                    onClick={() => { navigate(cat.path); setIsOpen(false); }}
                    className="flex items-center gap-3 px-4 py-2 text-sm hover:bg-gray-100 dark:hover:bg-gray-700 cursor-pointer text-gray-700 dark:text-gray-300"
                  >
                    <span className="text-lg">{cat.icon}</span>
                    {t(`categories.${cat.key}`)}
                  </div>
                ))}
              </div>
            )}
          </div>

          <div className="hidden md:block flex-1 mx-4 lg:mx-8">
            <input
              type="text"
              placeholder={t("navbar.search")}
              className="w-full px-4 py-2 lg:py-2.5 rounded-lg border border-gray-200 dark:border-gray-700 text-sm focus:outline-none focus:ring-2 focus:ring-red-200 dark:focus:ring-red-800 bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400"
            />
          </div>

          <div className="hidden md:flex items-center gap-4 lg:gap-6">
            <div
              onClick={() => navigate("/Profil")}
              className="flex flex-col items-center text-gray-600 dark:text-gray-400 hover:text-red-500 dark:hover:text-red-400 cursor-pointer"
            >
              <CgProfile size={24} />
              <span className="text-xs hidden lg:block">{t("My profile")}</span>
            </div>

            <div
              onClick={() => navigate("/savatcha")}
              className="flex flex-col items-center text-gray-600 dark:text-gray-400 hover:text-red-500 dark:hover:text-red-400 cursor-pointer"
            >
              <HiOutlineShoppingBag size={24} />
              <span className="text-xs hidden lg:block">{t("navbar.orders")}</span>
            </div>

            <div
              onClick={() => navigate("/savatcha")}
              className="flex flex-col items-center text-gray-600 dark:text-gray-400 hover:text-red-500 dark:hover:text-red-400 cursor-pointer"
            >
              <div className="relative">
                <MdAddShoppingCart size={24} />
                {totalCart > 0 && (
                  <span className="absolute -top-2 -right-2 bg-red-500 text-white text-[9px] font-bold min-w-[16px] h-4 px-0.5 rounded-full flex items-center justify-center leading-none">
                    {totalCart > 99 ? "99+" : totalCart}
                  </span>
                )}
              </div>
              <span className="text-xs hidden lg:block">{t("navbar.cart")}</span>
            </div>

            <Link
              to="/login"
              className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400 hover:text-red-500 dark:hover:text-red-400"
            >
              <LuLogIn size={18} />
              <span className="hidden lg:block">{t("navbar.login")}</span>
            </Link>
          </div>

          <div className="flex items-center gap-3 md:hidden">
            <ThemeToggle />
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 text-gray-600 dark:text-gray-400"
            >
              {mobileMenuOpen ? <MdClose size={24} /> : <MdMenu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile sidebar */}
      <div
        className={`fixed inset-0 bg-black/50 z-50 transition-opacity duration-300 md:hidden ${
          mobileMenuOpen ? "opacity-100 visible" : "opacity-0 invisible"
        }`}
        onClick={() => setMobileMenuOpen(false)}
      >
        <div
          className={`fixed top-0 right-0 w-[280px] h-full bg-white dark:bg-gray-800 shadow-xl transform transition-transform duration-300 ${
            mobileMenuOpen ? "translate-x-0" : "translate-x-full"
          }`}
          onClick={(e) => e.stopPropagation()}
        >
          <div className="p-5 relative h-full">
            <div className="flex items-center justify-between mb-6">
              <img src="/takbir.png" alt="Logo" className="h-8" />
              <button onClick={() => setMobileMenuOpen(false)} className="p-2 text-gray-600 dark:text-gray-400">
                <MdClose size={20} />
              </button>
            </div>

            <div className="space-y-1 overflow-y-auto pb-24" style={{ maxHeight: "calc(100vh - 180px)" }}>
              {pageLinks.map((page) => {
                const active = location.pathname === page.path;
                return (
                  <div
                    key={page.key}
                    onClick={() => { navigate(page.path); setMobileMenuOpen(false); }}
                    className={`flex items-center gap-3 px-4 py-3 rounded-lg cursor-pointer transition-colors ${
                      active
                        ? "bg-red-50 dark:bg-red-900/20 text-red-600 dark:text-red-400"
                        : "hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-300"
                    }`}
                  >
                    <span className={`text-xl ${active ? "text-red-600 dark:text-red-400" : "text-gray-600 dark:text-gray-400"}`}>
                      {page.icon}
                    </span>
                    <span className="font-medium">{page.label}</span>
                    {page.key === "cart" && totalCart > 0 && (
                      <span className="ml-auto bg-red-500 text-white text-xs font-bold px-2 py-0.5 rounded-full">
                        {totalCart}
                      </span>
                    )}
                  </div>
                );
              })}
            </div>

            <div className="absolute bottom-5 left-5 right-5">
              <div className="pt-4 border-t border-gray-200 dark:border-gray-700">
                <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400 mb-2">
                  <IoLocationSharp size={16} />
                  <span className="truncate">47, I. Karimov ko'chasi, Jizzax</span>
                </div>
                <div className="text-sm text-gray-600 dark:text-gray-400">
                  {t("topbar.contact_center")}: <strong>+998 90 123 45 67</strong>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="fixed bottom-0 left-0 right-0 h-16 bg-white dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700 flex justify-around items-center shadow md:hidden z-40">
        {bottomNavItems.map((item) => {
          const active = location.pathname === item.path;
          return (
            <div
              key={item.key}
              onClick={() => navigate(item.path)}
              className={`flex flex-col items-center text-xs cursor-pointer transition-colors ${
                active
                  ? "text-red-500 dark:text-red-400 font-semibold"
                  : "text-gray-400 dark:text-gray-500"
              }`}
            >
              {item.icon}
              <span className="mt-1">
                {item.key === "home" ? "Bosh" : 
                 item.key === "cart" ? "Savat" : "Profil"}
              </span>
            </div>
          );
        })}
      </div>

      <div className="h-[116px] md:h-[125px] lg:h-[125px]" />
      <div className="h-16 md:h-0" />
    </>
  );
}