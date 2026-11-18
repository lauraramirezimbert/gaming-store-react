import { useState } from 'react';
import CartContext from './CartContextValue';

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);

  const addToCart = (item, quantity = 1) => {
    if (quantity <= 0) return;

    setCart((currentCart) => {
      const existingProduct = currentCart.find(
        (product) => product.id === item.id
      );

      if (existingProduct) {
        return currentCart.map((product) =>
          product.id === item.id
            ? { ...product, quantity: product.quantity + quantity }
            : product
        );
      }

      return [...currentCart, { ...item, quantity }];
    });
  };

  const increaseQuantity = (id) => {
    setCart((currentCart) =>
      currentCart.map((product) =>
        product.id === id
          ? { ...product, quantity: product.quantity + 1 }
          : product
      )
    );
  };

  const decreaseQuantity = (id) => {
    setCart((currentCart) =>
      currentCart
        .map((product) =>
          product.id === id
            ? { ...product, quantity: product.quantity - 1 }
            : product
        )
        .filter((product) => product.quantity > 0)
    );
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
    (acc, product) => acc + Number(product.precio) * product.quantity,
    0
  );

  return (
    <CartContext.Provider
      value={{
        cart,
        addToCart,
        increaseQuantity,
        decreaseQuantity,
        removeFromCart,
        clearCart,
        totalItems,
        totalPrice
      }}
    >
      {children}
    </CartContext.Provider>
  );
};