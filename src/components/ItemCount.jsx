import { useState } from 'react';

const ItemCount = ({ stock, initial, onAdd }) => {
  const [quantity, setQuantity] = useState(initial);

  const increment = () => {
    if (quantity < stock) {
      setQuantity(quantity + 1);
    }
  };

  const decrement = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '10px', marginTop: '15px' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
        <button onClick={decrement} style={{ padding: '5px 12px', fontSize: '16px', cursor: 'pointer' }}>-</button>
        <span style={{ fontSize: '18px', fontWeight: 'bold' }}>{quantity}</span>
        <button onClick={increment} style={{ padding: '5px 12px', fontSize: '16px', cursor: 'pointer' }}>+</button>
      </div>
      <button 
        onClick={() => onAdd(quantity)} 
        style={{ background: '#28a745', color: '#fff', border: 'none', padding: '10px 20px', borderRadius: '5px', cursor: 'pointer', fontWeight: 'bold' }}
      >
        Agregar al carrito
      </button>
    </div>
  );
};

export default ItemCount;