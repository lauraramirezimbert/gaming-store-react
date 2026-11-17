import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../firebase';

const ItemListContainer = () => {
  const [products, setProducts] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    const fetchProductsFromFirestore = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, 'productos'));
        const items = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data()
        }));
        setProducts(items);
        setLoading(false);
      } catch (err) {
        console.error(err);
        setError(true);
        setLoading(false);
      }
    };

    fetchProductsFromFirestore();
  }, []);

  // Filtro en tiempo real basado en la búsqueda
  const filteredProducts = products.filter((prod) =>
    prod.nombre.toLowerCase().includes(searchQuery.toLowerCase())
  );

  if (loading) {
    return <p style={{ textAlign: 'center', padding: '50px', color: '#00ffcc' }}>Cargando productos...</p>;
  }

  if (error) {
    return <p style={{ textAlign: 'center', padding: '50px', color: '#ff4d4d' }}>Error al cargar los productos.</p>;
  }

  return (
    <div style={{ padding: '20px', textAlign: 'center' }}>
      <h2>Catálogo de Productos</h2>

      {/* BARRA DE BÚSQUEDA */}
      <div style={{ margin: '20px 0' }}>
        <input
          type="text"
          placeholder="Buscar producto..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          style={{ 
            padding: '10px 15px', 
            width: '100%', 
            maxWidth: '350px', 
            borderRadius: '6px', 
            border: '1px solid #444', 
            background: '#1e1e1e', 
            color: '#fff',
            fontSize: '16px' 
          }}
        />
      </div>

      <div style={{ display: 'flex', gap: '20px', justifyContent: 'center', flexWrap: 'wrap', marginTop: '20px' }}>
        {filteredProducts.length > 0 ? (
          filteredProducts.map((prod) => (
            <div key={prod.id} style={{ border: '1px solid #444', padding: '15px', borderRadius: '8px', width: '220px', background: '#1e1e1e' }}>
              <img src={prod.imagen} alt={prod.nombre} style={{ width: '100%', height: '120px', objectFit: 'contain', background: '#000', borderRadius: '4px' }} />
              <h3 style={{ fontSize: '16px', margin: '10px 0', color: '#fff' }}>{prod.nombre}</h3>
              <p style={{ color: '#00ffcc', fontWeight: 'bold' }}>${prod.precio}</p>
              <Link to={`/producto/${prod.id}`} style={{ background: '#00ffcc', color: '#121212', padding: '8px 12px', textDecoration: 'none', borderRadius: '4px', display: 'inline-block', marginTop: '10px', fontWeight: 'bold' }}>
                Ver Detalle
              </Link>
            </div>
          ))
        ) : (
          <p style={{ color: '#aaa', marginTop: '20px' }}>No se encontraron productos que coincidan con la búsqueda.</p>
        )}
      </div>
    </div>
  );
};

export default ItemListContainer;