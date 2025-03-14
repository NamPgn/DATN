import { Link } from "react-router-dom";
import TailwindComponent from "../../components/Tailwind/TailwinComponent";

const ThankYou = () => {
  return (
    <TailwindComponent>
      <div
        style={{ backgroundColor: "#fff" }}
        className="flex flex-col items-center justify-center min-h-screen"
      >
        <h1 className="text-3xl font-bold" style={{ color: "#0e7567" }}>
          Cảm ơn bạn đã mua hàng!
        </h1>
        <p className="mt-4 text-lg" style={{ color: "#0e7567" }}>
          Chúng tôi sẽ xử lý đơn hàng của bạn sớm nhất có thể.
        </p>
        <Link
          to="/profile/order-history"
          style={{
            backgroundColor: "#249687",
            color: "white",
            padding: "0.5rem 1rem",
            borderRadius: "0.375rem",
          }}
          className="mt-6 hover:bg-orange-700"
        >
          Xem đơn hàng
        </Link>
        <Link
          to="/"
          style={{
            backgroundColor: "#249687",
            color: "white",
            padding: "0.5rem 1rem",
            borderRadius: "0.375rem",
          }}
          className="mt-6 hover:bg-orange-700"
        >
          Trở về trang chủ
        </Link>
      </div>
    </TailwindComponent>
  );
};

export default ThankYou;
