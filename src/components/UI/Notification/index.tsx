import React, { useEffect, useState } from "react";
import Echo from "laravel-echo";
import Pusher from "pusher-js";

declare global {
  interface Window {
    Pusher: typeof Pusher;
  }
}
window.Pusher = Pusher;
const OrdersNotify = () => {
  const [order, setOrder] = useState<any | null>(null);
  useEffect(() => {
    const echo = new Echo({
      broadcaster: "pusher",
      key: "ce08a57fcf3c755ba29a",
      cluster: "ap1",
      forceTLS: true,
    });

    echo.channel("admin-orders").listen(".order-send", (event: any) => {
      console.log("Order event received:", event);
      setOrder(event);
    });

    return () => {
      echo.disconnect();
    };
  }, []);
  return null;
};

export default OrdersNotify;
