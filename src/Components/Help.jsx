import { useState, useEffect, useRef } from "react";
import { BsArrowReturnLeft } from "react-icons/bs";
import { CiCreditCard1, CiDeliveryTruck } from "react-icons/ci";
import { FaBoxOpen, FaFolder, FaQuestion, FaRegStar, FaSearch } from "react-icons/fa";
import { IoChatbubbleEllipsesOutline } from "react-icons/io5";
import { MdAccountCircle, MdOutlineArticle } from "react-icons/md";

const categories = [
  {
    id: "orders",
    icon:   <FaBoxOpen />, 
    label: "Buyurtmalar",
    desc: "Kuzatish, o'zgartirish, bekor qilish",
    color: "from-orange-50 to-amber-50",
    border: "border-orange-200",
    accent: "bg-orange-500",
    tag: "bg-orange-100 text-orange-700",
  },
  {
    id: "delivery",
    icon: <CiDeliveryTruck />,
    label: "Yetkazib berish",
    desc: "Muddatlar, hududlar, kuryer",
    color: "from-emerald-50 to-green-50",
    border: "border-emerald-200",
    accent: "bg-emerald-500",
    tag: "bg-emerald-100 text-emerald-700",
  },
  {
    id: "payment",
    icon: <CiCreditCard1 />,
    label: "To'lov & xavfsizlik",
    desc: "Click, Payme, karta va boshqalar",
    color: "from-blue-50 to-sky-50",
    border: "border-blue-200",
    accent: "bg-blue-500",
    tag: "bg-blue-100 text-blue-700",
  },
  {
    id: "returns",
    icon: <BsArrowReturnLeft />,
    label: "Qaytarish",
    desc: "14 kun ichida qaytarish siyosati",
    color: "from-rose-50 to-pink-50",
    border: "border-rose-200",
    accent: "bg-rose-500",
    tag: "bg-rose-100 text-rose-700",
  },
  {
    id: "account",
    icon: <MdAccountCircle />,
    label: "Akkaunt",
    desc: "Kirish, parol va sozlamalar",
    color: "from-violet-50 to-purple-50",
    border: "border-violet-200",
    accent: "bg-violet-500",
    tag: "bg-violet-100 text-violet-700",
  },
  {
    id: "promo",
    icon: <FaRegStar />,
    label: "Aksiya & bonuslar",
    desc: "Promokodlar, chegirmalar, cashback",
    color: "from-yellow-50 to-amber-50",
    border: "border-yellow-200",
    accent: "bg-yellow-500",
    tag: "bg-yellow-100 text-yellow-700",
  },
];

const allFaqs = [
  {
    id: 1,
    cat: "orders",
    q: "Buyurtmam qayerda? Qanday kuzataman?",
    a: "Buyurtmangizni kuzatish uchun «Mening buyurtmalarim» bo'limiga o'ting yoki elektron pochtangizga kelgan xabardagi «Kuzatish» tugmasini bosing.",
  },
  {
    id: 2,
    cat: "orders",
    q: "Buyurtmani bekor qilish mumkinmi?",
    a: "Ha, buyurtma «Jarayonda» holatiga o'tguncha bekor qilish mumkin. Pul 3–5 ish kuni ichida qaytariladi.",
  },
  {
    id: 3,
    cat: "delivery",
    q: "Tovar qaysi kunlarda yetkazib beriladi?",
    a: "Toshkent shahri bo'yicha 1–2 ish kuni, viloyatlarga 3–5 ish kuni ichida yetkaziladi.",
  },
  {
    id: 4,
    cat: "delivery",
    q: "Yetkazib berish narxi qancha?",
    a: "Toshkent bo'yicha 15 000 so'm, viloyatlarga 25 000 so'm. 300 000 so'mdan ortiq buyurtmalarda bepul!",
  },
  {
    id: 6,
    cat: "payment",
    q: "Qaysi to'lov usullari mavjud?",
    a: "Click, Payme, Uzcard, Humo, VISA/Mastercard va naqd pul bilan to'lash mumkin.",
  },
];

const articles = [
  {
    num: "01",
    title: "Buyurtma holatini kuzatish qo'llanmasi",
    views: "12 450",
    time: "3 min",
    cat: "orders",
  },
  {
    num: "02",
    title: "Qaytarish arizasini to'ldirish",
    views: "9 820",
    time: "5 min",
    cat: "returns",
  },
  {
    num: "03",
    title: "Click va Payme orqali to'lash",
    views: "8 310",
    time: "2 min",
    cat: "payment",
  },
  {
    num: "04",
    title: "Promokodni qo'llash bo'yicha yo'riqnoma",
    views: "7 040",
    time: "1 min",
    cat: "promo",
  },
];

const chatSuggestions = [
  "Buyurtmamni kuzatmoqchiman",
  "Tovarni qaytarmoqchiman",
  "To'lov muammosi bor",
];

// Particle background (Optimization: Hidden on small screens for performance)
function Particles() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none opacity-40">
      {[...Array(15)].map((_, i) => (
        <div
          key={i}
          className="absolute rounded-full"
          style={{
            width: Math.random() * 5 + 2 + "px",
            height: Math.random() * 5 + 2 + "px",
            background: i % 2 === 0 ? "#fbbf24" : "#f87171",
            left: Math.random() * 100 + "%",
            top: Math.random() * 100 + "%",
            animation: `float ${5 + Math.random() * 5}s ease-in-out infinite alternate`,
          }}
        />
      ))}
    </div>
  );
}

// Live Chat Component
function ChatModal({ onClose }) {
  const [messages, setMessages] = useState([
    {
      from: "bot",
      text: "Salom! 👋 Qanday yordam bera olaman?",
      time: "hozir",
    },
  ]);
  const [input, setInput] = useState("");
  const bottomRef = useRef(null);

  const sendMessage = (text) => {
    const msg = text || input.trim();
    if (!msg) return;
    setMessages((prev) => [...prev, { from: "user", text: msg }]);
    setInput("");
    setTimeout(() => {
      setMessages((prev) => [
        ...prev,
        { from: "bot", text: "Tushundim. Operatorimiz tez orada bog'lanadi." },
      ]);
    }, 1000);
  };

  useEffect(
    () => bottomRef.current?.scrollIntoView({ behavior: "smooth" }),
    [messages],
  );

  return (
    <div className="fixed inset-0 z-[60] bg-[#080807]  bg-white  dark:bg-gray-900 dark:text-white  bg-[#080807] flex items-end justify-end p-0 sm:p-6 bg-black/40 backdrop-blur-sm">
      
      <div className="w-full sm:w-96 bg-white sm:rounded-3xl h-[100dvh] sm:h-[550px] shadow-2xl flex flex-col overflow-hidden animate-scaleIn">
        
        <div className="bg-stone-900 p-4 text-white flex justify-between items-center">
              <div className="flex items-center cursor-pointer ml-10 pt-[40px] gap-1 text-xs text-gray-400 mb-4">
          <Link to="/">
            <span className="hover:text-gray-600 cursor-pointer">Home</span>
          </Link>
          <FiChevronRight size={12} />
          <span className="text-gray-700 font-medium">Payment</span>
        </div>
          <img src="/Logo.png" alt="" className="" />
          <button onClick={onClose} className="text-2xl">
            &times;
          </button>
        </div>
        <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-stone-50">
          {messages.map((m, i) => (
            <div
              key={i}
              className={`flex ${m.from === "user" ? "justify-end" : "justify-start"}`}
            >
              <div
                className={`max-w-[80%] px-4 py-2 rounded-2xl text-sm ${m.from === "user" ? "bg-stone-800 text-white" : "bg-white border text-stone-800"}`}
              >
                {m.text}
              </div>
            </div>
          ))}
          <div ref={bottomRef} />
        </div>
        <div className="p-4 bg-white border-t">
          <div className="flex gap-2">
            <input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && sendMessage()}
              placeholder="Xabar..."
              className="flex-1 bg-stone-100 rounded-xl px-4 py-2 outline-none"
            />
            <button
              onClick={() => sendMessage()}
              className="bg-stone-900 text-white p-2 rounded-xl px-4"
            >
              ➤
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function Help() {
  const [search, setSearch] = useState("");
  const [activeCat, setActiveCat] = useState("all");
  const [openFaq, setOpenFaq] = useState(null);
  const [showChat, setShowChat] = useState(false);
  const [activeSection, setActiveSection] = useState("categories");

  const filteredFaqs = allFaqs.filter(
    (f) =>
      (activeCat === "all" || f.cat === activeCat) &&
      f.q.toLowerCase().includes(search.toLowerCase()),
  );

  return (
    <div className="min-h-screen bg-stone-50 text-stone-900 selection:bg-amber-200">
      <style>{`
        @keyframes scaleIn { from { opacity: 0; transform: scale(0.9) translateY(20px); } to { opacity: 1; transform: scale(1) translateY(0); } }
        .animate-scaleIn { animation: scaleIn 0.3s ease-out forwards; }
      `}</style>

      <header className="relative bg-stone-900 pt-20 pb-24 px-4 overflow-hidden text-center">
        <Particles />
        <div className="relative z-10 max-w-3xl mx-auto">
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">
            Qanday yordam bera olamiz?
          </h1>
          <div className="relative max-w-xl mx-auto">
            <input
              type="text"
              placeholder="Muammoni qidiring..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-12 pr-4 py-4 rounded-2xl border-none focus:ring-4 focus:ring-amber-500/30 text-lg shadow-2xl shadow-black/20"
            />
            <span className="absolute left-4 top-1/2 -translate-y-1/2 text-xl">
              <FaSearch />

            </span>
          </div>
        </div>
      </header>

      <nav className="sticky top-0 z-40 bg-white/80 backdrop-blur-md border-b">
        <div className="max-w-5xl mx-auto px-4 flex gap-4 overflow-x-auto py-3 no-scrollbar">
          {[
            { id: "categories", label: "Bo'limlar", icon: <FaFolder /> },
            { id: "faq", label: "FAQ", icon: <FaQuestion /> },
            { id: "articles", label: "Maqolalar", icon: <MdOutlineArticle /> },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveSection(tab.id)}
              className={`flex items-center gap-2 px-5 py-2 rounded-full whitespace-nowrap transition-all ${activeSection === tab.id ? "bg-stone-900 text-white" : "hover:bg-stone-200"}`}
            >
              <span>{tab.icon}</span> {tab.label}
            </button>
          ))}
        </div>
      </nav>

      <main className="max-w-5xl mx-auto px-4 py-12">
        {activeSection === "categories" && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 animate-scaleIn">
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => {
                  setActiveCat(cat.id);
                  setActiveSection("faq");
                }}
                className={`p-6 rounded-3xl border-2 text-left transition-all hover:shadow-xl hover:-translate-y-1 ${cat.border} bg-white`}
              >
                <span className="text-4xl mb-4 block">{cat.icon}</span>
                <h3 className="font-bold text-lg mb-2">{cat.label}</h3>
                <p className="text-stone-500 text-sm">{cat.desc}</p>
              </button>
            ))}
          </div>
        )}

        {activeSection === "faq" && (
          <div className="max-w-3xl mx-auto space-y-4 animate-scaleIn">
            {filteredFaqs.map((faq) => (
              <div
                key={faq.id}
                className="bg-white rounded-2xl border overflow-hidden"
              >
                <button
                  onClick={() => setOpenFaq(openFaq === faq.id ? null : faq.id)}
                  className="w-full px-6 py-4 text-left flex justify-between items-center font-semibold"
                >
                  {faq.q}
                  <span
                    className={`transition-transform ${openFaq === faq.id ? "rotate-180" : ""}`}
                  >
                    ▼
                  </span>
                </button>
                {openFaq === faq.id && (
                  <div className="px-6 pb-4 text-stone-600 text-sm leading-relaxed border-t pt-4">
                    {faq.a}
                  </div>
                )}
              </div>
            ))}
          </div>
        )}

        {activeSection === "articles" && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 animate-scaleIn">
            {articles.map((article) => (
              <div
                key={article.num}
                className="group bg-white p-6 rounded-3xl border hover:border-amber-500 transition-all cursor-pointer"
              >
                <div className="flex justify-between items-start mb-4">
                  <span className="text-3xl font-black text-stone-100 group-hover:text-amber-100 transition-colors">
                    {article.num}
                  </span>
                  <span className="text-xs bg-stone-100 px-3 py-1 rounded-full uppercase font-bold tracking-wider">
                    {article.cat}
                  </span>
                </div>
                <h3 className="font-bold text-xl mb-4 group-hover:text-amber-600 transition-colors">
                  {article.title}
                </h3>
                <div className="flex items-center gap-4 text-sm text-stone-400">
                  <span>👁 {article.views}</span>
                  <span>⏱ {article.time}</span>
                </div>
              </div>
            ))}
          </div>
        )}
      </main>

      <button
        onClick={() => setShowChat(true)}
        className="fixed bottom-6 right-6 w-16 h-16 bg-amber-500 text-white rounded-2xl shadow-2xl shadow-amber-500/40 flex items-center justify-center text-2xl hover:scale-110 active:scale-95 transition-all z-50"
      >
        <IoChatbubbleEllipsesOutline />
      </button>

      {showChat && <ChatModal onClose={() => setShowChat(false)} />}
    </div>
  );
}
