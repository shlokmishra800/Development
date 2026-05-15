import React from "react";

const Leftdiv = () => {
  return (
    <div className="w-full p-4 bg-white border-r text-gray-800 space-y-8">

   
      <div className="space-y-2">
        <h2 className="font-semibold text-sm border-b pb-1">
          💸 Discount Deals
        </h2>

        {["Under 20%", "20% - 30%", "30% - 40%", "Above 40%"].map((item, i) => (
          <label
            key={i}
            className="flex items-center gap-2 text-[13px] cursor-pointer opacity-80 hover:opacity-100"
          >
            <input type="checkbox" />
            {item}
          </label>
        ))}
      </div>

     
      <div className="space-y-2">
        <h2 className="font-semibold text-sm border-b pb-1">
          🎨 Color Mood
        </h2>

        <div className="flex flex-wrap gap-3">
          {[
            "black",
            "white",
            "blue",
            "red",
            "green",
            "brown",
            "gray",
          ].map((color, i) => (
            <div
              key={i}
              title={color}
              className="h-6 w-6 rounded-full border shadow-sm cursor-pointer hover:scale-110 transition"
              style={{ backgroundColor: color }}
            ></div>
          ))}
        </div>
      </div>

      
      <div className="space-y-2">
        <h2 className="font-semibold text-sm border-b pb-1">
          👟 Shoe Size
        </h2>

        <div className="grid grid-cols-4 gap-2">
          {[4, 5, 6, 7, 8, 9, 10].map((size) => (
            <button
              key={size}
              className="border rounded-md text-[12px] py-1 hover:bg-black hover:text-white transition"
            >
              {size}
            </button>
          ))}
        </div>
      </div>

     
      <div className="space-y-2">
        <h2 className="font-semibold text-sm border-b pb-1">
          ⭐ Rating
        </h2>

        {[4, 3, 2].map((rate) => (
          <label
            key={rate}
            className="flex items-center gap-2 text-[13px] cursor-pointer"
          >
            <input type="checkbox" />
            {rate} ★ & above
          </label>
        ))}
      </div>

    
      <div className="space-y-2">
        <h2 className="font-semibold text-sm border-b pb-1">
          🔥 Style Type
        </h2>

        {["Running", "Casual", "Sneakers", "Sports", "Walking"].map(
          (style, i) => (
            <label
              key={i}
              className="flex items-center gap-2 text-[13px] cursor-pointer"
            >
              <input type="checkbox" />
              {style}
            </label>
          )
        )}
      </div>

      
      <div className="space-y-2">
        <h2 className="font-semibold text-sm border-b pb-1">
          🚀 Best For
        </h2>

        {["Gym", "Daily Wear", "Travel", "Office", "Outdoor"].map((use, i) => (
          <label
            key={i}
            className="flex items-center gap-2 text-[13px] cursor-pointer"
          >
            <input type="checkbox" />
            {use}
          </label>
        ))}
      </div>

   
      <div className="space-y-2">
        <h2 className="font-semibold text-sm border-b pb-1">
          🌱 Comfort Level
        </h2>

        <div className="flex flex-col gap-1 text-[13px]">
          <label className="flex gap-2 cursor-pointer">
            <input type="radio" name="comfort" />
            Soft Cushion
          </label>
          <label className="flex gap-2 cursor-pointer">
            <input type="radio" name="comfort" />
            Balanced
          </label>
          <label className="flex gap-2 cursor-pointer">
            <input type="radio" name="comfort" />
            Firm Support
          </label>
        </div>
      </div>

      <div className="space-y-2">
        <h2 className="font-semibold text-sm border-b pb-1">
          🧼 Material
        </h2>

        {["Mesh", "Leather", "Synthetic", "Canvas"].map((mat, i) => (
          <label
            key={i}
            className="flex items-center gap-2 text-[13px] cursor-pointer"
          >
            <input type="checkbox" />
            {mat}
          </label>
        ))}
      </div>

      <div className="space-y-2">
        <h2 className="font-semibold text-sm border-b pb-1">
          🌍 Eco Choice
        </h2>

        {[
          "Recycled Materials",
          "Vegan Friendly",
          "Low Carbon Footprint",
          "Water-Saving Production",
        ].map((eco, i) => (
          <label
            key={i}
            className="flex items-center gap-2 text-[13px] cursor-pointer"
          >
            <input type="checkbox" />
            {eco}
          </label>
        ))}
      </div>

      
      <button className="w-full bg-black text-white text-[13px] py-2 rounded-md active:scale-95">
        Reset All Filters
      </button>
    </div>
  );
};

export default Leftdiv;
