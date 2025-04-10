import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import { BrowserRouter } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "react-query";
import { ConfigProvider } from "antd";
import { UserContextProvider } from "./context/usersContext/index.tsx";
import { CartProvider } from "./context/Cart/cartContext.tsx";
import { CheckoutProvider } from "./context/checkout/index.tsx";
const queryClient = new QueryClient();

createRoot(document.getElementById("root")!).render(
  <ConfigProvider
    theme={{
      token: {
        colorPrimary: "#4CAF50",
        colorText: "#212121",
        colorBgBase: "#f9f9f9",
        colorBgContainer: "#ffffff",
        borderRadius: 9,
        fontSize: 14,
        boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
        paddingLG: 16,
      },
      components: {
        Button: {
          borderRadius: 8,
          colorPrimaryHover: "#388E3C",
        },
        Menu: {
          itemHoverBg: "#e8f5e9",
          itemHoverColor: "#4CAF50",
          borderRadius: 8,
        },
        Popover: {
          colorBgBase: "#ffffff",
          colorBgElevated: "#e8f5e9",
          colorBorder: "#4CAF50",
          colorText: "#212121",
        },
        Input: {
          borderRadius: 5,
        },
      },
    }}
  >
    <QueryClientProvider client={queryClient}>
      <CartProvider>
        <CheckoutProvider>
            <UserContextProvider>
              <BrowserRouter>
                <App />
              </BrowserRouter>
            </UserContextProvider>
        </CheckoutProvider>
      </CartProvider>
    </QueryClientProvider>
  </ConfigProvider>
);
