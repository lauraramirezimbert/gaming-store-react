
const integrantes = [
  {
    nombre: 'Laura Ramírez',
    rol: 'Frontend Dev',
    inicial: 'L',
    color: '#ffb6c1',
    descripcion: 'Encargada del diseño y desarrollo de la experiencia visual de Gaming Store.'
  },
  {
    nombre: 'Juan Pérez',
    rol: 'UI / UX Design',
    inicial: 'J',
    color: '#9be7ff',
    descripcion: 'Responsable de la organización visual y la experiencia de usuario.'
  },
  {
    nombre: 'María Gómez',
    rol: 'Backend / QA',
    inicial: 'M',
    color: '#c7b5ff',
    descripcion: 'Encargada de la lógica de la aplicación y las pruebas de funcionamiento.'
  }
];

const Nosotros = () => {
  return (
    <section style={{
      background: '#111',
      color: '#fff',
      padding: '50px 20px',
      textAlign: 'center',
      minHeight: '70vh'
    }}>
      <h2 style={{
        color: '#00ffcc',
        fontSize: '32px',
        marginBottom: '15px'
      }}>
        Sobre Nosotros
      </h2>

      <p style={{
        color: '#ccc',
        maxWidth: '700px',
        margin: '0 auto 40px',
        lineHeight: '1.7'
      }}>
        Somos el equipo detrás de Gaming Store Argentina.
        Nos apasiona el mundo gamer y trabajamos para ofrecer
        componentes y accesorios para disfrutar al máximo
        cada experiencia de juego.
      </p>

      <h3 style={{
        color: '#00ffcc',
        marginBottom: '30px'
      }}>
        Nuestro equipo
      </h3>

      <div style={{
        display: 'flex',
        justifyContent: 'center',
        gap: '25px',
        flexWrap: 'wrap'
      }}>
        {integrantes.map((integrante) => (
          <div
            key={integrante.nombre}
            style={{
              background: '#222',
              border: '1px solid #333',
              borderRadius: '15px',
              padding: '25px 20px',
              width: '260px',
              boxShadow: '0 4px 15px rgba(0,0,0,0.3)'
            }}
          >
            <div style={{
              width: '110px',
              height: '110px',
              borderRadius: '50%',
              background: integrante.color,
              color: '#222',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              margin: '0 auto 20px',
              fontSize: '42px',
              fontWeight: 'bold',
              border: '4px solid #00ffcc'
            }}>
              {integrante.inicial}
            </div>

            <h4 style={{ marginBottom: '8px' }}>
              {integrante.nombre}
            </h4>

            <span style={{
              color: '#00ffcc',
              fontSize: '14px',
              fontWeight: 'bold'
            }}>
              {integrante.rol}
            </span>

            <p style={{
              color: '#aaa',
              fontSize: '14px',
              lineHeight: '1.6',
              marginTop: '15px'
            }}>
              {integrante.descripcion}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Nosotros;
