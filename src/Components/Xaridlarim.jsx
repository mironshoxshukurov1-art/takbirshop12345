import React, { useContext } from "react";
import { MyContext } from "../context/MyContext";
import { FcLike } from "react-icons/fc";

export default function Xaridlarim() {
  const { favorites, purchases } = useContext(MyContext);

  return (
    <div className="max-w-6xl mx-auto py-10">

      <h1 className="text-2xl font-bold mb-6">
        Xaridlarim
      </h1>

      <h2 className="text-lg font-semibold mb-4">
       <FcLike /> Yoqtirgan mahsulotlar
      </h2>

      <div className="grid grid-cols-4 gap-4 mb-10">
        {favorites.map((p) => (
          <div key={p.id} className="bg-white p-3 rounded-xl shadow">
            <img src={p.thumbnail} className="h-40 w-full object-cover" />
            <p className="text-sm mt-2 font-semibold">
              {p.title}
            </p>
          </div>
        ))}
      </div>

      <h2 className="text-lg font-semibold mb-4">
        🛒 Savatga qo‘shilganlar
      </h2>

      <div className="grid grid-cols-4 gap-4">
        {purchases.map((p) => (
          <div key={p.id} className="bg-white p-3 rounded-xl shadow">
            <img src={p.thumbnail} className="h-40 w-full object-cover" />
            <p className="text-sm mt-2 font-semibold">
              {p.title}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}