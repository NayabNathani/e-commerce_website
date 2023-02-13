import './App.css';
import Nav from "./Components/Nav"
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Footer from './Components/Footer';
import Signup from './Components/signup';
import PrivateComponent from './Components/PrivateComponent';
import Login from './Components/Login';
import AddProduct from './Components/AddProduct';
import ListProduct from './Components/ListProduct';
import UpdateProduct from './Components/UpdateProduct';

function App() {
  return (
    <div>
      <BrowserRouter>
        <Nav/>
        <Routes>

          <Route element={<PrivateComponent/>}>
          <Route path='/' element={<ListProduct/>} />
          <Route path='/add' element={<AddProduct />} />
          <Route path='/update/:id' element={<UpdateProduct/>} />
          <Route path='/logout' element={<h1>Logout Compo</h1>} />
          <Route path='/profile' element={<h1>Profile Compo</h1>} />
          </Route>
          <Route path='/signup' element={<Signup/>} />
          <Route path='/login' element={<Login/>} />
        </Routes>
      </BrowserRouter>
      <Footer/>
    </div>
  );
}

export default App;
