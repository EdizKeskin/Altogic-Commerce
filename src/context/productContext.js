import { useState, useContext, createContext, useEffect } from "react";
import altogic from "../api/altogic";

const ProductContext = createContext();

const ProductProvider = ({ children }) => {
  const [products, setProducts] = useState([]);
  const [trigger, setTrigger] = useState(false);

  useEffect(() => {
    const getProducts = async () => {
      const result = await altogic.db.model("products").get();

      if (!result.errors) {
        setProducts(result.data);
        setTrigger(false);
      }
    };
    getProducts();
  }, [trigger]);

  const values = {
    products,
    setTrigger,
    trigger
  };

  return (
    <ProductContext.Provider value={values}>{children}</ProductContext.Provider>
  );
};

const useProduct = () => useContext(ProductContext);

export { ProductProvider, useProduct };
