import Leftdiv from "./Leftdiv";
import Rightdiv from "./Rightdiv";

const Women = () => {
  const womenShoes = [
    { name: "Elegant Sandals 1", photo: "https://tse3.mm.bing.net/th/id/OIP.UdOVMvWGlE_u2rDBtgb5LgHaDt?pid=Api&P=0&h=180", highPrice: 4500, discountPrice: 3499, discountPercent: 22, rating: 4.6, colors: ["Black", "Beige"], newArrival: true },
    { name: "Stylish Heels 2", photo: "https://tse4.mm.bing.net/th/id/OIP.RairqyYWkRstC_RGWxvFfQHaIP?pid=Api&P=0&h=180", highPrice: 5200, discountPrice: 3999, discountPercent: 23, rating: 4.8, colors: ["Black", "Silver"], newArrival: false },
    
 { name: "Elegant Sandals 1", photo: "https://tse3.mm.bing.net/th/id/OIP.UdOVMvWGlE_u2rDBtgb5LgHaDt?pid=Api&P=0&h=180", highPrice: 4500, discountPrice: 3499, discountPercent: 22, rating: 4.6, colors: ["Black", "Beige"], newArrival: true },
  { name: "Stylish Heels 2", photo: "https://tse4.mm.bing.net/th/id/OIP.RairqyYWkRstC_RGWxvFfQHaIP?pid=Api&P=0&h=180", highPrice: 5200, discountPrice: 3999, discountPercent: 23, rating: 4.8, colors: ["Black", "Silver"], newArrival: false },
  { name: "Comfy Flats 3", photo: "https://tse2.mm.bing.net/th/id/OIP.fuZD6YRMlj8dkCg6-q3BowHaHa?pid=Api&P=0&h=180", highPrice: 3800, discountPrice: 2999, discountPercent: 21, rating: 4.3, colors: ["Brown", "Pink"], newArrival: true },
  { name: "Chic Loafers 4", photo: "https://tse1.mm.bing.net/th/id/OIP.4CzxzjNqNkovWQIce0cdQQHaHa?pid=Api&P=0&h=180", highPrice: 4200, discountPrice: 3499, discountPercent: 17, rating: 4.2, colors: ["Black", "Red"], newArrival: true },
  { name: "Summer Slides 5", photo: "https://tse2.mm.bing.net/th/id/OIP.UwcVARF9PRxDjwCIvzgvYAHaHa?pid=Api&P=0&h=180", highPrice: 4000, discountPrice: 3299, discountPercent: 18, rating: 4.1, colors: ["Beige", "White"], newArrival: false },
  { name: "Party Heels 6", photo: "https://tse3.mm.bing.net/th/id/OIP.M91Bs0KjTARiDIlFbWfPVgHaHa?pid=Api&P=0&h=180", highPrice: 5500, discountPrice: 4499, discountPercent: 18, rating: 4.5, colors: ["Red", "Black"], newArrival: true },
  { name: "Office Flats 7", photo: "https://tse2.mm.bing.net/th/id/OIP.Wwuo3KHrZMA768kPWUXsCgHaHa?pid=Api&P=0&h=180", highPrice: 3800, discountPrice: 2999, discountPercent: 21, rating: 4.3, colors: ["Brown", "Beige"], newArrival: false },
  { name: "Evening Sandals 8", photo: "https://tse3.mm.bing.net/th/id/OIP.BTV1MLa6qqJxcD7TXsYk9QHaHa?pid=Api&P=0&h=180", highPrice: 4700, discountPrice: 3899, discountPercent: 17, rating: 4.6, colors: ["Silver", "Gold"], newArrival: true },
  { name: "Trendy Boots 9", photo: "https://tse3.mm.bing.net/th/id/OIP.H_Dlhz70ume3erloxu6GEAHaHa?pid=Api&P=0&h=180", highPrice: 6000, discountPrice: 4999, discountPercent: 17, rating: 4.7, colors: ["Black", "Brown"], newArrival: true },
  { name: "Casual Loafers 10", photo: "https://tse3.mm.bing.net/th/id/OIP.y1ZK6SKx_Q7Tz9oGN3fc6QHaE8?pid=Api&P=0&h=180", highPrice: 4000, discountPrice: 3199, discountPercent: 20, rating: 4.2, colors: ["Blue", "White"], newArrival: false },
  { name: "Heels Classic 11", photo: "https://tse2.mm.bing.net/th/id/OIP.rIJYBkuWwt0vOJPOEQH51QAAAA?pid=Api&P=0&h=180", highPrice: 5200, discountPrice: 4199, discountPercent: 19, rating: 4.8, colors: ["Red", "Black"], newArrival: true },
  { name: "Flats Comfort 12", photo: "https://tse2.mm.bing.net/th/id/OIP.z1JuXZWo4vGoswJVPcXK6wHaFW?pid=Api&P=0&h=180", highPrice: 3800, discountPrice: 2999, discountPercent: 21, rating: 4.3, colors: ["Beige", "Pink"], newArrival: false },
  { name: "Slingback 13", photo: "https://tse3.mm.bing.net/th/id/OIP.2ryHK9dbj6CZZiBun6K8AgHaFb?pid=Api&P=0&h=180g", highPrice: 4500, discountPrice: 3699, discountPercent: 18, rating: 4.4, colors: ["White", "Black"], newArrival: true },
  { name: "Strappy Sandals 14", photo: "https://tse1.mm.bing.net/th/id/OIP.JgBJrKlcFJE-YqXRGmrZNwHaHa?pid=Api&P=0&h=180", highPrice: 4700, discountPrice: 3899, discountPercent: 17, rating: 4.5, colors: ["Gold", "Silver"], newArrival: false },
  { name: "Ballet Flats 15", photo: "https://tse3.mm.bing.net/th/id/OIP.p0HjIwGZPI9bnvzYfzTejgHaHa?pid=Api&P=0&h=180", highPrice: 3900, discountPrice: 3199, discountPercent: 18, rating: 4.2, colors: ["Pink", "Beige"], newArrival: true },
  { name: "Wedge Heels 16", photo: "https://tse1.mm.bing.net/th/id/OIP.HDUJHW8iMpnNn3pNHsiF5wHaFf?pid=Api&P=0&h=180", highPrice: 5200, discountPrice: 4199, discountPercent: 19, rating: 4.6, colors: ["Brown", "Black"], newArrival: false },
  { name: "Mules 17", photo: "https://tse1.mm.bing.net/th/id/OIP.hEMPDIOgeWA3L_GZ6cNfwAHaKL?pid=Api&P=0&h=180", highPrice: 4000, discountPrice: 3299, discountPercent: 18, rating: 4.3, colors: ["Beige", "White"], newArrival: true },
  { name: "Peep Toes 18", photo: "https://tse3.mm.bing.net/th/id/OIP.2WWf4HvrYvL-cSjb7BQ8DgHaEK?pid=Api&P=0&h=180", highPrice: 4500, discountPrice: 3799, discountPercent: 16, rating: 4.5, colors: ["Red", "Gold"], newArrival: false },
  { name: "Slide Comfort 19", photo: "https://tse3.mm.bing.net/th/id/OIP.a1zdeGNZ6qkKf9D8dRDrpwHaHB?pid=Api&P=0&h=180", highPrice: 3800, discountPrice: 2999, discountPercent: 21, rating: 4.2, colors: ["Blue", "White"], newArrival: true },
  { name: "Platform Heels 20", photo: "https://tse2.mm.bing.net/th/id/OIP.T_3xqdlDR2lTH8_hqW14mgHaHa?pid=Api&P=0&h=180", highPrice: 5200, discountPrice: 4199, discountPercent: 19, rating: 4.7, colors: ["Black", "Silver"], newArrival: true }

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
            {womenShoes.map((shoe, i) => (
              <Rightdiv key={i} {...shoe} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Women;