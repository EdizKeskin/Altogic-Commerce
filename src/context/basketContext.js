import { createContext, useState, useEffect, useContext } from "react";

//basket context
const BasketContext = createContext();

export const BasketProvider = ({ children }) => {
  const [basket, setBasket] = useState(
    JSON.parse(localStorage.getItem("basket")) || []
  );

  useEffect(() => {
    localStorage.setItem("basket", JSON.stringify(basket));
  }, [basket]);

  const values = {
    basket,
    setBasket,
  };

  return (
    <BasketContext.Provider value={values}>{children}</BasketContext.Provider>
  );
};

export const useBasket = () => useContext(BasketContext);
