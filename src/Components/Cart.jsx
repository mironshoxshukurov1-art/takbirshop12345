import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import Navbar from "../Navbar";
import { FaHeart, FaStar, FaShoppingBag, FaShoppingCart } from "react-icons/fa";
import { BsSearch } from "react-icons/bs";
import { Link } from "react-router-dom";
import { FiChevronRight, FiEye } from "react-icons/fi";
import Footer from "../Footer";
import { MyContext } from "../context/MyContext";
import toast from "react-hot-toast";

export default function Cart() {
  const { cart, addToCart, removeFromCart } = useContext(MyContext);

  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");
  const [sort, setSort] = useState("default");
  const [addedId, setAddedId] = useState(null);
  const [likedProducts, setLikedProducts] = useState([]);
  const [cols] = useState(4);

  useEffect(() => {
    axios
      .get("https://dummyjson.com/products?limit=200")
      .then((r) => setData(r.data.products))
      .catch(console.error)
      .finally(() => setLoading(false));
  }, []);

  const categories = ["All", ...new Set(data.map((p) => p.category))];

  let filtered = data.filter((p) => {
    const matchCat = category === "All" || p.category === category;
    const matchSearch = p.title.toLowerCase().includes(search.toLowerCase());
    return matchCat && matchSearch;
  });

  if (sort === "low")
    filtered = [...filtered].sort((a, b) => a.price - b.price);
  if (sort === "high")
    filtered = [...filtered].sort((a, b) => b.price - a.price);
  if (sort === "rate")
    filtered = [...filtered].sort((a, b) => b.rating - a.rating);

  const handleLikeToggle = (e, product) => {
    e.preventDefault();
    e.stopPropagation();

    if (likedProducts.includes(product.id)) {
      setLikedProducts((prev) => prev.filter((id) => id !== product.id));
      removeFromCart(product.id);
    } else {
      setLikedProducts((prev) => [...prev, product.id]);
      addToCart(product);
    }

    setAddedId(product.id);
    setTimeout(() => setAddedId(null), 300);
  };

  const isLiked = (productId) => {
    return likedProducts.includes(productId);
  };

  const handleAddToCart = (e, product) => {
    e.preventDefault();
    e.stopPropagation();

    addToCart(product);

    toast.custom(
      (t) => (
        <div
          className={`bg-white shadow-xl rounded-xl p-3 flex items-center gap-3 w-[320px] transition ${
            t.visible ? "animate-enter" : "animate-leave"
          }`}
        >
          <img
            src={product.thumbnail}
            alt={product.title}
            className="w-12 h-12 object-cover rounded-lg"
          />

          <div className="flex-1">
            <p className="text-sm font-semibold text-gray-800 line-clamp-1">
              {product.title}
            </p>
            <p className="text-xs text-gray-500">
              Savatga qo'shildi <FaShoppingCart className="inline-block" />
            </p>
          </div>

          <Link to="/savatcha">
            <button className="text-xs bg-black text-white px-3 py-1.5 rounded-lg hover:bg-gray-800">
              Savat
            </button>
          </Link>
        </div>
      ),
      {
        duration: 3000,
        position: "top-right",
      },
    );
  };

  const totalCart = cart.reduce((s, i) => s + i.qty, 0);
  const totalPrice = cart.reduce((s, i) => s + i.price * i.qty, 0).toFixed(2);

  const gridClass =
    cols === 4
      ? "grid-cols-2 sm:grid-cols-3 lg:grid-cols-4"
      : "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3";

  return (
    <div className="min-h-screen  bg-white  dark:bg-gray-900 dark:text-white  bg-[#080807] " style={{ background: "#f4f3f0" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Syne:wght@400;600;700;800&family=DM+Sans:wght@300;400;500&display=swap');
        body { font-family: 'DM Sans', sans-serif; }
        .syne { font-family: 'Syne', sans-serif; }

        @keyframes slideUp {
          from { opacity:0; transform:translateY(20px) scale(0.97); }
          to   { opacity:1; transform:translateY(0) scale(1); }
        }
        .slide-up { animation: slideUp 0.4s cubic-bezier(.23,1,.32,1) both; }

        @keyframes pulse-green {
          0%,100% { box-shadow: 0 0 0 0 rgba(34,197,94,0.4); }
          50%      { box-shadow: 0 0 0 8px rgba(34,197,94,0); }
        }
        .pulse-green { animation: pulse-green 0.6s ease; }

        @keyframes bounce {
          0%,100% { transform: scale(1); }
          50% { transform: scale(1.3); }
        }
        .bounce { animation: bounce 0.3s ease; }

        .card:hover .card-img { transform: scale(1.08); }
        .card:hover .cart-btn { opacity: 1; transform: translateY(0); }
        .cart-btn { opacity: 0; transform: translateY(8px); transition: all 0.25s ease; }

        .cat-scroll::-webkit-scrollbar { height: 3px; }
        .cat-scroll::-webkit-scrollbar-thumb { background: #d1d5db; border-radius: 99px; }
      `}</style>

      <Navbar />

      <div className="flex items-center ml-20 gap-1 text-xs text-gray-400 mb-4">
        <Link to={"/"}>
          <span className="hover:text-gray-600 cursor-pointer">Home</span>
        </Link>
        <FiChevronRight size={12} />
        <span className="text-gray-700 font-medium">Mahsulotlar</span>
      </div>

      <div className="sticky top-0 z-40 bg-white/80 backdrop-blur-md border-b border-gray-200">
        <div className="max-w-screen-xl mx-auto px-4 py-3 flex items-center gap-3">
          <div className="relative flex-1 max-w-md">
            <BsSearch
              size={14}
              className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400"
            />
            <input
              type="text"
              placeholder="Mahsulot qidirish..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-9 pr-4 py-2.5 rounded-xl border border-gray-200 bg-gray-50 text-sm outline-none focus:border-gray-400 focus:bg-white transition"
            />
          </div>

          <select
            value={sort}
            onChange={(e) => setSort(e.target.value)}
            className="text-sm border border-gray-200 rounded-xl px-3 py-2.5 bg-gray-50 outline-none focus:border-gray-400 text-gray-600 cursor-pointer"
          >
            <option value="default">Saralash</option>
            <option value="low">Narx: arzondan</option>
            <option value="high">Narx: qimmatdan</option>
            <option value="rate">Reyting bo'yicha</option>
          </select>

          {/* Savatcha icon */}
          <Link to="/savatcha">
            <button className="flex items-center gap-2 bg-gray-900 text-white text-sm font-semibold px-4 py-2.5 rounded-xl hover:bg-gray-700 transition whitespace-nowrap relative">
              <FaShoppingBag size={13} />
              <span className="absolute -top-2 -right-2 bg-red-500 text-white text-[9px] font-bold min-w-[16px] h-4 px-0.5 rounded-full flex items-center justify-center leading-none">
                {totalCart > 0 ? totalCart : 0}
              </span>
              <span className="ml-3 hidden sm:inline">Savat</span>
            </button>
          </Link>
        </div>

        <div className="max-w-screen-xl mx-auto px-4 pb-3 flex gap-2 overflow-x-auto cat-scroll">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setCategory(cat)}
              className={`flex-shrink-0 px-4 py-1.5 rounded-full text-xs font-semibold capitalize transition-all duration-200 border
              ${
                category === cat
                  ? "bg-gray-900 text-white border-gray-900"
                  : "bg-white text-gray-500 border-gray-200 hover:border-gray-400 hover:text-gray-700"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      <div className="max-w-screen-xl mx-auto px-4 py-6">
        {!loading && (
          <div className="flex items-center justify-between mb-5">
            <p className="syne text-lg font-700 text-gray-800">
              {category === "All" ? "Barcha mahsulotlar" : category}
              <span className="ml-2 text-sm font-normal text-gray-400">
                ({filtered.length})
              </span>
            </p>
          </div>
        )}

        {loading && (
          <div className="flex flex-col items-center justify-center h-64 gap-3">
            <div className="w-8 h-8 border-2 border-gray-200 border-t-gray-800 rounded-full animate-spin" />
            <span className="text-sm text-gray-400">Yuklanmoqda...</span>
          </div>
        )}

        {!loading && (
          <div className={`grid ${gridClass} gap-3`}>
            {filtered.map((product, i) => (
              <Link
                key={product.id}
                to={`/product/${product.id}`}
                className="card slide-up bg-white rounded-2xl overflow-hidden flex flex-col"
                style={{
                  animationDelay: `${Math.min(i * 0.015, 0.35)}s`,
                  textDecoration: "none",
                  color: "inherit",
                }}
              >
                <div
                  className="relative overflow-hidden bg-gray-50"
                  style={{ height: 190 }}
                >
                  <img
                    src={product.thumbnail}
                    alt={product.title}
                    className="card-img w-full h-full object-cover transition-transform duration-500"
                  />

                  <div className="absolute top-2.5 left-2.5 flex flex-col gap-1.5">
                    {product.discountPercentage > 10 && (
                      <span className="bg-rose-500 text-white text-[10px] font-bold px-2 py-0.5 rounded-full">
                        -{Math.round(product.discountPercentage)}%
                      </span>
                    )}
                    {product.stock < 10 && (
                      <span className="bg-amber-400 text-white text-[10px] font-bold px-2 py-0.5 rounded-full">
                        Az qoldi
                      </span>
                    )}
                  </div>

                  <button
                    onClick={(e) => handleLikeToggle(e, product)}
                    className={`absolute top-2.5 right-2.5 w-8 h-8 rounded-full bg-white/90 backdrop-blur flex items-center justify-center shadow-sm hover:scale-110 transition-transform z-10 ${
                      addedId === product.id ? "bounce" : ""
                    }`}
                  >
                    <FaHeart
                      size={13}
                      className={
                        isLiked(product.id) ? "text-rose-500" : "text-gray-300"
                      }
                    />
                  </button>

                  <div className="cart-btn absolute bottom-0 left-0 right-0 flex gap-1.5 p-2">
                    <span className="flex-1 flex items-center justify-center gap-1.5 bg-white/95 text-gray-800 text-xs font-semibold py-2 rounded-xl shadow-sm">
                      <FiEye size={13} />
                      Ko'rish
                    </span>
                    <button
                      onClick={(e) => handleAddToCart(e, product)}
                      className="flex-1 text-xs font-semibold py-2 rounded-xl shadow-sm bg-gray-900 text-white hover:bg-gray-700 transition"
                    >
                      Savatga
                    </button>
                  </div>
                </div>

                <div className="p-3 flex flex-col flex-1">
                  <span className="text-[10px] font-semibold uppercase tracking-widest text-gray-400 mb-1 capitalize">
                    {product.brand || product.category}
                  </span>
                  <h3 className="text-sm font-semibold text-gray-800 line-clamp-2 leading-snug mb-3 flex-1">
                    {product.title}
                  </h3>

                  <div className="flex items-center justify-between">
                    <div className="flex items-baseline gap-1">
                      <span className="syne text-lg font-800 text-gray-900">
                        ${product.price}
                      </span>
                      {product.discountPercentage > 5 && (
                        <span className="text-xs text-gray-300 line-through">
                          $
                          {(
                            product.price /
                            (1 - product.discountPercentage / 100)
                          ).toFixed(0)}
                        </span>
                      )}
                    </div>

                    <div className="flex items-center gap-1 bg-amber-50 px-2 py-1 rounded-lg">
                      <FaStar size={10} className="text-amber-400" />
                      <span className="text-xs font-semibold text-amber-600">
                        {product.rating?.toFixed(1)}
                      </span>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}

        {!loading && filtered.length === 0 && (
          <div className="text-center py-24 text-gray-400">
            <div className="text-5xl mb-3">🔍</div>
            <p className="font-medium">Hech narsa topilmadi</p>
            <button
              onClick={() => {
                setSearch("");
                setCategory("All");
              }}
              className="mt-4 text-sm text-gray-500 underline"
            >
              Filterni tozalash
            </button>
          </div>
        )}
      </div>

      <Footer />
    </div>
  );
}
