

import { Link } from 'react-router-dom';
import { ShoppingCart, Trash2, Plus, Minus, ArrowRight, Package, ShoppingBag } from 'lucide-react';
import { Container, Row, Col } from 'react-bootstrap';
import { useCart } from '../context/useCart';
import PageMeta from './PageMeta';

const Cart = () => {
  const {
    cart,
    clearCart,
    removeFromCart,
    increaseQuantity,
    decreaseQuantity,
    totalPrice
  } = useCart();

  const formatPrice = (price) => Number(price).toLocaleString('es-AR');

  if (cart.length === 0) {
    return (
      <div className="cart-page">
        <PageMeta
          title="Carrito de compras"
          description="Revisá tu carrito de compras en Gaming Store y prepará tu próximo pedido."
        />

        <style>{`
          .cart-page {
            min-height: 80vh;
            padding: 65px 0;
            background: #0d0d0d;
            color: #fff;
          }

          .empty-cart {
            max-width: 550px;
            margin: 30px auto;
            padding: 50px 25px;
            text-align: center;
            border: 1px solid #303039;
            border-radius: 20px;
            background: linear-gradient(145deg, #1c1c25, #131319);
          }

          .empty-cart-icon {
            display: flex;
            justify-content: center;
            align-items: center;
            width: 100px;
            height: 100px;
            margin: 0 auto 25px;
            border-radius: 25px;
            color: #00ffcc;
            background: rgba(0,255,204,.08);
          }

          .empty-cart h2 {
            font-weight: 900;
            margin-bottom: 15px;
          }

          .empty-cart p {
            color: #aaa;
            line-height: 1.7;
            margin-bottom: 28px;
          }

          .cart-primary-button {
            display: inline-flex;
            justify-content: center;
            align-items: center;
            gap: 10px;
            padding: 13px 22px;
            border-radius: 8px;
            background: #00ffcc;
            color: #101414;
            font-weight: 800;
            text-decoration: none;
            transition: all .25s ease;
          }

          .cart-primary-button:hover {
            background: #fff;
            color: #101414;
            transform: translateY(-3px);
          }
        `}</style>

        <Container>
          <div className="empty-cart">
            <div className="empty-cart-icon">
              <ShoppingCart size={52} />
            </div>

            <h2>Tu carrito está vacío</h2>
            <p>
              ¡Todavía no agregaste productos! Explorá nuestro catálogo
              y encontrá todo lo que necesitás para tu setup gamer.
            </p>

            <Link to="/productos" className="cart-primary-button">
              Explorar catálogo
              <ArrowRight size={19} />
            </Link>
          </div>
        </Container>
      </div>
    );
  }

  return (
    <div className="cart-page">
      <PageMeta
        title="Carrito de compras"
        description="Revisá los productos seleccionados, sus cantidades y el total de tu compra en Gaming Store."
      />

      <style>{`
        .cart-page {
          min-height: 90vh;
          padding: 55px 0 80px;
          background:
            radial-gradient(circle at 85% 15%, rgba(0,255,204,.06), transparent 30%),
            #0d0d0d;
          color: #fff;
        }

        .cart-eyebrow {
          color: #00ffcc;
          text-align: center;
          font-size: .8rem;
          font-weight: 800;
          letter-spacing: 2px;
          text-transform: uppercase;
          margin-bottom: 10px;
        }

        .cart-title {
          text-align: center;
          font-size: clamp(2rem, 4vw, 2.7rem);
          font-weight: 900;
          margin-bottom: 12px;
        }

        .cart-subtitle {
          text-align: center;
          color: #aaa;
          margin-bottom: 40px;
        }

        .cart-product {
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 20px;
          padding: 20px;
          border: 1px solid #303039;
          border-radius: 15px;
          background: linear-gradient(145deg, #1c1c25, #131319);
          transition: border-color .25s ease, transform .25s ease;
        }

        .cart-product:hover {
          border-color: rgba(0,255,204,.5);
          transform: translateY(-3px);
        }

        .cart-product-info {
          display: flex;
          align-items: center;
          gap: 20px;
          min-width: 0;
        }

        .cart-product-image {
          width: 105px;
          height: 105px;
          flex-shrink: 0;
          object-fit: contain;
          padding: 8px;
          border-radius: 10px;
          background: #fff;
        }

        .cart-product-name {
          color: #fff;
          font-size: 1.05rem;
          font-weight: 800;
          margin-bottom: 8px;
        }

        .cart-unit-price {
          color: #aaa;
          font-size: .9rem;
          margin-bottom: 13px;
        }

        .cart-quantity {
          display: flex;
          align-items: center;
          gap: 13px;
        }

        .cart-quantity button {
          display: flex;
          align-items: center;
          justify-content: center;
          width: 33px;
          height: 33px;
          border: 1px solid #41414b;
          border-radius: 8px;
          background: #25252e;
          color: #00ffcc;
          cursor: pointer;
          transition: all .2s ease;
        }

        .cart-quantity button:hover {
          background: #00ffcc;
          color: #101414;
          border-color: #00ffcc;
        }

        .cart-quantity span {
          min-width: 20px;
          text-align: center;
          font-weight: 800;
        }

        .cart-product-actions {
          display: flex;
          flex-direction: column;
          align-items: flex-end;
          gap: 15px;
          flex-shrink: 0;
        }

        .cart-product-total {
          color: #00ffcc;
          font-size: 1.2rem;
          font-weight: 900;
          margin: 0;
        }

        .cart-remove {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          padding: 5px 0;
          border: none;
          background: transparent;
          color: #ff6b75;
          font-size: .82rem;
          cursor: pointer;
          transition: color .2s ease;
        }

        .cart-remove:hover {
          color: #fff;
        }

        .cart-summary {
          padding: 28px;
          border: 1px solid rgba(0,255,204,.25);
          border-radius: 16px;
          background: linear-gradient(120deg, #172322, #191920);
        }

        .cart-summary-title {
          font-size: 1.25rem;
          font-weight: 850;
          margin-bottom: 22px;
        }

        .cart-summary-row {
          display: flex;
          justify-content: space-between;
          gap: 15px;
          color: #aaa;
          margin-bottom: 15px;
        }

        .cart-summary-total {
          display: flex;
          justify-content: space-between;
          align-items: center;
          gap: 15px;
          padding-top: 20px;
          margin-top: 18px;
          border-top: 1px solid #3b4845;
          font-weight: 800;
        }

        .cart-summary-total strong {
          color: #00ffcc;
          font-size: 1.65rem;
        }

        .cart-checkout {
          display: flex;
          justify-content: center;
          align-items: center;
          gap: 9px;
          width: 100%;
          padding: 14px;
          margin-top: 25px;
          border-radius: 8px;
          background: #00ffcc;
          color: #101414;
          text-decoration: none;
          font-weight: 900;
          transition: all .25s ease;
        }

        .cart-checkout:hover {
          background: #fff;
          color: #101414;
          transform: translateY(-3px);
        }

        .cart-clear {
          display: flex;
          justify-content: center;
          align-items: center;
          gap: 8px;
          width: 100%;
          padding: 12px;
          margin-top: 12px;
          border: 1px solid #555;
          border-radius: 8px;
          background: transparent;
          color: #aaa;
          font-weight: 700;
          cursor: pointer;
          transition: all .2s ease;
        }

        .cart-clear:hover {
          color: #ff6b75;
          border-color: #ff6b75;
        }

        .cart-continue {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          margin-top: 25px;
          color: #00ffcc;
          font-weight: 700;
          text-decoration: none;
        }

        .cart-continue:hover {
          color: #fff;
        }

        .cart-security {
          display: flex;
          align-items: center;
          gap: 9px;
          margin-top: 20px;
          color: #aaa;
          font-size: .82rem;
          line-height: 1.5;
        }

        .cart-security svg {
          color: #00ffcc;
          flex-shrink: 0;
        }

        @media (max-width: 575px) {
          .cart-page {
            padding: 40px 0 60px;
          }

          .cart-product {
            align-items: flex-start;
            gap: 12px;
            padding: 14px;
          }

          .cart-product-info {
            align-items: flex-start;
            gap: 12px;
          }

          .cart-product-image {
            width: 75px;
            height: 75px;
          }

          .cart-product-name {
            font-size: .9rem;
          }

          .cart-unit-price {
            font-size: .8rem;
          }

          .cart-product-actions {
            gap: 10px;
          }

          .cart-product-total {
            font-size: 1rem;
          }

          .cart-remove {
            font-size: .75rem;
          }

          .cart-summary {
            padding: 22px;
          }
        }

        @media (max-width: 380px) {
          .cart-product {
            flex-wrap: wrap;
          }

          .cart-product-actions {
            width: 100%;
            flex-direction: row;
            justify-content: space-between;
            align-items: center;
            padding-top: 12px;
            border-top: 1px solid #303039;
          }
        }
      `}</style>

      <Container>
        <div className="cart-eyebrow">Tu selección gamer</div>
        <h1 className="cart-title">Tu carrito de compras</h1>
        <p className="cart-subtitle">
          Revisá tus productos antes de finalizar tu compra.
        </p>

        <Row className="g-4">
          <Col lg={8}>
            <div className="d-flex flex-column gap-3">
              {cart.map((producto) => (
                <div className="cart-product" key={producto.id}>
                  <div className="cart-product-info">
                    <img
                      src={producto.imagen}
                      alt={producto.nombre}
                      className="cart-product-image"
                    />

                    <div>
                      <h3 className="cart-product-name">
                        {producto.nombre}
                      </h3>

                      <p className="cart-unit-price">
                        Precio unitario: ${formatPrice(producto.precio)}
                      </p>

                      <div className="cart-quantity">
                        <button
                          onClick={() => decreaseQuantity(producto.id)}
                          aria-label={`Disminuir cantidad de ${producto.nombre}`}
                        >
                          <Minus size={15} />
                        </button>

                        <span>{producto.quantity}</span>

                        <button
                          onClick={() => increaseQuantity(producto.id)}
                          aria-label={`Aumentar cantidad de ${producto.nombre}`}
                        >
                          <Plus size={15} />
                        </button>
                      </div>
                    </div>
                  </div>

                  <div className="cart-product-actions">
                    <p className="cart-product-total">
                      ${formatPrice(Number(producto.precio) * producto.quantity)}
                    </p>

                    <button
                      className="cart-remove"
                      onClick={() => removeFromCart(producto.id)}
                      aria-label={`Eliminar ${producto.nombre} del carrito`}
                    >
                      <Trash2 size={15} />
                      Eliminar
                    </button>
                  </div>
                </div>
              ))}
            </div>

            <Link to="/productos" className="cart-continue">
              <ArrowRight size={17} />
              Seguir comprando
            </Link>
          </Col>

          <Col lg={4}>
            <div className="cart-summary">
              <h2 className="cart-summary-title">
                <ShoppingBag
                  size={21}
                  color="#00ffcc"
                  style={{ marginRight: '9px', verticalAlign: 'middle' }}
                />
                Resumen de compra
              </h2>

              <div className="cart-summary-row">
                <span>Productos</span>
                <span>{cart.reduce((total, item) => total + item.quantity, 0)}</span>
              </div>

              <div className="cart-summary-row">
                <span>Envío</span>
                <span>A coordinar</span>
              </div>

              <div className="cart-summary-total">
                <span>Total</span>
                <strong>${formatPrice(totalPrice)}</strong>
              </div>

              <Link to="/checkout" className="cart-checkout">
                Finalizar compra
                <ArrowRight size={19} />
              </Link>

              <button className="cart-clear" onClick={clearCart}>
                <Trash2 size={17} />
                Vaciar carrito
              </button>

              <div className="cart-security">
                <Package size={17} />
                Prepará tu pedido y revisá los datos antes de confirmar.
              </div>
            </div>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default Cart;
