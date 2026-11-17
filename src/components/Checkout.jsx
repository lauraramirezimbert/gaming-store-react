import React, { useState } from 'react';
import { useCart } from '../context/CartContext';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import { db } from '../firebase';
import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';

const Checkout = () => {
  const [nombre, setNombre] = useState('');
  const [telefono, setTelefono] = useState('');
  const [email, setEmail] = useState('');
  const [orderId, setOrderId] = useState(null);
  const [loading, setLoading] = useState(false);

  const { cart, clearCart, totalPrice } = useCart();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (cart.length === 0) {
      alert('Tu carrito está vacío');
      return;
    }

    setLoading(true);

  
    const order = {
      buyer: { nombre, telefono, email },
      items: cart.map(prod => ({ 
        id: prod.id, 
        title: prod.nombre || prod.title, 
        price: prod.precio || prod.price, 
        quantity: prod.quantity 
      })),
      total: typeof totalPrice === 'function' ? totalPrice() : cart.reduce((acc, item) => acc + (item.precio || item.price) * item.quantity, 0),
      date: serverTimestamp()
    };

    try {
   
      const docRef = await addDoc(collection(db, 'orders'), order);
      setOrderId(docRef.id);
      clearCart(); 
    } catch (error) {
      console.error("Error al generar la orden: ", error);
      alert('Hubo un error al procesar tu compra. Inténtalo de nuevo.');
    } finally {
      setLoading(false);
    }
  };


  if (orderId) {
    return (
      <div style={{ maxWidth: '600px', margin: '50px auto', background: '#16161a', padding: '40px', borderRadius: '10px', textAlign: 'center', color: '#fff', border: '1px solid #333' }}>
        <Helmet><title>Compra Exitosas | Gaming Store</title></Helmet>
        <h2 style={{ color: '#00ffcc', marginBottom: '20px' }}>¡Gracias por tu compra!</h2>
        <p style={{ marginBottom: '15px' }}>Tu orden ha sido registrada correctamente en Firestore.</p>
        <p style={{ fontSize: '18px', background: '#222', padding: '15px', borderRadius: '6px', margin: '20px 0', border: '1px dashed #00ffcc' }}>
          Tu ID de Orden es: <strong style={{ color: '#00ffcc' }}>{orderId}</strong>
        </p>
        <Link to="/productos" style={{ display: 'inline-block', background: '#00ffcc', color: '#121212', padding: '12px 24px', borderRadius: '6px', textDecoration: 'none', fontWeight: 'bold', marginTop: '20px' }}>
          Volver al Catálogo
        </Link>
      </div>
    );
  }

  return (
    <div style={{ maxWidth: '500px', margin: '40px auto', background: '#16161a', padding: '30px', borderRadius: '10px', border: '1px solid #333', color: '#fff' }}>
      <Helmet><title>Checkout | Gaming Store</title></Helmet>
      <h2 style={{ textAlign: 'center', color: '#00ffcc', marginBottom: '20px' }}>Finalizar Compra</h2>
      
      <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
        <div>
          <label style={{ display: 'block', marginBottom: '5px', fontSize: '14px', color: '#aaa' }}>Nombre completo</label>
          <input 
            type="text" 
            required
            value={nombre} 
            onChange={(e) => setNombre(e.target.value)}
            placeholder="Ej: Juan Pérez"
            style={{ width: '100%', padding: '10px', background: '#222', border: '1px solid #444', color: '#fff', borderRadius: '6px' }}
          />
        </div>

        <div>
          <label style={{ display: 'block', marginBottom: '5px', fontSize: '14px', color: '#aaa' }}>Teléfono</label>
          <input 
            type="tel" 
            required
            value={telefono} 
            onChange={(e) => setTelefono(e.target.value)}
            placeholder="Ej: 1123456789"
            style={{ width: '100%', padding: '10px', background: '#222', border: '1px solid #444', color: '#fff', borderRadius: '6px' }}
          />
        </div>

        <div>
          <label style={{ display: 'block', marginBottom: '5px', fontSize: '14px', color: '#aaa' }}>Correo electrónico</label>
          <input 
            type="email" 
            required
            value={email} 
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Ej: correo@ejemplo.com"
            style={{ width: '100%', padding: '10px', background: '#222', border: '1px solid #444', color: '#fff', borderRadius: '6px' }}
          />
        </div>

        <button 
          type="submit" 
          disabled={loading}
          style={{ background: '#00ffcc', color: '#121212', padding: '12px', border: 'none', borderRadius: '6px', fontWeight: 'bold', cursor: 'pointer', marginTop: '10px', fontSize: '16px' }}
        >
          {loading ? 'Generando orden...' : 'Confirmar Compra'}
        </button>
      </form>
    </div>
  );
};

export default Checkout;
