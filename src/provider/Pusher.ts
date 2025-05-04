import { useEffect, useState } from "react";
import Echo from "laravel-echo";
import Pusher from "pusher-js";

declare global {
  interface Window {
    Pusher: typeof Pusher;
  }
}
window.Pusher = Pusher;
const PusherProvider = () => {
  const [_order, setOrder] = useState<any | null>(null);
  useEffect(() => {
    const echo = new Echo({
      broadcaster: "pusher",
      key: "HOANG2K4DEPTRAIDASETUP",
      cluster: "mt1",
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

export default PusherProvider;
