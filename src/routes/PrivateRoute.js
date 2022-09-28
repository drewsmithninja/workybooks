import { Navigate } from 'react-router-dom';
import { getSessionToken, getSessionUser } from '../utils/helperAuthentication';

function PrivateRoute({ children }) {
  const user = getSessionUser();
  const token = getSessionToken();

  if (!user && !token) {
    return <Navigate to='/signin' replace />;
  }
  return children;
}

export default PrivateRoute;
