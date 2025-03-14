// src/components/OrderNotification.js
import React, { useEffect, useState } from 'react';
import Echo from 'laravel-echo';
import Pusher from 'pusher-js';

const OrderNotification = () => {
    const [order, setOrder] = useState(null);

    useEffect(() => {
        // Cấu hình Pusher
        window.Pusher = Pusher;
        const echo = new Echo({
            broadcaster: 'pusher',
            key: 'a02d8b22fd9487864dc7',
            cluster: 'ap1',
            forceTLS: true,
        });

        // Lắng nghe kênh admin-orders
        echo.channel('admin-orders')
            .listen('OrderEvent', (event) => {
                setOrder(event);
                alert(`Đơn hàng: ${event.order_code},
		       Người mua: ${event.o_name}, 
		       Tổng tiền: ${event.final_amount},
		       Vào lúc: ${event.created_at} `)
            });

        return () => {
            echo.disconnect();
        };
    }, []);

    return (
        <div>
            {order ? (
                <div>
                    <h4>Đơn hàng: {order.order_code}</h4>
		    <p>Người mua: {order.o_name}</p>
		    <p>Tổng tiền: {order.final_amount}</p>
		    <p>Vào lúc: {order.created_at}</p>
                </div>
            ) : (
                <p>No new orders.</p>
            )}
        </div>
    );
};

export default OrderNotification;