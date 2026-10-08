import { useState } from 'react';

const ItemCount = ({ stock, initial = 1, onAdd }) => {
  const [quantity, setQuantity] = useState(initial);

  const increment = () => {
    setQuantity((current) =>
      current < stock ? current + 1 : current
    );
  };

  const decrement = () => {
    setQuantity((current) =>
      current > 1 ? current - 1 : current
    );
  };

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: '10px',
        marginTop: '15px',
      }}
    >
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: '15px',
        }}
      >
        <button onClick={decrement}>-</button>

        <span
          style={{
            fontSize: '18px',
            fontWeight: 'bold',
          }}
        >
          {quantity}
        </span>

        <button onClick={increment}>+</button>
      </div>

      <button
        onClick={() => onAdd(quantity)}
        style={{
          background: '#28a745',
          color: '#fff',
          border: 'none',
          padding: '10px 20px',
          borderRadius: '5px',
          cursor: 'pointer',
          fontWeight: 'bold',
        }}
      >
        Agregar al carrito
      </button>
    </div>
  );
};

export default ItemCount;