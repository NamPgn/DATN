import { useEffect, useState } from "react";
import { useMutation } from "react-query";
import { toast } from "react-toastify";

const CLOUDINARY_URL = "https://api.cloudinary.com/v1_1/YOUR_CLOUD_NAME/upload";
const CLOUDINARY_UPLOAD_PRESET = "YOUR_UPLOAD_PRESET";

const RefundModal = ({ setIsModalOpen }: { setIsModalOpen: (val: boolean) => void }) => {
  const [reason, setReason] = useState("");
  const [bankList, setBankList] = useState<any[]>([]);
  const [selectedBank, setSelectedBank] = useState("");
  const [accountName, setAccountName] = useState("");
  const [accountNumber, setAccountNumber] = useState("");
  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);
  const [previewImages, setPreviewImages] = useState<string[]>([]);

  useEffect(() => {
    const fetchBanks = async () => {
      try {
        const res = await fetch("https://api.vietqr.io/v2/banks");
        const data = await res.json();
        setBankList(data.data || []);
      } catch (error) {
        toast.error("Lỗi khi lấy danh sách ngân hàng");
      }
    };
    fetchBanks();
  }, []);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    setSelectedFiles(files);

    const previews = files.map((file) => URL.createObjectURL(file));
    setPreviewImages(previews);
  };

  const uploadImagesMutation = useMutation(async () => {
    const uploadPromises = selectedFiles.map(async (file) => {
      const formData = new FormData();
      formData.append("file", file);
      formData.append("upload_preset", CLOUDINARY_UPLOAD_PRESET);

      const res = await fetch(CLOUDINARY_URL, {
        method: "POST",
        body: formData,
      });

      const data = await res.json();
      return data.secure_url;
    });

    return Promise.all(uploadPromises);
  });

  const refundMutation = useMutation(async () => {
    const uploadedImages = await uploadImagesMutation.mutateAsync();

    const requestData = {
      reason,
      images: uploadedImages,
      bank_name: selectedBank,
      bank_account_name: accountName,
      bank_account_number: accountNumber,
    };

    console.log("Dữ liệu gửi đi:", requestData);

    setTimeout(() => {
      toast.success("Gửi yêu cầu hoàn hàng thành công!");
      setIsModalOpen(false);
    }, 1000);
  });

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white p-6 rounded-lg w-[400px]"  style={{ marginBottom:"200px" }}>
        <h2 className="text-lg font-bold mb-3">Lý do hoàn hàng</h2>

        <textarea
          className="w-full border rounded-md p-2 mb-3"
          placeholder="Nhập lý do..."
          value={reason}
          onChange={(e) => setReason(e.target.value)}
        />

        {/* Chọn ngân hàng */}
        <select
          className="w-full border rounded-md p-2 mb-3"
          value={selectedBank}
          onChange={(e) => setSelectedBank(e.target.value)}
        >
          <option value="">Chọn ngân hàng</option>
          {bankList.map((bank) => (
            <option key={bank.id} value={bank.name}>
              {bank.name}
            </option>
          ))}
        </select>

        {/* Tên tài khoản ngân hàng */}
        <input
          type="text"
          className="w-full border rounded-md p-2 mb-3"
          placeholder="Nhập tên tài khoản"
          value={accountName}
          onChange={(e) => setAccountName(e.target.value)}
        />

        {/* Số tài khoản ngân hàng */}
        <input
          type="text"
          className="w-full border rounded-md p-2 mb-3"
          placeholder="Nhập số tài khoản"
          value={accountNumber}
          onChange={(e) => setAccountNumber(e.target.value)}
        />

        {/* Upload ảnh */}
        <input type="file" multiple accept="image/*" onChange={handleFileChange} className="mb-3" />

        {/* Hiển thị ảnh xem trước */}
        <div className="flex flex-wrap gap-2">
          {previewImages.map((src, index) => (
            <img key={index} src={src} alt="preview" className="w-16 h-16 object-cover rounded-md" />
          ))}
        </div>

        {/* Nút gửi */}
        <div className="mt-4 flex justify-end space-x-2">
          <button className="px-4 py-2 bg-gray-300 rounded-md" onClick={() => setIsModalOpen(false)}>
            Hủy
          </button>
          <button
            className="px-4 py-2 bg-blue-500 text-white rounded-md"
            onClick={() => refundMutation.mutate()}
            disabled={refundMutation.isLoading}
          >
            {refundMutation.isLoading ? "Đang gửi..." : "Gửi yêu cầu"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default RefundModal;
