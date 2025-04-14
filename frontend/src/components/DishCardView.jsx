/* eslint-disable react/prop-types */
import burger from "/assets/loginCarousal/burger.jpg";
import dosa from "/assets/loginCarousal/dosa.jpg";
import momos from "/assets/loginCarousal/momos.jpg";
import pavbhaji from "/assets/loginCarousal/pavbhaji.jpg";
import paneer from "/assets/loginCarousal/paneer.jpg";
import cholabhatura from "/assets/loginCarousal/cholabhatura.jpg";
import { useState, useEffect } from "react";

const dishes = [
  {
    key: 0,
    dishName: "Dosa",
    dishOneliner: "Crunchy bliss, bursting with flavor!",
    dishImg: dosa,
  },
  {
    key: 1,
    dishName: "Momos",
    dishOneliner: "Succulent bites of pure delight!",
    dishImg: momos,
  },
  {
    key: 2,
    dishName: "Paneer Makhani",
    dishOneliner: "Creamy indulgence in every spoon!",
    dishImg: paneer,
  },
  {
    key: 3,
    dishName: "Burger",
    dishOneliner: "Satisfying bites of culinary joy!",
    dishImg: burger,
  },
  {
    key: 4,
    dishName: "Pav Bhaji",
    dishOneliner: "Spicy comfort in every bite!",
    dishImg: pavbhaji,
  },
  {
    key: 5,
    dishName: "Chole Bhature",
    dishOneliner: "Rich flavors, pure satisfaction!",
    dishImg: cholabhatura,
  },
];

const DishCard = ({ dishName, dishOneliner, dishImg }) => {
  return (
    <div className="relative h-full w-full">
      <img
        className="h-full w-full object-cover"
        src={dishImg}
        alt={dishName}
        style={{ width: "100%", height: "100%" }}
      />
      <div className="absolute inset-0 flex flex-col-reverse items-end">
        <div className="w-full bg-gradient-to-b from-transparent to-black p-4 text-white">
          <h2 className="mx-6 text-3xl font-bold">{dishName}</h2>
          <p className="text-md mx-6 mb-8">{dishOneliner}</p>
        </div>
      </div>
    </div>
  );
};

const DishCardView = () => {
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveIndex((prevIndex) => (prevIndex + 1) % dishes.length);
    }, 3500); // Change image every 5 seconds

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="mx-auto h-full  w-full max-w-sm">
      {dishes.map((dish, index) => (
        <div
          key={index}
          className={`absolute inset-0 duration-1000 ${
            index === activeIndex ? "opacity-100" : "opacity-0"
          }`}
        >
          <DishCard
            dishName={dish.dishName}
            dishOneliner={dish.dishOneliner}
            dishImg={dish.dishImg}
          />
        </div>
      ))}
    </div>
  );
};

export default DishCardView;
