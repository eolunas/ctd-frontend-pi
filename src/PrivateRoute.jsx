import { Navigate } from "react-router-dom";
import { useCharStates } from "./Context";

const PrivateRoute = ({ children }) => {
  const { state } = useCharStates();

  console.log(state.user?.role);

  // Si el usuario no está autenticado (estado `isLoggedIn` es falso) o no tiene el rol 'Administrator'
  if (!state.isLoggedIn || state.user?.role !== "Administrator") {
    return <Navigate to='/unauthorized' />;
  }

  // Si está autenticado y es administrador, renderizar el contenido
  return children;
};

export default PrivateRoute;
