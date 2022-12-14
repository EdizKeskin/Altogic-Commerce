import { useState, useContext, createContext, useEffect } from "react";

const BasketContext = createContext();
const defaultBasket = JSON.parse(localStorage.getItem("basket")) || [];

const BasketProvider = ({ children }) => {
  const [items, setItems] = useState(defaultBasket);
  const [notification, setNotification] = useState(items.length);

  useEffect(() => {
    localStorage.setItem("basket", JSON.stringify(items));
  }, [items]);

  const addToBasket = (data, findBasketItem) => {
    if (!findBasketItem) {
      return (
        setItems((items) => [data._id, ...items]),
        setNotification(notification + 1)
      );
    }
    const filtered = items.filter((item) => item !== findBasketItem);
    setItems(filtered);
  };

  const removeFromBasket = (item_id) => {
    const filtered = items.filter((item) => item !== item_id);
    setItems(filtered);
  };

  const emptyBasket = () => setItems([]);

  const values = {
    items,
    setItems,
    notification,
    setNotification,
    addToBasket,
    removeFromBasket,
    emptyBasket,
  };

  return (
    <BasketContext.Provider value={values}>{children}</BasketContext.Provider>
  );
};

const useBasket = () => useContext(BasketContext);

export { BasketProvider, useBasket };
