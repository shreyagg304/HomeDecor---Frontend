export default function CartItem({ item, removeItem }) {
  return (
    <div className="bg-white/90 backdrop-blur-lg rounded-2xl shadow-md p-4 flex items-center gap-4 hover:shadow-2xl transition">
      {/* Product Image */}
      <img
        src={item.itemId.image}
        alt={item.itemId.name}
        className="w-24 h-24 object-contain rounded-xl border border-gray-200"
      />

      {/* Product Details */}
      <div className="flex-1">
        <h3 className="text-lg font-bold text-gray-800">{item.itemId.name}</h3>
        <p className="text-sm text-gray-500">{item.itemId.category}</p>
        <p className="text-teal-600 font-semibold mt-1">
          ₹{item.itemId.price} × {item.quantity} = ₹{item.itemId.price * item.quantity}
        </p>
      </div>

      {/* Remove Button */}
      <button
        onClick={() => removeItem(item.itemId._id)}
        className="px-3 py-1 bg-red-500 text-white rounded-xl hover:bg-red-600 transition"
      >
        Remove
      </button>
    </div>
  );
}
