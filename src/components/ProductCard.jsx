export default function ProductCard({ item, addToCart }) {
  return (
    <div className="bg-white shadow-lg rounded-lg p-4 w-64">
      <div className="h-40 bg-gray-200 rounded-md mb-4 flex items-center justify-center">
        <span className="text-gray-500">Image</span>
      </div>
      <h3 className="text-lg font-semibold">{item.name}</h3>
      <p className="text-gray-500">{item.category}</p>
      <p className="text-xl font-bold text-blue-600">₹{item.price}</p>
      <button
        onClick={() => addToCart(item._id)}
        className="mt-3 w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition"
      >
        Add to Cart
      </button>
    </div>
  );
}
