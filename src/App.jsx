import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Context } from "./Context";
import Home from "./Routes/Home";
import EventDetail from "./Routes/EventDetail";
import { Layout } from "./Layouts/Layout";
import AdminLayout from "./Layouts/AdminLayout";
import Favs from "./Routes/Favs";
// import ListaEventos from "./Routes/EventList";
import ListProductsAdmin from "./Components/ListProductsAdmin";
import UserManagement from "./Components/UserManagement";
import PrivateRoute from "./PrivateRoute";
import Unauthorized from "./Routes/Unauthorized";

function App() {
  return (
    <Context>
      <Router basename='/ctd-frontend-pi/'>
        <Routes>
          {/* Rutas generales */}
          <Route path='/' element={<Layout />}>
            <Route index element={<Home />} />
            <Route path='unauthorized' element={<Unauthorized />} />
            <Route path='favs' element={<Favs />} />
            <Route path='detail/:id' element={<EventDetail />} />
            {/* <Route path='eventos' element={<ListaEventos />} /> */}
          </Route>

          {/* Rutas de administrador */}
          <Route
            path='/admin'
            element={
              <PrivateRoute role='Administrator'>
                <AdminLayout />
              </PrivateRoute>
            }
          >
            <Route path='products' element={<ListProductsAdmin />} />
            <Route path='users' element={<UserManagement />} />
            <Route path='income' element={<ListProductsAdmin />} />
            {/* Agrega más rutas de administrador aquí */}
          </Route>
        </Routes>
      </Router>
    </Context>
  );
}

export default App;
