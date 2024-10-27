import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Context } from "./Context";
import Home from "./Routes/Home";
import Detail from "./Routes/Detail";
import { Layout } from './Layouts/Layout';
import Favs from './Routes/Favs';

function App() {
  return (
    <Context>
    <Router basename='/ticketgo/'>
      <Routes>
        <Route path='/' element={ <Layout /> }>
          <Route path="/" element={<Home />} />
          <Route path="/favs" element={<Favs />} />
          <Route path="/detail/:id" element={<Detail />} />
        </Route>
      </Routes>
    </Router>
  </Context>
  )
}

export default App
