import { useQuery } from "@tanstack/react-query";
import axios from "axios";

const Customhookexample = () => {
  // const fetchProducts = async () => {
  //   const products = await fetch("https://fakestoreapi.com/products");
  //   const data = await products.json();
  //   return data;
  // };

  const fetchProducts = async () => {
    const products = await axios.get("https://fakestoreapi.com/products");
    return products.data;
  };
  console.log(fetchProducts());
  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["products"],
    queryFn: fetchProducts,
  });

  return {
    data,
    isLoading,
    isError,
    error,
  };
};

export default Customhookexample;
