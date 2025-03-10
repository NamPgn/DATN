import {
  createContext,
  useState,
  ReactNode,
  useContext,
  useEffect,
} from "react";

interface CartContextType {
  cart: any[];
  addToCart: (product: any) => void;
}

export const CartContext: any = createContext<CartContextType | null>(null);

export const CartProvider = ({ children }: { children: ReactNode }) => {
  const [cart, setCart] = useState<any[]>([]);
  useEffect(() => {
    const storedCart = JSON.parse(localStorage.getItem("cart") || "[]");
    setCart(storedCart);
  }, []);

  const addToCart = (product: any) => {
    setCart((prevCart) => {
      const existingProductIndex = prevCart.findIndex((item) => item.id === Number(product.id));
  
      let updatedCart;
      if (existingProductIndex !== -1) {
        updatedCart = prevCart.map((item, index) =>
          index === existingProductIndex
            ? { ...item, quantity: item.quantity + product.quantity }
            : item
        );
      } else {
        updatedCart = [...prevCart, product];
      }
  
      localStorage.setItem("cart", JSON.stringify(updatedCart));
  
      return updatedCart;
    });
  };
  
 
  return (
    <CartContext.Provider value={{ cart, addToCart }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
};
