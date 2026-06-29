import Leftdiv from "./Leftdiv";
import Rightdiv from "./Rightdiv";

const Men = () => {
  const menShoes = [
    { name: "Sporty Sneakers 1", photo: "https://tse1.mm.bing.net/th/id/OIP.s4_O660Vah0Hx-Z_6Zct0wHaHa?pid=Api&P=0&h=180", highPrice: 6000, discountPrice: 4999, discountPercent: 17, rating: 4.7, colors: ["Black", "Gray"], newArrival: true },
    { name: "Classic Loafers 2", photo: "https://tse1.mm.bing.net/th/id/OIP.RYDGIDjwaBZwS29J8_B_GgHaHa?pid=Api&P=0&h=180", highPrice: 5500, discountPrice: 4299, discountPercent: 21, rating: 4.5, colors: ["Brown", "Black"], newArrival: false },

  { name: "Sporty Sneakers 1", photo: "https://tse1.mm.bing.net/th/id/OIP.s4_O660Vah0Hx-Z_6Zct0wHaHa?pid=Api&P=0&h=180", highPrice: 6000, discountPrice: 4999, discountPercent: 17, rating: 4.7, colors: ["Black", "Gray"], newArrival: true },
  { name: "Classic Loafers 2", photo: "https://tse1.mm.bing.net/th/id/OIP.RYDGIDjwaBZwS29J8_B_GgHaHa?pid=Api&P=0&h=180", highPrice: 5500, discountPrice: 4299, discountPercent: 21, rating: 4.5, colors: ["Brown", "Black"], newArrival: false },
  { name: "Running Shoes 3", photo: "https://tse1.mm.bing.net/th/id/OIP.6J0Qwgg-NpcUjAgxgp2J_wHaHa?pid=Api&P=0&h=180", highPrice: 7000, discountPrice: 5999, discountPercent: 14, rating: 4.8, colors: ["Blue", "White"], newArrival: true },
  { name: "Formal Oxfords 4", photo: "https://tse1.mm.bing.net/th/id/OIP.IVx_klObSyxwhP2oxDZHQAHaEH?pid=Api&P=0&h=180", highPrice: 6500, discountPrice: 5299, discountPercent: 18, rating: 4.6, colors: ["Black", "Brown"], newArrival: false },
  { name: "Casual Sneakers 5", photo: "https://tse2.mm.bing.net/th/id/OIP._2d8j5qIqK0g9AechWyCFAHaHa?pid=Api&P=0&h=180g", highPrice: 6000, discountPrice: 4999, discountPercent: 17, rating: 4.7, colors: ["Gray", "White"], newArrival: true },
  { name: "Loafers Classic 6", photo: "https://tse2.mm.bing.net/th/id/OIP.RJ_3VrNkTDNt_9i-sNX0ZAHaHa?pid=Api&P=0&h=180", highPrice: 5500, discountPrice: 4299, discountPercent: 21, rating: 4.5, colors: ["Brown", "Black"], newArrival: false },
  { name: "Trail Runners 7", photo: "https://tse1.mm.bing.net/th/id/OIP.s4_O660Vah0Hx-Z_6Zct0wHaHa?pid=Api&P=0&h=180", highPrice: 7000, discountPrice: 5999, discountPercent: 14, rating: 4.8, colors: ["Blue", "Gray"], newArrival: true },
  { name: "Slip-On Shoes 8", photo: "https://tse4.mm.bing.net/th/id/OIP.HAI6DACOqmTnd67qHbqAtQHaGM?pid=Api&P=0&h=180", highPrice: 5000, discountPrice: 3999, discountPercent: 20, rating: 4.4, colors: ["Black", "Brown"], newArrival: true },
  { name: "Leather Boots 9", photo: "https://tse3.mm.bing.net/th/id/OIP.dRWhxGKMrEZflXegVUjNGgHaHa?pid=Api&P=0&h=180", highPrice: 7500, discountPrice: 6399, discountPercent: 15, rating: 4.6, colors: ["Brown", "Black"], newArrival: false },
  { name: "High Top Sneakers 10", photo: "https://tse3.mm.bing.net/th/id/OIP.eum-_0c127tCadvywCWcFgHaHa?pid=Api&P=0&h=180", highPrice: 6800, discountPrice: 5699, discountPercent: 16, rating: 4.7, colors: ["Gray", "White"], newArrival: true },
  { name: "Classic Dress Shoes 11", photo: "https://tse4.mm.bing.net/th/id/OIP.5Kcks9i4txw6-D8g72iGsQHaHa?pid=Api&P=0&h=180", highPrice: 6500, discountPrice: 5299, discountPercent: 18, rating: 4.5, colors: ["Black", "Brown"], newArrival: false },
  { name: "Casual Slip-ons 12", photo: "https://tse4.mm.bing.net/th/id/OIP.MPR4XmQkRtOPU508jHuAwQHaHa?pid=Api&P=0&h=180", highPrice: 5000, discountPrice: 3999, discountPercent: 20, rating: 4.4, colors: ["White", "Gray"], newArrival: true },
  { name: "Running Pro 13", photo: "https://tse2.mm.bing.net/th/id/OIP.mryvWa8pr1R0Z7mnaxyVNQHaFN?pid=Api&P=0&h=180", highPrice: 7200, discountPrice: 6199, discountPercent: 14, rating: 4.8, colors: ["Blue", "Black"], newArrival: true },
  { name: "Loafers Trend 14", photo: "https://tse4.mm.bing.net/th/id/OIP.PXCs6bzn_xTgb_3v6Qus9QHaHa?pid=Api&P=0&h=180", highPrice: 5500, discountPrice: 4299, discountPercent: 21, rating: 4.5, colors: ["Brown", "Black"], newArrival: false },
  { name: "Trail Pro 15", photo: "https://tse2.mm.bing.net/th/id/OIP.hIOcZ2ttMd35hpxp7sYElQHaHa?pid=Api&P=0&h=180", highPrice: 7000, discountPrice: 5999, discountPercent: 14, rating: 4.8, colors: ["Gray", "Blue"], newArrival: true },
  { name: "Slip-on Comfort 16", photo: "https://tse2.mm.bing.net/th/id/OIP.DgFD1F-V-l6NVq-n2eOWoQHaFY?pid=Api&P=0&h=180", highPrice: 5000, discountPrice: 3999, discountPercent: 20, rating: 4.4, colors: ["Black", "White"], newArrival: true },
  { name: "Leather Classic 17", photo: "https://tse4.mm.bing.net/th/id/OIP.SRRUHBz83txFrL74xpE6wgHaHa?pid=Api&P=0&h=180", highPrice: 7500, discountPrice: 6399, discountPercent: 15, rating: 4.6, colors: ["Brown", "Black"], newArrival: false },
  { name: "High Tops 18", photo: "https://tse1.mm.bing.net/th/id/OIP.RRQyvjm9G2AyeTJPoWp_jwAAAA?pid=Api&P=0&h=180", highPrice: 6800, discountPrice: 5699, discountPercent: 16, rating: 4.7, colors: ["White", "Gray"], newArrival: true },
  { name: "Dress Oxfords 19", photo: "https://tse2.mm.bing.net/th/id/OIP.Tg3nwyt6ZFtIVwCUB3yKAAHaHa?pid=Api&P=0&h=180", highPrice: 6500, discountPrice: 5299, discountPercent: 18, rating: 4.5, colors: ["Black", "Brown"], newArrival: false },
  { name: "Casual Pros 20", photo: "https://tse2.mm.bing.net/th/id/OIP.j242dq1acSNNj5wvHe5mJwHaHa?pid=Api&P=0&h=180", highPrice: 5000, discountPrice: 3999, discountPercent: 20, rating: 4.4, colors: ["Gray", "White"], newArrival: true }

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
            {menShoes.map((shoe, i) => (
              <Rightdiv key={i} {...shoe} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Men;