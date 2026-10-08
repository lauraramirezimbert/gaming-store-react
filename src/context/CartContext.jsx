import { createContext, useState, useContext } from 'react';

const CartContext = createContext();

export const useCart = () => useContext(CartContext);

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);

  const addToCart = (item, quantity) => {
    setCart((currentCart) => {
      const existingProduct = currentCart.find(
        (product) => product.id === item.id
      );

      if (existingProduct) {
        return currentCart.map((product) =>
          product.id === item.id
            ? {
                ...product,
                quantity: product.quantity + quantity,
              }
            : product
        );
      }

      return [
        ...currentCart,
        {
          ...item,
          quantity,
        },
      ];
    });
  };

  const removeFromCart = (id) => {
    setCart((currentCart) =>
      currentCart.filter((product) => product.id !== id)
    );
  };

  const clearCart = () => {
    setCart([]);
  };

  const totalItems = cart.reduce(
    (acc, product) => acc + product.quantity,
    0
  );

  const totalPrice = cart.reduce(
    (acc, product) => acc + product.precio * product.quantity,
    0
  );

  return (
    <CartContext.Provider
      value={{
        cart,
        addToCart,
        removeFromCart,
        clearCart,
        totalItems,
        totalPrice,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};