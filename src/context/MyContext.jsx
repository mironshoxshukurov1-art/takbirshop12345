import { createContext, useState, useEffect } from "react";
import axios from "axios";

export const MyContext = createContext();

export function MyProvider({ children }) {
  const [cart, setCart] = useState([]);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  const getProducts = async () => {
    try {
      const res = await axios.get("http://localhost:3000/products");
      setProducts(res.data);
    } catch (e) {
      console.log(e);
    } finally {
      setLoading(false);
    }
  };

  const addProduct = async (productData) => {
    await axios.post("http://localhost:3000/products", productData);
    getProducts();
  };

  const deleteProduct = async (id) => {
    await axios.delete(`http://localhost:3000/products/${id}`);
    setProducts(prev => prev.filter(p => p.id !== id)); 
  };

  const updateProduct = async (id, productData) => {
    await axios.put(`http://localhost:3000/products/${id}`, productData);
    getProducts();
  };

  useEffect(() => {
    getProducts();
  }, []);

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
      cart, addToCart, removeFromCart, updateQty,
      products, loading, addProduct, deleteProduct, updateProduct  
    }}>
      {children}
    </MyContext.Provider>
  );
}