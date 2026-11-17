import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isRegistering, setIsRegistering] = useState(false);
  const [error, setError] = useState('');
  
  const { login, register, user, logout } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    try {
      if (isRegistering) {
        await register(email, password);
      } else {
        await login(email, password);
      }
      navigate('/'); // Redirige al inicio tras loguearse con éxito
    } catch (err) {
      setError('Ocurrió un error: ' + err.message);
    }
  };

  if (user) {
    return (
      <div style={{ padding: '50px', textAlign: 'center', color: '#fff' }}>
        <Helmet><title>Mi Cuenta | Gaming Store</title></Helmet>
        <h2>Ya has iniciado sesión como:</h2>
        <p style={{ color: '#00ffcc', fontSize: '18px', margin: '20px 0' }}>{user.email}</p>
        <button 
          onClick={logout}
          style={{ background: '#ff4d4d', color: '#fff', border: 'none', padding: '10px 20px', borderRadius: '6px', cursor: 'pointer', fontWeight: 'bold' }}
        >
          Cerrar Sesión
        </button>
      </div>
    );
  }

  return (
    <div style={{ maxWidth: '400px', margin: '50px auto', background: '#1e1e1e', padding: '30px', borderRadius: '8px', border: '1px solid #444', color: '#fff' }}>
      <Helmet>
        <title>{isRegistering ? 'Registro' : 'Login'} | Gaming Store</title>
      </Helmet>

      <h2 style={{ textAlign: 'center', color: '#00ffcc', marginBottom: '20px' }}>
        {isRegistering ? 'Crear Cuenta' : 'Iniciar Sesión'}
      </h2>

      {error && <p style={{ color: '#ff4d4d', fontSize: '14px', textAlign: 'center', marginBottom: '15px' }}>{error}</p>}

      <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column' }}>
        <input 
          type="email" 
          placeholder="Correo electrónico" 
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          style={{ background: '#333', color: '#white', border: '1px solid #555', padding: '12px', marginBottom: '15px', borderRadius: '4px' }}
        />

        <input 
          type="password" 
          placeholder="Contraseña" 
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          style={{ background: '#333', color: '#white', border: '1px solid #555', padding: '12px', marginBottom: '20px', borderRadius: '4px' }}
        />

        <button 
          type="submit" 
          style={{ background: '#00ffcc', color: '#121212', border: 'none', padding: '12px', fontWeight: 'bold', borderRadius: '4px', cursor: 'pointer' }}
        >
          {isRegistering ? 'Registrarse' : 'Ingresar'}
        </button>
      </form>

      <p style={{ textAlign: 'center', marginTop: '20px', fontSize: '14px', color: '#aaa' }}>
        {isRegistering ? '¿Ya tenés una cuenta?' : '¿No tenés cuenta?'} {' '}
        <span 
          onClick={() => setIsRegistering(!isRegistering)} 
          style={{ color: '#00ffcc', cursor: 'pointer', textDecoration: 'underline' }}
        >
          {isRegistering ? 'Iniciá sesión' : 'Registrate aquí'}
        </span>
      </p>
    </div>
  );
};

export default Login;