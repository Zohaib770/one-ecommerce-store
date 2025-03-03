import { CartItem } from "./Interface";

const StoredCartItems = (): CartItem[] => {
  
  const storedCartItems = localStorage.getItem("cart");
  return storedCartItems ? JSON.parse(storedCartItems) : [];

};

export default StoredCartItems;
