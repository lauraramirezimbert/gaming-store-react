
import { useState } from 'react';
import { useAuth } from '../context/useAuth';
import { useNavigate } from 'react-router-dom';
import PageMeta from './PageMeta';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isRegistering, setIsRegistering] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const { login, register, user, logout } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      if (isRegistering) {
        await register(email.trim(), password);
      } else {
        await login(email.trim(), password);
      }

      navigate('/');
    } catch (err) {
      setError(err.code ? `${err.code}: ${err.message}` : err.message);
    } finally {
      setLoading(false);
    }
  };

  if (user) {
    return (
      <div style={{ padding: '50px', textAlign: 'center', color: '#fff' }}>
        <PageMeta
          title="Mi cuenta"
          description="Consultá tu cuenta de Gaming Store y administrá tu sesión."
        />

        <h2>Ya iniciaste sesión como:</h2>

        <p style={{ color: '#00ffcc', fontSize: '18px', margin: '20px 0' }}>
          {user.email}
        </p>

        <button
          onClick={async () => {
            await logout();
            navigate('/login');
          }}
          style={{
            background: '#ff4d4d',
            color: '#fff',
            border: 'none',
            padding: '10px 20px',
            borderRadius: '6px',
            cursor: 'pointer'
          }}
        >
          Cerrar sesión
        </button>
      </div>
    );
  }

  return (
    <div style={{
      maxWidth: '400px',
      margin: '50px auto',
      background: '#1e1e1e',
      padding: '30px',
      borderRadius: '8px',
      border: '1px solid #444',
      color: '#fff'
    }}>
      <PageMeta
        title={isRegistering ? 'Registro' : 'Iniciar sesión'}
        description={isRegistering
          ? 'Creá tu cuenta en Gaming Store para disfrutar de nuestros productos.'
          : 'Iniciá sesión en Gaming Store con tu cuenta.'
        }
      />

      <h2 style={{
        textAlign: 'center',
        color: '#00ffcc',
        marginBottom: '20px'
      }}>
        {isRegistering ? 'Crear Cuenta' : 'Iniciar Sesión'}
      </h2>

      {error && (
        <p style={{
          color: '#ff6b6b',
          fontSize: '14px',
          textAlign: 'center',
          overflowWrap: 'anywhere'
        }}>
          {error}
        </p>
      )}

      <form onSubmit={handleSubmit}>
        <input
          type="email"
          placeholder="Correo electrónico"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          autoComplete="email"
          required
          style={{
            width: '100%',
            background: '#333',
            color: '#fff',
            border: '1px solid #555',
            padding: '12px',
            marginBottom: '15px',
            borderRadius: '4px'
          }}
        />

        <input
          type="password"
          placeholder="Contraseña (mínimo 6 caracteres)"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          autoComplete={isRegistering ? 'new-password' : 'current-password'}
          minLength={6}
          required
          style={{
            width: '100%',
            background: '#333',
            color: '#fff',
            border: '1px solid #555',
            padding: '12px',
            marginBottom: '20px',
            borderRadius: '4px'
          }}
        />

        <button
          type="submit"
          disabled={loading}
          style={{
            width: '100%',
            background: '#00ffcc',
            color: '#121212',
            border: 'none',
            padding: '12px',
            fontWeight: 'bold',
            borderRadius: '4px',
            cursor: loading ? 'not-allowed' : 'pointer',
            opacity: loading ? 0.6 : 1
          }}
        >
          {loading ? 'Procesando...' : isRegistering ? 'Registrarse' : 'Ingresar'}
        </button>
      </form>

      <p style={{
        textAlign: 'center',
        marginTop: '20px',
        fontSize: '14px',
        color: '#aaa'
      }}>
        {isRegistering ? '¿Ya tenés una cuenta?' : '¿No tenés cuenta?'}
        {' '}
        <button
          type="button"
          onClick={() => {
            setIsRegistering(!isRegistering);
            setError('');
          }}
          style={{
            background: 'none',
            border: 'none',
            color: '#00ffcc',
            cursor: 'pointer',
            textDecoration: 'underline'
          }}
        >
          {isRegistering ? 'Iniciá sesión' : 'Registrate aquí'}
        </button>
      </p>
    </div>
  );
};

export default Login;
