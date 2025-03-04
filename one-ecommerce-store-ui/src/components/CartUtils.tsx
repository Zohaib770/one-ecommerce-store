import { StoredCartItem, CartItem } from "./Interface";
import ProductList from "./ProductList";

export const getStoredCartItems = (): StoredCartItem[] => {
  const storedCartItems = localStorage.getItem("cart");
  return storedCartItems ? JSON.parse(storedCartItems) : [];
};

export const saveCartItems = (cartItems: StoredCartItem[]): void => {
  localStorage.setItem("cart", JSON.stringify(cartItems));
};

// Convert StoredCartItem to CartItem (retrieves the full product details)
export const getCartItems = (storedCartItems: StoredCartItem[]): CartItem[] => {
  return storedCartItems.map((storedItem) => {
    const product = ProductList.find((product) => product.id === storedItem.id);
    if (product) {
      return { ...product, quantity: storedItem.quantity };
    }
    return { id: storedItem.id, name: "", price: 0, image: [], description: "", quantity: storedItem.quantity };
  });
};