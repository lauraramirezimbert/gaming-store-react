
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/useAuth';
import PageMeta from './PageMeta';

const Profile = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await logout();
      navigate('/login');
    } catch (error) {
      console.error('Error al cerrar sesión:', error);
    }
  };

  return (
    <div style={{
      maxWidth: '600px',
      margin: '50px auto',
      padding: '35px',
      background: '#1e1e1e',
      border: '1px solid #444',
      borderRadius: '10px',
      color: '#fff',
      textAlign: 'center'
    }}>
      <PageMeta
        title="Mi perfil"
        description="Consultá los datos de tu cuenta en Gaming Store."
      />

      <h2 style={{ color: '#00ffcc', marginBottom: '25px' }}>
        Mi Perfil
      </h2>

      <p style={{ color: '#aaa', marginBottom: '10px' }}>
        Sesión iniciada con:
      </p>

      <p style={{
        fontSize: '18px',
        color: '#00ffcc',
        marginBottom: '30px'
      }}>
        {user?.email}
      </p>

      <button
        onClick={handleLogout}
        style={{
          background: '#ff4d4d',
          color: '#fff',
          border: 'none',
          padding: '12px 25px',
          borderRadius: '6px',
          fontWeight: 'bold',
          cursor: 'pointer'
        }}
      >
        Cerrar sesión
      </button>
    </div>
  );
};

export default Profile;
