import Nav from "./components/Nav";
import Footer from "./components/Footer";
import { Routes, Route } from "react-router-dom";
import Home from "./Pages/Home";
import Kids from "./Pages/Kids";
import Men from "./Pages/Men";
import Women from "./Pages/Women";
import Cart from "./Pages/Cart";
import Login from "./Pages/Login";
import CartProvider from "./Pages/CartProvider";




 const shoes = [
  {
    name: "AirMax Runner",
    photo: "https://tse1.mm.bing.net/th/id/OIP.TwZV5ASfr5WrfpcdvlBNfAHaHa?pid=Api&P=0&h=180",
    highPrice: 12000,
    discountPrice: 8999,
    discountPercent: 25,
    rating: 4.5,
    colors: ["Black", "Red"]
  },
  {
    name: "StreetFlex Sneaker",
    photo: "https://tse1.mm.bing.net/th/id/OIP.Y_1G2B7UTzoETQBZCirhHQHaHa?pid=Api&P=0&h=180",
    highPrice: 9500,
    discountPrice: 6999,
    discountPercent: 26,
    rating: 4.2,
    colors: ["White", "Blue"]
  },
  {
    name: "ProActive Sports",
    photo: "https://tse4.mm.bing.net/th/id/OIP.c1Dnd1NloU76Wh2l1VjF8QHaIr?pid=Api&P=0&h=180",
    highPrice: 11000,
    discountPrice: 7999,
    discountPercent: 27,
    rating: 4.3,
    colors: ["Gray", "Green"]
  },
  {
    name: "UrbanWalk Casual",
    photo: "https://tse3.mm.bing.net/th/id/OIP.MMreawIRydREAY582xS08QHaGE?pid=Api&P=0&h=180",
    highPrice: 8500,
    discountPrice: 5999,
    discountPercent: 29,
    rating: 4.0,
    colors: ["Brown", "Black"]
  },
  {
    name: "SkyHigh Trainer",
    photo: "https://tse4.mm.bing.net/th/id/OIP.ZwaGFiupqtq3ruPemSJkgwAAAA?pid=Api&P=0&h=180",
    highPrice: 12500,
    discountPrice: 9999,
    discountPercent: 20,
    rating: 4.6,
    colors: ["White", "Orange"]
  },
  {
    name: "FlexiRun Pro",
    photo: "https://tse4.mm.bing.net/th/id/OIP.fpcKnKwC6bPCF_0PAwdF5wHaJQ?pid=Api&P=0&h=180",
    highPrice: 10500,
    discountPrice: 7499,
    discountPercent: 28,
    rating: 4.4,
    colors: ["Black", "Yellow"]
  },
  {
    name: "Classic Leather",
    photo: "https://tse3.mm.bing.net/th/id/OIP.g-qEqteIuiid_AsvMyemnAHaHa?pid=Api&P=0&h=180",
    highPrice: 9000,
    discountPrice: 6499,
    discountPercent: 28,
    rating: 4.1,
    colors: ["Brown", "Tan"]
  },
  {
    name: "RapidSprint",
    photo: "https://up.yimg.com/ib/th/id/OIP.IxIhd36zRYJjw1mpHifOnwHaEo?pid=Api&rs=1&c=1&qlt=95&w=189&h=118",
    highPrice: 11500,
    discountPrice: 8499,
    discountPercent: 26,
    rating: 4.3,
    colors: ["Blue", "White"]
  },
  {
    name: "MetroStyle Sneaker",
    photo: "https://tse1.mm.bing.net/th/id/OIP.KWFu3fa1nPlxQUPdeH9NtAHaHR?pid=Api&P=0&h=180",
    highPrice: 9800,
    discountPrice: 6999,
    discountPercent: 28,
    rating: 4.0,
    colors: ["Gray", "Black"]
  },
  {
    name: "PowerKick",
    photo: "https://tse4.mm.bing.net/th/id/OIP.-JmYKIbyt4W7IPad8VIRuwHaHe?pid=Api&P=0&h=180",
    highPrice: 10200,
    discountPrice: 7599,
    discountPercent: 26,
    rating: 4.2,
    colors: ["Red", "White"]
  },
  {
    name: "Elite Jogger",
    photo: "https://tse2.mm.bing.net/th/id/OIP.U3zjjqlSbTn43cAS9FwDxAHaHa?pid=Api&P=0&h=180",
    highPrice: 10800,
    discountPrice: 7999,
    discountPercent: 26,
    rating: 4.5,
    colors: ["Black", "Blue"]
  },
  {
    name: "SwiftRun",
    photo: "https://tse1.mm.bing.net/th/id/OIP.l7C42Xf5o5fuP4_14LTKnAHaHa?pid=Api&P=0&h=180",
    highPrice: 9500,
    discountPrice: 6999,
    discountPercent: 26,
    rating: 4.1,
    colors: ["Green", "Gray"]
  },
  {
    name: "UrbanEdge",
    photo: "https://sp.yimg.com/ib/th/id/OIP.3iJOLUVv4didYRgLOkALNwHaGt?pid=Api&w=148&h=148&c=7&dpr=2&rs=1",
    highPrice: 12000,
    discountPrice: 8999,
    discountPercent: 25,
    rating: 4.4,
    colors: ["White", "Black"]
  },
  {
    name: "TrailBlazer",
    photo: "https://tse2.mm.bing.net/th/id/OIP.wIicdt3BvBoBsigujBRmKwHaHa?pid=Api&P=0&h=180",
    highPrice: 11500,
    discountPrice: 8499,
    discountPercent: 26,
    rating: 4.3,
    colors: ["Brown", "Olive"]
  },
  {
    name: "CityRunner",
    photo: "https://tse4.mm.bing.net/th/id/OIP.CnBoU0Udaoqz8U2Sc1rInwHaHa?pid=Api&P=0&h=180",
    highPrice: 9800,
    discountPrice: 6999,
    discountPercent: 28,
    rating: 4.2,
    colors: ["Gray", "Blue"]
  },
  {
    name: "SpeedFlex",
    photo: "https://sp.yimg.com/ib/th/id/OIP.lnUEDQmf8PgSR4lUGPTtSAHaE8?pid=Api&w=148&h=148&c=7&dpr=2&rs=1",
    highPrice: 10500,
    discountPrice: 7499,
    discountPercent: 28,
    rating: 4.5,
    colors: ["Black", "Red"]
  },
  {
    name: "PrimeStep",
    photo: "https://up.yimg.com/ib/th/id/OIP.EojCSLu5l_IU1VQk66jWNwAAAA?pid=Api&rs=1&c=1&qlt=95&w=105&h=105",
    highPrice: 8900,
    discountPrice: 6499,
    discountPercent: 27,
    rating: 4.0,
    colors: ["White", "Green"]
  },
  {
    name: "ActiveCore",
    photo: "https://tse4.mm.bing.net/th/id/OIP.PXCs6bzn_xTgb_3v6Qus9QHaHa?pid=Api&P=0&h=180",
    highPrice: 11200,
    discountPrice: 8299,
    discountPercent: 26,
    rating: 4.3,
    colors: ["Blue", "Yellow"]
  },
  {
    name: "ZenWalk",
    photo: "https://tse4.mm.bing.net/th/id/OIP.WAzqn0BZW2kC1--wi1SHgwHaHa?pid=Api&P=0&h=180",
    highPrice: 9700,
    discountPrice: 6999,
    discountPercent: 28,
    rating: 4.1,
    colors: ["Gray", "Black"]
  },
  {
    name: "HyperBoost",
    photo: "https://tse2.mm.bing.net/th/id/OIP.QexjVNHA7LvHwznJxy_GvwHaG0?pid=Api&P=0&h=180",
    highPrice: 12500,
    discountPrice: 9499,
    discountPercent: 24,
    rating: 4.6,
    colors: ["White", "Orange"]
  }
];

const App = () => {


  
  return (
    <CartProvider>
      <div className="w-full flex flex-col justify-between">
        <Nav />
        <Routes>
          <Route path="/" element={<Home shoes={shoes} />} />
          <Route path="/footwear/kids" element={<Kids />} />
          <Route path="/footwear/men" element={<Men />} />
          <Route path="/footwear/women" element={<Women />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/login" element={<Login />} />
        </Routes>
        <Footer />
      </div>
    </CartProvider>
  );
};

export default App;
