
import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import ItemCount from './ItemCount';
import PageMeta from './PageMeta';
import { useCart } from '../context/useCart';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '../firebase';

const ItemDetailContainer = () => {
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [added, setAdded] = useState(false);

  const { id } = useParams();
  const { addToCart } = useCart();

  useEffect(() => {
    const docRef = doc(db, 'productos', id);

    getDoc(docRef)
      .then((snapshot) => {
        if (snapshot.exists()) {
          setProduct({ id: snapshot.id, ...snapshot.data() });
        } else {
          setProduct(null);
        }
        setLoading(false);
      })
      .catch((error) => {
        console.error('Error al obtener el producto: ', error);
        setLoading(false);
      });
  }, [id]);

  const handleOnAdd = (quantity) => {
    if (!product) return;
    addToCart(product, quantity);
    setAdded(true);
  };

  if (loading) {
    return (
      <div style={{ textAlign: 'center', padding: '80px', color: '#666', fontSize: '18px' }}>
        <PageMeta
          title="Detalle del producto"
          description="Conocé los detalles de nuestros productos en Gaming Store."
        />
        <p>Cargando detalle del producto...</p>
      </div>
    );
  }

  if (!product) {
    return (
      <div style={{ textAlign: 'center', padding: '80px' }}>
        <PageMeta
          title="Producto no encontrado"
          description="El producto que buscás no está disponible en Gaming Store."
        />
        <h2>Producto no encontrado</h2>
        <Link to="/" style={{ color: '#007bff', textDecoration: 'none', fontWeight: '500', marginTop: '10px', display: 'inline-block' }}>
          ← Volver al catálogo
        </Link>
      </div>
    );
  }

  return (
    <>
      <PageMeta
        title={product.nombre}
        description={product.descripcion || `Conocé ${product.nombre} en Gaming Store.`}
      />

      <div
        style={{
          padding: '50px 20px',
          maxWidth: '900px',
          margin: '40px auto',
          display: 'flex',
          gap: '40px',
          alignItems: 'center',
          background: '#575454',
          borderRadius: '12px',
          boxShadow: '0 4px 20px rgba(0,0,0,0.08)',
        }}
      >
        <div style={{ flex: '1', textAlign: 'center' }}>
          <img
            src={product.imagen}
            alt={product.nombre}
            style={{
              width: '100%',
              maxWidth: '350px',
              height: '350px',
              objectFit: 'contain',
              borderRadius: '8px',
            }}
          />
        </div>

        <div style={{ flex: '1', display: 'flex', flexDirection: 'column', gap: '15px' }}>
          <h2 style={{ fontSize: '28px', color: '#333', margin: '0' }}>{product.nombre}</h2>

          <p
            style={{
              fontSize: '26px',
              fontWeight: '700',
              color: '#2575fc',
              margin: '0',
            }}
          >
            ${product.precio}
          </p>

          <p style={{ color: '#666', lineHeight: '1.6', margin: '0' }}>
            {product.descripcion}
          </p>

          <p style={{ fontSize: '13px', color: '#888', margin: '0' }}>
            Stock disponible: 10 unidades
          </p>

          <div style={{ marginTop: '10px' }}>
            {!added ? (
              <ItemCount
                stock={10}
                initial={1}
                onAdd={handleOnAdd}
              />
            ) : (
              <Link
                to="/carrito"
                style={{
                  display: 'inline-block',
                  background: '#28a745',
                  color: '#3b3b3b',
                  padding: '12px 24px',
                  textDecoration: 'none',
                  borderRadius: '6px',
                  fontWeight: '600',
                  boxShadow: '0 2px 5px rgba(40,167,69,0.3)',
                  transition: 'background 0.2s',
                }}
              >
                Ir al Carrito 🛒
              </Link>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default ItemDetailContainer;
