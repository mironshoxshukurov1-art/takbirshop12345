import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams, Link, useNavigate } from "react-router-dom";
import {
  FaHeart, FaStar, FaStarHalfAlt, FaRegStar,
  FaShoppingBag, FaTruck, FaShieldAlt, FaUndo, FaArrowLeft
} from "react-icons/fa";
import { FiMinus, FiPlus, FiChevronRight, FiShare2 } from "react-icons/fi";
import { BsCheckCircleFill } from "react-icons/bs";
import Navbar from "./Navbar";
import Footer from "./Footer";

function Stars({ rating, size = 13 }) {
  return (
    <div className="flex items-center gap-0.5">
      {[1, 2, 3, 4, 5].map(s => {
        if (rating >= s) return <FaStar key={s} size={size} className="text-amber-400" />;
        if (rating >= s - 0.5) return <FaStarHalfAlt key={s} size={size} className="text-amber-400" />;
        return <FaRegStar key={s} size={size} className="text-gray-200" />;
      })}
    </div>
  );
}

function Skeleton() {
  return (
    <div className="max-w-screen-xl mx-auto px-4 py-8 animate-pulse">
      <div className="bg-white rounded-3xl overflow-hidden">
        <div className="flex flex-col md:flex-row">
          <div className="md:w-[48%] p-6 flex flex-col gap-3">
            <div className="rounded-2xl bg-gray-100" style={{ height: 400 }} />
            <div className="flex gap-2">
              {[1,2,3,4].map(i => <div key={i} className="w-16 h-16 rounded-xl bg-gray-100" />)}
            </div>
          </div>
          <div className="md:w-[52%] p-8 flex flex-col gap-4">
            <div className="h-4 bg-gray-100 rounded w-1/3" />
            <div className="h-8 bg-gray-100 rounded w-3/4" />
            <div className="h-4 bg-gray-100 rounded w-1/2" />
            <div className="h-12 bg-gray-100 rounded w-1/3" />
            <div className="h-20 bg-gray-100 rounded" />
            <div className="h-12 bg-gray-100 rounded" />
          </div>
        </div>
      </div>
    </div>
  );
}

export default function ProductDetail() {
  const { id } = useParams();      
  const navigate = useNavigate();

  const [product, setProduct]   = useState(null);
  const [related, setRelated]   = useState([]);
  const [loading, setLoading]   = useState(true);
  const [error, setError]       = useState(null);
  const [activeImg, setActiveImg] = useState(0);
  const [qty, setQty]           = useState(1);
  const [wished, setWished]     = useState(false);
  const [added, setAdded]       = useState(false);
  const [activeTab, setActiveTab] = useState("desc"); // desc | reviews

  useEffect(() => {
    setLoading(true);
    setProduct(null);
    setActiveImg(0);
    setQty(1);
    setAdded(false);

    axios.get(`https://dummyjson.com/products/${id}`)
      .then(async (r) => {
        setProduct(r.data);
        const rel = await axios.get(
          `https://dummyjson.com/products/category/${r.data.category}?limit=5`
        );
        setRelated(rel.data.products.filter(p => p.id !== r.data.id).slice(0, 4));
      })
      .catch(() => setError("Mahsulot topilmadi"))
      .finally(() => setLoading(false));
  }, [id]); 

  const handleAddToCart = (e) => {
    e?.preventDefault();
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  };

  if (error) return (
    <div className="min-h-screen flex items-center justify-center" style={{ background: "#f4f3f0" }}>
      <div className="text-center">
        <div className="text-6xl mb-4">😕</div>
        <p className="text-gray-500 mb-4 font-medium">{error}</p>
        <button onClick={() => navigate(-1)} className="text-sm text-gray-900 underline">
          ← Orqaga qaytish
        </button>
      </div>
    </div>
  );

  const images        = product?.images?.length ? product.images : [product?.thumbnail];
  const originalPrice = product ? (product.price / (1 - product.discountPercentage / 100)).toFixed(0) : 0;
  const savings       = product ? (originalPrice - product.price).toFixed(2) : 0;
  const inStock       = product?.stock > 0;
  const stockLabel    = product?.stock > 50 ? "Mavjud" : product?.stock > 0 ? `${product.stock} ta qoldi` : "Tugagan";
  const stockColor    = product?.stock > 50 ? "#22c55e" : product?.stock > 0 ? "#f59e0b" : "#ef4444";

  return (
    <div className="min-h-screen" style={{ background: "#f4f3f0" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Syne:wght@400;600;700;800&family=DM+Sans:ital,wght@0,300;0,400;0,500;1,300&display=swap');
        * { box-sizing: border-box; }
        body { font-family: 'DM Sans', sans-serif; }
        .syne { font-family: 'Syne', sans-serif; }

        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(24px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        @keyframes imgSlide {
          from { opacity: 0; transform: scale(1.04); }
          to   { opacity: 1; transform: scale(1); }
        }
        @keyframes pop {
          0%   { transform: scale(1); }
          50%  { transform: scale(1.15); }
          100% { transform: scale(1); }
        }
        @keyframes shimmer {
          from { background-position: -200% 0; }
          to   { background-position: 200% 0; }
        }

        .fade-up   { animation: fadeUp 0.5s cubic-bezier(.23,1,.32,1) both; }
        .img-slide { animation: imgSlide 0.4s ease both; }
        .pop       { animation: pop 0.3s ease; }

        .thumb { transition: all 0.2s ease; border: 2px solid transparent; }
        .thumb:hover { opacity: 1 !important; }
        .thumb.active { border-color: #111; transform: scale(1.06); opacity: 1 !important; }

        .tab-btn { position: relative; padding-bottom: 10px; font-weight: 600; font-size: 14px; color: #9ca3af; transition: color 0.2s; }
        .tab-btn.active { color: #111; }
        .tab-btn.active::after { content: ''; position: absolute; bottom: 0; left: 0; right: 0; height: 2px; background: #111; border-radius: 99px; }

        .qty-btn { width: 34px; height: 34px; border-radius: 10px; border: 1.5px solid #e5e7eb; display: flex; align-items: center; justify-content: center; transition: all 0.15s; background: white; }
        .qty-btn:hover:not(:disabled) { border-color: #111; background: #111; color: white; }
        .qty-btn:disabled { opacity: 0.35; cursor: not-allowed; }

        .add-btn { transition: all 0.25s cubic-bezier(.23,1,.32,1); }
        .add-btn:active { transform: scale(0.97); }

        .rel-card { transition: transform 0.25s ease, box-shadow 0.25s ease; }
        .rel-card:hover { transform: translateY(-4px); box-shadow: 0 12px 32px rgba(0,0,0,0.08); }
        .rel-card:hover .rel-img { transform: scale(1.06); }
        .rel-img { transition: transform 0.4s ease; }

        .wish-btn:hover { transform: scale(1.12); }
        .wish-btn { transition: transform 0.2s ease; }
      `}</style>

      <Navbar />

      {product && (
        <div className="flex items-center gap-1.5 text-xs text-gray-400 px-6 md:px-10 mb-4 fade-up">
          <Link to="/" className="hover:text-gray-600 transition">Home</Link>
          <FiChevronRight size={11} />
          <Link to="/cart" className="hover:text-gray-600 transition capitalize">{product.category}</Link>
          <FiChevronRight size={11} />
          <span className="text-gray-600 font-medium line-clamp-1 max-w-xs">{product.title}</span>
        </div>
      )}

      {loading && <Skeleton />}

      {!loading && product && (
        <div className="max-w-screen-xl mx-auto px-4 pb-16">

          <div className="bg-white rounded-3xl overflow-hidden shadow-sm mb-6 fade-up">
            <div className="flex flex-col lg:flex-row">

              <div className="lg:w-[46%] p-5 flex flex-col gap-3 bg-gray-50/60">

                <div className="relative rounded-2xl overflow-hidden bg-white shadow-sm" style={{ height: 420 }}>
                  <img
                    key={activeImg}
                    src={images[activeImg]}
                    alt={product.title}
                    className="img-slide w-full h-full object-cover"
                  />

                  {product.discountPercentage > 5 && (
                    <div className="absolute top-4 left-4 bg-rose-500 text-white text-xs font-bold px-3 py-1 rounded-full shadow">
                      -{Math.round(product.discountPercentage)}%
                    </div>
                  )}

                  {product.stock < 10 && product.stock > 0 && (
                    <div className="absolute top-4 right-4 bg-amber-400 text-white text-xs font-bold px-3 py-1 rounded-full shadow">
                      Faqat {product.stock} ta!
                    </div>
                  )}

                  {images.length > 1 && (
                    <>
                      <button
                        onClick={() => setActiveImg(i => (i - 1 + images.length) % images.length)}
                        className="absolute left-3 top-1/2 -translate-y-1/2 w-9 h-9 bg-white/90 rounded-full flex items-center justify-center shadow hover:bg-white transition"
                      >
                        <FaArrowLeft size={12} className="text-gray-600" />
                      </button>
                      <button
                        onClick={() => setActiveImg(i => (i + 1) % images.length)}
                        className="absolute right-3 top-1/2 -translate-y-1/2 w-9 h-9 bg-white/90 rounded-full flex items-center justify-center shadow hover:bg-white transition"
                        style={{ transform: "translateY(-50%) rotate(180deg)" }}
                      >
                        <FaArrowLeft size={12} className="text-gray-600" />
                      </button>
                    </>
                  )}

                  {/* Dot indicators */}
                  {images.length > 1 && (
                    <div className="absolute bottom-3 left-0 right-0 flex justify-center gap-1.5">
                      {images.map((_, idx) => (
                        <button
                          key={idx}
                          onClick={() => setActiveImg(idx)}
                          className="rounded-full transition-all"
                          style={{
                            width: activeImg === idx ? 20 : 6,
                            height: 6,
                            background: activeImg === idx ? "#111" : "#d1d5db"
                          }}
                        />
                      ))}
                    </div>
                  )}
                </div>

                {/* Thumbnail'lar */}
                {images.length > 1 && (
                  <div className="flex gap-2 overflow-x-auto pb-1">
                    {images.map((img, idx) => (
                      <button
                        key={idx}
                        onClick={() => setActiveImg(idx)}
                        className={`thumb flex-shrink-0 w-16 h-16 rounded-xl overflow-hidden ${activeImg === idx ? "active" : "opacity-50"}`}
                      >
                        <img src={img} alt="" className="w-full h-full object-cover" />
                      </button>
                    ))}
                  </div>
                )}
              </div>

              {/* ── RIGHT: Ma'lumotlar ── */}
              <div className="lg:w-[54%] p-7 lg:p-10 flex flex-col">

                {/* Brand + Category */}
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-[11px] font-bold uppercase tracking-widest text-gray-400 capitalize">
                    {product.brand || "Brand"}
                  </span>
                  <span className="w-1 h-1 rounded-full bg-gray-300" />
                  <span className="text-[11px] text-gray-400 capitalize">{product.category}</span>
                </div>

                {/* Title */}
                <h1 className="syne text-2xl lg:text-3xl font-700 text-gray-900 leading-snug mb-3">
                  {product.title}
                </h1>

                {/* Rating satri */}
                <div className="flex items-center gap-3 mb-5">
                  <Stars rating={product.rating} />
                  <span className="text-sm font-semibold text-gray-700">{product.rating?.toFixed(1)}</span>
                  <span className="text-gray-200">|</span>
                  <span className="text-xs text-gray-400">{product.reviews?.length || 0} sharh</span>
                  <span className="text-gray-200">|</span>
                  <span className="text-xs font-semibold" style={{ color: stockColor }}>
                    <BsCheckCircleFill className="inline mr-1" size={10} />
                    {stockLabel}
                  </span>
                </div>

                {/* Narx */}
                <div className="flex items-end gap-3 mb-6 pb-6 border-b border-gray-100">
                  <span className="syne text-4xl font-800 text-gray-900">${product.price}</span>
                  {product.discountPercentage > 5 && (
                    <>
                      <span className="text-xl text-gray-300 line-through mb-1">${originalPrice}</span>
                      <span className="text-sm font-semibold text-green-500 mb-1.5">
                        ${savings} tejaysiz
                      </span>
                    </>
                  )}
                </div>

                {/* SKU, Warranty, Shipping */}
                <div className="grid grid-cols-2 gap-2 mb-6 text-xs">
                  {[
                    { label: "SKU", value: product.sku },
                    { label: "Yetkazib berish", value: product.shippingInformation },
                    { label: "Qaytarish", value: product.returnPolicy },
                    { label: "Kafolat", value: product.warrantyInformation },
                  ].filter(i => i.value).map(item => (
                    <div key={item.label} className="bg-gray-50 rounded-xl px-3 py-2.5">
                      <span className="text-gray-400 block mb-0.5">{item.label}</span>
                      <span className="font-semibold text-gray-700">{item.value}</span>
                    </div>
                  ))}
                </div>

                {/* Miqdor tanlash */}
                <div className="flex items-center gap-3 mb-4">
                  <span className="text-sm font-semibold text-gray-600 w-16">Miqdor:</span>
                  <div className="flex items-center gap-2">
                    <button
                      className="qty-btn"
                      onClick={() => setQty(q => Math.max(1, q - 1))}
                      disabled={qty <= 1}
                    >
                      <FiMinus size={13} />
                    </button>
                    <span className="syne text-lg font-700 w-8 text-center">{qty}</span>
                    <button
                      className="qty-btn"
                      onClick={() => setQty(q => Math.min(product.stock, q + 1))}
                      disabled={qty >= product.stock}
                    >
                      <FiPlus size={13} />
                    </button>
                  </div>
                  <span className="text-xs text-gray-400 ml-1">max: {product.stock}</span>
                </div>

                {/* Amallar */}
                <div className="flex gap-2 mb-6">
                  <button
                    onClick={handleAddToCart}
                    disabled={!inStock}
                    className={`add-btn flex-1 flex items-center justify-center gap-2.5 py-3.5 rounded-2xl text-sm font-semibold shadow-sm
                      ${added
                        ? "bg-green-500 text-white"
                        : !inStock
                          ? "bg-gray-100 text-gray-400 cursor-not-allowed"
                          : "bg-gray-900 text-white hover:bg-gray-700"
                      }`}
                  >
                    {added
                      ? <><BsCheckCircleFill size={15} /> Savatga qo'shildi!</>
                      : <><FaShoppingBag size={14} /> Savatga qo'shish</>
                    }
                  </button>

                  <button
                    onClick={() => setWished(w => !w)}
                    className="wish-btn w-14 h-14 rounded-2xl border-2 border-gray-100 flex items-center justify-center bg-white hover:border-rose-200 transition"
                  >
                    <FaHeart size={17} className={wished ? "text-rose-500" : "text-gray-300"} />
                  </button>

                  <button className="wish-btn w-14 h-14 rounded-2xl border-2 border-gray-100 flex items-center justify-center bg-white hover:border-gray-300 transition">
                    <FiShare2 size={16} className="text-gray-400" />
                  </button>
                </div>

                {/* Kafolatlar */}
                <div className="flex gap-3">
                  {[
                    { icon: <FaTruck size={15} className="text-gray-400" />, text: "Tez yetkazib berish" },
                    { icon: <FaShieldAlt size={15} className="text-gray-400" />, text: "Ishonchli xarid" },
                    { icon: <FaUndo size={15} className="text-gray-400" />, text: "Oson qaytarish" },
                  ].map(item => (
                    <div key={item.text} className="flex-1 flex flex-col items-center gap-1.5 bg-gray-50 rounded-2xl py-3 px-2 text-center">
                      {item.icon}
                      <span className="text-[10px] font-semibold text-gray-500 leading-tight">{item.text}</span>
                    </div>
                  ))}
                </div>

                {/* Tags */}
                {product.tags?.length > 0 && (
                  <div className="flex flex-wrap gap-1.5 mt-5">
                    {product.tags.map(tag => (
                      <span key={tag} className="text-[10px] font-bold uppercase tracking-wider bg-gray-100 text-gray-400 px-3 py-1 rounded-full">
                        #{tag}
                      </span>
                    ))}
                  </div>
                )}
              </div>
            </div>

            {/* ── TABS: Tavsif / Sharhlar ── */}
            <div className="border-t border-gray-100 px-7 lg:px-10">

              {/* Tab buttons */}
              <div className="flex gap-8 pt-5 mb-6 border-b border-gray-100">
                <button className={`tab-btn ${activeTab === "desc" ? "active" : ""}`} onClick={() => setActiveTab("desc")}>
                  Tavsif
                </button>
                <button className={`tab-btn ${activeTab === "reviews" ? "active" : ""}`} onClick={() => setActiveTab("reviews")}>
                  Sharhlar ({product.reviews?.length || 0})
                </button>
              </div>

              {/* Tavsif */}
              {activeTab === "desc" && (
                <div className="pb-8 fade-up">
                  <p className="text-sm text-gray-500 leading-relaxed max-w-2xl">{product.description}</p>

                  {/* Extra info */}
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 mt-6">
                    {[
                      { label: "Og'irlik", value: product.weight ? `${product.weight}g` : null },
                      { label: "O'lchami", value: product.dimensions ? `${product.dimensions.width}×${product.dimensions.height}×${product.dimensions.depth} sm` : null },
                      { label: "Minimal buyurtma", value: product.minimumOrderQuantity ? `${product.minimumOrderQuantity} ta` : null },
                      { label: "Barcode", value: product.meta?.barcode },
                      { label: "Yaratilgan", value: product.meta?.createdAt ? new Date(product.meta.createdAt).toLocaleDateString("uz-UZ") : null },
                    ].filter(i => i.value).map(item => (
                      <div key={item.label} className="bg-gray-50 rounded-xl px-4 py-3">
                        <span className="text-[10px] uppercase tracking-widest text-gray-400 font-semibold block mb-1">{item.label}</span>
                        <span className="text-sm font-semibold text-gray-700">{item.value}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Sharhlar */}
              {activeTab === "reviews" && (
                <div className="pb-8 fade-up">
                  {product.reviews?.length > 0 ? (
                    <>
                      {/* Umumiy reyting */}
                      <div className="flex items-center gap-6 mb-6 bg-gray-50 rounded-2xl p-5">
                        <div className="text-center">
                          <div className="syne text-5xl font-800 text-gray-900">{product.rating?.toFixed(1)}</div>
                          <Stars rating={product.rating} size={14} />
                          <div className="text-xs text-gray-400 mt-1">{product.reviews.length} sharh</div>
                        </div>
                        {/* Rating bar */}
                        <div className="flex-1 flex flex-col gap-1.5">
                          {[5,4,3,2,1].map(star => {
                            const count = product.reviews.filter(r => r.rating === star).length;
                            const pct   = Math.round((count / product.reviews.length) * 100);
                            return (
                              <div key={star} className="flex items-center gap-2">
                                <span className="text-xs text-gray-400 w-3">{star}</span>
                                <FaStar size={9} className="text-amber-400" />
                                <div className="flex-1 h-1.5 bg-gray-200 rounded-full overflow-hidden">
                                  <div className="h-full bg-amber-400 rounded-full" style={{ width: `${pct}%` }} />
                                </div>
                                <span className="text-xs text-gray-400 w-6">{pct}%</span>
                              </div>
                            );
                          })}
                        </div>
                      </div>

                      {/* Sharh kartalar */}
                      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                        {product.reviews.map((r, idx) => (
                          <div key={idx} className="bg-gray-50 rounded-2xl p-4">
                            <div className="flex items-start justify-between mb-3">
                              <div>
                                <p className="text-sm font-semibold text-gray-800">{r.reviewerName}</p>
                                <p className="text-[10px] text-gray-400">{new Date(r.date).toLocaleDateString("uz-UZ")}</p>
                              </div>
                              <Stars rating={r.rating} size={11} />
                            </div>
                            <p className="text-xs text-gray-500 leading-relaxed">{r.comment}</p>
                          </div>
                        ))}
                      </div>
                    </>
                  ) : (
                    <div className="text-center py-12 text-gray-400">
                      <div className="text-4xl mb-2">💬</div>
                      <p className="text-sm">Hali sharh yo'q</p>
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>

          {/* ── O'XSHASH MAHSULOTLAR ── */}
          {related.length > 0 && (
            <div className="fade-up" style={{ animationDelay: "0.15s" }}>
              <div className="flex items-center justify-between mb-4">
                <h2 className="syne text-xl font-700 text-gray-800">O'xshash mahsulotlar</h2>
                <Link to="/cart" className="text-xs font-semibold text-gray-400 hover:text-gray-700 transition">
                  Hammasini ko'rish →
                </Link>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
                {related.map(p => (
                  <Link
                    key={p.id}
                    to={`/product/${p.id}`}
                    className="rel-card bg-white rounded-2xl overflow-hidden"
                    style={{ textDecoration: "none", color: "inherit" }}
                  >
                    <div className="overflow-hidden bg-gray-50" style={{ height: 160 }}>
                      <img
                        src={p.thumbnail}
                        alt={p.title}
                        className="rel-img w-full h-full object-cover"
                      />
                    </div>
                    <div className="p-3">
                      <p className="text-xs font-semibold text-gray-800 line-clamp-2 mb-2 leading-snug">{p.title}</p>
                      <div className="flex items-center justify-between">
                        <span className="syne text-base font-700 text-gray-900">${p.price}</span>
                        <div className="flex items-center gap-1 bg-amber-50 px-2 py-0.5 rounded-lg">
                          <FaStar size={9} className="text-amber-400" />
                          <span className="text-[11px] font-semibold text-amber-600">{p.rating?.toFixed(1)}</span>
                        </div>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          )}
        </div>
      )}

      <Footer />
    </div>
  );
}