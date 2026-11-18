

import { useState } from 'react';
import { useCart } from '../context/useCart';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import { db } from '../firebase';
import { Link } from 'react-router-dom';
import { Container, Row, Col } from 'react-bootstrap';
import { ShoppingBag, User, Phone, Mail, ShieldCheck, CheckCircle2, ArrowRight, ShoppingCart } from 'lucide-react';
import PageMeta from './PageMeta';

const Checkout = () => {
  const [nombre, setNombre] = useState('');
  const [telefono, setTelefono] = useState('');
  const [email, setEmail] = useState('');
  const [orderId, setOrderId] = useState(null);
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const { cart, clearCart, totalPrice } = useCart();

  const finalTotal = typeof totalPrice === 'function'
    ? totalPrice()
    : totalPrice ?? cart.reduce(
        (acc, item) => acc + Number(item.precio || item.price || 0) * item.quantity,
        0
      );

  const formatPrice = (price) => Number(price).toLocaleString('es-AR');

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (cart.length === 0) {
      setErrorMessage('Tu carrito está vacío. Agregá productos antes de continuar.');
      return;
    }

    setLoading(true);
    setErrorMessage('');

    const order = {
      buyer: { nombre, telefono, email },
      items: cart.map(prod => ({
        id: prod.id,
        title: prod.nombre || prod.title,
        price: prod.precio || prod.price,
        quantity: prod.quantity
      })),
      total: finalTotal,
      date: serverTimestamp()
    };

    try {
      const docRef = await addDoc(collection(db, 'orders'), order);
      setOrderId(docRef.id);
      clearCart();
    } catch (error) {
      console.error('Error al generar la orden: ', error);
      setErrorMessage('Hubo un error al procesar tu compra. Inténtalo de nuevo.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="checkout-page">
      <style>{`
        .checkout-page {
          min-height: 90vh;
          padding: 55px 0 80px;
          background:
            radial-gradient(circle at 85% 10%, rgba(0,255,204,.07), transparent 30%),
            #0d0d0d;
          color: #fff;
        }

        .checkout-eyebrow {
          color: #00ffcc;
          text-align: center;
          font-size: .8rem;
          font-weight: 800;
          letter-spacing: 2px;
          text-transform: uppercase;
          margin-bottom: 10px;
        }

        .checkout-title {
          text-align: center;
          font-size: clamp(2rem, 4vw, 2.7rem);
          font-weight: 900;
          margin-bottom: 12px;
        }

        .checkout-subtitle {
          color: #aaa;
          text-align: center;
          margin-bottom: 40px;
        }

        .checkout-card {
          padding: 30px;
          border: 1px solid #303039;
          border-radius: 16px;
          background: linear-gradient(145deg, #1c1c25, #131319);
        }

        .checkout-section-title {
          display: flex;
          align-items: center;
          gap: 10px;
          font-size: 1.2rem;
          font-weight: 850;
          margin-bottom: 25px;
        }

        .checkout-section-title svg {
          color: #00ffcc;
        }

        .checkout-field {
          margin-bottom: 20px;
        }

        .checkout-field label {
          display: flex;
          align-items: center;
          gap: 8px;
          color: #ccc;
          font-size: .9rem;
          font-weight: 700;
          margin-bottom: 9px;
        }

        .checkout-field label svg {
          color: #00ffcc;
        }

        .checkout-field input {
          width: 100%;
          padding: 13px 15px;
          border: 1px solid #41414b;
          border-radius: 8px;
          outline: none;
          background: #22222b;
          color: #fff;
          transition: border-color .2s ease, box-shadow .2s ease;
        }

        .checkout-field input::placeholder {
          color: #777;
        }

        .checkout-field input:focus {
          border-color: #00ffcc;
          box-shadow: 0 0 0 3px rgba(0,255,204,.1);
        }

        .checkout-submit {
          display: flex;
          justify-content: center;
          align-items: center;
          gap: 10px;
          width: 100%;
          padding: 15px;
          margin-top: 10px;
          border: none;
          border-radius: 8px;
          background: #00ffcc;
          color: #101414;
          font-size: 1rem;
          font-weight: 900;
          cursor: pointer;
          transition: all .25s ease;
        }

        .checkout-submit:hover:not(:disabled) {
          background: #fff;
          transform: translateY(-3px);
        }

        .checkout-submit:disabled {
          opacity: .6;
          cursor: not-allowed;
        }

        .checkout-summary {
          padding: 27px;
          border: 1px solid rgba(0,255,204,.25);
          border-radius: 16px;
          background: linear-gradient(145deg, #172322, #191920);
        }

        .checkout-summary-title {
          display: flex;
          align-items: center;
          gap: 10px;
          font-size: 1.2rem;
          font-weight: 850;
          margin-bottom: 25px;
        }

        .checkout-summary-title svg {
          color: #00ffcc;
        }

        .checkout-item {
          display: flex;
          justify-content: space-between;
          gap: 15px;
          padding: 13px 0;
          border-bottom: 1px solid #343b3a;
          font-size: .9rem;
        }

        .checkout-item-name {
          color: #ddd;
          font-weight: 650;
        }

        .checkout-item-quantity {
          display: block;
          color: #999;
          font-size: .8rem;
          margin-top: 4px;
        }

        .checkout-item-price {
          color: #fff;
          font-weight: 800;
          white-space: nowrap;
        }

        .checkout-total {
          display: flex;
          justify-content: space-between;
          align-items: center;
          gap: 12px;
          padding-top: 22px;
          margin-top: 10px;
          font-weight: 850;
        }

        .checkout-total strong {
          color: #00ffcc;
          font-size: 1.55rem;
        }

        .checkout-security {
          display: flex;
          align-items: flex-start;
          gap: 10px;
          margin-top: 25px;
          color: #aaa;
          font-size: .83rem;
          line-height: 1.6;
        }

        .checkout-security svg {
          color: #00ffcc;
          flex-shrink: 0;
        }

        .checkout-error {
          padding: 13px 15px;
          margin-bottom: 20px;
          border: 1px solid rgba(255,107,117,.5);
          border-radius: 8px;
          background: rgba(255,107,117,.1);
          color: #ff858d;
          font-size: .9rem;
        }

        .checkout-empty,
        .checkout-success {
          max-width: 600px;
          margin: 20px auto;
          padding: 45px 30px;
          border: 1px solid #303039;
          border-radius: 18px;
          background: linear-gradient(145deg, #1c1c25, #131319);
          text-align: center;
        }

        .checkout-status-icon {
          display: flex;
          justify-content: center;
          align-items: center;
          width: 90px;
          height: 90px;
          margin: 0 auto 25px;
          border-radius: 25px;
          background: rgba(0,255,204,.09);
          color: #00ffcc;
        }

        .checkout-success h2,
        .checkout-empty h2 {
          font-size: 1.8rem;
          font-weight: 900;
          margin-bottom: 15px;
        }

        .checkout-success h2 {
          color: #00ffcc;
        }

        .checkout-success p,
        .checkout-empty p {
          color: #aaa;
          line-height: 1.7;
        }

        .checkout-order-id {
          padding: 18px;
          margin: 25px 0;
          border: 1px dashed #00ffcc;
          border-radius: 10px;
          background: #22222b;
          overflow-wrap: anywhere;
        }

        .checkout-order-id strong {
          display: block;
          color: #00ffcc;
          margin-top: 8px;
        }

        .checkout-back-link {
          display: inline-flex;
          justify-content: center;
          align-items: center;
          gap: 9px;
          padding: 13px 22px;
          margin-top: 15px;
          border-radius: 8px;
          background: #00ffcc;
          color: #101414;
          font-weight: 900;
          text-decoration: none;
          transition: all .25s ease;
        }

        .checkout-back-link:hover {
          background: #fff;
          color: #101414;
          transform: translateY(-3px);
        }

        @media (max-width: 575px) {
          .checkout-page {
            padding: 40px 0 60px;
          }

          .checkout-card,
          .checkout-summary {
            padding: 22px;
          }

          .checkout-success,
          .checkout-empty {
            padding: 35px 20px;
          }
        }
      `}</style>

      <PageMeta
        title={orderId ? 'Compra exitosa' : 'Finalizar compra'}
        description={
          orderId
            ? 'Tu compra fue registrada correctamente en Gaming Store.'
            : 'Completá tus datos para finalizar tu compra en Gaming Store.'
        }
      />

      <Container>
        {orderId ? (
          <div className="checkout-success">
            <div className="checkout-status-icon">
              <CheckCircle2 size={52} />
            </div>

            <div className="checkout-eyebrow">Pedido confirmado</div>
            <h2>¡Gracias por tu compra!</h2>

            <p>
              Tu orden fue registrada correctamente. ¡Ya estamos un paso
              más cerca de que disfrutes tus nuevos productos gamer!
            </p>

            <div className="checkout-order-id">
              Tu ID de orden es:
              <strong>{orderId}</strong>
            </div>

            <Link to="/productos" className="checkout-back-link">
              Volver al catálogo
              <ArrowRight size={18} />
            </Link>
          </div>
        ) : cart.length === 0 ? (
          <div className="checkout-empty">
            <div className="checkout-status-icon">
              <ShoppingCart size={48} />
            </div>

            <h2>Tu carrito está vacío</h2>
            <p>
              Para finalizar una compra primero necesitás agregar
              productos a tu carrito.
            </p>

            <Link to="/productos" className="checkout-back-link">
              Explorar catálogo
              <ArrowRight size={18} />
            </Link>
          </div>
        ) : (
          <>
            <div className="checkout-eyebrow">Último paso</div>
            <h1 className="checkout-title">Finalizar compra</h1>
            <p className="checkout-subtitle">
              Completá tus datos y confirmá tu pedido.
            </p>

            <Row className="g-4 justify-content-center">
              <Col lg={7}>
                <div className="checkout-card">
                  <h2 className="checkout-section-title">
                    <User size={22} />
                    Datos del comprador
                  </h2>

                  {errorMessage && (
                    <div className="checkout-error" role="alert">
                      {errorMessage}
                    </div>
                  )}

                  <form onSubmit={handleSubmit}>
                    <div className="checkout-field">
                      <label htmlFor="checkout-nombre">
                        <User size={17} />
                        Nombre completo
                      </label>

                      <input
                        id="checkout-nombre"
                        type="text"
                        required
                        autoComplete="name"
                        value={nombre}
                        onChange={(e) => setNombre(e.target.value)}
                        placeholder="Ej: Juan Pérez"
                      />
                    </div>

                    <div className="checkout-field">
                      <label htmlFor="checkout-telefono">
                        <Phone size={17} />
                        Teléfono
                      </label>

                      <input
                        id="checkout-telefono"
                        type="tel"
                        required
                        autoComplete="tel"
                        value={telefono}
                        onChange={(e) => setTelefono(e.target.value)}
                        placeholder="Ej: 1123456789"
                      />
                    </div>

                    <div className="checkout-field">
                      <label htmlFor="checkout-email">
                        <Mail size={17} />
                        Correo electrónico
                      </label>

                      <input
                        id="checkout-email"
                        type="email"
                        required
                        autoComplete="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="Ej: correo@ejemplo.com"
                      />
                    </div>

                    <button
                      type="submit"
                      className="checkout-submit"
                      disabled={loading}
                    >
                      {loading ? (
                        'Generando orden...'
                      ) : (
                        <>
                          Confirmar compra
                          <ArrowRight size={19} />
                        </>
                      )}
                    </button>
                  </form>
                </div>
              </Col>

              <Col lg={5}>
                <div className="checkout-summary">
                  <h2 className="checkout-summary-title">
                    <ShoppingBag size={22} />
                    Resumen de compra
                  </h2>

                  {cart.map((producto) => (
                    <div className="checkout-item" key={producto.id}>
                      <div>
                        <span className="checkout-item-name">
                          {producto.nombre || producto.title}
                        </span>
                        <span className="checkout-item-quantity">
                          Cantidad: {producto.quantity}
                        </span>
                      </div>

                      <span className="checkout-item-price">
                        ${formatPrice(
                          Number(producto.precio || producto.price || 0) * producto.quantity
                        )}
                      </span>
                    </div>
                  ))}

                  <div className="checkout-total">
                    <span>Total a pagar</span>
                    <strong>${formatPrice(finalTotal)}</strong>
                  </div>

                  <div className="checkout-security">
                    <ShieldCheck size={20} />
                    <span>
                      Revisá tus datos antes de confirmar. Tu pedido
                      quedará registrado en Gaming Store.
                    </span>
                  </div>
                </div>
              </Col>
            </Row>
          </>
        )}
      </Container>
    </div>
  );
};

export default Checkout;
