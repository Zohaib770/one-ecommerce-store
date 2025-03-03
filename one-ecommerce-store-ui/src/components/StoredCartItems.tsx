import { CartItem } from "./Interface";

const getStoredCartItems = (): CartItem[] => {
  const storedCartItems = localStorage.getItem("cart");
  return storedCartItems ? JSON.parse(storedCartItems) : [];
};

export default getStoredCartItems;
