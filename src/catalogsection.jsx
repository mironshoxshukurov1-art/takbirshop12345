import React from "react";
import { FiChevronLeft, FiChevronRight } from "react-icons/fi";

export default function CatalogSection() {
  const categories = [
    { name: "Soatlar", img: "/soat.png" },
    { name: "Atirlar", img: "/atir.png" },
    { name: "Ko'zoynak", img: "/achki.png" },
    { name: "Diniy buyumlar", img: "/image 14.png" },
    { name: "Suvenirlar", img: "/suviner.png" },
    { name: "Ayollar parfumeriyasi", img: "/ayollar.png" },
    { name: "Erkaklar parfumeriyasi", img: "/atir1.png" },
    { name: "Telefonlar", img: "/phone.png" },
    { name: "Ayollarparfyumeriyasi", img: "/ayollar1.png" },
  ];

  const scrollRef = React.useRef();

  const scroll = (direction) => {
    if (direction === "left") {
      scrollRef.current.scrollBy({ left: -300, behavior: "smooth" });
    } else {
      scrollRef.current.scrollBy({ left: 300, behavior: "smooth" });
    }
  };

  return (
    <section className="w-full py-12 relative">
      <div className="max-w-7xl mx-auto px-4">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
            
          <h2 className="text-[16px] ml-12 font-medium font-readex text-gray-800 leading-none tracking-normal">
            Katalog
          </h2>

          <div className="flex gap-3">
            <button
              onClick={() => scroll("left")}
              className="w-10 h-10 rounded-full bg-white shadow-md flex items-center justify-center hover:bg-gray-200 transition"
            >
              <FiChevronLeft size={20} />
            </button>
            <button
              onClick={() => scroll("right")}
              className="w-10 h-10 rounded-full bg-white shadow-md flex items-center justify-center hover:bg-gray-200 transition"
            >
              <FiChevronRight size={20} />
            </button>
          </div>
        </div>

        {/* Categories */}
        <div
          ref={scrollRef}
          className="flex gap-6 overflow-x-auto scroll-smooth no-scrollbar"
        >
          {categories.map((item, index) => (
            <div
              key={index}
              className="flex flex-col items-center min-w-[140px] cursor-pointer group"
            >
              <div className="w-[120px] h-[120px] rounded-3xl bg-white shadow-md flex items-center justify-center transition-all duration-300 group-hover:shadow-xl group-hover:-translate-y-2">
                <img
                  src={item.img}
                  alt={item.name}
                  className="w-16 h-16 object-contain"
                />
              </div>
              <p className="text-sm text-gray-700 mt-4 text-center font-medium group-hover:text-black transition">
                {item.name}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}