/* eslint-disable react/no-unescaped-entities */
import Biryani_2 from "/assets/heroCarousal/Biryani_2.png";
import Cakes from "/assets/heroCarousal/Cakes.png";
import North_Indian_4 from "/assets/heroCarousal/North_Indian_4.png";
import South_Indian_4 from "/assets/heroCarousal/South_Indian_4.png";
import Omelette from "/assets/heroCarousal/Omelette.png";
import Pizza from "/assets/heroCarousal/Pizza.png";
import Pasta from "/assets/heroCarousal/Pasta.png";
import Chinese from "/assets/heroCarousal/Chinese.png";
import Paratha from "/assets/heroCarousal/Paratha.png";
import "../index.css";
import { useNavigate } from "react-router-dom";

const images = [
  { url: Biryani_2, alt: "biryani" },
  { url: Cakes, alt: "cake" },
  { url: Pasta, alt: "pasta" },
  { url: Chinese, alt: "chinese" },
  { url: Paratha, alt: "naan" },
  { url: North_Indian_4, alt: "North Indian" },
  { url: South_Indian_4, alt: "South Indian" },
  { url: Omelette, alt: "omelette" },
  { url: Pizza, alt: "pizza" },
];

const HeroImageAutoplay = () => {
  const navigate = useNavigate();

  return (
    <>
      <div className="bg-blur1 mb-12 mt-8 rounded-md bg-zinc-100 p-8">
        <div className="content mt-4">
          <div className="content__container">
            <h1 className="content__container__text ">Whats on your mind.</h1>

            <ul className="content__container__list">
              <li className="content__container__list__item">Pizza?</li>
              <li className="content__container__list__item">South Indian?</li>
              <li className="content__container__list__item">Burger?</li>
              <li className="content__container__list__item">North Indian?</li>
            </ul>
          </div>
        </div>

        {/* <h1 className="">What's on your mind?</h1> */}
        <div className="logos relative mt-4 overflow-hidden py-6">
          <div className="logos-slide flex">
            {images.map((image, index) => (
              <button
                onClick={() => {
                  navigate("/fooditems", { state: { dishName: image.alt } });
                }}
                key={index}
                className=" mx-2 h-52 w-44 rounded-md duration-200 hover:-translate-y-2 hover:border-2 hover:border-amber-200 hover:shadow-lg"
              >
                <img src={image.url} />
              </button>
            ))}
            {images.map((image, index) => (
              <button
                onClick={() => {
                  navigate("/fooditems", { state: { dishName: image.alt } });
                }}
                key={index}
                className=" mx-2 h-52 w-44 rounded-md duration-200 hover:-translate-y-2 hover:border-2 hover:border-amber-200 hover:shadow-lg"
              >
                <img src={image.url} />
              </button>
            ))}
          </div>
          {/* <div className="absolute inset-y-0 left-0 top-4 h w-40 h-52 bg-gradient-to-r from-zinc-100 to-transparent"></div>
          <div className="absolute inset-y-0 right-0 top-4 w-40 h-52 bg-gradient-to-l from-zinc-100 to-transparent"></div> */}
        </div>
      </div>
    </>
  );
};

export default HeroImageAutoplay;
