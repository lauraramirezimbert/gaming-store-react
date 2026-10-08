import { Link } from 'react-router-dom';
import CartWidget from './CartWidget';

const NavBar = () => {
  return (
    <header style={{ display: 'flex', justifyContent: 'space-between', padding: '20px', background: '#111', color: '#fff' }}>
      <h1>GAMING STORE</h1>
      <nav>
        <ul style={{ display: 'flex', listStyle: 'none', gap: '20px', alignItems: 'center' }}>
          <li><Link to="/" style={{ color: '#fff', textDecoration: 'none' }}>Inicio</Link></li>
          <li><Link to="/productos" style={{ color: '#fff', textDecoration: 'none' }}>Productos</Link></li>
          <li><Link to="/carrito" style={{ textDecoration: 'none' }}><CartWidget /></Link></li>
        </ul>
      </nav>
    </header>
  );
};

export default NavBar;