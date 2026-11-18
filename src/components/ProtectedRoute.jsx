
import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/useAuth';

const ADMIN_UID = 'rHcSJ9ViCzTPzy36U6KvsaMZQBe2';

const ProtectedRoute = ({ children }) => {
  const { user } = useAuth();
  const location = useLocation();

  if (!user) {
    return <Navigate to="/login" replace state={{ from: location }} />;
  }

  if (user.uid !== ADMIN_UID) {
    return <Navigate to="/" replace />;
  }

  return children;
};

export default ProtectedRoute;
