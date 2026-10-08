import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

const ItemListContainer = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    fetch('/productos.json')
      .then((res) => {
        if (!res.ok) {
          throw new Error('Error al cargar productos');
        }
        return res.json();
      })
      .then((data) => {
        setProducts(data);
        setLoading(false);
      })
      .catch((error) => {
        console.error(error);
        setError(true);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return (
      <p style={{ textAlign: 'center', padding: '50px' }}>
        Cargando productos...
      </p>
    );
  }

  if (error) {
    return (
      <p style={{ textAlign: 'center', padding: '50px' }}>
        No se pudieron cargar los productos.
      </p>
    );
  }

  return (
    <div style={{ padding: '20px', textAlign: 'center' }}>
      <h2>Catálogo de Productos</h2>

      <div
        style={{
          display: 'flex',
          gap: '20px',
          justifyContent: 'center',
          flexWrap: 'wrap',
          marginTop: '20px',
        }}
      >
        {products.map((prod) => (
          <div
            key={prod.id}
            style={{
              border: '1px solid #ccc',
              padding: '15px',
              borderRadius: '8px',
              width: '220px',
            }}
          >
            <img
              src={prod.imagen}
              alt={prod.nombre}
              style={{
                width: '100%',
                height: '120px',
                objectFit: 'contain',
              }}
            />

            <h3>{prod.nombre}</h3>

            <p>${prod.precio}</p>

            <Link
              to={`/producto/${prod.id}`}
              style={{
                background: '#007bff',
                color: '#fff',
                padding: '8px 12px',
                textDecoration: 'none',
                borderRadius: '4px',
                display: 'inline-block',
                marginTop: '10px',
              }}
            >
              Ver Detalle
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ItemListContainer;