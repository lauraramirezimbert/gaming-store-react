
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import Home from './components/Home';
import ItemListContainer from './components/ItemListContainer';
import ItemDetailContainer from './components/ItemDetailContainer';
import Cart from './components/Cart';
import Checkout from './components/Checkout';
import Login from './components/Login';
import Admin from './components/Admin';
import Profile from './components/Profile';
import ProtectedRoute from './components/ProtectedRoute';
import UserProtectedRoute from './components/UserProtectedRoute';

function App() {
  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/productos" element={<ItemListContainer />} />
          <Route path="/categoria/:idCategoria" element={<ItemListContainer />} />
          <Route path="/producto/:id" element={<ItemDetailContainer />} />
          <Route path="/carrito" element={<Cart />} />
          <Route path="/checkout" element={<Checkout />} />
          <Route path="/login" element={<Login />} />

          <Route
            path="/perfil"
            element={
              <UserProtectedRoute>
                <Profile />
              </UserProtectedRoute>
            }
          />

          <Route
            path="/admin"
            element={
              <ProtectedRoute>
                <Admin />
              </ProtectedRoute>
            }
          />

          <Route path="*" element={<Home />} />
        </Routes>
      </Layout>
    </Router>
  );
}

export default App;
