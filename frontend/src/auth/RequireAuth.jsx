import { useAuth } from './AuthContext';
import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ children, requireAuth }) => {
  const { user } = useAuth();
  if (requireAuth && !user) {
    return <Navigate to="/auth" replace />;
  }
  if (!requireAuth && user) {
    return <Navigate to="/" replace />;
  }
  return children;
};

export default ProtectedRoute;
