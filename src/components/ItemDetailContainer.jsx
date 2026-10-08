import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import ItemCount from './ItemCount';
import { useCart } from '../context/CartContext';

const ItemDetailContainer = () => {
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [added, setAdded] = useState(false);
  const { id } = useParams();
  const { addToCart } = useCart();

  useEffect(() => {
    fetch('/src/data/productos.json')
      .then((res) => res.json())
      .then((data) => {
        const found = data.find((p) => p.id === id);
        setProduct(found);
        setLoading(false);
      });
  }, [id]);

  const handleOnAdd = (quantity) => {
    setAdded(true);
    addToCart(product, quantity);
  };

  if (loading) return <p style={{ textAlign: 'center', padding: '50px' }}>Cargando detalle...</p>;
  if (!product) return <p style={{ textAlign: 'center', padding: '50px' }}>Producto no encontrado.</p>;

  return (
    <div style={{ padding: '40px', maxWidth: '800px', margin: '0 auto', display: 'flex', gap: '30px', alignItems: 'center' }}>
      <img src={product.imagen} alt={product.nombre} style={{ width: '300px', height: '300px', objectFit: 'contain', border: '1px solid #ddd', borderRadius: '8px' }} />
      <div>
        <h2>{product.nombre}</h2>
        <p style={{ fontSize: '22px', fontWeight: 'bold', color: '#007bff' }}>${product.precio}</p>
        <p style={{ color: '#555', margin: '15px 0' }}>{product.descripcion}</p>
        <p style={{ fontSize: '14px', color: '#888' }}>Stock disponible: 10 unidades</p>

        {added ? (
          <Link to="/carrito" style={{ display: 'inline-block', background: '#007bff', color: '#fff', padding: '10px 20px', textDecoration: 'none', borderRadius: '5px', marginTop: '15px', fontWeight: 'bold' }}>
            Ir al Carrito
          </Link>
        ) : (
          <ItemCount stock={10} initial={1} onAdd={handleOnAdd} />
        )}
      </div>
    </div>
  );
};

export default ItemDetailContainer;