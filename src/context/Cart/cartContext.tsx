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
import { toast } from "react-toastify";

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
      if (data?.data) {
        setCartLocal(data.data);
      }
    },
  });
  useEffect(() => {
    console.log("Cart Local:", cartLocal);
  }, [cartLocal]);

  useEffect(() => {
    const storedCart = JSON.parse(localStorage.getItem("cart") || "[]");
    setCart(storedCart);
  }, []);
  useEffect(() => {
    if (cartUser && token_) {
      console.log("abc");
      setCartLocal(cartUser);
    }
  }, [cartUser]);
  useEffect(() => {
    if (cart && !token_) {
      console.log("Calling mutate...");
      mutate();
    }
  }, [cart]);
  const addToCart = (product: any): boolean => {
    let isAdded = false;

    setCart((prevCart: any) => {
      const existingProductIndex = prevCart.findIndex(
        (item: any) => Number(item.variant_id) === Number(product.variant_id)
      );

      let updatedCart;
      if (existingProductIndex !== -1) {
        const existingProduct = prevCart[existingProductIndex];
        const newQuantity = existingProduct.quantity + product.quantity;

        if (newQuantity > product.stock_quantity) {
          toast.error("Bạn đã thêm tối đa số lượng sản phẩm này!");
          return prevCart;
        }

        updatedCart = prevCart.map((item: any, index: any) =>
          index === existingProductIndex
            ? { ...item, quantity: newQuantity }
            : item
        );
      } else {
        if (product.quantity > product.stock_quantity) {
          toast.error("Bạn đã thêm tối đa số lượng sản phẩm này!");
          return prevCart;
        }

        updatedCart = [...prevCart, product];
      }

      localStorage.setItem("cart", JSON.stringify(updatedCart));
      isAdded = true;
      return updatedCart;
    });

    return isAdded;
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
