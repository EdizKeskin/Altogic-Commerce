import { useState, useContext, createContext, useEffect } from "react";
import altogic from "../api/altogic";

const ProductContext = createContext();

const ProductProvider = ({ children }) => {
  const [products, setProducts] = useState([]);
  const [trigger, setTrigger] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    const getProducts = async () => {
      const result = await altogic.db.model("products").get();

      if (!result.errors) {
        setProducts(result.data);
        setTrigger(false);
      }
    };
    getProducts();
    setLoading(false);
  }, [trigger]);

  const values = {
    products,
    setProducts,
    setTrigger,
    trigger,
    loading,
  };

  return (
    <ProductContext.Provider value={values}>{children}</ProductContext.Provider>
  );
};

const useProduct = () => useContext(ProductContext);

export { ProductProvider, useProduct };
