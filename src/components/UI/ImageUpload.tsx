import React, { useState } from 'react';
import { FaImage, FaTimes } from 'react-icons/fa';

const CLOUDINARY_URL = "https://api.cloudinary.com/v1_1/dkrn3fe2o/upload";
const CLOUDINARY_UPLOAD_PRESET = "sevenstyle";
interface ImageUploadProps {
    onUploadComplete: (attachments: Array<{ url: string; type: string; name: string }>) => void;
}

const ImageUpload: React.FC<ImageUploadProps> = ({ onUploadComplete }) => {
    const [uploading, setUploading] = useState(false);
    const [previewImages, setPreviewImages] = useState<Array<{ url: string; file: File }>>([]);

    const uploadToCloudinary = async (file: File) => {
        const formData = new FormData();
        formData.append('file', file);
        formData.append('upload_preset', CLOUDINARY_UPLOAD_PRESET);

        try {
            const response = await fetch(
                CLOUDINARY_URL,
                {
                    method: 'POST',
                    body: formData,
                }
            );
            const data = await response.json();
            return data.secure_url;
        } catch (error) {
            console.error('Error uploading to Cloudinary:', error);
            return null;
        }
    };

    const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const files = e.target.files;
        if (!files) return;

        setUploading(true);
        const newPreviewImages: Array<{ url: string; file: File }> = [];

        for (let i = 0; i < files.length; i++) {
            const file = files[i];
            const previewUrl = URL.createObjectURL(file);
            newPreviewImages.push({ url: previewUrl, file });
        }

        setPreviewImages([...previewImages, ...newPreviewImages]);
        setUploading(false);
    };

    const handleUpload = async () => {
        setUploading(true);
        const uploadedAttachments = [];

        for (const image of previewImages) {
            const cloudinaryUrl = await uploadToCloudinary(image.file);
            if (cloudinaryUrl) {
                uploadedAttachments.push({
                    url: cloudinaryUrl,
                    type: 'image',
                    name: image.file.name,
                });
            }
        }

        onUploadComplete(uploadedAttachments);
        setPreviewImages([]);
        setUploading(false);
    };

    const removeImage = (index: number) => {
        const newPreviewImages = [...previewImages];
        URL.revokeObjectURL(newPreviewImages[index].url);
        newPreviewImages.splice(index, 1);
        setPreviewImages(newPreviewImages);
    };

    return (
        <div className="mt-2">
            <div className="flex items-center gap-2">
                <label className="cursor-pointer">
                    <input
                        type="file"
                        multiple
                        accept="image/*"
                        className="hidden"
                        onChange={handleFileChange}
                    />
                    <FaImage className="text-blue-500 text-xl hover:text-blue-600" />
                </label>
                {previewImages.length > 0 && (
                    <button
                        onClick={handleUpload}
                        disabled={uploading}
                        className="bg-blue-500 text-white px-3 py-1 rounded-md text-sm hover:bg-blue-600 disabled:opacity-50"
                    >
                        {uploading ? 'Đang tải lên...' : 'Tải lên'}
                    </button>
                )}
            </div>

            {previewImages.length > 0 && (
                <div className="flex flex-wrap gap-2 mt-2">
                    {previewImages.map((image, index) => (
                        <div key={index} className="relative">
                            <img
                                src={image.url}
                                alt={`Preview ${index + 1}`}
                                className="w-20 h-20 object-cover rounded-md"
                            />
                            <button
                                onClick={() => removeImage(index)}
                                className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1"
                            >
                                <FaTimes size={12} />
                            </button>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default ImageUpload; 