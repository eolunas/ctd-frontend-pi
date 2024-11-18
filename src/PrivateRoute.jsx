import { Navigate } from "react-router-dom";
import { useCharStates } from "./Context";

const PrivateRoute = ({ children, role }) => {
  const { state } = useCharStates();

  if (!state.isLoggedIn) {
    // Si no está autenticado, redirigir al inicio de sesión
    return <Navigate to='/' />;
  }

  if (state.user.role !== role) {
    // Si no tiene el rol necesario, redirigir a una página de no autorizado
    return <Navigate to='/unauthorized' />;
  }

  // Si cumple con las condiciones, renderizar el contenido
  return children;
};

export default PrivateRoute;
