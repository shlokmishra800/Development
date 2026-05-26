import Leftdiv from "./Leftdiv";
import Rightdiv from "./Rightdiv";

const Home = ({ shoes }) => {
  return (
    <div className="pt-24 px-2">
      <div className="flex gap-4 max-w-7xl w-full">
        {/* Left sidebar */}
        <div className="w-56 shrink-0 mt-4">
          <Leftdiv />
        </div>

        {/* Right content */}
        <div className="flex-1 mt-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 text-lg md:text-2xl lg:text-4xl">
            {shoes.map((shoe, idx) => (
              <Rightdiv key={idx} {...shoe} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;