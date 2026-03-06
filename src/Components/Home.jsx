import React, { useEffect, useState } from "react";
import Navbar from "../Navbar";
import Footer from "../Footer";
import axios from "axios";
import { Link } from "react-router-dom";
import { FaStar, FaArrowRight, FaEnvelope } from "react-icons/fa";
import { FaTrophy,  FaShippingFast, FaFire, FaCertificate } from "react-icons/fa";
import {
  FiTruck,
  FiShield,
  FiRefreshCw,
  FiHeadphones,
  FiChevronLeft,
  FiChevronRight,
} from "react-icons/fi";
import toast, { Toaster } from "react-hot-toast";
import { MdDiscount, MdOutlineStarRate } from "react-icons/md";

const PAGE_SIZE = 12;

export default function Home() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [email, setEmail] = useState("");

  useEffect(() => {
    axios
      .get("https://dummyjson.com/products?limit=100")
      .then((r) => setData(r.data.products))
      .catch(console.error)
      .finally(() => setLoading(false));
  }, []);

  const categories = [...new Set(data.map((p) => p.category))].slice(0, 8);
  const topProducts = [...data].sort((a, b) => b.rating - a.rating).slice(0, 4);
  const saleProducts = [...data]
    .filter((p) => p.discountPercentage > 15)
    .slice(0, 4);

  // Pagination
  const totalPages = Math.ceil(data.length / PAGE_SIZE);
  const paginated = data.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);

  const goPage = (p) => {
    setPage(p);
    document
      .getElementById("all-products")
      ?.scrollIntoView({ behavior: "smooth" });
  };

  const handleSubscribe = (e) => {
    e.preventDefault();
    if (!email) return;
    toast.success("Muvaffaqiyatli obuna boldingiz! 🎉", {
      style: {
        borderRadius: "12px",
        background: "#111",
        color: "#fff",
        fontSize: "13px",
        fontWeight: "600",
      },
      iconTheme: { primary: "#f59e0b", secondary: "#111" },
      duration: 3500,
    });
    setEmail("");
  };


const marqueeItems = [
  <span className="flex items-center gap-1">
    <FaStar className="text-blue-500" /> Yangi kolleksiya
  </span>,
  <span className="flex items-center gap-1">
    <FaShippingFast className="text-green-500" /> Bepul yetkazish
  </span>,
  <span className="flex items-center gap-1">
    <MdDiscount /> Chegirmalar
  </span>,
  <span className="flex items-center gap-1">
    <FaCertificate className="text-purple-500" /> Premium sifat
  </span>,
  "Tez yetkazib berish",
  "1 yil kafolat",
  "500+ mahsulot",
  <span className="flex items-center gap-1">
    <FaTrophy className="text-yellow-400" /> Top brendlar
  </span>,
  "30 kun qaytarish",
];

  return (
      <div className="min-h-screen  bg-[#ffffff]  bg-  dark:bg-gray-900 dark:text-white  " >
        <style>{`
          @import url('https://fonts.googleapis.com/css2?family=Syne:wght@400;600;700;800&family=DM+Sans:wght@300;400;500&display=swap');
          body { font-family: 'DM Sans', sans-serif; }
          .syne { font-family: 'Syne', sans-serif; }

          @keyframes fadeUp {
            from { opacity: 0; transform: translateY(20px); }
            to   { opacity: 1; transform: translateY(0); }
          }
          .fade-up { animation: fadeUp 0.5s cubic-bezier(.23,1,.32,1) both; }

          /* Marquee */
          @keyframes marquee {
            from { transform: translateX(0); }
            to   { transform: translateX(-50%); }
          }
          .marquee-track { display: flex; width: max-content; animation: marquee 22s linear infinite; }
          .marquee-track:hover { animation-play-state: paused; }

          @keyframes marqueeRev {
            from { transform: translateX(-50%); }
            to   { transform: translateX(0); }
          }
          .marquee-track-rev { display: flex; width: max-content; animation: marqueeRev 28s linear infinite; }

          /* Geometric hero animations */
          @keyframes floatA {
            0%,100% { transform: translateY(0) rotate(0deg); }
            50%      { transform: translateY(-18px) rotate(8deg); }
          }
          @keyframes floatB {
            0%,100% { transform: translateY(0) rotate(0deg); }
            50%      { transform: translateY(14px) rotate(-6deg); }
          }
          @keyframes floatC {
            0%,100% { transform: translateY(0) rotate(45deg); }
            50%      { transform: translateY(-10px) rotate(55deg); }
          }
          .geo-a { animation: floatA 6s ease-in-out infinite; }
          .geo-b { animation: floatB 8s ease-in-out infinite; }
          .geo-c { animation: floatC 5s ease-in-out infinite; }
          .geo-d { animation: floatB 7s ease-in-out infinite 1s; }
          .geo-e { animation: floatA 9s ease-in-out infinite 2s; }

          /* Cards */
          .prod-card { transition: transform 0.25s ease, box-shadow 0.25s ease; }
          .prod-card:hover { transform: translateY(-4px); box-shadow: 0 16px 40px rgba(0,0,0,0.08); }
          .prod-card:hover .prod-img { transform: scale(1.06); }
          .prod-img { transition: transform 0.4s ease; }

          .cat-card { transition: all 0.2s ease; }
          .cat-card:hover { background: #111; }
          .cat-card:hover span { color: white; }

          /* Pagination */
          .page-btn { width: 36px; height: 36px; border-radius: 10px; display: flex; align-items: center; justify-content: center; font-size: 13px; font-weight: 600; transition: all 0.15s; border: 1.5px solid #e5e7eb; background: white; color: #6b7280; cursor: pointer; }
          .page-btn:hover:not(.active):not(:disabled) { border-color: #111; color: #111; }
          .page-btn.active { background: #111; color: white; border-color: #111; }
          .page-btn:disabled { opacity: 0.35; cursor: not-allowed; }
        `}</style>

        <Navbar />
        <Toaster position="top-right" />

        <div className="fade-up max-w-screen-xl mx-auto px-4 pt-6 pb-10">
          <div
            className="rounded-3xl overflow-hidden relative flex items-center"
            style={{
              background:
                "linear-gradient(135deg, #0f0f0f 0%, #1c1c1c 60%, #111 100%)",
              minHeight: 340,
            }}
          >
            <div
              className="geo-a absolute"
              style={{
                right: "12%",
                top: "10%",
                width: 180,
                height: 180,
                borderRadius: "50%",
                border: "2px solid rgba(255,255,255,0.06)",
              }}
            />
            <div
              className="geo-b absolute"
              style={{
                right: "18%",
                top: "20%",
                width: 100,
                height: 100,
                borderRadius: "50%",
                background: "rgba(255,255,255,0.03)",
                border: "1.5px solid rgba(255,255,255,0.08)",
              }}
            />
            {/* Kvadrat */}
            <div
              className="geo-c absolute"
              style={{
                right: "8%",
                bottom: "15%",
                width: 70,
                height: 70,
                border: "2px solid rgba(245,158,11,0.25)",
                borderRadius: 14,
              }}
            />
            {/* Kichik to'ldirish */}
            <div
              className="geo-d absolute"
              style={{
                right: "30%",
                top: "15%",
                width: 40,
                height: 40,
                borderRadius: "50%",
                background: "rgba(245,158,11,0.12)",
              }}
            />
            {/* Diagonal chiziq */}
            <div
              className="geo-e absolute"
              style={{
                right: "22%",
                bottom: "20%",
                width: 120,
                height: 1.5,
                background:
                  "linear-gradient(90deg, transparent, rgba(255,255,255,0.12), transparent)",
                transform: "rotate(-30deg)",
              }}
            />
            {/* Nuqta to'plam */}
            {[...Array(6)].map((_, i) => (
              <div
                key={i}
                className="absolute rounded-full geo-b"
                style={{
                  right: `${10 + i * 6}%`,
                  top: `${60 + (i % 3) * 12}%`,
                  width: 4,
                  height: 4,
                  background: `rgba(255,255,255,${0.04 + i * 0.015})`,
                  animationDelay: `${i * 0.4}s`,
                }}
              />
            ))}
            <div
              className="absolute"
              style={{
                right: "-5%",
                top: "50%",
                transform: "translateY(-50%)",
                width: 300,
                height: 300,
                borderRadius: "50%",
                border: "40px solid rgba(255,255,255,0.025)",
              }}
            />

            <div className="relative z-10 px-10 py-14 max-w-lg">
              <span className="inline-flex items-center gap-2 text-[10px] font-bold uppercase tracking-widest text-amber-400 mb-4">
                <span className="w-4 h-px bg-amber-400" />
                Yangi kolleksiya 2025
              </span>
              <h1 className="syne text-4xl lg:text-5xl font-800 text-white leading-tight mb-4">
                Eng yaxshi
                <br />
                <span style={{ color: "#f59e0b" }}>mahsulotlar</span>
                <br />
                bir joyda
              </h1>
              <p className="text-gray-400 text-sm leading-relaxed mb-8 max-w-sm">
                100+ mahsulot ichidan o'zingizga mosini toping. Sifat va narx
                muvozanati kafolatlangan.
              </p>
              <div className="flex items-center gap-3">
                <Link
                  to="/cart"
                  className="inline-flex items-center gap-2 bg-amber-400 hover:bg-amber-500 text-gray-900 text-sm font-bold px-6 py-3 rounded-xl transition"
                >
                  Xarid qilish <FaArrowRight size={11} />
                </Link>
                <Link
                  to="/cart"
                  className="inline-flex items-center gap-2 text-gray-400 hover:text-white text-sm font-semibold transition"
                >
                  Barchasi →
                </Link>
              </div>
            </div>
          </div>
        </div>

        <div
          className="overflow-hidden mb-3"
          style={{ background: "#111", padding: "13px 0" }}
        >
          <div className="marquee-track">
            {[...marqueeItems, ...marqueeItems].map((item, i) => (
              <span
                key={i}
                className="flex items-center gap-2 text-xs font-semibold text-gray-400 uppercase tracking-widest px-8 whitespace-nowrap"
              >
                {item}
                <span style={{ color: "#f59e0b", fontSize: 8 }}>◆</span>
              </span>
            ))}
          </div>
        </div>

        <div
          className="overflow-hidden mb-10"
          style={{ background: "#f59e0b", padding: "11px 0" }}
        >
          <div className="marquee-track-rev">
            {[...marqueeItems.reverse(), ...marqueeItems].map((item, i) => (
              <span
                key={i}
                className="flex items-center gap-2 text-xs font-bold text-amber-900 uppercase tracking-widest px-8 whitespace-nowrap"
              >
                {item}
                <span style={{ fontSize: 8 }}>◆</span>
              </span>
            ))}
          </div>
        </div>

        <div className="max-w-screen-xl mx-auto px-4 mb-12">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
            {[
              {
                icon: <FiTruck size={20} />,
                title: "Bepul yetkazish",
                sub: "100$ dan yuqori",
              },
              {
                icon: <FiShield size={20} />,
                title: "Kafolat",
                sub: "1 yillik kafolat",
              },
              {
                icon: <FiRefreshCw size={20} />,
                title: "Qaytarish",
                sub: "30 kun ichida",
              },
              {
                icon: <FiHeadphones size={20} />,
                title: "Yordam",
                sub: "24/7 qo'llab-quvvatlash",
              },
            ].map((item) => (
              <div
                key={item.title}
                className="bg-white rounded-2xl px-5 py-4 flex items-center gap-4"
              >
                <div className="w-10 h-10 bg-gray-100 rounded-xl flex items-center justify-center text-gray-600 flex-shrink-0">
                  {item.icon}
                </div>
                <div>
                  <p className="text-sm font-semibold text-gray-800">
                    {item.title}
                  </p>
                  <p className="text-xs text-gray-400">{item.sub}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {categories.length > 0 && (
          <div className="max-w-screen-xl mx-auto px-4 mb-12">
            <div className="flex items-center justify-between mb-5">
              <h2 className="syne text-xl font-700 text-gray-800">
                Kategoriyalar
              </h2>
              <Link
                to="/cart"
                className="text-xs font-semibold text-gray-400 hover:text-gray-700 transition"
              >
                Hammasini ko'rish →
              </Link>
            </div>
            <div
              className="flex gap-3 overflow-x-auto pb-2"
              style={{ scrollbarWidth: "none" }}
            >
              {categories.map((cat) => (
                <Link
                  key={cat}
                  to={`/cart`}
                  className="cat-card flex-shrink-0 bg-white rounded-2xl px-5 py-3 border border-gray-100"
                  style={{ textDecoration: "none" }}
                >
                  <span className="text-sm font-semibold text-gray-700 capitalize whitespace-nowrap">
                    {cat}
                  </span>
                </Link>
              ))}
            </div>
          </div>
        )}

        <div className="max-w-screen-xl mx-auto px-4 mb-12">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div>
              <div className="flex items-center justify-between mb-4">
                <h2 className="syne text-lg flex pl-5 font-700 text-gray-800">
                  <MdDiscount /> Chegirmalar
                </h2>
                <Link
                  to="/cart"
                  className="text-xs font-semibold text-gray-400 hover:text-gray-700 transition"
                >
                  Ko'rish →
                </Link>
              </div>
              <div className="flex flex-col gap-3">
                {saleProducts.map((p) => (
                  <Link
                    key={p.id}
                    to={`/product/${p.id}`}
                    className="prod-card bg-white rounded-2xl flex items-center gap-3 p-3 overflow-hidden"
                    style={{ textDecoration: "none", color: "inherit" }}
                  >
                    <div
                      className="relative flex-shrink-0 overflow-hidden rounded-xl bg-gray-50"
                      style={{ width: 72, height: 72 }}
                    >
                      <img
                        src={p.thumbnail}
                        alt={p.title}
                        className="prod-img w-full h-full object-cover"
                      />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-xs text-gray-400 capitalize mb-0.5">
                        {p.brand || p.category}
                      </p>
                      <p className="text-sm font-semibold text-gray-800 line-clamp-1">
                        {p.title}
                      </p>
                      <div className="flex items-baseline gap-2 mt-1">
                        <span className="syne text-base font-700 text-gray-900">
                          ${p.price}
                        </span>
                        <span className="text-xs text-gray-300 line-through">
                          $
                          {(p.price / (1 - p.discountPercentage / 100)).toFixed(
                            0,
                          )}
                        </span>
                      </div>
                    </div>
                    <span className="flex-shrink-0 bg-rose-500 text-white text-[10px] font-bold px-2 py-1 rounded-full">
                      -{Math.round(p.discountPercentage)}%
                    </span>
                  </Link>
                ))}
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between mb-4">
                <h2 className="syne text-lg flex items-center ml-2 pb-2 font-bold text-gray-800">
                  <MdOutlineStarRate className="mr-2 text-yellow-500" />
                  Top rated
                </h2>

                <Link  to="/cart"  className="text-xs font-semibold text-gray-400 hover:text-gray-700 transition"   >
                  Ko'rish →
                </Link>
              </div>

              <div className="flex flex-col gap-3">
                {topProducts.map((p, idx) => (
                  <Link
                    key={p.id}
                    to={`/product/${p.id}`}
                    className="prod-card bg-white rounded-2xl flex items-center gap-3 p-3 overflow-hidden"
                    style={{ textDecoration: "none", color: "inherit" }}
                  >
                    <span className="syne text-2xl font-800 text-gray-100 w-8 text-center flex-shrink-0">
                      {idx + 1}
                    </span>
                    <div
                      className="flex-shrink-0 overflow-hidden rounded-xl bg-gray-50"
                      style={{ width: 72, height: 72 }}
                    >
                      <img
                        src={p.thumbnail}
                        alt={p.title}
                        className="prod-img w-full h-full object-cover"
                      />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-xs text-gray-400 capitalize mb-0.5">
                        {p.brand || p.category}
                      </p>
                      <p className="text-sm font-semibold text-gray-800 line-clamp-1">
                        {p.title}
                      </p>
                      <div className="flex items-center gap-2 mt-1">
                        <span className="syne text-base font-700 text-gray-900">
                          ${p.price}
                        </span>
                        <div className="flex items-center gap-1 bg-amber-50 px-2 py-0.5 rounded-lg">
                          <FaStar size={9} className="text-amber-400" />
                          <span className="text-xs font-semibold text-amber-600">
                            {p.rating?.toFixed(1)}
                          </span>
                        </div>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div id="all-products" className="max-w-screen-xl mx-auto px-4 mb-12">
          <div className="flex items-center justify-between mb-5">
            <h2 className="syne text-xl font-700 text-gray-800">
              Barcha mahsulotlar
              <span className="ml-2 text-sm font-normal text-gray-400">
                ({data.length})
              </span>
            </h2>
            <span className="text-xs text-gray-400">
              {page} / {totalPages} sahifa
            </span>
          </div>

          {loading ? (
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
              {[...Array(12)].map((_, i) => (
                <div
                  key={i}
                  className="bg-white rounded-2xl overflow-hidden animate-pulse"
                >
                  <div className="bg-gray-100" style={{ height: 180 }} />
                  <div className="p-3 flex flex-col gap-2">
                    <div className="h-3 bg-gray-100 rounded w-1/2" />
                    <div className="h-4 bg-gray-100 rounded w-3/4" />
                    <div className="h-4 bg-gray-100 rounded w-1/3" />
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <>
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 mb-8">
                {paginated.map((p) => (
                  <Link
                    key={p.id}
                    to={`/product/${p.id}`}
                    className="prod-card bg-white rounded-2xl overflow-hidden"
                    style={{ textDecoration: "none", color: "inherit" }}
                  >
                    <div
                      className="relative overflow-hidden bg-gray-50"
                      style={{ height: 180 }}
                    >
                      <img
                        src={p.thumbnail}
                        alt={p.title}
                        className="prod-img w-full h-full object-cover"
                      />
                      {p.discountPercentage > 10 && (
                        <span className="absolute top-2.5 left-2.5 bg-rose-500 text-white text-[10px] font-bold px-2 py-0.5 rounded-full">
                          -{Math.round(p.discountPercentage)}%
                        </span>
                      )}
                    </div>
                    <div className="p-3">
                      <p className="text-[10px] font-semibold uppercase tracking-widest text-gray-400 mb-1 capitalize">
                        {p.brand || p.category}
                      </p>
                      <p className="text-sm font-semibold text-gray-800 line-clamp-2 leading-snug mb-2">
                        {p.title}
                      </p>
                      <div className="flex items-center justify-between">
                        <span className="syne text-base font-700 text-gray-900">
                          ${p.price}
                        </span>
                        <div className="flex items-center gap-1 bg-amber-50 px-2 py-1 rounded-lg">
                          <FaStar size={9} className="text-amber-400" />
                          <span className="text-xs font-semibold text-amber-600">
                            {p.rating?.toFixed(1)}
                          </span>
                        </div>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>

              <div className="flex items-center justify-center gap-2 flex-wrap">
                <button
                  className="page-btn"
                  onClick={() => goPage(page - 1)}
                  disabled={page === 1}
                >
                  <FiChevronLeft size={15} />
                </button>

                {Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => {
                  if (p === 1 || p === totalPages || Math.abs(p - page) <= 2) {
                    return (
                      <button
                        key={p}
                        className={`page-btn ${page === p ? "active" : ""}`}
                        onClick={() => goPage(p)}
                      >
                        {p}
                      </button>
                    );
                  }
                  if (Math.abs(p - page) === 3) {
                    return (
                      <span key={p} className="text-gray-300 px-1 text-sm">
                        …
                      </span>
                    );
                  }
                  return null;
                })}

                <button
                  className="page-btn"
                  onClick={() => goPage(page + 1)}
                  disabled={page === totalPages}
                >
                  <FiChevronRight size={15} />
                </button>
              </div>
            </>
          )}
        </div>

        <div className="max-w-screen-xl mx-auto px-4 mb-16">
          <div
            className="rounded-3xl px-8 py-12 text-center relative overflow-hidden"
            style={{
              background: "linear-gradient(135deg, #111 0%, #1c1c1c 100%)",
            }}
          >
            <div
              className="absolute top-0 left-0 w-40 h-40 rounded-full"
              style={{
                border: "30px solid rgba(255,255,255,0.03)",
                transform: "translate(-40%, -40%)",
              }}
            />
            <div
              className="absolute bottom-0 right-0 w-56 h-56 rounded-full"
              style={{
                border: "40px solid rgba(245,158,11,0.06)",
                transform: "translate(30%, 30%)",
              }}
            />

            <div className="relative z-10 max-w-md mx-auto">
              <div className="w-12 h-12 bg-amber-400/10 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <FaEnvelope size={20} className="text-amber-400" />
              </div>
              <h3 className="syne text-2xl font-700 text-white mb-2">
                Yangilikdan xabardor bo'ling
              </h3>
              <p className="text-sm text-gray-400 mb-6">
                Yangi mahsulotlar va maxsus takliflar haqida birinchi bo'lib
                biling
              </p>

              <form onSubmit={handleSubscribe} className="flex gap-2">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Email manzilingiz..."
                  required
                  className="flex-1 bg-white/5 border border-white/10 text-white text-sm rounded-xl px-4 py-3 outline-none focus:border-amber-400/50 placeholder:text-gray-600 transition"
                />
                <button
                  type="submit"
                  className="bg-amber-400 hover:bg-amber-500 text-gray-900 text-sm font-bold px-6 py-3 rounded-xl transition whitespace-nowrap"
                >
                  Obuna
                </button>
              </form>
              <p className="text-[11px] text-gray-600 mt-3">
                Spam yubormaymiz. Istalgan vaqt bekor qilish mumkin.
              </p>
            </div>
          </div>
        </div>

        <Footer />
      </div>
  );
}
