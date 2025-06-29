import React, { createContext, useContext, useEffect, useState } from 'react';
import { CartItem, StoredCartItem, Product } from '../types/Interface';
import { useAdmin } from './AdminContext';

interface CartContextType {
    saveCartItemToLocalStorage: (cartItem: CartItem) => void;
    updateCartItemQuantityToLocalStorage: (_id: string, quantity: number) => void;
    removeCartItemFromLocalStorage: (_id: string) => void;
    cartItems: CartItem[];
}

const CartContext = createContext<CartContextType>({
    saveCartItemToLocalStorage: () => { },
    updateCartItemQuantityToLocalStorage: () => { },
    removeCartItemFromLocalStorage: () => { },
    cartItems: [],
});

export const CartProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const { products } = useAdmin();
    const [cartItems, setCartItems] = useState<CartItem[]>([]);

    useEffect(() => {
        const stored = localStorage.getItem('cart');
        const storedCartItems: StoredCartItem[] = stored ? JSON.parse(stored) : [];
        const items = storedCartItems.map((storedItem) => {
            const product = products.find((p) => p._id === storedItem._id);
            const finalProduct: Product = product ?? {
                _id: storedItem._id,
                name: '',
                price: 0,
                imageUrl: [],
                description: '',
            };
            return {
                product: finalProduct,
                quantity: storedItem.quantity,
            };
        });
        setCartItems(items);
    }, [products]);

    const saveCartItemToLocalStorage = (cartItem: CartItem) => {
        let updatedCart = [...cartItems];
        const existingIndex = updatedCart.findIndex((item) => item.product._id === cartItem.product._id);
        if (existingIndex !== -1) {
            updatedCart[existingIndex].quantity += cartItem.quantity;
        } else {
            updatedCart.push(cartItem);
        }
        // Update Local Storage
        const stored = updatedCart.map((item) => ({
            _id: item.product._id,
            quantity: item.quantity,
        }));
        localStorage.setItem('cart', JSON.stringify(stored));
        // Update State
        setCartItems(updatedCart);
    };

    const updateCartItemQuantityToLocalStorage = (_id: string, quantity: number) => {
        let updatedCart = cartItems.map((item) =>
            item.product._id === _id ? { ...item, quantity } : item
        );
        const stored = updatedCart.map((item) => ({
            _id: item.product._id,
            quantity: item.quantity,
        }));
        localStorage.setItem('cart', JSON.stringify(stored));
        setCartItems(updatedCart);
    };

    const removeCartItemFromLocalStorage = (_id: string) => {
        let updatedCart = cartItems.filter((item) => item.product._id !== _id);
        const stored = updatedCart.map((item) => ({
            _id: item.product._id,
            quantity: item.quantity,
        }));
        localStorage.setItem('cart', JSON.stringify(stored));
        setCartItems(updatedCart);
    };

    return (
        <CartContext.Provider
            value={{
                saveCartItemToLocalStorage,
                updateCartItemQuantityToLocalStorage,
                removeCartItemFromLocalStorage,
                cartItems,
            }}
        >
            {children}
        </CartContext.Provider>
    );
};

export const useCart = () => useContext(CartContext);
