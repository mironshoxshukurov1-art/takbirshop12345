import React, { useContext } from "react";
import { Link } from "react-router-dom";
import {
  FiShoppingCart,
  FiMinus,
  FiPlus,
  FiTrash2,
  FiArrowLeft
} from "react-icons/fi";
import Navbar from "../Navbar";
import Footer from "../Footer";
import { MyContext } from "../context/MyContext";

export default function Savatcha() {
  const { cart, removeFromCart, updateQty } = useContext(MyContext);

  const totalPrice = cart
    .reduce((sum, item) => sum + item.price * item.qty, 0)
    .toFixed(2);

  const totalItems = cart.reduce((sum, item) => sum + item.qty, 0);

  return (
    <div className="min-h-screen bg-[#f4f3f0] flex flex-col">
      <Navbar />

      <div className="max-w-7xl mx-auto w-full px-6 py-10 flex-1">

        <div className="flex items-center gap-3 mb-8">
          <Link
            to="/Cart"
            className="w-10 h-10 rounded-xl bg-white flex items-center justify-center shadow-sm hover:bg-gray-100 transition"
          >
            <FiArrowLeft size={16} />
          </Link>

          <h1 className="text-2xl font-bold flex items-center gap-2">
            <FiShoppingCart />
            My Cart
            {totalItems > 0 && (
              <span className="text-gray-400 text-base font-normal">
                ({totalItems})
              </span>
            )}
          </h1>
        </div>

        {cart.length === 0 && (
          <div className="flex flex-col items-center justify-center py-24 text-gray-400 gap-4">
            <FiShoppingCart size={60} className="opacity-30" />
            <p className="text-lg">Savatcha bo‘sh</p>
            <Link to="/Cart">
              <button className="bg-black text-white px-6 py-3 rounded-xl hover:bg-gray-800 transition">
                Xarid qilish
              </button>
            </Link>
          </div>
        )}

        {cart.length > 0 && (
          <div className="grid lg:grid-cols-3 gap-10">

            <div className="lg:col-span-2 flex flex-col gap-4">

              {cart.map((item) => (
                <div
                  key={item.id}
                  className="bg-white rounded-xl p-4 flex items-center justify-between shadow-sm"
                >

                  <div className="flex items-center gap-4">

                    <Link to={`/product/${item.id}`}>
                      <img
                        src={item.thumbnail}
                        alt={item.title}
                        className="w-16 h-16 rounded-lg object-cover bg-gray-50"
                      />
                    </Link>

                    <div>
                      <p className="font-semibold text-gray-800">
                        {item.title}
                      </p>

                      <p className="text-sm text-gray-400">
                        ${item.price}
                      </p>
                    </div>
                  </div>


                  <div className="flex items-center gap-3">

                    <button
                      className="w-8 h-8 flex items-center justify-center border rounded-lg hover:bg-gray-100"
                      onClick={() => updateQty(item.id, item.qty - 1)}
                    >
                      <FiMinus size={14} />
                    </button>

                    <span className="font-semibold w-6 text-center">
                      {item.qty}
                    </span>

                    <button
                      className="w-8 h-8 flex items-center justify-center border rounded-lg hover:bg-gray-100"
                      onClick={() => updateQty(item.id, item.qty + 1)}
                      disabled={item.qty >= item.stock}
                    >
                      <FiPlus size={14} />
                    </button>

                    <button
                      onClick={() => removeFromCart(item.id)}
                      className="ml-3 text-red-500 hover:text-red-600"
                    >
                      <FiTrash2 size={18} />
                    </button>

                  </div>

                </div>
              ))}

            </div>

            <div className="bg-white rounded-xl p-6 shadow-sm h-fit sticky top-6">

              <h2 className="text-lg font-bold mb-5">
                Order Summary
              </h2>

              <div className="flex justify-between text-sm mb-3">
                <span className="text-gray-500">
                  Items
                </span>
                <span className="font-medium">
                  {totalItems}
                </span>
              </div>

              <div className="flex justify-between text-sm mb-5">
                <span className="text-gray-500">
                  Total
                </span>
                <span className="font-bold text-lg">
                  ${totalPrice}
                </span>
              </div>

              <Link to="/payment">
                <button className="w-full bg-green-500 text-white py-3 rounded-xl font-semibold hover:bg-green-600 transition">
                  Checkout
                </button>
              </Link>

              <button
                className="w-full mt-3 border py-3 rounded-xl text-gray-500 hover:bg-gray-50"
              >
                Clear cart
              </button>

              <Link to="/Cart">
                <button className="w-full mt-3 border py-3 rounded-xl text-gray-500 hover:bg-gray-50">
                  Continue shopping
                </button>
              </Link>

            </div>

          </div>
        )}
      </div>

      <Footer />
    </div>
  );
}