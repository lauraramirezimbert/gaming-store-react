import React from 'react';
import { useCart } from '../context/CartContext';
import { Link } from 'react-router-dom';

const Cart = () => {
  const { cart, clearCart, removeItem, addToCart, totalPrice } = useCart();

  // Función para restar cantidad (o eliminar si llega a 1)
  const handleDecrease = (producto) => {
    if (producto.quantity > 1) {
      // Si tiene más de 1, restamos pasando -1 o actualizando
      addToCart(producto, -1);
    } else {
      removeItem(producto.id);
    }
  };

  if (cart.length === 0) {
    return (
      <div style={{ textAlign: 'center', padding: '80px 20px' }}>
        <h2>Tu carrito está vacío 🛒</h2>
        <p style={{ color: '#666', margin: '15px 0' }}>¡Explorá nuestro catálogo y sumá tus productos preferidos!</p>
        <Link 
          to="/" 
          style={{ background: '#007bff', color: '#fff', padding: '10px 20px', textDecoration: 'none', borderRadius: '5px', fontWeight: 'bold', display: 'inline-block' }}
        >
          Volver al catálogo
        </Link>
      </div>
    );
  }

  return (
    <div style={{ padding: '40px 20px', maxWidth: '850px', margin: '0 auto' }}>
      <h2 style={{ marginBottom: '30px', textAlign: 'center', color: '#333' }}>Tu Carrito de Compras</h2>
      
      <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
        {cart.map((producto) => (
          <div 
            key={producto.id} 
            style={{ 
              display: 'flex', 
              justifyContent: 'space-between', 
              alignItems: 'center', 
              background: '#fff', 
              padding: '15px 20px', 
              borderRadius: '8px', 
              boxShadow: '0 2px 10px rgba(0,0,0,0.05)' 
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
              <img 
                src={producto.imagen} 
                alt={producto.nombre} 
                style={{ width: '70px', height: '70px', objectFit: 'contain', borderRadius: '6px', border: '1px solid #eee' }} 
              />
              <div>
                <h4 style={{ margin: '0 0 5px 0', color: '#333', fontSize: '18px' }}>{producto.nombre}</h4>
                <p style={{ margin: '0 0 10px 0', color: '#666', fontSize: '14px' }}>Precio unitario: ${producto.precio}</p>
                
                {/* Controles de cantidad (+ / -) */}
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                  <button 
                    onClick={() => handleDecrease(producto)}
                    style={{ background: '#e9ecef', border: '1px solid #ced4da', width: '28px', height: '28px', borderRadius: '4px', cursor: 'pointer', fontWeight: 'bold' }}
                  >
                    -
                  </button>
                  <span style={{ fontWeight: '600', minWidth: '20px', textAlign: 'center' }}>{producto.quantity}</span>
                  <button 
                    onClick={() => addToCart(producto, 1)}
                    style={{ background: '#e9ecef', border: '1px solid #ced4da', width: '28px', height: '28px', borderRadius: '4px', cursor: 'pointer', fontWeight: 'bold' }}
                  >
                    +
                  </button>
                </div>
              </div>
            </div>

            <div style={{ textAlign: 'right', display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: '10px' }}>
              <p style={{ fontWeight: 'bold', fontSize: '18px', color: '#2575fc', margin: '0' }}>
                ${producto.precio * producto.quantity}
              </p>
              <button 
                onClick={() => removeItem(producto.id)}
                style={{ background: 'transparent', color: '#dc3545', border: 'none', cursor: 'pointer', fontSize: '13px', textDecoration: 'underline' }}
              >
                Eliminar producto
              </button>
            </div>
          </div>
        ))}
      </div>

      <div style={{ 
        marginTop: '30px', 
        background: '#fff', 
        padding: '25px', 
        borderRadius: '8px', 
        boxShadow: '0 2px 10px rgba(0,0,0,0.05)', 
        display: 'flex', 
        justifyContent: 'space-between', 
        alignItems: 'center' 
      }}>
        <div>
          <h3 style={{ margin: '0', color: '#333' }}>
            Total a pagar: <span style={{ color: '#28a745' }}>${totalPrice}</span>
          </h3>
        </div>

        <div style={{ display: 'flex', gap: '15px' }}>
          <button 
            onClick={clearCart}
            style={{ background: '#6c757d', color: '#fff', border: 'none', padding: '10px 20px', borderRadius: '5px', cursor: 'pointer', fontWeight: '600' }}
          >
            Vaciar Carrito
          </button>
          
          <Link 
            to="/checkout"
            style={{ background: '#28a745', color: '#fff', padding: '10px 20px', textDecoration: 'none', borderRadius: '5px', fontWeight: '600', display: 'inline-block' }}
          >
            Finalizar Compra
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Cart;