import {
  createContext,
  useState,
  ReactNode,
  useContext,
  useEffect,
} from "react";
import { useMutation, useQuery } from "react-query";
import { getCart, userCart } from "../../sevices/client/cart";
import { token_auth } from "../../common/auth/getToken";

interface CartContextType {
  cart: any[];
  addToCart: (product: any) => void;
}

export const CartContext: any = createContext<CartContextType | null>(null);

export const CartProvider = ({ children }: { children: ReactNode }) => {
  const [cart, setCart] = useState([]);
  const [cartLocal, setCartLocal] = useState([]);
  const token_ = token_auth();
  const [reset, setReset] = useState(false);
  const { data: cartUser, refetch: refetchCart } = useQuery({
    queryKey: ["userCart"],
    queryFn: async () => {
      return (await userCart())?.data?.data;
    },
    enabled: !!token_,
  });

  const cartData = cart?.map((item: any) => ({
    variant: item.variant_id,
    quantity: item.quantity,
  }));

  const { mutate } = useMutation({
    mutationFn: async () => {
      return await getCart(cartData);
    },
    onSuccess: ({ data }: any) => {
      setCartLocal(data?.data);
    },
  });

  useEffect(() => {
    const storedCart = JSON.parse(localStorage.getItem("cart") || "[]");
    setCart(storedCart);
  }, []);
  useEffect(() => {
    if (cartUser && cartUser.length > 0) {
      console.log('abc')
      setCartLocal(cartUser);
    }
  }, [cartUser]);
  useEffect(() => {
    if (cart && cart?.length > 0) {
      console.log("Calling mutate...");
      mutate();
    }
  }, [cart]);
  const addToCart = (product: any) => {
    setCart((prevCart: any) => {
      const existingProductIndex = prevCart.findIndex(
        (item: any) => Number(item.product_id) === Number(product.product_id)
      );

      let updatedCart;
      if (existingProductIndex !== -1) {
        updatedCart = prevCart.map((item: any, index: any) =>
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
    <CartContext.Provider
      value={{
        cart,
        addToCart,
        cartUser,
        refetchCart,
        cartLocal,
        setCartLocal,
        setCart,
        mutate,
        // setReset,
      }}
    >
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
