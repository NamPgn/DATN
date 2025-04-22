// import { useEffect } from "react";
// import Echo from "laravel-echo";
// import Pusher from "pusher-js";
// import { useQueryClient } from "react-query";

// declare global {
// 	interface Window {
// 		Pusher: typeof Pusher;
// 	}
// }
// window.Pusher = Pusher;

// const PusherProvider = () => {
// 	const queryClient = useQueryClient();

// 	useEffect(() => {
// 		const echo = new Echo({
// 			broadcaster: "pusher",
// 			key: "HOANG2K4DEPTRAIDASETUP",
// 			cluster: "mt1",
// 			wsHost: "127.0.0.1",
// 			wsPort: 6001,
// 			forceTLS: false,
// 			disableStats: true,
// 			enabledTransports: ["ws"],
// 		});

// 		echo.channel("admin-orders").listen(".order-send", (event: any) => {
// 			try {
// 				// Nếu backend gửi string JSON
// 				const order = typeof event.data === "string" ? JSON.parse(event.data) : event.data;
// 				console.log("📦 Đơn mới từ WebSocket:", order);

// 				// Cập nhật lại cache react-query
// 				queryClient.setQueryData(["Orders", 1, {}], (old: any) => {
// 					if (!old) return { data: [order] };

// 					return {
// 						...old,
// 						data: [order, ...old.data],
// 					};
// 				});
// 			} catch (err) {
// 				console.error("❌ Lỗi parse dữ liệu:", err);
// 			}
// 		});

// 		return () => {
// 			echo.disconnect();
// 		};
// 	}, [queryClient]);

// 	return null;
// };

// export default PusherProvider;
