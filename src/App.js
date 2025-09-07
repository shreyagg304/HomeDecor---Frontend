import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Navbar from './components/Navbar';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Products from './pages/Products';
import Cart from './pages/Cart';

function App() {
  const token = localStorage.getItem("token"); // check if logged in

  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/products" element={<Products />} />
        <Route path="/cart" element={<Cart />} />

        {/* Default route */}
        <Route
          path="/"
          element={token ? <Navigate to="/products" /> : <Navigate to="/login" />}
        />
      </Routes>
    </Router>
  );
}

export default App;
