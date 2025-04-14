/* eslint-disable react/prop-types */
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import MenuSection from "../components/MenuSection";
import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import axios from "axios";
import RatingSection from "../components/RatingSection";

const Restaurant = () => {
  const [resto, setResto] = useState({});
  const [menuItems, setMenuItems] = useState([]);
  const [isLoading, setIsLoading] = useState(true); 
  const [isMenuLoading, setIsMenuLoading] = useState(true); 
  const [rating, setRating] = useState(0);

  const handleRatingChange = (newValue) => {
    setRating((newValue + resto.rating) / 2);
  };

  const location = useLocation();
  const { id } = location.state;

  useEffect(() => {
    window.scrollTo(0, 0);

    axios
      .get(`${import.meta.env.VITE_BASE_SERVER_URL}/restaurant/${id}`)
      .then((res) => {
        if (res.status === 200 && res.data.length > 0) {
          setResto(res.data[0]);
          setRating(res.data[0].rating);
        }
      })
      .catch((err) => {
        console.error("Error fetching restaurant details:", err);
      })
      .finally(() => {
        setIsLoading(false); 
      });

    axios
      .get(`${import.meta.env.VITE_BASE_SERVER_URL}/restaurant/${id}/menu`)
      .then((res) => {
        if (res.status === 200) {
          setMenuItems(res.data);
        }
      })
      .catch((err) => {
        console.error("Error fetching menu items:", err);
      })
      .finally(() => {
        setIsMenuLoading(false); 
      });
  }, [id]);

  const [sortBy, setSortBy] = useState("default");

  const handleSortChange = (e) => {
    setSortBy(e.target.value);
  };

  const sortedMenuItems = [...menuItems].sort((a, b) => {
    switch (sortBy) {
      case "name":
        return a.name.localeCompare(b.name);
      case "rating":
        return b.rating - a.rating;
      case "price":
        return a.price - b.price;
      default:
        return 0;
    }
  });

  return (
    <div className="h-screen w-full bg-top bg-no-repeat">
      <Navbar />
      <div className="mx-auto w-[90%] overflow-hidden rounded bg-white shadow-lg">
        {isLoading ? (
          // Show loading indicator while fetching restaurant details
          <div className="flex h-96 items-center justify-center text-xl font-semibold">
            Loading Restaurant Details...
          </div>
        ) : (
          <>
            <div className="relative mb-8 overflow-hidden border-b-2">
              <img
                className="h-96 w-full transform object-cover object-center transition-transform duration-300 ease-in-out hover:scale-110"
                src={resto.img_src}
                alt={resto.name}
              />
              <div className="absolute bottom-0 left-0 h-48 w-full bg-gradient-to-t from-black to-transparent"></div>
              <div className="absolute bottom-0 left-0 px-6 pb-4">
                <h2 className="text-6xl font-semibold text-white">{resto.name}</h2>
              </div>
            </div>

            <div className="flex">
              <div className="w-1/4 p-6">
                <div className="border-b-2 pb-24">
                  <label
                    className="mb-2 block text-lg font-bold text-gray-700"
                    htmlFor="sortOptions"
                  >
                    Sort by:
                  </label>
                  <select
                    className="w-full rounded border border-gray-300 px-3 py-2 leading-tight focus:border-gray-500 focus:outline-none"
                    id="sortOptions"
                    value={sortBy}
                    onChange={handleSortChange}
                  >
                    <option value="default">Sort By:</option>
                    <option value="name">Name</option>
                    <option value="rating">Rating</option>
                    <option value="price">Price</option>
                  </select>
                </div>

                <div className="mb-4 mt-8">
                  <div className="mb-8 rounded bg-amber-500 px-4 py-2 text-center font-bold text-white">
                    Rate this restaurant
                  </div>
                  <p className="mb-2 block text-lg font-bold text-gray-700">
                    Current Rating: {rating || resto.rating}
                  </p>
                </div>
                <RatingSection onRatingChange={handleRatingChange} />
              </div>

              <div className="w-3/4 border-l border-gray-200 p-6">
                <div className="mb-4">
                  <p className="mb-2 block text-lg font-semibold text-gray-700">
                    Contact Number: {resto.contact_number}
                  </p>
                  <p className="mb-2 block text-lg font-semibold text-gray-700">
                    Address: {resto.address}
                  </p>
                </div>

                {isMenuLoading ? (
                  <div className="text-center text-lg font-semibold">
                    Loading Menu...
                  </div>
                ) : (
                  <MenuSection menuItems={sortedMenuItems}>{"Menu"}</MenuSection>
                )}
              </div>
            </div>
          </>
        )}
      </div>
      <Footer />
    </div>
  );
};

export default Restaurant;
