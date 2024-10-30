import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Context } from "./Context";
import Home from "./Routes/Home";
import EventDetail from "./Routes/EventDetail";
import { Layout } from './Layouts/Layout';
import Favs from './Routes/Favs';
import ListaEventos from "./Routes/EventList";

function App() {
  return (
    <Context>
    <Router basename='/ctd-frontend-pi/'>
      <Routes>
        <Route path='/' element={ <Layout /> }>
          <Route path="/" element={<Home />} />
          <Route path="/favs" element={<Favs />} />
          <Route path="/detail/:id" element={<EventDetail />} />
          <Route path='/eventos' element={<ListaEventos />} />
        </Route>
      </Routes>
    </Router>
  </Context>
  )
}

export default App
