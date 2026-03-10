import React, { useEffect, useRef, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay, EffectCards } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/effect-cards";
import Navbar from "../Navbar";
import Footer from "../Footer";
import { Link } from "react-router-dom";
import { FiChevronRight } from "react-icons/fi";

const team = [
  {
    name: "Abdulloh Karimov",
    role: "Asoschı & Bosh Direktor",
    img: "https://randomuser.me/api/portraits/men/32.jpg",
    quote: "Har bir mahsulot ortida mijozning ishonchi bor.",
    socials: { instagram: "#", telegram: "#" },
  },
  {
    name: "Nilufar Rashidova",
    role: "Savdo va Marketing Bo'limi",
    img: "https://randomuser.me/api/portraits/women/44.jpg",
    quote: "Sifat hech qachon tasodif emas — bu doim intilishning natijasi.",
    socials: { instagram: "#", telegram: "#" },
  },
  {
    name: "Doniyor Yusupov",
    role: "Texnik Direktor",
    img: "https://randomuser.me/api/portraits/men/67.jpg",
    quote: "Qulay xarid tajribasi — bizning asosiy maqsadimiz.",
    socials: { instagram: "#", telegram: "#" },
  },
  {
    name: "Zulfiya Mirzaeva",
    role: "Mijozlar Xizmati",
    img: "https://randomuser.me/api/portraits/women/68.jpg",
    quote: "Har bir savolga javob, har bir muammoga yechim topamiz.",
    socials: { instagram: "#", telegram: "#" },
  },
  {
    name: "Jasur Nazarov",
    role: "Omborxona va Logistika",
    img: "https://randomuser.me/api/portraits/men/12.jpg",
    quote: "O'z vaqtida yetkazish — bu biz uchun va'da emas, majburiyat.",
    socials: { instagram: "#", telegram: "#" },
  },
  {
    name: "Malika Toshmatova",
    role: "Dizayn va Kontent",
    img: "https://randomuser.me/api/portraits/women/22.jpg",
    quote: "Chiroyli taqdimot — mahsulotning ikkinchi yuzı.",
    socials: { instagram: "#", telegram: "#" },
  },
];

const stats = [
  { value: "5+", label: "Yillik tajriba" },
  { value: "12000+", label: "Xursand mijozlar" },
  { value: "98%", label: "Ijobiy izohlar" },
  { value: "3500+", label: "Mahsulot turi" },
];

const values = [
  {
    icon: "✦",
    title: "Sifat",
    desc: "Har bir mahsulot qat'iy sifat nazoratidan o'tkaziladi. Sizga faqat eng yaxshisi yetib boradi.",
  },
  {
    icon: "◈",
    title: "Ishonch",
    desc: "Biz aytganini bajaramiz. To'lov xavfsizligi va shaffof narxlar — bizning asosimiz.",
  },
  {
    icon: "◎",
    title: "Xilma-xillik",
    desc: "Kiyim, elektronika, uy jihozlari — hammasini bir joydan, qulay narxda toping.",
  },
  {
    icon: "◐",
    title: "Tezlik",
    desc: "Toshkent bo'ylab 1 kunda, viloyatlarga 2–3 kunda yetkazib beramiz.",
  },
];

const testimonials = [
  {
    text: "TakbirShop'dan kiyim buyurtma qildim, kutganimdan ham tez keldi va sifati zo'r! Albatta yana xarid qilaman.",
    author: "Shahnoza M.",
    city: "Toshkent",
    rating: 5,
    img: "https://randomuser.me/api/portraits/women/55.jpg",
  },
  {
    text: "Telefon aksessuarlari narxi bazardagidan arzon, sifati esa yuqori. Do'stlarimga ham maslahat berdim.",
    author: "Otabek R.",
    city: "Samarqand",
    rating: 5,
    img: "https://randomuser.me/api/portraits/men/41.jpg",
  },
  {
    text: "Uy uchun parda va yostiq qoplarini oldim. Rasmda ko'ringandek — hatto undan ham chiroyliroq chiqdi!",
    author: "Dildora K.",
    city: "Farg'ona",
    rating: 5,
    img: "https://randomuser.me/api/portraits/women/33.jpg",
  },
];

const featuredProducts = [
  {
    name: "Premium Kiyim To'plami",
    category: "Kiyim-kechak",
    price: "285 000",
    oldPrice: "380 000",
    rating: 4.8,
    reviews: 124,
    badge: "CHEGIRMA",
    img: "https://images.unsplash.com/photo-1523381210434-271e8be1f52b?w=400&q=80",
  },
  {
    name: "Simsiz Quloqchin Pro",
    category: "Elektronika",
    price: "540 000",
    oldPrice: null,
    rating: 4.9,
    reviews: 89,
    badge: "TOP SOTILGAN",
    img: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400&q=80",
  },
  {
    name: "Zamonaviy Divan",
    category: "Uy jihozlari",
    price: "1 850 000",
    oldPrice: "2 100 000",
    rating: 4.7,
    reviews: 56,
    badge: "YANGI",
    img: "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=400&q=80",
  },
  {
    name: "Sport Kiyim Seti",
    category: "Kiyim-kechak",
    price: "195 000",
    oldPrice: null,
    rating: 4.6,
    reviews: 203,
    badge: null,
    img: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=400&q=80",
  },
];

const categories = [
  {
    name: "Kiyim-kechak",
    count: "1200+",
    priceFrom: "49 000",
    icon: "👗",
    img: "https://images.unsplash.com/photo-1558769132-cb1aea458c5e?w=400&q=80",
  },
  {
    name: "Elektronika",
    count: "850+",
    priceFrom: "85 000",
    icon: "📱",
    img: "https://images.unsplash.com/photo-1498049794561-7780e7231661?w=400&q=80",
  },
  {
    name: "Uy jihozlari",
    count: "1450+",
    priceFrom: "120 000",
    icon: "🛋️",
    img: "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=400&q=80",
  },
];

const paymentMethods = [
  { name: "Click", color: "#00AAFF" },
  { name: "Payme", color: "#00C27C" },
  { name: "Visa", color: "#ffffff" },
  { name: "Mastercard", color: "#EB001B" },
  { name: "Uzcard", color: "#F5A623" },
];

const trustBadges = [
  { icon: "🔒", title: "Xavfsiz to'lov", desc: "SSL himoyalangan" },
  { icon: "↩️", title: "14 kun qaytarish", desc: "Kafolat beramiz" },
  { icon: "🚚", title: "Tezkor yetkazish", desc: "1–3 kun ichida" },
  { icon: "🎯", title: "Original mahsulot", desc: "100% sifat kafolati" },
];

function StarRating({ rating }) {
  return (
    <div className="flexgap-0.5">
      {[1, 2, 3, 4, 5].map((i) => (
        <span
          key={i}
          className={
            i <= Math.floor(rating) ? "text-amber-400" : "text-gray-600"
          }
          style={{ fontSize: "11px" }}
        >
          ★
        </span>
      ))}
    </div>
  );
}

function ProductCard({ product }) {
  const [wished, setWished] = useState(false);
  const [added, setAdded] = useState(false);

  const handleAdd = () => {
    setAdded(true);
    setTimeout(() => setAdded(false), 1500);
  };

  return (
    <div className="group relative bg-[#0d0c0a] border border-white/5 hover:border-amber-400/30 transition-all duration-500 overflow-hidden">
      {product.badge && (
        <div
          className={`absolute top-3 left-3 z-10 text-[9px] font-bold px-2 py-1 uppercase tracking-widest ${product.badge === "CHEGIRMA" ? "bg-red-500 text-white" : product.badge === "TOP SOTILGAN" ? "bg-amber-400 text-gray-950" : "bg-white text-gray-950"}`}
        >
          {product.badge}
        </div>
      )}
      <button
        onClick={() => setWished(!wished)}
        className="absolute top-3 right-3 z-10 w-8 h-8 flex items-center justify-center bg-black/50 hover:bg-black/80 transition-colors"
      >
        <span
          className={`text-sm transition-colors ${wished ? "text-red-400" : "text-gray-500 hover:text-white"}`}
        >
          {wished ? "♥" : "♡"}
        </span>
      </button>

      <div className="relative aspect-square overflow-hidden bg-[#111]">
        <img
          src={product.img}
          alt={product.name}
          className="w-full h-full object-cover grayscale group-hover:grayscale-0 group-hover:scale-105 transition-all duration-700"
        />
        <div className="absolute inset-x-0 bottom-0 translate-y-full group-hover:translate-y-0 transition-transform duration-400">
          <button
            onClick={handleAdd}
            className={`w-full py-3 text-xs font-bold uppercase tracking-widest transition-all duration-200 ${added ? "bg-green-500 text-white" : "bg-amber-400 text-gray-950 hover:bg-amber-300"}`}
          >
            {added ? "✓ Qo'shildi!" : "Savatchaga qo'shish"}
          </button>
        </div>
      </div>

      <div className="p-4">
        <p className="text-amber-400 text-[9px] uppercase tracking-widest mb-1">
          {product.category}
        </p>
        <h3 className="font-display text-white text-lg leading-tight mb-2">
          {product.name}
        </h3>
        <div className="flex items-center gap-2 mb-3">
          <StarRating rating={product.rating} />
          <span className="text-gray-600 text-[10px]">({product.reviews})</span>
        </div>
        <div className="flex items-center justify-between">
          <div>
            <span className="text-white font-bold text-base">
              {product.price}{" "}
              <span className="text-[10px] font-normal text-gray-500">
                so'm
              </span>
            </span>
            {product.oldPrice && (
              <div className="text-gray-600 text-xs line-through">
                {product.oldPrice} so'm
              </div>
            )}
          </div>
          <button
            onClick={handleAdd}
            className="text-amber-400 hover:text-amber-300 text-lg transition-colors"
            title="Savatchaga"
          >
            🛒
          </button>
        </div>
      </div>
    </div>
  );
}

function useCounter(target, duration = 2000) {
  const [count, setCount] = useState("0");
  const ref = useRef(null);
  const started = useRef(false);
  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting && !started.current) {
        started.current = true;
        const num = parseInt(target.replace(/\D/g, ""));
        const suffix = target.replace(/[0-9]/g, "");
        const steps = 60;
        const step = Math.ceil(num / steps);
        let current = 0;
        const timer = setInterval(() => {
          current = Math.min(current + step, num);
          setCount(current.toLocaleString() + suffix);
          if (current >= num) clearInterval(timer);
        }, duration / steps);
      }
    });
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [target, duration]);
  return [count, ref];
}

function StatItem({ value, label }) {
  const [count, ref] = useCounter(value);
  return (
    <div ref={ref} className="text-center group cursor-default">
      <div className="text-4xl md:text-5xl font-bold text-white mb-2 tabular-nums group-hover:text-amber-400 transition-colors duration-300">
        {count}
      </div>
      <div className="text-gray-500 text-xs uppercase tracking-widest">
        {label}
      </div>
    </div>
  );
}

export default function About() {
  return (
    <div
      className="min-h-screen bg-[white]   dark:bg-gray-900 dark:text-white  bg-[#080807] text-gray-100 overflow-x-hidden"
      style={{ fontFamily: "'DM Sans', sans-serif" }}
    >
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,600;0,700;1,400&family=DM+Sans:wght@300;400;500&display=swap');
        .font-display { font-family: 'Cormorant Garamond', serif; }
        .swiper-button-next, .swiper-button-prev { color: #f59e0b !important; }
        .swiper-pagination-bullet-active { background: #f59e0b !important; }
        .swiper-pagination-bullet { background: #374151; opacity: 1; }
        @keyframes float { 0%,100%{transform:translateY(0)} 50%{transform:translateY(-14px)} }
        .float { animation: float 7s ease-in-out infinite; }
        @keyframes reveal { from{opacity:0;transform:translateY(36px)} to{opacity:1;transform:translateY(0)} }
        .reveal { animation: reveal 0.9s cubic-bezier(.23,1,.32,1) both; }
        .delay-1 { animation-delay: 0.15s }
        .delay-2 { animation-delay: 0.3s }
        .delay-3 { animation-delay: 0.45s }
        .delay-4 { animation-delay: 0.6s }
        .gradient-text {
          background: linear-gradient(120deg, #fbbf24 0%, #f59e0b 40%, #fde68a 100%);
          -webkit-background-clip: text; -webkit-text-fill-color: transparent; background-clip: text;
        }
        .card-shine { position: relative; overflow: hidden; }
        .card-shine::before {
          content: ''; position: absolute; inset: 0;
          background: linear-gradient(135deg, transparent 40%, rgba(255,255,255,0.04) 50%, transparent 60%);
          transform: translateX(-100%); transition: transform 0.6s ease; z-index: 1;
        }
        .card-shine:hover::before { transform: translateX(100%); }
        .noise {
          background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.04'/%3E%3C/svg%3E");
        }
        .ticker-wrap { overflow: hidden; }
        .ticker { display: flex; animation: ticker 18s linear infinite; white-space: nowrap; }
        .ticker:hover { animation-play-state: paused; }
        @keyframes ticker { 0%{transform:translateX(0)} 100%{transform:translateX(-50%)} }
        .transition-400 { transition-duration: 400ms; }
      `}</style>

      <Navbar />

      <div className="flex items-center cursor-pointer ml-20 gap-1 text-xs text-gray-400 mb-4">
        <Link to={"/"}>
          <span className="hover:text-gray-600 cursor-pointer">Home</span>
        </Link>
        <FiChevronRight size={12} />
        <span className="text-gray-700 font-medium">About</span>
      </div>
      <section className="relative min-h-[92vh] flex items-center justify-center overflow-hidden pt-24">
        <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[700px] h-[400px] bg-amber-400/6 rounded-full blur-[130px] pointer-events-none" />
        <div className="absolute top-1/2 left-1/5 w-[250px] h-[250px] bg-amber-500/4 rounded-full blur-[80px] pointer-events-none float" />
        <div className="noise absolute inset-0 pointer-events-none" />

        <div className="relative light:text-[white z-10 text-center px-6 max-w-5xl mx-auto">
          <p className="reveal text-amber-400 text-xs uppercase tracking-[0.35em] mb-5">
            Biz haqimizda
          </p>
          <h1 className="reveal delay-1 lig font-display text-5xl md:text-7xl lg:text-8xl leading-tight text-white mb-7">
            O'zbekistoning ishonchli
            <br />
            <span className="gradient-text">online do'koni.</span>
          </h1>
          <p className="reveal delay-2 text-gray-400 text-lg md:text-xl max-w-2xl mx-auto leading-relaxed">
            TakbirShop — 3 500+ mahsulot, xavfsiz to'lov va tez yetkazib berish
            bilan O'zbekistonning eng qulay online bozori.
          </p>

          <div className="reveal delay-3 flex flex-wrap items-center justify-center gap-3 mt-8 mb-8">
            {trustBadges.map((b, i) => (
              <div
                key={i}
                className="flex items-center gap-2 bg-white/5 border border-white/10 px-4 py-2 text-xs text-gray-400"
              >
                <span>{b.icon}</span>
                <span>{b.title}</span>
              </div>
            ))}
          </div>

          <div className="reveal delay-4 flex flex-wrap items-center justify-center gap-4">
            <Link to={"/cart"}>
              <button className="bg-amber-400 text-gray-950 font-semibold px-8 py-4 hover:bg-amber-300 transition-all duration-200 text-sm uppercase tracking-widest">
                Xarid qilish →
              </button>
            </Link>
            <Link to={"/contact"}>
              <button className="border border-white/20 text-white px-8 py-4 hover:border-amber-400 hover:text-amber-400 transition-all duration-200 text-sm uppercase tracking-widest">
                Bog'lanish
              </button>
            </Link>
          </div>
        </div>

        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-gray-600">
          <span className="text-[10px] uppercase tracking-widest">Pastga</span>
          <div className="w-px h-10 bg-gradient-to-b from-gray-600 to-transparent" />
        </div>
      </section>

      <div className="py-5 bg-[#0a0908] border-y border-white/5 ticker-wrap">
        <div className="ticker">
          {[
            ...paymentMethods,
            ...paymentMethods,
            ...paymentMethods,
            ...paymentMethods,
          ].map((p, i) => (
            <div
              key={i}
              className="flex items-center gap-3 mx-8 text-gray-500 text-xs uppercase tracking-widest"
            >
              <span
                className="w-2 h-2 rounded-full inline-block"
                style={{ backgroundColor: p.color, opacity: 0.7 }}
              />
              {p.name}
            </div>
          ))}
        </div>
      </div>

      <section className="py-20 border-b border-white/5">
        <div className="max-w-5xl mx-auto px-6 grid grid-cols-2 md:grid-cols-4 gap-10">
          {stats.map((s) => (
            <StatItem key={s.label} value={s.value} label={s.label} />
          ))}
        </div>
      </section>

      <section className="py-10 bg-[#0a0908]">
        <div className="max-w-5xl mx-auto px-6 grid grid-cols-2 md:grid-cols-4 gap-px bg-white/5">
          {trustBadges.map((b, i) => (
            <div
              key={i}
              className="bg-[#080807] px-6 py-5 flex items-center gap-4 hover:bg-[#0d0c0a] transition-colors group"
            >
              <span className="text-2xl">{b.icon}</span>
              <div>
                <div className="text-white text-sm font-medium group-hover:text-amber-400 transition-colors">
                  {b.title}
                </div>
                <div className="text-gray-600 text-xs">{b.desc}</div>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="py-28 max-w-6xl mx-auto px-6">
        <div className="mb-14">
          <p className="text-amber-400 text-xs uppercase tracking-[0.3em] mb-3">
            Assortimentimiz
          </p>
          <h2 className="font-display text-5xl text-white">
            Har narsani bir joydan toping
          </h2>
        </div>
        <div className="grid md:grid-cols-3 gap-4">
          {categories.map((cat, i) => (
            <div
              key={i}
              className="group relative aspect-[4/3] overflow-hidden cursor-pointer"
            >
              <img
                src={cat.img}
                alt={cat.name}
                className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#080807] via-[#080807]/40 to-transparent" />
              <div className="absolute bottom-0 left-0 p-6">
                <div className="text-2xl mb-1">{cat.icon}</div>
                <h3 className="font-display text-2xl text-white">{cat.name}</h3>
                <p className="text-amber-400 text-xs tracking-widest mt-1">
                  {cat.count} mahsulot
                </p>
                <p className="text-gray-500 text-xs mt-0.5">
                  dan {cat.priceFrom} so'm
                </p>
              </div>
              <div className="absolute top-4 right-4 bg-amber-400 text-gray-950 text-xs font-bold px-3 py-1 opacity-0 group-hover:opacity-100 transition-opacity duration-300 uppercase tracking-widest">
                Ko'rish ↗
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="py-20 bg-[#0a0908]">
        <div className="max-w-6xl mx-auto px-6">
          <div className="flex items-end justify-between mb-12">
            <div>
              <p className="text-amber-400 text-xs uppercase tracking-[0.3em] mb-3">
                Tanlangan mahsulotlar
              </p>
              <h2 className="font-display text-5xl text-white">
                Ommabop mahsulotlar
              </h2>
            </div>
            <a
              href="#"
              className="hidden md:flex items-center gap-2 text-amber-400 hover:text-amber-300 transition-colors text-sm uppercase tracking-widest border-b border-amber-400/30 pb-1"
            >
              Barchasini ko'rish ↗
            </a>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {featuredProducts.map((product, i) => (
              <ProductCard key={i} product={product} />
            ))}
          </div>

          <div className="mt-8 flex md:hidden justify-center">
            <a
              href="#"
              className="text-amber-400 text-sm uppercase tracking-widest border-b border-amber-400/30 pb-1"
            >
              Barchasini ko'rish ↗
            </a>
          </div>
        </div>
      </section>

      <section className="py-24">
        <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-2 gap-16 items-center">
          <div className="relative">
            <div className="relative overflow-hidden aspect-[4/5]">
              <img
                src="https://images.unsplash.com/photo-1607082348824-0a96f2a4b9da?w=800&q=80"
                alt="TakbirShop ombori"
                className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#080807] via-transparent to-transparent" />
            </div>
            <div className="absolute -bottom-6 -right-6 bg-amber-400 text-gray-950 p-6 text-center">
              <div className="font-display text-4xl font-bold">2019</div>
              <div className="text-xs font-semibold uppercase tracking-widest mt-1">
                dan beri
              </div>
            </div>
            <div className="absolute -top-4 -left-4 w-20 h-20 border border-amber-400/25" />
          </div>

          <div>
            <p className="text-amber-400 text-xs uppercase tracking-[0.3em] mb-4">
              Bizning hikoya
            </p>
            <h2 className="font-display text-5xl text-white leading-tight mb-8">
              Oddiy g'oyadan
              <br />
              <em className="not-italic gradient-text">katta platforma.</em>
            </h2>
            <div className="space-y-5 text-gray-400 leading-relaxed text-[15px]">
              <p>
                TakbirShop 2019-yilda Toshkentda kichik bir jamoa tomonidan
                tashkil etildi. Boshlanishida faqat kiyim-kechak sotar edik.
                Mijozlarimizning ishonchi va qo'llab-quvvatlashi tufayli
                assortimentimiz tez kengaydi.
              </p>
              <p>
                Bugun biz 12 000 dan ortiq xursand mijozga xizmat qilamiz.
                Elektronika, uy jihozlari, moda — barchasini eng qulay narxda,
                O'zbekiston bo'ylab yetkazib beramiz.
              </p>
              <p>
                Bizning maqsadimiz oddiy: har bir o'zbek oilasi sifatli
                mahsulotni arzon narxda, uyidan chiqmay sotib olsin.
              </p>
            </div>

            <div className="mt-8 pt-8 border-t border-white/5">
              <p className="text-gray-600 text-xs uppercase tracking-widest mb-4">
                To'lov usullari
              </p>
              <div className="flex flex-wrap gap-2">
                {paymentMethods.map((p, i) => (
                  <div
                    key={i}
                    className="bg-white/5 border border-white/10 px-4 py-2 text-xs text-gray-400 flex items-center gap-2"
                  >
                    <span
                      className="w-1.5 h-1.5 rounded-full"
                      style={{ backgroundColor: p.color }}
                    />
                    {p.name}
                  </div>
                ))}
              </div>
            </div>

            <div className="mt-6 flex items-center gap-4">
              <div className="w-10 h-px bg-amber-400" />
              <span className="text-amber-400 text-sm font-display italic">
                Toshkent, O'zbekiston
              </span>
            </div>
          </div>
        </div>
      </section>

      <section className="py-24 bg-[#0a0908]">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-14">
            <p className="text-amber-400 text-xs uppercase tracking-[0.3em] mb-3">
              Nima uchun biz?
            </p>
            <h2 className="font-display text-5xl text-white">
              Bizning ustunliklarimiz
            </h2>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-px bg-white/5">
            {values.map((v, i) => (
              <div
                key={i}
                className="card-shine bg-[#080807] p-8 group hover:bg-[#0d0c0a] transition-colors duration-300 cursor-default"
              >
                <div className="text-2xl text-amber-400 mb-5 group-hover:scale-110 transition-transform duration-300 inline-block">
                  {v.icon}
                </div>
                <h3 className="font-display text-2xl text-white mb-3">
                  {v.title}
                </h3>
                <p className="text-gray-500 text-sm leading-relaxed">
                  {v.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-28 overflow-hidden">
        <div className="max-w-6xl mx-auto px-6 mb-14 flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div>
            <p className="text-amber-400 text-xs uppercase tracking-[0.3em] mb-3">
              Jamoamiz
            </p>
            <h2 className="font-display text-5xl md:text-6xl text-white">
              Bizning jamoa
            </h2>
          </div>
          <p className="text-gray-500 max-w-xs text-sm leading-relaxed md:text-right">
            Sizga xizmat qilishdan baxtiyormiz — har birimiz o'z ishining
            ustasi.
          </p>
        </div>
        <div className="px-6 max-w-6xl mx-auto">
          <Swiper
            modules={[Navigation, Pagination, Autoplay]}
            spaceBetween={20}
            slidesPerView={1}
            navigation
            pagination={{ clickable: true }}
            autoplay={{ delay: 3500, disableOnInteraction: false }}
            loop
            breakpoints={{
              640: { slidesPerView: 2 },
              1024: { slidesPerView: 3 },
            }}
            className="pb-14"
          >
            {team.map((member, i) => (
              <SwiperSlide key={i}>
                <div className="card-shine group relative bg-[#0d0c0a] border border-white/5 overflow-hidden hover:border-amber-400/25 transition-all duration-500 cursor-pointer">
                  <div className="relative aspect-[3/4] overflow-hidden">
                    <img
                      src={member.img}
                      alt={member.name}
                      className="w-full h-full object-cover grayscale group-hover:grayscale-0 group-hover:scale-105 transition-all duration-700"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#0d0c0a] via-[#0d0c0a]/10 to-transparent" />
                    <div className="absolute bottom-0 left-0 right-0 p-5 translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500">
                      <p className="font-display text-white/90 text-base italic leading-snug">
                        "{member.quote}"
                      </p>
                    </div>
                  </div>
                  <div className="p-5">
                    <h3 className="font-display text-xl text-white">
                      {member.name}
                    </h3>
                    <p className="text-amber-400 text-[10px] uppercase tracking-widest mt-1">
                      {member.role}
                    </p>
                    <div className="flex gap-4 mt-4">
                      <a
                        href={member.socials.instagram}
                        className="text-gray-600 hover:text-amber-400 transition-colors text-xs"
                      >
                        Instagram ↗
                      </a>
                      <a
                        href={member.socials.telegram}
                        className="text-gray-600 hover:text-amber-400 transition-colors text-xs"
                      >
                        Telegram ↗
                      </a>
                    </div>
                  </div>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </section>

      <section className="py-24 bg-[#0a0908]">
        <div className="max-w-4xl mx-auto px-6">
          <div className="text-center mb-14">
            <p className="text-amber-400 text-xs uppercase tracking-[0.3em] mb-3">
              Izohlar
            </p>
            <h2 className="font-display text-5xl text-white">
              Mijozlar nima deydi?
            </h2>
            <div className="flex items-center justify-center gap-2 mt-4">
              <StarRating rating={5} />
              <span className="text-gray-400 text-sm">
                4.9 / 5 — 12 000+ izoh asosida
              </span>
            </div>
          </div>
          <Swiper
            modules={[Pagination, Autoplay, EffectCards]}
            effect="cards"
            grabCursor
            autoplay={{ delay: 4000, disableOnInteraction: false }}
            loop
            pagination={{ clickable: true }}
            className="pb-12 max-w-lg mx-auto"
          >
            {testimonials.map((t, i) => (
              <SwiperSlide key={i}>
                <div className="bg-[#0d0c0a] border border-white/5 p-10 text-center">
                  <div className="flex justify-center mb-4">
                    <StarRating rating={t.rating} />
                  </div>
                  <p className="text-gray-300 text-base md:text-lg leading-relaxed mb-8 font-display italic">
                    "{t.text}"
                  </p>
                  <div className="flex items-center justify-center gap-4">
                    <img
                      src={t.img}
                      alt={t.author}
                      className="w-11 h-11 rounded-full object-cover grayscale"
                    />
                    <div className="text-left">
                      <div className="text-white font-medium text-sm">
                        {t.author}
                      </div>
                      <div className="text-gray-500 text-xs">{t.city}</div>
                    </div>
                  </div>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </section>

      <section className="py-12 bg-amber-400">
        <div className="max-w-6xl mx-auto px-6 grid md:grid-cols-3 gap-6 text-center">
          <div>
            <div className="font-display text-3xl text-gray-950 font-bold">
              🚚 Toshkent
            </div>
            <div className="text-gray-800 text-sm mt-1">
              1 kun ichida yetkazish
            </div>
          </div>
          <div className="border-x border-gray-950/10 hidden md:block">
            <div className="font-display text-3xl text-gray-950 font-bold">
              📦 Viloyatlar
            </div>
            <div className="text-gray-800 text-sm mt-1">
              2–3 kun ichida yetkazish
            </div>
          </div>
          <div>
            <div className="font-display text-3xl text-gray-950 font-bold">
              💳 To'lov
            </div>
            <div className="text-gray-800 text-sm mt-1">
              Click, Payme, Uzcard, Visa
            </div>
          </div>
        </div>
      </section>

      <section className="py-36 relative overflow-hidden bg-[#0d0c0a]">
        <div className="absolute inset-0 bg-gradient-to-br from-amber-400/5 via-transparent to-transparent" />
        <div className="noise absolute inset-0 pointer-events-none" />
        <div className="relative z-10 text-center max-w-3xl mx-auto px-6">
          <p className="text-amber-400 text-xs uppercase tracking-[0.3em] mb-5">
            Hoziroq boshlang
          </p>
          <h2 className="font-display text-5xl md:text-6xl text-white mb-6 leading-tight">
            O'zingizga yoqqan narsani
            <br />
            <span className="gradient-text">bugun buyurtma qiling.</span>
          </h2>
          <p className="text-gray-400 mb-10 text-lg leading-relaxed">
            3 500+ mahsulot, xavfsiz to'lov, O'zbekiston bo'ylab yetkazib
            berish. Hammasi bir joyda — TakbirShop'da.
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <Link to={"/cart"}>
              <button className="bg-amber-400 text-gray-950 font-semibold px-10 py-4 hover:bg-amber-300 transition-all duration-200 text-sm uppercase tracking-widest">
                Xarid qilish ↗
              </button>
            </Link>
            <button className="border border-white/20 text-white px-10 py-4 hover:border-amber-400 hover:text-amber-400 transition-all duration-200 text-sm uppercase tracking-widest">
              Telegram kanal
            </button>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
