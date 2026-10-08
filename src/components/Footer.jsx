const Footer = () => {
  return (
    <footer style={{ background: '#111', color: '#fff', padding: '30px 20px', marginTop: '40px', textAlign: 'center' }}>
      <div style={{ marginBottom: '20px' }}>
        <h3>Gaming Store Argentina</h3>
        <p style={{ color: '#aaa', fontSize: '14px' }}>Tu tienda de confianza para componentes y accesorios gaming.</p>
      </div>

      <h4 style={{ marginBottom: '15px', color: '#007bff' }}>Equipo de Desarrollo</h4>
      <div style={{ display: 'flex', justifyContent: 'center', gap: '20px', flexWrap: 'wrap', marginBottom: '20px' }}>
        <div style={{ background: '#222', padding: '10px 15px', borderRadius: '6px', width: '150px' }}>
          <p style={{ fontWeight: 'bold', margin: '0' }}>Laura Ramírez</p>
          <span style={{ fontSize: '12px', color: '#aaa' }}>Frontend Dev</span>
        </div>
        <div style={{ background: '#222', padding: '10px 15px', borderRadius: '6px', width: '150px' }}>
          <p style={{ fontWeight: 'bold', margin: '0' }}>Juan Pérez</p>
          <span style={{ fontSize: '12px', color: '#aaa' }}>UI / UX Design</span>
        </div>
        <div style={{ background: '#222', padding: '10px 15px', borderRadius: '6px', width: '150px' }}>
          <p style={{ fontWeight: 'bold', margin: '0' }}>María Gómez</p>
          <span style={{ fontSize: '12px', color: '#aaa' }}>Backend / QA</span>
        </div>
      </div>

      <p style={{ fontSize: '12px', color: '#666', borderTop: '1px solid #333', paddingTop: '15px' }}>
        © 2026 Gaming Store. Todos los derechos reservados.
      </p>
    </footer>
  );
};

export default Footer;