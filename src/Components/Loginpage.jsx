import React, { useState } from "react";
import {
  IoArrowBackOutline,
  IoEyeOutline,
  IoEyeOffOutline,
} from "react-icons/io5";
import { FcGoogle } from "react-icons/fc";
import { FaApple } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import { FiChevronRight } from "react-icons/fi";

const products = [
  {
    emoji: "👟",
    name: "Oyoq kiyim",
    price: "299 000",
    color: "from-orange-400 to-rose-400",
  },
  {
    emoji: "⌚",
    name: "Soatlar",
    price: "850 000",
    color: "from-violet-400 to-indigo-500",
  },
  {
    emoji: "🕶️",
    name: "Ko'zoynaklar",
    price: "175 000",
    color: "from-teal-400 to-cyan-500",
  },
  {
    emoji: "👜",
    name: "Sumkalar",
    price: "540 000",
    color: "from-pink-400 to-fuchsia-500",
  },
];

export default function Loginpage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPass, setShowPass] = useState(false);
  const [remember, setRemember] = useState(false);
  const [loading, setLoading] = useState(false);
  const [shake, setShake] = useState(false);
  const [success, setSuccess] = useState(false);

  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    if (!email || !password) {
      setShake(true);
      setTimeout(() => setShake(false), 500);
      return;
    }
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setSuccess(true);
      setTimeout(() => {
        navigate("/");
      }, 800);
    }, 1800);
  };

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@300;400;500;600&family=Sora:wght@600;700;800&display=swap');
        .login-wrap * { font-family: 'DM Sans', sans-serif; box-sizing: border-box; }
        .login-title { font-family: 'Sora', sans-serif; }

        @keyframes shake {
          0%,100%{transform:translateX(0)}
          20%{transform:translateX(-8px)}
          40%{transform:translateX(8px)}
          60%{transform:translateX(-5px)}
          80%{transform:translateX(5px)}
        }
        @keyframes spin { to{transform:rotate(360deg)} }
        @keyframes floatUp {
          0%,100%{transform:translateY(0px)}
          50%{transform:translateY(-10px)}
        }
        @keyframes fadeIn {
          from{opacity:0;transform:translateY(16px)}
          to{opacity:1;transform:translateY(0)}
        }
        @keyframes scaleIn {
          from{opacity:0;transform:scale(0.85)}
          to{opacity:1;transform:scale(1)}
        }
        @keyframes pulse-ring {
          0%{transform:scale(0.95);box-shadow:0 0 0 0 rgba(34,197,94,0.5)}
          70%{transform:scale(1);box-shadow:0 0 0 12px rgba(34,197,94,0)}
          100%{transform:scale(0.95);box-shadow:0 0 0 0 rgba(34,197,94,0)}
        }

        .shake-anim { animation: shake 0.45s ease; }
        .spin-anim  { animation: spin 0.7s linear infinite; }
        .float-1    { animation: floatUp 3s ease-in-out infinite; }
        .float-2    { animation: floatUp 3.6s ease-in-out 0.4s infinite; }
        .float-3    { animation: floatUp 4s ease-in-out 0.8s infinite; }
        .float-4    { animation: floatUp 3.2s ease-in-out 1.2s infinite; }
        .fade-in    { animation: fadeIn 0.5s ease forwards; }
        .scale-in   { animation: scaleIn 0.4s ease forwards; }
        .pulse-ring { animation: pulse-ring 1.5s ease-out infinite; }

        .input-field {
          transition: border-color 0.2s, box-shadow 0.2s, background 0.2s;
        }
        .input-field:focus {
          border-color: #f97316 !important;
          box-shadow: 0 0 0 4px rgba(249,115,22,0.12);
          background: #fff !important;
          outline: none;
        }
        .social-btn { transition: all 0.2s; }
        .social-btn:hover { transform: translateY(-2px); box-shadow: 0 6px 18px rgba(0,0,0,0.1); }
        .social-btn:active { transform: translateY(0); }

        .login-btn {
          transition: all 0.2s;
          position: relative;
          overflow: hidden;
        }
        .login-btn::after {
          content:'';
          position:absolute;
          inset:0;
          background:linear-gradient(135deg,rgba(255,255,255,0.15) 0%,transparent 60%);
          pointer-events:none;
        }
        .login-btn:hover { transform: translateY(-2px); box-shadow: 0 10px 28px rgba(249,115,22,0.35); }
        .login-btn:active { transform: translateY(0); }

        .product-card { transition: all 0.3s; cursor: pointer; }
        .product-card:hover { transform: translateY(-4px) scale(1.03); }

        .right-panel {
          background: linear-gradient(145deg, #0f172a 0%, #1e1b4b 50%, #0f172a 100%);
        }
        .glass {
          background: rgba(255,255,255,0.07);
          backdrop-filter: blur(16px);
          border: 1px solid rgba(255,255,255,0.12);
        }

        /* ── MOBILE ── */
        @media (max-width: 768px) {
          .login-wrap {
            flex-direction: column;
          }
          .left-panel {
            max-width: 100% !important;
            width: 100% !important;
            padding: 36px 24px 32px !important;
            order: 2;
          }
          .right-panel {
            order: 1;
            flex: none !important;
            padding: 28px 20px !important;
            min-height: auto !important;
          }
          .right-panel .product-cards {
            grid-template-columns: repeat(4, 1fr) !important;
            gap: 8px !important;
          }
          .right-panel .product-card {
            padding: 10px 8px !important;
          }
          .right-panel .right-title {
            font-size: 1.4rem !important;
            margin-bottom: 6px !important;
          }
          .right-panel .right-sub {
            font-size: 12px !important;
            margin-bottom: 14px !important;
          }
          .right-panel .right-stats {
            margin-top: 14px !important;
            gap: 16px !important;
          }
          .right-panel .right-badge {
            margin-bottom: 10px !important;
            padding: 6px 14px !important;
          }
          .back-link {
            margin-bottom: 20px !important;
          }
          .brand-row {
            margin-bottom: 18px !important;
          }
          .form-title-block {
            margin-bottom: 18px !important;
          }
          .social-row {
            margin-bottom: 14px !important;
          }
          .divider-row {
            margin-bottom: 14px !important;
          }
        }
      `}</style>

      <div className="login-wrap flex min-h-screen">
        <div className="left-panel flex flex-col justify-center px-12 py-10 w-full max-w-[480px] bg-white relative">
          <div className="flex items-center gap-1 text-xs text-gray-400 mb-4">
            <Link to={"/"}>
              <span className="hover:text-gray-600 cursor-pointer">Home</span>
            </Link>
            <FiChevronRight size={12} />
            <span className="text-gray-700 font-medium">My Profile</span>
          </div>
              
          <div className="brand-row flex items-center gap-2 mb-8">
            <img src="/takbir.png" alt="" />
          </div>

          <div className="form-title-block mb-7 fade-in">
            <h1 className="login-title text-3xl font-bold text-gray-900 leading-tight mb-1.5">
              Xush kelibsiz! 👋
            </h1>
            <p className="text-gray-400 text-sm font-light">
              Ajoyib mahsulotlarni kashf etish uchun kiring
            </p>
          </div>

          <div className="social-row">
            <button className="social-btn cursor-pointer flex items-center justify-center gap-3 w-full py-3 rounded-xl border border-gray-200 bg-white text-gray-700 text-sm font-medium mb-3">
              <FcGoogle size={20} />
              Google orqali kirish
            </button>
            <button className="social-btn cursor-pointer flex items-center justify-center gap-3 w-full py-3 rounded-xl border border-gray-200 bg-white text-gray-700 text-sm font-medium mb-5">
              <FaApple size={20} className="text-gray-800" />
              Apple orqali kirish
            </button>
          </div>

          <div className="divider-row flex items-center gap-3 mb-5">
            <div className="flex-1 h-px bg-gray-100" />
            <span className="text-xs text-gray-400">yoki</span>
            <div className="flex-1 h-px bg-gray-100" />
          </div>

          <form onSubmit={handleLogin} className={shake ? "shake-anim" : ""}>
            <div className="mb-3">
              <label className="block text-xs font-medium text-gray-500 mb-1.5 ml-1">
                Email
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="example@gmail.com"
                className="input-field w-full px-4 py-3 rounded-xl border border-gray-200 bg-gray-50 text-gray-800 text-sm placeholder-gray-300"
              />
            </div>

            <div className="mb-4 relative">
              <label className="block text-xs font-medium text-gray-500 mb-1.5 ml-1">
                Parol
              </label>
              <input
                type={showPass ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="input-field w-full px-4 py-3 pr-11 rounded-xl border border-gray-200 bg-gray-50 text-gray-800 text-sm placeholder-gray-300"
              />
              <button
                type="button"
                onClick={() => setShowPass((p) => !p)}
                className="absolute right-3 top-[34px] text-gray-400 hover:text-gray-600 transition-colors"
              >
                {showPass ? (
                  <IoEyeOffOutline size={18} />
                ) : (
                  <IoEyeOutline size={18} />
                )}
              </button>
            </div>

            <div className="flex items-center justify-between mb-6">
              <label
                className="flex items-center gap-2 cursor-pointer"
                onClick={() => setRemember((p) => !p)}
              >
                <div
                  className={`w-4 h-4 rounded flex items-center justify-center border transition-all ${remember ? "bg-orange-500 border-orange-500" : "border-gray-300"}`}
                >
                  {remember && (
                    <svg width="10" height="8" viewBox="0 0 10 8" fill="none">
                      <path
                        d="M1 4l2.5 2.5L9 1"
                        stroke="white"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  )}
                </div>
                <span className="text-sm text-gray-500">Eslab qolish</span>
              </label>
              <a href="#" className="text-sm text-orange-500 hover:underline">
                Parolni unutdingizmi?
              </a>
            </div>

            {success ? (
              <div className="scale-in w-full py-3.5 rounded-xl bg-green-500 flex items-center justify-center gap-2 text-white font-medium pulse-ring">
                <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                  <path
                    d="M4 10l4 4 8-8"
                    stroke="white"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
                Muvaffaqiyatli kirildi!
              </div>
            ) : (
              <button
                type="submit"
                disabled={loading}
                className="login-btn w-full py-3.5 rounded-xl bg-orange-500 text-white font-semibold text-sm flex items-center justify-center gap-2 disabled:opacity-70"
              >
                {loading ? (
                  <>
                    <div className="spin-anim w-4 h-4 border-2 border-white/30 border-t-white rounded-full" />
                    Kirish...
                  </>
                ) : (
                  "Kirish"
                )}
              </button>
            )}
          </form>

          <p className="text-center text-sm text-gray-400 mt-5">
            Hisobingiz yo'qmi?{" "}
            <a href="#" className="text-orange-500 font-medium hover:underline">
              Ro'yxatdan o'ting
            </a>
          </p>
        </div>

        <div className="right-panel flex-1 relative overflow-hidden flex flex-col items-center justify-center p-12">
          <div
            className="absolute top-0 right-0 w-96 h-96 rounded-full opacity-20"
            style={{
              background: "radial-gradient(circle, #f97316, transparent)",
              transform: "translate(30%, -30%)",
            }}
          />
          <div
            className="absolute bottom-0 left-0 w-72 h-72 rounded-full opacity-15"
            style={{
              background: "radial-gradient(circle, #818cf8, transparent)",
              transform: "translate(-30%, 30%)",
            }}
          />

          {[...Array(20)].map((_, i) => (
            <div
              key={i}
              className="absolute rounded-full bg-white opacity-20"
              style={{
                width: Math.random() * 3 + 1 + "px",
                height: Math.random() * 3 + 1 + "px",
                top: Math.random() * 100 + "%",
                left: Math.random() * 100 + "%",
              }}
            />
          ))}

          <div className="relative z-10 text-center max-w-sm w-full">
            <div className="right-badge glass rounded-2xl px-6 py-3 inline-block mb-6">
              <img src="/takbir.png" alt="" />
            </div>

            <h2 className="right-title login-title text-3xl font-bold text-white leading-tight mb-3">
              Minglab mahsulotlar
              <br />
              <span className="text-orange-400">bir joyda!</span>
            </h2>
            <p className="right-sub text-white/50 text-sm font-light mb-10 leading-relaxed">
              Elektronika, kiyim, aksessuarlar va yana ko'p narsalar eng qulay
              narxlarda
            </p>

            <div className="product-cards grid grid-cols-2 gap-3">
              {products.map((p, i) => (
                <div
                  key={i}
                  className={`product-card glass rounded-2xl p-4 text-left ${["float-1", "float-2", "float-3", "float-4"][i]}`}
                >
                  <div
                    className={`w-10 h-10 rounded-xl bg-gradient-to-br ${p.color} flex items-center justify-center text-xl mb-3`}
                  >
                    {p.emoji}
                  </div>
                  <p className="text-white/80 text-xs font-medium mb-0.5">
                    {p.name}
                  </p>
                  <p className="text-white font-semibold text-sm">
                    {p.price}{" "}
                    <span className="text-white/40 text-xs">so'm</span>
                  </p>
                </div>
              ))}
            </div>

            <div className="right-stats flex items-center justify-center gap-6 mt-8">
              {[
                ["10K+", "Mahsulot"],
                ["4.9★", "Reyting"],
                ["50K+", "Mijoz"],
              ].map(([val, label]) => (
                <div key={label} className="text-center">
                  <div className="text-white font-bold text-lg">{val}</div>
                  <div className="text-white/40 text-xs">{label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
