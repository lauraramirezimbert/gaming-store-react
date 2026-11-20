
import { Link } from 'react-router-dom';
import CartWidget from './CartWidget';
import { useAuth } from '../context/useAuth';

const NavBar = () => {
  const { user } = useAuth();

  return (
    <header style={{
      display: 'flex',
      justifyContent: 'space-between',
      padding: '20px',
      background: '#111',
      color: '#fff',
      alignItems: 'center',
      flexWrap: 'wrap',
      gap: '15px'
    }}>
      <h1 style={{ margin: 0, fontSize: '22px' }}>
        <Link
          to="/"
          style={{ color: '#00ffcc', textDecoration: 'none' }}
        >
          GAMING STORE
        </Link>
      </h1>

      <nav>
        <ul style={{
          display: 'flex',
          listStyle: 'none',
          gap: '20px',
          alignItems: 'center',
          flexWrap: 'wrap',
          margin: 0,
          padding: 0
        }}>
          <li>
            <Link to="/" style={{ color: '#fff', textDecoration: 'none' }}>
              Inicio
            </Link>
          </li>

          <li>
            <Link to="/productos" style={{ color: '#fff', textDecoration: 'none' }}>
              Productos
            </Link>
          </li>

          <li>
            <Link to="/nosotros" style={{ color: '#fff', textDecoration: 'none' }}>
              Nosotros
            </Link>
          </li>

          <li>
            {user ? (
              <Link
                to="/perfil"
                style={{ color: '#00ffcc', textDecoration: 'none', fontWeight: 'bold' }}
              >
                Mi Perfil
              </Link>
            ) : (
              <Link
                to="/login"
                style={{ color: '#00ffcc', textDecoration: 'none', fontWeight: 'bold' }}
              >
                Mi Cuenta
              </Link>
            )}
          </li>

          <li>
            <CartWidget />
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default NavBar;
