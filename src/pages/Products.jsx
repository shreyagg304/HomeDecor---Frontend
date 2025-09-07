import { useEffect, useState } from "react";
import api from "../services/api";

export default function Products() {
  const [products, setProducts] = useState([]);
  const [category, setCategory] = useState("");
  const [maxPrice, setMaxPrice] = useState("");

  useEffect(() => {
    fetchProducts();
  }, [category, maxPrice]);

  const fetchProducts = async () => {
    try {
      const res = await api.get("/items", {
        params: { category, maxPrice },
      });
      setProducts(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  const addToCart = async (productId) => {
    try {
      await api.post("/cart/add", { itemId: productId, quantity: 1 });
      alert("Added to cart 🎉");
    } catch (err) {
      alert("Please login first to add items 🛑");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-r from-rose-100 via-teal-100 to-blue-100 p-8">
      <h2 className="text-3xl font-extrabold text-gray-800 text-center mb-8">
        Explore Our Home Décor ✨
      </h2>

      <div className="flex flex-wrap gap-4 justify-center mb-10">
        <div className="relative">
          <select
            className="appearance-none px-5 py-3 rounded-2xl border border-gray-300 bg-white text-gray-700 shadow-sm hover:shadow-md focus:outline-none focus:ring-2 focus:ring-teal-400 transition-all duration-200 pr-10"
            onChange={(e) => setCategory(e.target.value)}
          >
            <option value="">All Categories</option>
            <option value="decor">Decor</option>
            <option value="lighting">Lighting</option>
            <option value="furniture">Furniture</option>
            <option value="soft_furnishing">Soft Furnishing</option>
          </select>
          <div className="pointer-events-none absolute inset-y-0 right-3 flex items-center">
            <svg
              className="w-4 h-4 text-gray-500"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </div>
        </div>

      <input
        type="number"
        placeholder="Max Price"
        className="px-5 py-3 rounded-2xl border border-gray-300 bg-white text-gray-700 shadow-sm hover:shadow-md focus:outline-none focus:ring-2 focus:ring-teal-400 transition-all duration-200"
        onChange={(e) => setMaxPrice(e.target.value)}
      />
    </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {products.map((item) => (
          <div
            key={item._id}
            className="bg-white rounded-2xl shadow-lg p-6 flex flex-col items-center hover:shadow-2xl transition"
          >
            <img
              src={item.image}
              alt={item.name}
              className="w-32 h-32 object-contain mb-4"
            />
            <h3 className="text-lg font-semibold text-gray-800">{item.name}</h3>
            <p className="text-gray-600 text-sm">{item.category}</p>
            <p className="text-xl font-bold text-teal-600 mt-2">
              ₹{item.price}
            </p>
            <button
              onClick={() => addToCart(item._id)}
              className="mt-4 px-4 py-2 bg-teal-500 text-white rounded-xl hover:bg-teal-600 transition"
            >
              Add to Cart
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
