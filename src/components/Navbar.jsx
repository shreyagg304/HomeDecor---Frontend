import { Link, useNavigate } from "react-router-dom";

export default function Navbar() {
  const token = localStorage.getItem("token");
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <nav className="bg-gradient-to-r from-teal-500 to-indigo-500 text-white px-6 py-4 flex justify-between items-center shadow-lg">
      {/* Logo */}
      <h1 className="text-3xl md:text-4xl font-extrabold tracking-wide">
        CozyDecor 🏡
      </h1>

      {/* Links */}
      <div className="flex items-center space-x-8 text-lg md:text-xl font-medium">
        <Link to="/products" className="hover:text-yellow-300 transition">
          Products
        </Link>
        <Link to="/cart" className="hover:text-yellow-300 transition">
          Cart
        </Link>
        {!token ? (
          <>
            <Link to="/login" className="hover:text-yellow-300 transition">
              Login
            </Link>
            <Link to="/signup" className="hover:text-yellow-300 transition">
              Signup
            </Link>
          </>
        ) : (
          <button
            onClick={handleLogout}
            className="bg-white text-teal-600 px-4 py-1 rounded-xl font-semibold hover:bg-yellow-100 transition flex items-center"
          >
            Logout
          </button>
        )}
      </div>
    </nav>
  );
}
