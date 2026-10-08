import { createContext, useState, useContext } from 'react';

const CartContext = createContext();

export const useCart = () => useContext(CartContext);

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);

  const addToCart = (item, quantity) => {
    const existingIndex = cart.findIndex((prod) => prod.id === item.id);
    if (existingIndex !== -1) {
      const updatedCart = [...cart];
      updatedCart[existingIndex].quantity += quantity;
      setCart(updatedCart);
    } else {
      setCart([...cart, { ...item, quantity }]);
    }
  };

  const clearCart = () => setCart([]);

  const totalItems = cart.reduce((acc, prod) => acc + prod.quantity, 0);
  const totalPrice = cart.reduce((acc, prod) => acc + (prod.precio * prod.quantity), 0);

  return (
    <CartContext.Provider value={{ cart, addToCart, clearCart, totalItems, totalPrice }}>
      {children}
    </CartContext.Provider>
  );
};