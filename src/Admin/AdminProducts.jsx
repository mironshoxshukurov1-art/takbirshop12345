import axios from "axios";
import React, { useContext, useState } from "react";
import { FaPlus, FaBox } from "react-icons/fa";
import { IoClose, IoSave } from "react-icons/io5";
import { MdDelete, MdEdit } from "react-icons/md";
import { MyContext } from "../context/MyContext";

export default function AdminProducts() {
  const { products: data, addProduct, deleteProduct, updateProduct } = useContext(MyContext);

  const [modal, setModal] = useState(false);
  const [editModal, setEditModal] = useState(false);
  const [title, setTitle] = useState("");
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState("");
  const [desc, setDesc] = useState("");
  const [img, setImg] = useState("");
  const [deleteModal, setDeleteModal] = useState(false);
  const [selectedId, setSelectedId] = useState(null);
  const [editId, setEditId] = useState(null);
  const [search, setSearch] = useState("");
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);

  const handleDelete = async (id) => {
    await deleteProduct(id);
    setDeleteModal(false);
  };

  const postData = async () => {
    await addProduct({ title, price, category, description: desc, image: img });
    setModal(false);
    clearForm();
  };

  const openEditModal = (product) => {
    setEditId(product.id);
    setTitle(product.title);
    setPrice(product.price);
    setCategory(product.category);
    setDesc(product.description);
    setImg(product.image);
    setEditModal(true);
  };

  const handleUpdate = async () => {
    await updateProduct(editId, { title, price, category, description: desc, image: img });
    setEditModal(false);
    clearForm();
  };

  const clearForm = () => {
    setTitle(""); setPrice(""); setCategory(""); setDesc(""); setImg("");
  };

  const filtered = data?.filter(p =>
    p.title?.toLowerCase().includes(search.toLowerCase()) ||
    p.category?.toLowerCase().includes(search.toLowerCase())
  );

  const inputClass = `
    w-full px-3 sm:px-4 py-2 sm:py-2.5 rounded-xl border border-gray-200 bg-gray-50
    text-sm text-gray-800 placeholder:text-gray-400
    focus:outline-none focus:border-indigo-400 focus:bg-white
    transition-all duration-200
  `;

  const ModalForm = ({ onSave, saveLabel, saveColor }) => (
    <div className="flex flex-col gap-3">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        <div>
          <label className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-1 block">Nomi</label>
          <input value={title} onChange={e => setTitle(e.target.value)} className={inputClass} placeholder="iPhone 15 Pro..." />
        </div>
        <div>
          <label className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-1 block">Narxi ($)</label>
          <input value={price} onChange={e => setPrice(e.target.value)} className={inputClass} placeholder="999" type="number" />
        </div>
      </div>
      <div>
        <label className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-1 block">Kategoriya</label>
        <input value={category} onChange={e => setCategory(e.target.value)} className={inputClass} placeholder="smartphones..." />
      </div>
      <div>
        <label className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-1 block">Tavsif</label>
        <textarea value={desc} onChange={e => setDesc(e.target.value)} rows={3} className={inputClass + " resize-none"} placeholder="Mahsulot haqida..." />
      </div>
      <div>
        <label className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-1 block">Rasm URL</label>
        <input value={img} onChange={e => setImg(e.target.value)} className={inputClass} placeholder="https://..." />
        {img && (
          <img src={img} alt="preview" className="mt-2 h-16 sm:h-20 w-full object-cover rounded-xl border border-gray-200" onError={e => e.target.style.display = 'none'} />
        )}
      </div>
      <button
        onClick={onSave}
        className={`w-full flex items-center justify-center gap-2 py-2.5 sm:py-3 rounded-xl text-white text-sm font-semibold mt-1 transition-all duration-200 hover:opacity-90 active:scale-95 ${saveColor}`}
      >
        <IoSave size={16} />
        {saveLabel}
      </button>
    </div>
  );

  // Mobile product card view
  const MobileProductCard = ({ product, index }) => (
    <div className="bg-white border border-gray-200 rounded-xl p-4 mb-3 fade-in">
      <div className="flex gap-3">
        {/* Image */}
        <div className="flex-shrink-0">
          {product.image || product.thumbnail ? (
            <img
              src={product.image || product.thumbnail}
              alt={product.title}
              className="w-16 h-16 object-cover rounded-lg border border-gray-200"
              onError={e => { e.target.style.display = 'none' }}
            />
          ) : (
            <div className="w-16 h-16 bg-gray-100 rounded-lg flex items-center justify-center text-gray-300 text-lg">📷</div>
          )}
        </div>

        {/* Content */}
        <div className="flex-1 min-w-0">
          <div className="flex items-start justify-between gap-2">
            <div>
              <h3 className="text-sm font-semibold text-gray-900 line-clamp-1">{product.title}</h3>
              <p className="text-xs text-gray-400 mt-0.5">#{index + 1}</p>
            </div>
            <span className="text-sm font-bold text-indigo-600 whitespace-nowrap">${product.price}</span>
          </div>

          <div className="mt-2 flex flex-wrap gap-2 items-center">
            <span className="text-xs bg-indigo-50 text-indigo-600 font-semibold px-2 py-0.5 rounded-full capitalize">
              {product.category}
            </span>
          </div>

          <p className="text-xs text-gray-400 mt-2 line-clamp-2">{product.description}</p>

          {/* Actions */}
          <div className="flex items-center justify-end gap-2 mt-3 pt-2 border-t border-gray-100">
            <button
              onClick={() => openEditModal(product)}
              className="px-3 py-1.5 rounded-lg bg-indigo-50 hover:bg-indigo-100 flex items-center gap-1.5 transition-colors"
            >
              <MdEdit size={14} className="text-indigo-600" />
              <span className="text-xs font-medium text-indigo-600">Tahrirlash</span>
            </button>
            <button
              onClick={() => { setSelectedId(product.id); setDeleteModal(true); }}
              className="px-3 py-1.5 rounded-lg bg-red-50 hover:bg-red-100 flex items-center gap-1.5 transition-colors"
            >
              <MdDelete size={14} className="text-red-500" />
              <span className="text-xs font-medium text-red-500">O'chirish</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50 p-3 sm:p-6">
      <style>{`
        @keyframes fadeIn { from { opacity:0; transform:translateY(10px) } to { opacity:1; transform:translateY(0) } }
        .fade-in { animation: fadeIn 0.25s ease both; }
        @keyframes modalIn { from { opacity:0; transform:scale(0.95) } to { opacity:1; transform:scale(1) } }
        .modal-in { animation: modalIn 0.2s ease both; }
      `}</style>

      {/* Header */}
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6 sm:mb-8">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-indigo-600 rounded-xl flex items-center justify-center flex-shrink-0">
              <FaBox size={16} className="text-white" />
            </div>
            <div>
              <h1 className="text-lg sm:text-xl font-bold text-gray-900">Mahsulotlar</h1>
              <p className="text-xs text-gray-400">{data?.length || 0} ta mahsulot</p>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-3">
            <div className="relative w-full sm:w-auto">
              <input
                value={search}
                onChange={e => setSearch(e.target.value)}
                placeholder="Qidirish..."
                className="w-full sm:w-56 px-4 py-2 rounded-xl border border-gray-200 bg-white text-sm focus:outline-none focus:border-indigo-400 transition-all"
              />
            </div>
            <button
              onClick={() => { clearForm(); setModal(true); }}
              className="flex items-center justify-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-xl text-sm font-semibold transition-all duration-200 active:scale-95 w-full sm:w-auto"
            >
              <FaPlus size={12} />
              Qo'shish
            </button>
          </div>
        </div>

        {/* Desktop Table View - Hidden on mobile */}
        <div className="hidden lg:block bg-white rounded-2xl border border-gray-200 overflow-hidden shadow-sm">
          {/* Table Header */}
          <div className="grid grid-cols-12 bg-gray-50 border-b border-gray-200 px-4">
            <div className="col-span-1 py-3 text-xs font-semibold text-gray-400 uppercase tracking-wide">#</div>
            <div className="col-span-1 py-3 text-xs font-semibold text-gray-400 uppercase tracking-wide">Rasm</div>
            <div className="col-span-3 py-3 text-xs font-semibold text-gray-400 uppercase tracking-wide">Nomi</div>
            <div className="col-span-1 py-3 text-xs font-semibold text-gray-400 uppercase tracking-wide">Narx</div>
            <div className="col-span-2 py-3 text-xs font-semibold text-gray-400 uppercase tracking-wide">Kategoriya</div>
            <div className="col-span-3 py-3 text-xs font-semibold text-gray-400 uppercase tracking-wide">Tavsif</div>
            <div className="col-span-1 py-3 text-xs font-semibold text-gray-400 uppercase tracking-wide text-center">Amal</div>
          </div>

          {/* Rows */}
          {filtered?.length === 0 ? (
            <div className="text-center py-16 text-gray-400">
              <div className="text-4xl mb-2">📦</div>
              <p className="text-sm">Mahsulot topilmadi</p>
            </div>
          ) : (
            filtered?.map((product, index) => (
              <div
                key={product.id}
                className="fade-in grid grid-cols-12 px-4 border-b border-gray-100 hover:bg-indigo-50/40 transition-colors duration-150 items-center"
              >
                <div className="col-span-1 py-3 text-sm text-gray-400 font-medium">{index + 1}</div>
                <div className="col-span-1 py-3">
                  {product.image || product.thumbnail ? (
                    <img
                      src={product.image || product.thumbnail}
                      alt={product.title}
                      className="w-10 h-10 object-cover rounded-lg border border-gray-200"
                      onError={e => { e.target.style.display = 'none' }}
                    />
                  ) : (
                    <div className="w-10 h-10 bg-gray-100 rounded-lg flex items-center justify-center text-gray-300 text-xs">📷</div>
                  )}
                </div>
                <div className="col-span-3 py-3 pr-3">
                  <p className="text-sm font-semibold text-gray-800 line-clamp-1">{product.title}</p>
                </div>
                <div className="col-span-1 py-3">
                  <span className="text-sm font-bold text-indigo-600">${product.price}</span>
                </div>
                <div className="col-span-2 py-3 pr-2">
                  <span className="text-xs bg-indigo-50 text-indigo-600 font-semibold px-2.5 py-1 rounded-full capitalize">
                    {product.category}
                  </span>
                </div>
                <div className="col-span-3 py-3 pr-3">
                  <p className="text-xs text-gray-400 line-clamp-2 leading-relaxed">{product.description}</p>
                </div>
                <div className="col-span-1 py-3 flex items-center justify-center gap-1.5">
                  <button
                    onClick={() => openEditModal(product)}
                    className="w-8 h-8 rounded-lg bg-indigo-50 hover:bg-indigo-100 flex items-center justify-center transition-colors"
                    title="Tahrirlash"
                  >
                    <MdEdit size={15} className="text-indigo-600" />
                  </button>
                  <button
                    onClick={() => { setSelectedId(product.id); setDeleteModal(true); }}
                    className="w-8 h-8 rounded-lg bg-red-50 hover:bg-red-100 flex items-center justify-center transition-colors"
                    title="O'chirish"
                  >
                    <MdDelete size={15} className="text-red-500" />
                  </button>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Mobile/Tablet Card View - Visible on medium screens and below */}
        <div className="lg:hidden">
          {filtered?.length === 0 ? (
            <div className="text-center py-16 text-gray-400 bg-white rounded-2xl border border-gray-200">
              <div className="text-4xl mb-2">📦</div>
              <p className="text-sm">Mahsulot topilmadi</p>
            </div>
          ) : (
            filtered?.map((product, index) => (
              <MobileProductCard key={product.id} product={product} index={index} />
            ))
          )}
        </div>
      </div>

      {/* Delete Modal */}
      {deleteModal && (
        <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="modal-in bg-white rounded-2xl p-5 sm:p-6 w-full max-w-sm mx-4 shadow-2xl">
            <div className="w-10 h-10 sm:w-12 sm:h-12 bg-red-100 rounded-xl flex items-center justify-center mx-auto mb-4">
              <MdDelete size={18} className="text-red-500" />
            </div>
            <h2 className="text-sm sm:text-base font-bold text-gray-800 text-center mb-1">O'chirishni tasdiqlang</h2>
            <p className="text-xs sm:text-sm text-gray-400 text-center mb-5">Bu mahsulot butunlay o'chib ketadi</p>
            <div className="flex flex-col sm:flex-row gap-2">
              <button
                className="w-full sm:flex-1 py-2.5 rounded-xl border border-gray-200 text-gray-600 text-sm font-medium hover:bg-gray-50 transition-colors order-2 sm:order-1"
                onClick={() => setDeleteModal(false)}
              >
                Bekor
              </button>
              <button
                className="w-full sm:flex-1 py-2.5 rounded-xl bg-red-500 hover:bg-red-600 text-white text-sm font-semibold transition-colors order-1 sm:order-2"
                onClick={() => handleDelete(selectedId)}
              >
                O'chirish
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Add Modal */}
      {modal && (
        <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-end sm:items-center justify-center z-50 p-0 sm:p-4">
          <div className="modal-in bg-white rounded-t-2xl sm:rounded-2xl shadow-2xl w-full max-w-lg max-h-[90vh] overflow-y-auto sm:mx-4">
            <div className="flex items-center justify-between p-4 sm:p-5 border-b border-gray-100 sticky top-0 bg-white z-10">
              <div className="flex items-center gap-2">
                <div className="w-7 h-7 bg-indigo-600 rounded-lg flex items-center justify-center">
                  <FaPlus size={11} className="text-white" />
                </div>
                <h2 className="text-sm sm:text-base font-bold text-gray-900">Yangi mahsulot</h2>
              </div>
              <button onClick={() => setModal(false)} className="w-8 h-8 rounded-lg bg-gray-100 hover:bg-gray-200 flex items-center justify-center transition-colors">
                <IoClose size={16} className="text-gray-500" />
              </button>
            </div>
            <div className="p-4 sm:p-5">
              <ModalForm onSave={postData} saveLabel="Saqlash" saveColor="bg-indigo-600 hover:bg-indigo-700" />
            </div>
          </div>
        </div>
      )}

      {/* Edit Modal */}
      {editModal && (
        <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-end sm:items-center justify-center z-50 p-0 sm:p-4">
          <div className="modal-in bg-white rounded-t-2xl sm:rounded-2xl shadow-2xl w-full max-w-lg max-h-[90vh] overflow-y-auto sm:mx-4">
            <div className="flex items-center justify-between p-4 sm:p-5 border-b border-gray-100 sticky top-0 bg-white z-10">
              <div className="flex items-center gap-2">
                <div className="w-7 h-7 bg-amber-500 rounded-lg flex items-center justify-center">
                  <MdEdit size={13} className="text-white" />
                </div>
                <h2 className="text-sm sm:text-base font-bold text-gray-900">Tahrirlash</h2>
              </div>
              <button onClick={() => setEditModal(false)} className="w-8 h-8 rounded-lg bg-gray-100 hover:bg-gray-200 flex items-center justify-center transition-colors">
                <IoClose size={16} className="text-gray-500" />
              </button>
            </div>
            <div className="p-4 sm:p-5">
              <ModalForm onSave={handleUpdate} saveLabel="Yangilash" saveColor="bg-amber-500 hover:bg-amber-600" />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}