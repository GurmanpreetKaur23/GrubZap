import React, { createContext, useState } from "react";
import { food_list as initialFoodList } from "../assets/assets";

export const StoreContext = createContext({
  foodList: [],
  setFoodList: (foodList) => {},
});

const StoreContextProvider = (props) => {
  const [foodList, setFoodList] = useState(initialFoodList);

  return (
    <StoreContext.Provider value={{ foodList, setFoodList }}>
      {props.children}
    </StoreContext.Provider>
  );
};

export default StoreContextProvider;
