import { useState } from "react";
import { useMutation } from "react-query";
import { toast } from "react-toastify";
import { cancleOrderUser } from "../../sevices/client/orders";

const ModalConfirmCancel = ({ setIsModalOpen, order, refetch, nav }: any) => {
  const [reason, setReason] = useState("");

  const { mutate, isLoading } = useMutation({
    mutationFn: async () => {
      await cancleOrderUser({
        code: order?.order_code,
        cancel_reason: reason,
      });
    },
    onSuccess: () => {
      setIsModalOpen(false);
      refetch();
      toast.success("Gửi yêu cầu hủy đơn hàng thành công!");
    },
    onError: () => {
      toast.error("Gửi yêu cầu hủy đơn hàng thất bại");
    },
  });

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div
        className="bg-white p-6 rounded-lg"
        style={{ marginBottom: "200px", width: "600px" }}
      >
        <h2 className="text-lg font-bold mb-3">Lý do hủy đơn hàng</h2>

        <textarea
          className="w-full border rounded-md p-2 mb-3"
          placeholder="Nhập lý do..."
          value={reason}
          onChange={(e) => setReason(e.target.value)}
        />

        {/* Nút gửi */}
        <div className="mt-4 flex justify-end space-x-2">
          <button
            className="px-4 py-2 bg-gray-300 rounded-md"
            onClick={() => setIsModalOpen(false)}
          >
            Hủy
          </button>
          <button
            className="px-4 py-2 bg-blue-500 text-white rounded-md"
            onClick={() => mutate()}
          >
            {isLoading ? "Đang tải..." : "Gửi yêu cầu"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ModalConfirmCancel;
