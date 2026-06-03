import { useCart } from "./CartProvider";

const Rightdiv = ({ name, photo, highPrice, discountPrice, discountPercent, rating, colors }) => {
  const { addToCart } = useCart();

  return (
    <div className="w-60 bg-white rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300 p-4 flex flex-col justify-between">
      <div className="h-40 flex justify-center items-center mb-3">
        <img src={photo} alt={name} className="max-h-full object-contain rounded" />
      </div>

      <div className="flex flex-col gap-1 mb-2">
        <h2 className="font-semibold text-lg">{name}</h2>
        <div className="flex items-center gap-2">
          <p className="text-gray-400 line-through text-sm">₹{highPrice}</p>
          <p className="text-red-600 font-bold text-md">₹{discountPrice}</p>
          <p className="text-green-600 text-sm">({discountPercent}% off)</p>
        </div>
        <p className="text-yellow-500">⭐ {rating}</p>

        <div className="flex gap-2 mt-1">
          {colors.map((color, index) => (
            <span
              key={index}
              className="w-5 h-5 rounded-full border"
              style={{ backgroundColor: color.toLowerCase() }}
              title={color}
            ></span>
          ))}
        </div>
      </div>

      <button
        onClick={() =>
          addToCart({ name, photo, highPrice, discountPrice, discountPercent, rating, colors })
        }
        className="mt-3 w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 active:scale-95 transition-all duration-200"
      >
        Add to Cart
      </button>
    </div>
  );
};

export default Rightdiv;
