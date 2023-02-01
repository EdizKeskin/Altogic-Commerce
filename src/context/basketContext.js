import { useState, useContext, createContext, useEffect } from "react";

const BasketContext = createContext();
const defaultBasket = JSON.parse(localStorage.getItem("basket")) || [];

const BasketProvider = ({ children }) => {
  const [items, setItems] = useState(defaultBasket);
  const [quantity, setQuantity] = useState(1);
  const [notification, setNotification] = useState(items.length);

  useEffect(() => {
    localStorage.setItem("basket", JSON.stringify(items));
  }, [items, quantity]);

  const addToBasket = (data, findBasketItem) => {
    if (!findBasketItem) {
      return (
        setItems((items) => [
          ...items,
          {
            id: data._id,
            quantity: quantity,
          },
        ]),
        setNotification(notification + 1)
      );
    }
    const filtered = items.filter((item) => item.id !== findBasketItem.id);
    setItems(filtered);
  };

  const removeFromBasket = (item_id) => {
    const filtered = items.filter((item) => item.id !== item_id);
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
    quantity,
    setQuantity,
  };

  return (
    <BasketContext.Provider value={values}>{children}</BasketContext.Provider>
  );
};

const useBasket = () => useContext(BasketContext);

export { BasketProvider, useBasket };
