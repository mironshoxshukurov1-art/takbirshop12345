import React, { useState } from 'react'
import { FiChevronRight, FiEye, FiEyeOff } from 'react-icons/fi'
import { Link } from 'react-router-dom'
import Navbar from '../Navbar'
import Footer from '../Footer'
import { FaTelegramPlane } from 'react-icons/fa'

export default function SignUp() {
  const [form, setForm] = useState({ name: '', phone: '', email: '', password: '', confirm: '' })
  const [showPass, setShowPass] = useState(false)
  const [showConfirm, setShowConfirm] = useState(false)
  const [agreed, setAgreed] = useState(false)
  const [submitted, setSubmitted] = useState(false)
  const [errors, setErrors] = useState({})

  const validate = () => {
    const e = {}
    if (!form.name.trim()) e.name = "Ism kiritilmadi"
    if (!form.phone.trim()) e.phone = "Telefon kiritilmadi"
    if (!form.email.includes('@')) e.email = "Email noto'g'ri"
    if (form.password.length < 6) e.password = "Kamida 6 ta belgi"
    if (form.password !== form.confirm) e.confirm = "Parollar mos kelmadi"
    if (!agreed) e.agreed = "Shartlarga rozilik kerak"
    return e
  }

  const handleSubmit = () => {
    const e = validate()
    setErrors(e)
    if (Object.keys(e).length === 0) setSubmitted(true)
  }

  const strength = form.password.length === 0 ? 0 : form.password.length < 6 ? 1 : form.password.length < 10 ? 2 : 3
  const strengthLabel = ['', 'Zaif', "O'rtacha", 'Kuchli']
  const strengthColor = ['', 'bg-red-500', 'bg-amber-400', 'bg-green-500']

  if (submitted) {
    return (
      <>
        <Navbar />
        <div className="min-h-screen bg-[#080807] flex items-center justify-center px-4">
          <style>{`@import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@600;700&display=swap'); .font-display{font-family:'Cormorant Garamond',serif;}`}</style>
          <div className="text-center max-w-md">
            <div className="text-6xl mb-6">🎉</div>
            <h2 className="font-display text-4xl text-white mb-3">Xush kelibsiz!</h2>
            <p className="text-gray-400 mb-2">Hisobingiz muvaffaqiyatli yaratildi, <span className="text-amber-400 font-medium">{form.name}</span>!</p>
            <p className="text-gray-500 text-sm mb-8">Endi TakbirShop'ning barcha imkoniyatlaridan foydalanishingiz mumkin.</p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <Link to="/">
                <button className="bg-amber-400 text-gray-950 font-semibold px-8 py-4 text-sm uppercase tracking-widest hover:bg-amber-300 transition-colors w-full">
                  Xarid boshlash →
                </button>
              </Link>
              <Link to="/login">
                <button className="border border-white/20 text-white px-8 py-4 text-sm uppercase tracking-widest hover:border-amber-400 hover:text-amber-400 transition-colors w-full">
                  Kirish
                </button>
              </Link>
            </div>
          </div>
        </div>
        <Footer />
      </>
    )
  }

  return (
   <>
  <Navbar />

  <div
    className="min-h-screen bg-white dark:bg-gray-900 text-gray-gray-900 dark:text-white"
    style={{ fontFamily: "'DM Sans', sans-serif" }}
  >
    <style>{`
      @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@600;700&family=DM+Sans:wght@300;400;500&display=swap');
      .font-display { font-family: 'Cormorant Garamond', serif; }
      input:focus { outline: none; border-color: #f59e0b; }
      input { 
        background: #f3f4f6; 
        border: 1px solid rgba(0,0,0,0.1); 
        color: #111827; 
        transition: border-color 0.2s; 
        width: 100%; 
      }
      input::placeholder { color: #9ca3af; }
      .dark input { 
        background: #1f1f1f; 
        border: 1px solid rgba(255,255,255,0.1); 
        color: white; 
      }
      .input-error { border-color: #ef4444 !important; }
    `}</style>

    {/* Breadcrumb */}
    <div className="flex items-center ml-10 pt-10 gap-1 text-xs text-gray-400 dark:text-gray-400 mb-4">
      <Link to="/">
        <span className="hover:text-gray-600 dark:hover:text-gray-200 cursor-pointer">Home</span>
      </Link>
      <FiChevronRight size={12} />
      <span className="text-gray-700 dark:text-gray-300 font-medium">Sign Up</span>
    </div>

    <div className="max-w-5xl mx-auto px-6 pb-20 grid lg:grid-cols-2 gap-12 items-start">

      {/* LEFT — Form */}
      <div>
        <p className="text-amber-400 text-xs uppercase tracking-[0.3em] mb-3">Yangi hisob</p>
        <h1 className="font-display text-5xl text-gray-900 dark:text-white mb-2">Ro'yxatdan o'ting</h1>
        <p className="text-gray-500 dark:text-gray-400 text-sm mb-8">
          Allaqachon hisobingiz bormi?{' '}
          <Link to="/login" className="text-amber-400 hover:text-amber-300 transition-colors">Kirish →</Link>
        </p>

        <div className="space-y-4">

          {/* Name */}
          <div>
            <label className="text-gray-500 dark:text-gray-400 text-xs mb-1 block">To'liq ism *</label>
            <input
              className={`px-4 py-3 text-sm rounded-none ${errors.name ? 'input-error' : ''}`}
              placeholder="Ismingiz va familiyangiz"
              value={form.name}
              onChange={e => { setForm({ ...form, name: e.target.value }); setErrors({ ...errors, name: '' }) }}
            />
            {errors.name && <p className="text-red-400 text-xs mt-1">{errors.name}</p>}
          </div>

          {/* Phone + Email */}
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="text-gray-500 dark:text-gray-400 text-xs mb-1 block">Telefon *</label>
              <input
                className={`px-4 py-3 text-sm rounded-none ${errors.phone ? 'input-error' : ''}`}
                placeholder="+998 90 000 00 00"
                value={form.phone}
                onChange={e => { setForm({ ...form, phone: e.target.value }); setErrors({ ...errors, phone: '' }) }}
              />
              {errors.phone && <p className="text-red-400 text-xs mt-1">{errors.phone}</p>}
            </div>
            <div>
              <label className="text-gray-500 dark:text-gray-400 text-xs mb-1 block">Email *</label>
              <input
                className={`px-4 py-3 text-sm rounded-none ${errors.email ? 'input-error' : ''}`}
                placeholder="email@mail.com"
                type="email"
                value={form.email}
                onChange={e => { setForm({ ...form, email: e.target.value }); setErrors({ ...errors, email: '' }) }}
              />
              {errors.email && <p className="text-red-400 text-xs mt-1">{errors.email}</p>}
            </div>
          </div>

          {/* Password */}
          <div>
            <label className="text-gray-500 dark:text-gray-400 text-xs mb-1 block">Parol *</label>
            <div className="relative">
              <input
                className={`px-4 py-3 text-sm rounded-none pr-10 ${errors.password ? 'input-error' : ''}`}
                placeholder="Kamida 6 ta belgi"
                type={showPass ? 'text' : 'password'}
                value={form.password}
                onChange={e => { setForm({ ...form, password: e.target.value }); setErrors({ ...errors, password: '' }) }}
              />
              <button type="button" onClick={() => setShowPass(!showPass)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-amber-400 transition-colors">
                {showPass ? <FiEyeOff size={15} /> : <FiEye size={15} />}
              </button>
            </div>

            {/* Strength bar */}
            {form.password.length > 0 && (
              <div className="mt-2 flex items-center gap-2">
                <div className="flex gap-1 flex-1">
                  {[1, 2, 3].map(i => (
                    <div key={i} className={`h-1 flex-1 transition-all duration-300 ${i <= strength ? strengthColor[strength] : 'bg-gray-300 dark:bg-white/10'}`} />
                  ))}
                </div>
                <span className={`text-xs ${strength === 1 ? 'text-red-400' : strength === 2 ? 'text-amber-400' : 'text-green-400'}`}>
                  {strengthLabel[strength]}
                </span>
              </div>
            )}
            {errors.password && <p className="text-red-400 text-xs mt-1">{errors.password}</p>}
          </div>

          {/* Confirm password */}
          <div>
            <label className="text-gray-500 dark:text-gray-400 text-xs mb-1 block">Parolni tasdiqlang *</label>
            <div className="relative">
              <input
                className={`px-4 py-3 text-sm rounded-none pr-10 ${errors.confirm ? 'input-error' : ''}`}
                placeholder="Parolni qayta kiriting"
                type={showConfirm ? 'text' : 'password'}
                value={form.confirm}
                onChange={e => { setForm({ ...form, confirm: e.target.value }); setErrors({ ...errors, confirm: '' }) }}
              />
              <button type="button" onClick={() => setShowConfirm(!showConfirm)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-amber-400 transition-colors">
                {showConfirm ? <FiEyeOff size={15} /> : <FiEye size={15} />}
              </button>
            </div>
            {errors.confirm && <p className="text-red-400 text-xs mt-1">{errors.confirm}</p>}
          </div>

          {/* Agreement */}
          <div>
            <label className="flex items-start gap-3 cursor-pointer">
              <div
                className={`w-4 h-4 mt-0.5 border flex-shrink-0 flex items-center justify-center transition-colors ${agreed ? 'bg-amber-400 border-amber-400' : errors.agreed ? 'border-red-500' : 'border-gray-300 dark:border-gray-600'}`}
                onClick={() => { setAgreed(!agreed); setErrors({ ...errors, agreed: '' }) }}
              >
                {agreed && <span className="text-gray-950 text-[10px] font-bold">✓</span>}
              </div>
              <span className="text-gray-500 dark:text-gray-400 text-xs leading-relaxed">
                <span className="text-amber-400 cursor-pointer">Foydalanish shartlari</span> va{' '}
                <span className="text-amber-400 cursor-pointer">Maxfiylik siyosati</span> bilan tanishdim va roziman.
              </span>
            </label>
            {errors.agreed && <p className="text-red-400 text-xs mt-1 ml-7">{errors.agreed}</p>}
          </div>

          {/* Submit */}
          <button
            onClick={handleSubmit}
            className="w-full bg-amber-400 text-gray-900 dark:text-gray-900 font-semibold py-4 text-sm uppercase tracking-widest hover:bg-amber-300 transition-colors mt-2"
          >
            Hisob yaratish →
          </button>

          {/* Divider */}
          <div className="flex items-center gap-3">
            <div className="flex-1 h-px bg-gray-300 dark:bg-white/10" />
            <span className="text-gray-600 dark:text-gray-400 text-xs">yoki</span>
            <div className="flex-1 h-px bg-gray-300 dark:bg-white/10" />
          </div>

          {/* Social login */}
          <div className="grid grid-cols-2 gap-3">
            <button className="flex items-center justify-center gap-2 border border-gray-300 dark:border-white/10 bg-gray-100 dark:bg-gray-800 py-3 text-xs text-gray-900 dark:text-gray-300 hover:border-gray-400 hover:text-white transition-all">
              <span>🇬</span> Google
            </button>
            <button className="flex items-center justify-center gap-2 border border-gray-300 dark:border-white/10 bg-gray-100 dark:bg-gray-800 py-3 text-xs text-gray-900 dark:text-gray-300 hover:border-gray-400 hover:text-white transition-all">
              <span><FaTelegramPlane /></span> Telegram
            </button>
          </div>

        </div>
      </div>

      {/* RIGHT — Benefits */}
      <div className="lg:pt-16">
        <div className="bg-gray-100 dark:bg-gray-800 border border-gray-200 dark:border-white/10 p-8">
          <p className="text-amber-400 text-xs uppercase tracking-widest mb-6">Hisob afzalliklari</p>
          <div className="space-y-5">
            {[
              { icon: '🛍️', title: 'Tez xarid', desc: "Har safar ma'lumot kiritmasdan, bir bosish bilan buyurtma bering." },
              { icon: '📦', title: 'Buyurtmalarni kuzatish', desc: "Buyurtmangiz holatini real vaqtda kuzating." },
              { icon: '♥', title: 'Sevimlilar ro\'yxati', desc: "Yoqtirgan mahsulotlaringizni saqlang, keyinroq xarid qiling." },
              { icon: '🎁', title: 'Maxsus takliflar', desc: "Faqat a'zolar uchun chegirmalar va aksiyalar." },
              { icon: '🔔', title: 'Narx tushishi bildirishnomasi', desc: "Narx tushganda avtomatik xabardor bo'ling." },
            ].map((b, i) => (
              <div key={i} className="flex gap-4 items-start">
                <div className="text-xl flex-shrink-0 mt-0.5">{b.icon}</div>
                <div>
                  <p className="text-gray-900 dark:text-white text-sm font-medium">{b.title}</p>
                  <p className="text-gray-500 dark:text-gray-400 text-xs mt-0.5 leading-relaxed">{b.desc}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-8 border-t border-gray-200 dark:border-white/10 pt-6 flex items-center gap-3">
            <div className="flex -space-x-2">
              {['women/55', 'men/41', 'women/33', 'men/32'].map((p, i) => (
                <img key={i} src={`https://randomuser.me/api/portraits/${p}.jpg`} className="w-8 h-8 rounded-full object-cover border-2 border-gray-100 dark:border-gray-800 grayscale" alt="" />
              ))}
            </div>
            <p className="text-gray-500 dark:text-gray-400 text-xs">
              <span className="text-gray-900 dark:text-white font-medium">12,000+</span> mijoz allaqachon a'zo
            </p>
          </div>
        </div>
      </div>

    </div>
  </div>

  <Footer />
</>
  )
}