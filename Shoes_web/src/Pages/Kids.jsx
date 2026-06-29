import Leftdiv from "./Leftdiv";
import Rightdiv from "./Rightdiv";

const Kids = () => {
  const kidsShoes = [
    { name: "Tiny Treads 1", photo: "https://tse2.mm.bing.net/th/id/OIP.EyGmaYYr16GN_2Un4IkUJwHaHa?pid=Api&P=0&h=180", highPrice: 2500, discountPrice: 1999, discountPercent: 20, rating: 4.2, colors: ["Red", "Blue"], newArrival: true },
    { name: "Mini Sneakers 2", photo: "https://tse3.mm.bing.net/th/id/OIP.Ks7s6GdnlfiCLrwAqv3tRwHaHa?pid=Api&P=0&h=180", highPrice: 3000, discountPrice: 2499, discountPercent: 17, rating: 4.5, colors: ["Pink", "White"], newArrival: false },
    { name: "Fun Run 3", photo: "https://tse4.mm.bing.net/th/id/OIP.VUkaf_bp-iFhoeyNKWuiYQHaHa?pid=Api&P=0&h=180", highPrice: 2700, discountPrice: 2199, discountPercent: 18, rating: 4.1, colors: ["Green", "Blue"], newArrival: true },
  { name: "Happy Steps 4", photo: "https://tse3.mm.bing.net/th/id/OIF.llOVuIAt7baHpfoC9i30Bg?pid=Api&P=0&h=180", highPrice: 3200, discountPrice: 2599, discountPercent: 19, rating: 4.3, colors: ["Yellow", "Red"], newArrival: false },
  { name: "Playtime Shoes 5", photo: "https://tse2.mm.bing.net/th/id/OIP.cNhnW5g4cmU3xF1iARSbQQHaEM?pid=Api&P=0&h=180", highPrice: 2800, discountPrice: 2299, discountPercent: 18, rating: 4.0, colors: ["Blue", "Orange"], newArrival: true },
  { name: "Little Hiker 6", photo: "https://tse2.mm.bing.net/th/id/OIP.W82w_RUVIvFvxEKFNXFegAHaFZ?pid=Api&P=0&h=180", highPrice: 3500, discountPrice: 2799, discountPercent: 20, rating: 4.4, colors: ["Brown", "Green"], newArrival: true },
  { name: "Speedy Sneakers 7", photo: "https://tse2.mm.bing.net/th/id/OIP.EqFgpSq8Yp9uJwjemMoGJAHaHa?pid=Api&P=0&h=180", highPrice: 3100, discountPrice: 2499, discountPercent: 19, rating: 4.2, colors: ["Black", "Red"], newArrival: false },
  { name: "Tiny Runner 8", photo: "https://tse1.mm.bing.net/th/id/OIP.DRQFqvCd-wgUtksKaBaOXwHaHa?pid=Api&P=0&h=180/kids8.jpg", highPrice: 2900, discountPrice: 2399, discountPercent: 17, rating: 4.3, colors: ["Blue", "White"], newArrival: true },
  { name: "Jump Start 9", photo: "https://tse2.mm.bing.net/th/id/OIP.o8f5WDSw9H6zU1xCsIQq4wHaFl?pid=Api&P=0&h=180", highPrice: 3300, discountPrice: 2699, discountPercent: 18, rating: 4.1, colors: ["Pink", "Yellow"], newArrival: false },
  { name: "Little Sprinter 10", photo: "https://tse4.mm.bing.net/th/id/OIP.de6C--B3Om_KKp_4YTgQSgHaFR?pid=Api&P=0&h=180", highPrice: 3600, discountPrice: 2999, discountPercent: 17, rating: 4.5, colors: ["Red", "Blue"], newArrival: true },
  { name: "Tiny Kicks 11", photo: "https://tse4.mm.bing.net/th/id/OIP.22_NhRPX7TFqvhDTHtb0dQHaJ4?pid=Api&P=0&h=180", highPrice: 2700, discountPrice: 2199, discountPercent: 18, rating: 4.0, colors: ["Green", "White"], newArrival: false },
  { name: "Fun Stride 12", photo: "https://tse3.mm.bing.net/th?id=OIF.3Bp99TB8%2bQkjagNuhvTmEg&pid=Api&P=0&h=180", highPrice: 3100, discountPrice: 2599, discountPercent: 16, rating: 4.2, colors: ["Orange", "Red"], newArrival: true },
  { name: "Mini Joggers 13", photo: "https://tse1.mm.bing.net/th/id/OIP.y5W2Qu5KSHks43N0WV5rLgHaHa?pid=Api&P=0&h=180", highPrice: 3200, discountPrice: 2699, discountPercent: 16, rating: 4.3, colors: ["Blue", "Black"], newArrival: false },
  { name: "Happy Walkers 14", photo: "https://tse1.mm.bing.net/th/id/OIP.ix2gCXNe2zj2AnzGFYDVtwHaEh?pid=Api&P=0&h=180", highPrice: 2800, discountPrice: 2299, discountPercent: 18, rating: 4.1, colors: ["Yellow", "Green"], newArrival: true },
  { name: "Little Movers 15", photo: "https://tse1.mm.bing.net/th/id/OIP.zfAWDJKgYlXgepohoqMEMQHaE8?pid=Api&P=0&h=180", highPrice: 3000, discountPrice: 2499, discountPercent: 17, rating: 4.2, colors: ["Pink", "Blue"], newArrival: true },
  { name: "Tiny Trotters 16", photo: "https://tse3.mm.bing.net/th/id/OIP.hoLBrti1wbR2MJq97VntoAHaE8?pid=Api&P=0&h=180", highPrice: 3300, discountPrice: 2799, discountPercent: 15, rating: 4.3, colors: ["Red", "Black"], newArrival: false },
  { name: "Fun Steps 17", photo: "https://tse1.mm.bing.net/th/id/OIP.tyQmGeN6U_QtqbYV5warvgHaHa?pid=Api&P=0&h=180", highPrice: 3400, discountPrice: 2899, discountPercent: 15, rating: 4.5, colors: ["Blue", "White"], newArrival: true },
  { name: "Little Dash 18", photo: "https://tse1.mm.bing.net/th/id/OIP.15IXsPzeK7J6C6HLG-Qc_wHaHa?pid=Api&P=0&h=180", highPrice: 3100, discountPrice: 2599, discountPercent: 16, rating: 4.1, colors: ["Green", "Yellow"], newArrival: false },
  { name: "Mini Stride 19", photo: "https://tse4.mm.bing.net/th/id/OIP.xk4djjNF-IOuR9PReIvWAgAAAA?pid=Api&P=0&h=180", highPrice: 3000, discountPrice: 2499, discountPercent: 17, rating: 4.2, colors: ["Black", "Red"], newArrival: true },
  { name: "Tiny Racer 20", photo: "https://tse1.mm.bing.net/th/id/OIP.z2zZWHfMCCQeVxH3RagjjAHaHa?pid=Api&P=0&h=180", highPrice: 3200, discountPrice: 2699, discountPercent: 16, rating: 4.4, colors: ["Blue", "Pink"], newArrival: true },
  ];

  return (
    <div className="pt-24 px-2">
      <div className="flex gap-6 max-w-7xl w-full">
        {/* Left sidebar */}
        <div className="w-56 shrink-0 mt-4">
          <Leftdiv />
        </div>

        {/* Right content */}
        <div className="flex-1 mt-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 text-lg md:text-2xl lg:text-4xl">
            {kidsShoes.map((shoe, i) => (
              <Rightdiv key={i} {...shoe} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Kids;