import { useState } from "react";
import { useMutation } from "react-query";
import { toast } from "react-toastify";

const CLOUDINARY_URL = "https://api.cloudinary.com/v1_1/dkrn3fe2o/upload";
const CLOUDINARY_UPLOAD_PRESET = "sevenstyle";

const ModalConfirm = ({ setIsModalOpen }: any) => {
  const [reason, setReason] = useState("");
  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);
  const [previewImages, setPreviewImages] = useState<string[]>([]);
  const uploadImage = async (file: File) => {
    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", CLOUDINARY_UPLOAD_PRESET);
    formData.append("reason", reason);
    const res = await fetch(CLOUDINARY_URL, {
      method: "POST",
      body: formData,
    });

    if (!res.ok) {
      throw new Error("Upload ảnh thất bại");
    }

    const data = await res.json();
    return data.secure_url;
  };
  const { mutate, isLoading } = useMutation({
    mutationFn: async () => {
      const uploadPromises = selectedFiles.map((file) => uploadImage(file));
      return await Promise.all(uploadPromises);
    },
    onSuccess: () => {
      toast.success("Gửi yêu cầu hoàn hàng thành công!");
      setIsModalOpen(false);
    },
    onError: () => {
      toast.error("Tải ảnh lên thất bại, vui lòng thử lại!");
    },
  });
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const filesArray = Array.from(e.target.files);
      setSelectedFiles(filesArray);

      const previews = filesArray.map((file) => URL.createObjectURL(file));
      setPreviewImages(previews);
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white p-6 rounded-lg w-[400px] " style={{ marginBottom:"200px" }}>
        <h2 className="text-lg font-bold mb-3">Lý do hoàn hàng</h2>

        <textarea
          className="w-full border rounded-md p-2 mb-3"
          placeholder="Nhập lý do..."
          value={reason}
          onChange={(e) => setReason(e.target.value)}
        />

        <input
          type="file"
          multiple
          accept="image/*"
          onChange={handleFileChange}
          className="mb-3"
        />

        <div className="flex flex-wrap gap-2">
          {previewImages.map((src, index) => (
            <img
              key={index}
              src={src}
              alt="preview"
              className="w-16 h-16 object-cover rounded-md"
            />
          ))}
        </div>

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

export default ModalConfirm;
