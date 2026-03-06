import React, { useState } from 'react'
import { FiChevronRight } from 'react-icons/fi'
import { Link } from 'react-router-dom'
import Navbar from '../Navbar'
import Footer from '../Footer'
import { FaRegCreditCard, FaRegIdCard } from 'react-icons/fa'
import { SiContactlesspayment } from 'react-icons/si'

const paymentMethods = [
  { id: 'click', name: 'Click', color: '#00AAFF', icon: '💙' },
  { id: 'payme', name: 'Payme', color: '#00C27C', icon: <SiContactlesspayment /> },
  { id: 'uzcard', name: 'Uzcard', color: '#F5A623', icon: <FaRegIdCard /> },
  { id: 'card', name: 'Karta (Visa/MC)', color: '#ffffff', icon: <FaRegCreditCard /> },
]

const cartItems = [
  { name: "Premium Kiyim To'plami", price: 285000, qty: 1, img: 'https://images.unsplash.com/photo-1523381210434-271e8be1f52b?w=100&q=80' },
  { name: 'Simsiz Quloqchin Pro', price: 540000, qty: 1, img: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=100&q=80' },
]

const DELIVERY_COST = 25000

export default function Payment() {
  const [selectedMethod, setSelectedMethod] = useState('click')
  const [form, setForm] = useState({ name: '', phone: '', address: '', city: 'toshkent', comment: '' })
  const [cardForm, setCardForm] = useState({ number: '', expiry: '', cvv: '' })
  const [step, setStep] = useState(1)
  const [agreed, setAgreed] = useState(false)

  const subtotal = cartItems.reduce((sum, i) => sum + i.price * i.qty, 0)
  const total = subtotal + DELIVERY_COST
  const formatPrice = (n) => n.toLocaleString('uz-UZ')
  const formatCardNumber = (val) => val.replace(/\D/g, '').slice(0, 16).replace(/(.{4})/g, '$1 ').trim()
  const formatExpiry = (val) => {
    const clean = val.replace(/\D/g, '').slice(0, 4)
    if (clean.length >= 3) return clean.slice(0, 2) + '/' + clean.slice(2)
    return clean
  }

  if (step === 3) {
    return (
      <>
        <Navbar />
        <div className="min-h-screen bg-[#080807] flex items-center justify-center px-4">
          <style>{`@import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@600;700&display=swap'); .font-display { font-family: 'Cormorant Garamond', serif; }`}</style>
          <div className="text-center max-w-md">
            <div className="text-6xl mb-6">✅</div>
            <h2 className="font-display text-4xl text-white mb-3">Buyurtma qabul qilindi!</h2>
            <p className="text-gray-400 mb-2">Buyurtma raqami: <span className="text-amber-400 font-bold">#TK-{Math.floor(Math.random() * 90000 + 10000)}</span></p>
            <p className="text-gray-500 text-sm mb-8">Tez orada operator siz bilan bog'lanadi va buyurtmangizni tasdiqlaydi.</p>
            <div className="bg-[#0d0c0a] border border-white/5 p-6 mb-8 text-left">
              <p className="text-gray-500 text-xs uppercase tracking-widest mb-3">Yetkazib berish</p>
              <p className="text-white text-sm">{form.address}, {form.city === 'toshkent' ? 'Toshkent' : 'Viloyat'}</p>
              <p className="text-gray-400 text-xs mt-1">{form.city === 'toshkent' ? '1 kun ichida' : '2–3 kun ichida'}</p>
            </div>
            <Link to="/">
              <button className="bg-amber-400 text-gray-950 font-semibold px-8 py-4 text-sm uppercase tracking-widest hover:bg-amber-300 transition-colors">
                Bosh sahifaga qaytish
              </button>
            </Link>
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
    className="min-h-screen bg-white dark:bg-gray-900 text-gray-900 dark:text-white"
    style={{ fontFamily: "'DM Sans', sans-serif" }}
  >
    <style>{`
      @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@600;700&family=DM+Sans:wght@300;400;500&display=swap');
      .font-display { font-family: 'Cormorant Garamond', serif; }
      input:focus, select:focus, textarea:focus { outline: none; border-color: #f59e0b; }
      input, select, textarea { 
        background: #f3f4f6; 
        border: 1px solid rgba(0,0,0,0.1); 
        color: #111827; 
        transition: border-color 0.2s; 
      }
      input::placeholder, textarea::placeholder { color: #9ca3af; }
      .dark input, .dark select, .dark textarea { 
        background: #1f1f1f; 
        border: 1px solid rgba(255,255,255,0.1); 
        color: white; 
      }
    `}</style>

    {/* Breadcrumb */}
    <div className="flex items-center cursor-pointer ml-10 pt-10 gap-1 text-xs text-gray-400 dark:text-gray-400 mb-4">
      <Link to="/">
        <span className="hover:text-gray-600 dark:hover:text-gray-200 cursor-pointer">Home</span>
      </Link>
      <FiChevronRight size={12} />
      <span className="text-gray-700 dark:text-gray-300 font-medium">Payment</span>
    </div>

    {/* Steps header */}
    <div className="border-b border-gray-200 dark:border-white/10 px-6 py-5">
      <div className="max-w-5xl mx-auto flex items-center justify-between">
        <img src="/takbir.png" alt="TakbirShop" />
        <div className="flex items-center gap-3 text-xs text-gray-500 dark:text-gray-400">
          <span className={step >= 1 ? 'text-amber-400' : ''}>① Ma'lumotlar</span>
          <span className="text-gray-700 dark:text-gray-400">—</span>
          <span className={step >= 2 ? 'text-amber-400' : ''}>② To'lov</span>
        </div>
      </div>
    </div>

    <div className="max-w-5xl mx-auto px-6 py-10 grid lg:grid-cols-5 gap-8">

      {/* LEFT — Steps */}
      <div className="lg:col-span-3 space-y-6">

        {step === 1 && (
          <>
            <div>
              <p className="text-amber-400 text-xs uppercase tracking-widest mb-4">Yetkazib berish ma'lumotlari</p>
              <div className="space-y-3">
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="text-gray-500 dark:text-gray-400 text-xs mb-1 block">Ism *</label>
                    <input
                      className="w-full px-4 py-3 text-sm rounded-none"
                      placeholder="Ismingiz"
                      value={form.name}
                      onChange={e => setForm({ ...form, name: e.target.value })}
                    />
                  </div>
                  <div>
                    <label className="text-gray-500 dark:text-gray-400 text-xs mb-1 block">Telefon *</label>
                    <input
                      className="w-full px-4 py-3 text-sm rounded-none"
                      placeholder="+998 90 000 00 00"
                      value={form.phone}
                      onChange={e => setForm({ ...form, phone: e.target.value })}
                    />
                  </div>
                </div>
                <div>
                  <label className="text-gray-500 dark:text-gray-400 text-xs mb-1 block">Shahar *</label>
                  <select
                    className="w-full px-4 py-3 text-sm rounded-none"
                    value={form.city}
                    onChange={e => setForm({ ...form, city: e.target.value })}
                  >
                    <option value="toshkent">Toshkent (1 kun)</option>
                    <option value="samarqand">Samarqand (2–3 kun)</option>
                    <option value="fargona">Farg'ona (2–3 kun)</option>
                    <option value="buxoro">Buxoro (2–3 kun)</option>
                    <option value="other">Boshqa viloyat (2–3 kun)</option>
                  </select>
                </div>
                <div>
                  <label className="text-gray-500 dark:text-gray-400 text-xs mb-1 block">Manzil *</label>
                  <input
                    className="w-full px-4 py-3 text-sm rounded-none"
                    placeholder="Ko'cha, uy, xonadon"
                    value={form.address}
                    onChange={e => setForm({ ...form, address: e.target.value })}
                  />
                </div>
                <div>
                  <label className="text-gray-500 dark:text-gray-400 text-xs mb-1 block">Izoh (ixtiyoriy)</label>
                  <textarea
                    className="w-full px-4 py-3 text-sm rounded-none resize-none"
                    rows={2}
                    placeholder="Qo'shimcha ma'lumot..."
                    value={form.comment}
                    onChange={e => setForm({ ...form, comment: e.target.value })}
                  />
                </div>
              </div>
            </div>
            <button
              onClick={() => { if (form.name && form.phone && form.address) setStep(2) }}
              className="w-full bg-amber-400 text-gray-950 font-semibold py-4 text-sm uppercase tracking-widest hover:bg-amber-300 transition-colors disabled:opacity-40"
              disabled={!form.name || !form.phone || !form.address}
            >
              To'lov usulini tanlash →
            </button>
          </>
        )}

        {step === 2 && (
          <>
            <button
              onClick={() => setStep(1)}
              className="text-gray-500 dark:text-gray-400 hover:text-amber-400 text-xs uppercase tracking-widest transition-colors"
            >
              ← Orqaga
            </button>

            <div>
              <p className="text-amber-400 text-xs uppercase tracking-widest mb-4">To'lov usulini tanlang</p>
              <div className="grid grid-cols-2 gap-3">
                {paymentMethods.map(m => (
                  <button
                    key={m.id}
                    onClick={() => setSelectedMethod(m.id)}
                    className={`p-4 border text-left transition-all duration-200 rounded-md ${
                      selectedMethod === m.id
                        ? 'border-amber-400 bg-amber-400/5'
                        : 'border-gray-300 dark:border-white/10 hover:border-white/20 bg-gray-100 dark:bg-gray-800'
                    }`}
                  >
                    <div className="text-xl mb-2">{m.icon}</div>
                    <div className="text-gray-900 dark:text-white text-sm font-medium">{m.name}</div>
                  </button>
                ))}
              </div>
            </div>

            {selectedMethod === 'card' && (
              <div className="space-y-3 border border-gray-200 dark:border-white/10 p-5 bg-gray-100 dark:bg-gray-800 rounded-md">
                <p className="text-gray-500 dark:text-gray-400 text-xs uppercase tracking-widest mb-2">Karta ma'lumotlari</p>
                <div>
                  <label className="text-gray-500 dark:text-gray-400 text-xs mb-1 block">Karta raqami</label>
                  <input
                    className="w-full px-4 py-3 text-sm rounded-none font-mono"
                    placeholder="0000 0000 0000 0000"
                    value={cardForm.number}
                    onChange={e => setCardForm({ ...cardForm, number: formatCardNumber(e.target.value) })}
                  />
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="text-gray-500 dark:text-gray-400 text-xs mb-1 block">Muddati</label>
                    <input
                      className="w-full px-4 py-3 text-sm rounded-none font-mono"
                      placeholder="MM/YY"
                      value={cardForm.expiry}
                      onChange={e => setCardForm({ ...cardForm, expiry: formatExpiry(e.target.value) })}
                    />
                  </div>
                  <div>
                    <label className="text-gray-500 dark:text-gray-400 text-xs mb-1 block">CVV</label>
                    <input
                      className="w-full px-4 py-3 text-sm rounded-none font-mono"
                      placeholder="•••"
                      maxLength={3}
                      type="password"
                      value={cardForm.cvv}
                      onChange={e => setCardForm({ ...cardForm, cvv: e.target.value.replace(/\D/g, '').slice(0, 3) })}
                    />
                  </div>
                </div>
              </div>
            )}

            {selectedMethod !== 'card' && (
              <div className="border border-gray-200 dark:border-white/10 bg-gray-100 dark:bg-gray-800 p-5 text-sm text-gray-700 dark:text-gray-300 rounded-md">
                <p className="mb-1 text-gray-900 dark:text-white text-sm">{paymentMethods.find(m => m.id === selectedMethod)?.name} orqali to'lash</p>
                <p className="text-xs">
                  Buyurtma tasdiqlangandan so'ng sizga to'lov havolasi yuborilib, {paymentMethods.find(m => m.id === selectedMethod)?.name} ilovasi orqali to'lovni amalga oshirasiz.
                </p>
              </div>
            )}

            <label className="flex items-start gap-3 cursor-pointer mt-3">
              <div
                className={`w-4 h-4 mt-0.5 border flex-shrink-0 flex items-center justify-center transition-colors ${
                  agreed ? 'bg-amber-400 border-amber-400' : 'border-gray-300 dark:border-gray-600'
                }`}
                onClick={() => setAgreed(!agreed)}
              >
                {agreed && <span className="text-gray-950 text-[10px] font-bold">✓</span>}
              </div>
              <span className="text-gray-500 dark:text-gray-400 text-xs leading-relaxed">
                <span className="text-amber-400 cursor-pointer">Foydalanish shartlari</span> va <span className="text-amber-400 cursor-pointer">Maxfiylik siyosati</span> bilan tanishdim va roziman.
              </span>
            </label>

            <button
              onClick={() => { if (agreed) setStep(3) }}
              disabled={!agreed}
              className="w-full bg-amber-400 text-gray-950 font-semibold py-4 text-sm uppercase tracking-widest hover:bg-amber-300 transition-colors disabled:opacity-40 disabled:cursor-not-allowed mt-3"
            >
              🔒 {formatPrice(total)} so'm — To'lash
            </button>

            <div className="flex items-center justify-center gap-4 text-gray-600 dark:text-gray-400 text-xs mt-2">
              <span>🔒 SSL himoyalangan</span>
              <span>·</span>
              <span>Ma'lumotlar xavfsiz</span>
            </div>
          </>
        )}
      </div>

      {/* RIGHT — Order Summary */}
      <div className="lg:col-span-2">
        <div className="bg-gray-100 dark:bg-gray-800 border border-gray-200 dark:border-white/10 p-6 sticky top-6 rounded-md">
          <p className="text-amber-400 text-xs uppercase tracking-widest mb-5">Buyurtma ({cartItems.length} mahsulot)</p>
          <div className="space-y-4 mb-5">
            {cartItems.map((item, i) => (
              <div key={i} className="flex gap-3">
                <img src={item.img} alt={item.name} className="w-14 h-14 object-cover grayscale flex-shrink-0 rounded-md" />
                <div className="flex-1 min-w-0">
                  <p className="text-gray-900 dark:text-white text-sm leading-tight truncate">{item.name}</p>
                  <p className="text-gray-500 dark:text-gray-400 text-xs mt-0.5">x{item.qty}</p>
                </div>
                <div className="text-gray-900 dark:text-white text-sm font-medium flex-shrink-0">{formatPrice(item.price)}</div>
              </div>
            ))}
          </div>
          <div className="border-t border-gray-200 dark:border-white/10 pt-4 space-y-2">
            <div className="flex justify-between text-sm text-gray-500 dark:text-gray-400">
              <span>Mahsulotlar</span>
              <span>{formatPrice(subtotal)} so'm</span>
            </div>
            <div className="flex justify-between text-sm text-gray-500 dark:text-gray-400">
              <span>Yetkazib berish</span>
              <span className="text-amber-400">{formatPrice(DELIVERY_COST)} so'm</span>
            </div>
            <div className="border-t border-gray-200 dark:border-white/10 pt-3 flex justify-between text-gray-900 dark:text-white font-semibold">
              <span>Jami</span>
              <span>{formatPrice(total)} so'm</span>
            </div>
          </div>
          <div className="mt-5 bg-gray-100 dark:bg-gray-900 p-3 border border-gray-200 dark:border-white/10 text-xs text-gray-500 dark:text-gray-400 flex gap-2 rounded-md">
            <span>🚚</span>
            <span>{form.city === 'toshkent' ? 'Toshkent — 1 kun ichida yetkaziladi' : 'Viloyat — 2–3 kun ichida yetkaziladi'}</span>
          </div>
        </div>
      </div>

    </div>
  </div>

  <Footer />
</>
  )
}