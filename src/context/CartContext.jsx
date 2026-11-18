
import { useState } from 'react';
import CartContext from './CartContextValue';

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);

  const addToCart = (item, quantity = 1) => {
    if (quantity <= 0) return;

    setCart((currentCart) => {
      const stock = Number(item.stock ?? 10);

      const existingProduct = currentCart.find(
        (product) => product.id === item.id
      );

      if (existingProduct) {
        return currentCart.map((product) =>
          product.id === item.id
            ? {
                ...product,
                stock,
                quantity: Math.min(
                  product.quantity + quantity,
                  stock
                )
              }
            : product
        );
      }

      return [
        ...currentCart,
        {
          ...item,
          stock,
          quantity: Math.min(quantity, stock)
        }
      ];
    });
  };

  const increaseQuantity = (id) => {
    setCart((currentCart) =>
      currentCart.map((product) => {
        if (product.id !== id) return product;

        const stock = Number(product.stock ?? 10);

        return {
          ...product,
          quantity: Math.min(product.quantity + 1, stock)
        };
      })
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
