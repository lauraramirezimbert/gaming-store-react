import { useState } from 'react';
import { useCart } from '../context/CartContext';
import { Link } from 'react-router-dom';

const Cart = () => {
  const { cart, clearCart, totalPrice, totalItems } = useCart();
  const [orderId, setOrderId] = useState(null);
  const [buyer, setBuyer] = useState({ name: '', phone: '', email: '' });

  const handleInputChange = (e) => {
    setBuyer({ ...buyer, [e.target.name]: e.target.value });
  };

  const handleCheckout = (e) => {
    e.preventDefault();
    if (!buyer.name || !buyer.phone || !buyer.email) {
      alert('Por favor completa todos los campos');
      return;
    }
    // Simulamos la generación de un ID de orden aleatorio
    const generatedId = 'ORDEN-' + Math.floor(Math.random() * 1000000);
    setOrderId(generatedId);
    clearCart();
  };

  if (orderId) {
    return (
      <div style={{ textAlign: 'center', padding: '50px' }}>
        <h2>¡Gracias por tu compra!</h2>
        <p style={{ margin: '20px 0', fontSize: '18px' }}>Tu número de orden es: <strong style={{ color: '#28a745' }}>{orderId}</strong></p>
        <Link to="/" style={{ background: '#007bff', color: '#fff', padding: '10px 20px', textDecoration: 'none', borderRadius: '5px' }}>
          Volver al Inicio
        </Link>
      </div>
    );
  }

  if (totalItems === 0) {
    return (
      <div style={{ textAlign: 'center', padding: '50px' }}>
        <h2>Tu carrito está vacío</h2>
        <p style={{ color: '#666', margin: '20px 0' }}>Parece que aún no has agregado ningún producto gaming.</p>
        <Link to="/" style={{ background: '#007bff', color: '#fff', padding: '10px 20px', textDecoration: 'none', borderRadius: '5px' }}>
          Ver Productos
        </Link>
      </div>
    );
  }

  return (
    <div style={{ padding: '40px', maxWidth: '800px', margin: '0 auto' }}>
      <h2>Tu Carrito de Compras</h2>
      <div style={{ marginTop: '20px', display: 'flex', flexDirection: 'column', gap: '15px' }}>
        {cart.map((prod) => (
          <div key={prod.id} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', border: '1px solid #ddd', padding: '15px', borderRadius: '8px' }}>
            <img src={prod.imagen} alt={prod.nombre} style={{ width: '60px', height: '60px', objectFit: 'contain' }} />
            <div>
              <h4>{prod.nombre}</h4>
              <p>Cantidad: {prod.quantity}</p>
            </div>
            <p style={{ fontWeight: 'bold' }}>${prod.precio * prod.quantity}</p>
          </div>
        ))}
      </div>

      <div style={{ marginTop: '30px', display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', background: '#f9f9f9', padding: '20px', borderRadius: '8px' }}>
        <div>
          <h3>Completa tus datos para la compra:</h3>
          <form onSubmit={handleCheckout} style={{ display: 'flex', flexDirection: 'column', gap: '10px', marginTop: '10px', width: '300px' }}>
            <input type="text" name="name" placeholder="Nombre y Apellido" value={buyer.name} onChange={handleInputChange} style={{ padding: '8px', borderRadius: '4px', border: '1px solid #ccc' }} />
            <input type="text" name="phone" placeholder="Teléfono" value={buyer.phone} onChange={handleInputChange} style={{ padding: '8px', borderRadius: '4px', border: '1px solid #ccc' }} />
            <input type="email" name="email" placeholder="Correo electrónico" value={buyer.email} onChange={handleInputChange} style={{ padding: '8px', borderRadius: '4px', border: '1px solid #ccc' }} />
            <button type="submit" style={{ background: '#28a745', color: '#fff', border: 'none', padding: '10px', borderRadius: '5px', cursor: 'pointer', fontWeight: 'bold', marginTop: '5px' }}>
              Terminar Compra
            </button>
          </form>
        </div>

        <div style={{ textAlign: 'right' }}>
          <h3>Total a pagar: ${totalPrice}</h3>
          <button onClick={clearCart} style={{ background: '#dc3545', color: '#fff', border: 'none', padding: '8px 12px', borderRadius: '5px', cursor: 'pointer', marginTop: '15px' }}>
            Vaciar Carrito
          </button>
        </div>
      </div>
    </div>
  );
};

export default Cart;