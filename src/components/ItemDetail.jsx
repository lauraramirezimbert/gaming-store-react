
const ItemDetail = ({ producto }) => {
  if (!producto) {
    return <h2 style={{ textAlign: 'center', marginTop: '50px' }}>Cargando detalle...</h2>;
  }

  return (
    <div style={{ display: 'flex', justifyContent: 'center', padding: '40px', gap: '40px', alignItems: 'center' }}>
      <div>
        <img
          src={producto.imagen}
          alt={producto.nombre}
          style={{ width: '300px', height: '300px', objectFit: 'cover', borderRadius: '8px' }}
        />
      </div>
      <div style={{ maxWidth: '400px' }}>
        <h2>{producto.nombre}</h2>
        <p style={{ fontSize: '18px', color: '#555' }}>{producto.descripcion}</p>
        <h3 style={{ color: '#28a745', fontSize: '24px' }}>${producto.precio}</h3>

        {}

        <button
          style={{ padding: '10px 20px', background: '#007bff', color: '#fff', border: 'none', borderRadius: '5px', cursor: 'pointer', marginTop: '15px' }}
        >
          Agregar al carrito
        </button>
      </div>
    </div>
  );
};

export default ItemDetail;
