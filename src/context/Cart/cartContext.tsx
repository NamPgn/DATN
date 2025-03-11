import {
  createContext,
  useState,
  ReactNode,
  useContext,
  useEffect,
} from "react";
import { useQuery } from "react-query";
import { userCart } from "../../sevices/client/cart";
import { token_auth } from "../../common/auth/getToken";

interface CartContextType {
  cart: any[];
  addToCart: (product: any) => void;
}

export const CartContext: any = createContext<CartContextType | null>(null);

export const CartProvider = ({ children }: { children: ReactNode }) => {
  const [cart, setCart] = useState<any[]>([]);
  const token_ = token_auth();
  useEffect(() => {
    const storedCart = JSON.parse(localStorage.getItem("cart") || "[]");
    setCart(storedCart);
  }, []);
  const { data: cartUser, refetch: refetchCart } = useQuery({
    queryKey: ["userCart"],
    queryFn: async () => {
      return (await userCart())?.data?.data;
    },
    enabled: !!token_,
  });
  const addToCart = (product: any) => {
    setCart((prevCart) => {
      const existingProductIndex = prevCart.findIndex(
        (item) => Number(item.product_id) === Number(product.product_id)
      );

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
    <CartContext.Provider value={{ cart, addToCart, cartUser, refetchCart }}>
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
