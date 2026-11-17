import { ShoppingCart } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { Link } from 'react-router-dom';

const CartWidget = () => {
  const { totalItems } = useCart();

  return (
    <Link to="/carrito" style={{ textDecoration: 'none' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '5px', background: '#333', padding: '5px 10px', borderRadius: '20px', color: '#fff', cursor: 'pointer' }}>
        <ShoppingCart size={20} />
        <span>{totalItems > 0 && totalItems}</span>
      </div>
    </Link>
  );
};

export default CartWidget;