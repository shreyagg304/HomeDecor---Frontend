import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../services/api";
import CartItem from "../components/CartItem";

export default function Cart() {
  const navigate = useNavigate();
  const [cart, setCart] = useState({ items: [] });

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/login");
    } else {
      fetchCart();
    }
  }, []);

  const fetchCart = async () => {
    try {
      const res = await API.get("/cart");
      const filteredItems = res.data.items.filter(i => i.itemId);
      setCart({ ...res.data, items: filteredItems });
    } catch (err) {
      console.log(err);
      alert("Failed to fetch cart");
    }
  };

  const removeItem = async (itemId) => {
    try {
      await API.post("/cart/remove", { itemId });
      fetchCart();
    } catch (err) {
      console.log(err);
    }
  };

  const totalPrice = cart.items.reduce(
    (acc, i) => acc + ((i.itemId?.price || 0) * (i.quantity || 0)),
    0
  );

  return (
    <div className="min-h-screen bg-gradient-to-r from-rose-100 via-teal-100 to-blue-100 p-8">
      <h2 className="text-3xl font-extrabold text-gray-800 text-center mb-8">
        Your Cart 🛒
      </h2>

      {cart.items.length === 0 ? (
        <p className="text-center text-gray-500 text-lg">Your cart is empty 🪴</p>
      ) : (
        <div className="max-w-4xl mx-auto space-y-6">
          {cart.items.map((i) => (
            <CartItem
              key={i.itemId?._id || i._id}
              item={i}
              removeItem={removeItem}
              className="bg-white/80 backdrop-blur-lg shadow-md rounded-2xl p-4 flex justify-between items-center hover:shadow-2xl transition"
            />
          ))}

          <div className="mt-6 flex justify-between items-center bg-white/80 backdrop-blur-lg shadow-lg rounded-2xl p-6">
            <h3 className="text-xl font-bold text-teal-700">Total:</h3>
            <span className="text-2xl font-extrabold text-indigo-600">
              ₹{totalPrice}
            </span>
          </div>

          <div className="text-center mt-4">
            <button className="px-6 py-3 bg-teal-500 text-white rounded-2xl font-semibold hover:bg-teal-600 transition shadow-md">
              Checkout 🛍️
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
