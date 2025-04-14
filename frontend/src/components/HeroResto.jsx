/* eslint-disable react/prop-types */
import { Link } from "react-router-dom";
import StarIcon from "@mui/icons-material/Star";
import { yellow } from "@mui/material/colors";

// ✅ Single Restaurant Card Component
const RestoCard = ({ resto }) => {
  return (
    <Link
      to={`/restaurant/${resto.restaurant_id}`} 
      className="hover:no-underline"
      state={{ id: resto.restaurant_id }}
    >
      <div className="mb-8 h-96 w-72 overflow-hidden rounded-md bg-white text-zinc-700 shadow-md transition-transform duration-200 hover:-translate-y-2 hover:scale-105 hover:shadow-xl">
        {/* ✅ Restaurant Image */}
        <div className="relative h-2/3 overflow-hidden">
          <img
            src={resto.img_src} 
            alt={resto.name}
            className="h-full w-full object-cover"
          />
          <div className="absolute bottom-0 left-0 h-full w-full bg-gradient-to-t from-black opacity-50"></div>
        </div>

        {/* ✅ Restaurant Info */}
        <div className="flex h-1/3 flex-col justify-between p-2">
          <h1 className="text-2xl font-semibold">{resto.name}</h1>
          <div className="flex justify-between">
            <h1 className="font-semibold flex items-center">
              Rating: {resto.rating}
              <StarIcon sx={{ color: yellow[700], fontSize: 18 }} />
            </h1>
            <h1 className="font-semibold">{resto.delivery_time} mins</h1>
          </div>
        </div>
      </div>
    </Link>
  );
};

const RestoCardView = ({ restaurants }) => {
  if (!restaurants.length) {
    return (
      <div className="text-center text-lg font-semibold text-gray-700">
        No restaurants found.
      </div>
    );
  }

  return (
    <div className="flex flex-wrap justify-around">
      {restaurants.map((resto, index) => (
        <RestoCard resto={resto} key={index} />
      ))}
    </div>
  );
};

export default function HeroResto({ restaurants }) {
  return (
    <div className="bg-blur2 rounded-md bg-amber-300 p-8 pb-20">
      <h1 className="mb-8 text-2xl font-semibold">
        Top restaurant chains in Manipal
      </h1>
      <RestoCardView restaurants={restaurants} />
    </div>
  );
}
