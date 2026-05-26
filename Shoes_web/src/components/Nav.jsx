import S_logo from "./S_logo.png";
import { ShoppingCart, CircleUser } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";

const Nav = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [footwearOpen, setFootwearOpen] = useState(false);
  const navigate = useNavigate();

  return (
    <div>
      {/* Upper nav (desktop only) */}
      <div className="hidden md:flex bg-linear-to-r from-red-600 to-black h-4 w-full text-[10px] justify-between text-white px-2">
        <p>India's leading online shopping destination</p>
        <div className="flex gap-4">
          <button>Our Blog</button>
          <button>Help Center</button>
          <button>Sell On Snapdeal</button>
          <button>Download App</button>
        </div>
      </div>

      {/* Middle nav */}
      <div className="bg-gradient-to-r from-gray-900 to-red-600 h-11 flex items-center w-full px-2">
        
        {/* Logo + search */}
        <div className="flex items-center gap-2">
          <img className="h-10 w-10" src={S_logo} alt="logo" />
          <h1 className="text-white font-semibold hidden sm:block">
            The Shlok's Web
          </h1>

          {/* Search (desktop only) */}
          <div className="hidden md:flex items-center ml-4">
            <input
              className="bg-white w-64 h-6 p-2 rounded-l"
              type="text"
              placeholder="Search your item here"
            />
            <button className="bg-gray-600 h-6 px-3 text-[12px] rounded-r text-white">
              Search
            </button>
          </div>
        </div>

        {/* Hamburger (mobile only) */}
        <button
          className="md:hidden ml-auto mr-2"
          onClick={() => setIsOpen(!isOpen)}
        >
          <div className="space-y-1">
            <span className="block w-6 h-0.5 bg-white"></span>
            <span className="block w-6 h-0.5 bg-white"></span>
            <span className="block w-6 h-0.5 bg-white"></span>
          </div>
        </button>

        {/* Desktop menu */}
        <div className="hidden md:flex items-center text-white gap-6 ml-auto mr-4">
          <button onClick={() => navigate("/cart")} className="flex items-center gap-1">
            <ShoppingCart size={18} /> Cart
          </button>

          <button onClick={() => navigate("/login")} className="flex items-center gap-1">
            <CircleUser size={20} /> Sign in
          </button>
        </div>
      </div>

      {/* Mobile dropdown */}
      {isOpen && (
        <nav className="md:hidden bg-gray-800 text-white flex flex-col p-2 gap-2">
          <Link to="/">Home</Link>

          <button onClick={() => setFootwearOpen(!footwearOpen)}>
            Footwear
          </button>

          {footwearOpen && (
            <div className="ml-4 flex flex-col gap-1 text-sm">
              <Link to="/footwear/kids">Kids</Link>
              <Link to="/footwear/men">Men</Link>
              <Link to="/footwear/women">Women</Link>
            </div>
          )}

          <Link to="/cart">Cart</Link>
          <Link to="/login">Login</Link>
        </nav>
      )}

      {/* Bottom nav (desktop only) */}
      <div className="hidden md:flex h-5 w-full bg-gradient-to-r from-gray-600 text-[14px] items-center px-2">
        <Link to="/" className="text-white mr-4">
          Home
        </Link>

        <div
          className="relative text-white cursor-pointer"
          onMouseEnter={() => setFootwearOpen(true)}
          onMouseLeave={() => setFootwearOpen(false)}
        >
          Footwear
          {footwearOpen && (
            <div className="absolute top-5 left-0 bg-gray-800 text-white flex flex-col p-2 rounded shadow-lg z-50">
              <Link className="px-2 py-1 hover:bg-gray-600 rounded" to="/footwear/kids">
                Kids
              </Link>
              <Link className="px-2 py-1 hover:bg-gray-600 rounded" to="/footwear/men">
                Men
              </Link>
              <Link className="px-2 py-1 hover:bg-gray-600 rounded" to="/footwear/women">
                Women
              </Link>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Nav;
