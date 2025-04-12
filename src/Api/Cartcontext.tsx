import React, { createContext, useState, useContext, ReactNode } from 'react';

// Define product type
interface Product {
  id: string;
  name: string;
  price: number;
  image: string;
  quantity: number;
  size: string;
}

// Define context value type
interface CartContextType {
  cartItems: Product[];
  addToCart: (product: Product, quantity: number, selectedSize: string) => void;
  removeFromCart: (id: string, size: string) => void;
  updateQuantity: (id: string, size: string, quantity: number) => void;
}

// Create context with initial value
const CartContext = createContext<CartContextType | undefined>(undefined);

// Define provider props
interface CartProviderProps {
  children: ReactNode;
}

export const CartProvider: React.FC<CartProviderProps> = ({ children }) => {
  const [cartItems, setCartItems] = useState<Product[]>([]);

  // Add item to cart
  const addToCart = (product: Product, quantity: number, selectedSize: string) => {
    setCartItems(prevCartItems => {
      const existingItemIndex = prevCartItems.findIndex(
        item => item.id === product.id && item.size === selectedSize
      );

      if (existingItemIndex !== -1) {
        const updatedCart = [...prevCartItems];
        updatedCart[existingItemIndex] = {
          ...updatedCart[existingItemIndex],
          quantity: updatedCart[existingItemIndex].quantity + quantity,
        };
        return updatedCart;
      } else {
        return [...prevCartItems, { ...product, quantity, size: selectedSize }];
      }
    });
  };

  // Remove item from cart based on ID & size
  const removeFromCart = (id: string, size: string) => {
    setCartItems(prevCartItems =>
      prevCartItems.filter(item => !(item.id === id && item.size === size))
    );
  };

  // Update quantity of an item based on ID & size
  const updateQuantity = (id: string, size: string, quantity: number) => {
    setCartItems(prevCartItems =>
      prevCartItems.map(item =>
        item.id === id && item.size === size ? { ...item, quantity } : item
      )
    );
  };

  return (
    <CartContext.Provider value={{ cartItems, addToCart, removeFromCart, updateQuantity }}>
      {children}
    </CartContext.Provider>
  );
};

// Custom hook for using the cart
export const useCart = (): CartContextType => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};
