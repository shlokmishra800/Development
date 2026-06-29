import { useCart } from "./CartProvider";

const Cart = () => {
  const { cartItems, removeFromCart, showCart, setShowCart } = useCart();

  if (!showCart) return null;

  return (
    <div className="fixed top-0 left-0 w-full h-full bg-linear-to-r from-red-600 to-black bg-opacity-50 flex justify-center items-start z-50 overflow-auto p-4">
      <div className="bg-white w-full lg:w-3/4 h-auto p-4 rounded shadow-lg">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-bold">Your Cart</h2>
          <button
            onClick={() => setShowCart(false)}
            className="text-red-600 font-bold hover:text-red-800"
          >
            Close
          </button>
        </div>

        {cartItems.length === 0 ? (
          <p>Your cart is empty</p>
        ) : (
          <div className="flex flex-col gap-4">
            {cartItems.map((item, index) => (
              <div key={index} className="flex gap-4 items-center border-b pb-2">
                <img src={item.photo} alt={item.name} className="w-20 h-20 object-cover rounded" />
                <div className="flex-1">
                  <h3 className="font-semibold">{item.name}</h3>
                  <p className="text-gray-500 line-through">₹{item.highPrice}</p>
                  <p className="text-red-600 font-bold">
                    ₹{item.discountPrice} ({item.discountPercent}% off)
                  </p>
                  <p>Rating: {item.rating} ⭐</p>
                  <div className="flex gap-2 mt-1">
                    {item.colors.map((color, i) => (
                      <span
                        key={i}
                        className="w-4 h-4 rounded-full border"
                        style={{ backgroundColor: color.toLowerCase() }}
                      ></span>
                    ))}
                  </div>
                </div>
                <button
                  onClick={() => removeFromCart(index)}
                  className="bg-red-600 text-white py-1 px-2 rounded hover:bg-red-700 active:scale-95"
                >
                  Remove
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Cart;
