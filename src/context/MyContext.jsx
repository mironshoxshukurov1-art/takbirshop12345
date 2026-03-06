import { createContext, useState } from "react";

export const MyContext = createContext();

export function MyProvider({ children }) {
  const [cart, setCart] = useState([]);

  const addToCart = (product) => {
    setCart((prev) => {
      const ex = prev.find((i) => i.id === product.id);
      if (ex) return prev.map((i) =>
        i.id === product.id ? { ...i, qty: i.qty + 1 } : i
      );
      return [...prev, { ...product, qty: 1 }];
    });
  };

  const removeFromCart = (id) => {
    setCart((prev) => prev.filter((i) => i.id !== id));
  };

  const updateQty = (id, qty) => {
    if (qty < 1) return removeFromCart(id);
    setCart((prev) => prev.map((i) => (i.id === id ? { ...i, qty } : i)));
  };

  return (
    <MyContext.Provider value={{
      cart, addToCart, removeFromCart, updateQty
    }}>
      {children}
    </MyContext.Provider>
  );
}