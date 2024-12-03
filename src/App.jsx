import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Context } from "./Context";
import Home from "./Routes/Home";
import EventDetail from "./Routes/EventDetail";
import Booking from "./Routes/BookingDate";
import { Layout } from "./Layouts/Layout";
import AdminLayout from "./Layouts/AdminLayout";
import Favs from "./Routes/Favs";

// import ListaEventos from "./Routes/EventList";
import ListProductsAdmin from "./Components/ListProductsAdmin";
import UserManagement from "./Components/UserManagement";
import PrivateRoute from "./PrivateRoute";
import Unauthorized from "./Routes/Unauthorized";
import AdminHome from "./Components/AdminHome";
import AddProduct from "./Components/AddProduct";
import FeatureManagement from "./Components/FeatureManagement";
import Categories from "./Routes/Categories";
import BookingStep1 from "./Routes/BookingStep1";
import BookingSummary from "./Routes/BookingSummary";
import BookingLayout from "./Layouts/BookingLayout";
import BookingDate from "./Routes/BookingDate";
import BookingSucces from "./Routes/BookingSucces";

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
            <Route path='booking' element={<BookingLayout />}>
              <Route index element={<BookingDate />} />
              <Route path='summary' element={<BookingSummary />} />
              <Route path='succes' element={<BookingSucces />} />
            </Route>
            <Route path='category/:category' element={<Categories />} />
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
            <Route index element={<AdminHome />} />
            <Route path='products' element={<ListProductsAdmin />} />
            <Route path='users' element={<UserManagement />} />
            <Route path='features' element={<FeatureManagement />} />
            <Route path='products/new' element={<AddProduct />} />
            <Route path='products/edit/:id' element={<AddProduct />} />

            {/* Agrega más rutas de administrador aquí */}
          </Route>
        </Routes>
      </Router>
    </Context>
  );
}

export default App;
