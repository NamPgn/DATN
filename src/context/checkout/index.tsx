import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";
import { useCart } from "../Cart/cartContext";

const CheckoutContext = createContext<any | null>(null);

export const CheckoutProvider = ({ children }: { children: ReactNode }) => {
  const { cartLocal }: any = useCart();
  const [checkoutItems, setCheckoutItems] = useState([]);
  const [selectedProducts, setSelectedProducts] = useState<any | number>(() => {
    const store = localStorage.getItem("checkId");
    return store ? JSON.parse(store) : [];
  });
  useEffect(() => {
    if (cartLocal?.length > 0 && selectedProducts.length > 0) {
      const selectedItems = cartLocal.filter((p: any) =>
        selectedProducts.includes(p.id)
      );
      setCheckoutItems(selectedItems);
    }
  }, [selectedProducts, cartLocal]);
  return (
    <CheckoutContext.Provider
      value={{
        checkoutItems,
        setCheckoutItems,
        setSelectedProducts,
        selectedProducts,
      }}
    >
      {children}
    </CheckoutContext.Provider>
  );
};

export const useCheckout = () => useContext(CheckoutContext);
