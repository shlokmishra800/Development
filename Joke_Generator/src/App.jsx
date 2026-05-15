import React, { useState } from 'react';
import './index.css';
import Joke from './component/Joke';

const categoryApis = {
  Programming: "https://v2.jokeapi.dev/joke/Programming?blacklistFlags=sexist",
  Dark: "https://v2.jokeapi.dev/joke/Dark?blacklistFlags=sexist",
  Spooky: "https://v2.jokeapi.dev/joke/Spooky?blacklistFlags=sexist",
  Misc: "https://v2.jokeapi.dev/joke/Miscellaneous?blacklistFlags=sexist"
};


const categoryThemes = {
  Programming: {
    bg: "bg-gradient-to-br from-blue-500 via-cyan-600 to-indigo-700",
    text: "text-white"
  },
  Dark: {
    bg: "bg-gradient-to-br from-black via-gray-900 to-gray-700",
    text: "text-red-100"
  },
  Spooky: {
    bg: "bg-gradient-to-br from-orange-600 via-purple-900 to-black",
    text: "text-orange-100"
  },
  Misc: {
    bg: "bg-gradient-to-br from-pink-500 via-yellow-400 to-red-500",
    text: "text-gray-900"
  }
};

const App = () => {
  const [selectedCategory, setSelectedCategory] = useState("Programming");
  const theme = categoryThemes[selectedCategory];

  return (
    <div className={`min-h-screen flex flex-col items-center justify-start py-8 sm:py-12 px-4 sm:px-6 lg:px-8 ${theme.bg} transition-colors duration-500`}>
      <h1 className={`text-3xl sm:text-4xl lg:text-5xl font-extrabold mb-8 drop-shadow-lg text-center ${theme.text}`}>
        🎭 {selectedCategory} Joke Generator
      </h1>

   
      <div className="flex flex-wrap justify-center gap-4 mb-10">
        {Object.keys(categoryApis).map((cat) => (
          <button
            key={cat}
            onClick={() => setSelectedCategory(cat)}
            className={`px-4 sm:px-6 py-2 rounded-full font-semibold transition duration-300 ${
              selectedCategory === cat
                ? "bg-white text-indigo-700 shadow-lg"
                : "bg-gray-200 text-gray-800 hover:bg-gray-300"
            }`}
          >
            {cat}
          </button>
        ))}
      </div>


      <Joke category={selectedCategory} apiUrl={categoryApis[selectedCategory]} />
    </div>
  );
};

export default App;