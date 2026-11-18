
import { Link } from 'react-router-dom';
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

  if (cart.length === 0) {
    return (
      <div style={{ textAlign: 'center', padding: '80px 20px' }}>
        <PageMeta
          title="Carrito de compras"
          description="Revisá tu carrito de compras en Gaming Store y prepará tu próximo pedido."
        />

        <h2>Tu carrito está vacío 🛒</h2>
        <p style={{ color: '#666', margin: '15px 0' }}>
          ¡Explorá nuestro catálogo y sumá tus productos preferidos!
        </p>
        <Link
          to="/productos"
          style={{
            background: '#007bff',
            color: '#fff',
            padding: '10px 20px',
            textDecoration: 'none',
            borderRadius: '5px',
            fontWeight: 'bold',
            display: 'inline-block'
          }}
        >
          Volver al catálogo
        </Link>
      </div>
    );
  }

  return (
    <div style={{ padding: '40px 20px', maxWidth: '850px', margin: '0 auto' }}>
      <PageMeta
        title="Carrito de compras"
        description="Revisá los productos seleccionados, sus cantidades y el total de tu compra en Gaming Store."
      />

      <h2 style={{ marginBottom: '30px', textAlign: 'center', color: '#333' }}>
        Tu Carrito de Compras
      </h2>

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
                style={{
                  width: '70px',
                  height: '70px',
                  objectFit: 'contain',
                  borderRadius: '6px',
                  border: '1px solid #eee'
                }}
              />

              <div>
                <h4 style={{ margin: '0 0 5px 0', color: '#333', fontSize: '18px' }}>
                  {producto.nombre}
                </h4>

                <p style={{ margin: '0 0 10px 0', color: '#666', fontSize: '14px' }}>
                  Precio unitario: ${producto.precio}
                </p>

                <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                  <button
                    onClick={() => decreaseQuantity(producto.id)}
                    style={{
                      background: '#e9ecef',
                      border: '1px solid #ced4da',
                      width: '28px',
                      height: '28px',
                      borderRadius: '4px',
                      cursor: 'pointer',
                      fontWeight: 'bold'
                    }}
                  >
                    -
                  </button>

                  <span style={{ fontWeight: '600', minWidth: '20px', textAlign: 'center' }}>
                    {producto.quantity}
                  </span>

                  <button
                    onClick={() => increaseQuantity(producto.id)}
                    style={{
                      background: '#e9ecef',
                      border: '1px solid #ced4da',
                      width: '28px',
                      height: '28px',
                      borderRadius: '4px',
                      cursor: 'pointer',
                      fontWeight: 'bold'
                    }}
                  >
                    +
                  </button>
                </div>
              </div>
            </div>

            <div style={{
              textAlign: 'right',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'flex-end',
              gap: '10px'
            }}>
              <p style={{ fontWeight: 'bold', fontSize: '18px', color: '#2575fc', margin: '0' }}>
                ${Number(producto.precio) * producto.quantity}
              </p>

              <button
                onClick={() => removeFromCart(producto.id)}
                style={{
                  background: 'transparent',
                  color: '#dc3545',
                  border: 'none',
                  cursor: 'pointer',
                  fontSize: '13px',
                  textDecoration: 'underline'
                }}
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
        alignItems: 'center',
        flexWrap: 'wrap',
        gap: '15px'
      }}>
        <h3 style={{ margin: '0', color: '#333' }}>
          Total a pagar: <span style={{ color: '#28a745' }}>${totalPrice}</span>
        </h3>

        <div style={{ display: 'flex', gap: '15px', flexWrap: 'wrap' }}>
          <button
            onClick={clearCart}
            style={{
              background: '#6c757d',
              color: '#fff',
              border: 'none',
              padding: '10px 20px',
              borderRadius: '5px',
              cursor: 'pointer',
              fontWeight: '600'
            }}
          >
            Vaciar carrito
          </button>

          <Link
            to="/checkout"
            style={{
              background: '#28a745',
              color: '#fff',
              padding: '10px 20px',
              textDecoration: 'none',
              borderRadius: '5px',
              fontWeight: '600',
              display: 'inline-block'
            }}
          >
            Finalizar compra
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Cart;
