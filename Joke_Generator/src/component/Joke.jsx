import React, { useState } from 'react';

function Joke({ category, apiUrl }) {
  const [joke, setJoke] = useState("Click the button to generate a joke!");

  async function newJoke() {
    try {
      const response = await fetch(apiUrl);
      const data = await response.json();

      if (data.error) {
        setJoke("😢 Error fetching joke. Try again!");
        return;
      }

      if (data.type === "twopart") {
        setJoke(`${data.setup} 😂 ${data.delivery}`);
      } else {
        setJoke(data.joke || "😅 No joke found, try again!");
      }
    } catch (error) {
      setJoke("😢 Error fetching joke!");
    }
  }

  const categoryStyles = {
    Programming: {
      bg: "bg-gradient-to-br from-blue-500 to-cyan-600 rounded-3xl",
      card: "bg-white text-gray-800",
      button: "bg-blue-600 hover:bg-blue-700"
    },
    Dark: {
      bg: "bg-gradient-to-br from-gray-900 to-black  rounded-3xl",
      card: "bg-gray-800 text-gray-100",
      button: "bg-red-600 hover:bg-red-700"
    },
    Spooky: {
      bg: "bg-gradient-to-br from-orange-600 to-purple-900  rounded-3xl",
      card: "bg-purple-800 text-orange-100",
      button: "bg-orange-600 hover:bg-orange-700"
    },
    Misc: {
      bg: "bg-gradient-to-br from-pink-500 to-yellow-500  rounded-3xl",
      card: "bg-yellow-100 text-gray-900",
      button: "bg-pink-600 hover:bg-pink-700"
    }
  };

  const styles = categoryStyles[category];

  return (
    <div className={`min-h-[60vh] flex items-center justify-center ${styles.bg} px-4 sm:px-6 lg:px-8`}>
      <div className={`${styles.card} w-full max-w-md sm:max-w-lg lg:max-w-xl rounded-2xl shadow-xl p-6 sm:p-8 text-center`}>
        <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-4">
          Wanna debug a {category} joke? 😄
        </h1>
        <div className="rounded-xl shadow-inner p-4 sm:p-6 mb-6 text-center transition-transform transform hover:scale-105 bg-opacity-80">
          <p className="min-h-20 flex items-center justify-center mb-6 text-sm sm:text-base lg:text-lg">
            {joke}
          </p>
        </div>
        <button
          className={`w-full text-white font-semibold py-3 rounded-xl active:scale-95 transition duration-300 ${styles.button}`}
          onClick={newJoke}
        >
          Generate Joke
        </button>
        <div className="mt-8 text-center">
          <p className="text-xs sm:text-sm lg:text-base">
            Created by <span className="font-semibold">Shlok Mishra</span>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Joke;