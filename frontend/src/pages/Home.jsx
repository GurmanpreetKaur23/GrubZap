import Navbar from "../components/Navbar";
import HeroImageAutoplay from "../components/HeroImageAutoplay";
import HeroResto from "../components/HeroResto";
import Footer from "../components/Footer";
import { useEffect, useState } from "react";
import axios from "axios";
import CircularProgress from "@mui/material/CircularProgress";

function Home() {
  const [restaurants, setRestaurants] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    window.scrollTo(0, 0);
    const fetchRestaurants = async () => {
      try {
        const res = await axios.get(
          `${import.meta.env.VITE_BASE_SERVER_URL}/home`
        );

        if (res.status === 200) {
          setRestaurants(res.data);
          console.log("restaurants", res.data); 
        } else {
          console.error("Error fetching restaurants:", res.statusText);
        }
      } catch (err) {
        console.error("Error during API request:", err.message);
      } finally {
        setIsLoading(false);
      }
    };

    fetchRestaurants();
  }, []);

  if (isLoading) {
    return (
      <div className="flex h-screen w-full items-center justify-center">
        <div className="flex flex-col items-center gap-4">
          <h1 className="text-2xl font-semibold">Loading...</h1>
          <CircularProgress color="warning" size={50} />
        </div>
      </div>
    );
  }

  return (
    <div className="h-screen w-full bg-top bg-no-repeat">
      <Navbar />
      <div className="mx-auto w-[90%]">
        <HeroImageAutoplay />
        <HeroResto restaurants={restaurants} />
      </div>
      <Footer />
    </div>
  );
}

export default Home;
