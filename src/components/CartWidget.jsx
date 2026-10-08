import { ShoppingCart } from 'lucide-react';
import { useCart } from '../context/CartContext';

const CartWidget = () => {
  const { totalItems } = useCart();

  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: '5px', background: '#333', padding: '5px 10px', borderRadius: '20px', color: '#fff' }}>
      <ShoppingCart size={20} />
      <span>{totalItems > 0 && totalItems}</span>
    </div>
  );
};

export default CartWidget;