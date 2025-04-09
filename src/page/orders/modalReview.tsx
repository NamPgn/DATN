import React, { useState, useEffect } from "react";
import { useMutation } from "react-query";
import { toast } from "react-toastify";
import { orderApi } from "../../sevices/client/orders";

const CLOUDINARY_URL = "https://api.cloudinary.com/v1_1/dkrn3fe2o/upload";
const CLOUDINARY_UPLOAD_PRESET = "sevenstyle";

interface ReviewModalProps {
	isOpen: boolean;
	onClose: () => void;
	orderItemId: number;
	productId: number;
	productName: string;
	productImage: string;
	existingReview?: {
		id: number;
		rating: number;
		content: string;
		images: string[];
	};
	code: string;
	refetch: () => void
}

const ReviewModal: React.FC<ReviewModalProps> = ({
	isOpen,
	onClose,
	orderItemId,
	productId,
	productName,
	productImage,
	existingReview,
	code,
	refetch
}) => {
	const [rating, setRating] = useState<number>(existingReview?.rating || 5);
	const [content, setContent] = useState<string>(existingReview?.content || "");
	const [uploadedImages, setUploadedImages] = useState<string[]>(existingReview?.images || []);
	const [selectedFiles, setSelectedFiles] = useState<File[]>([]);
	const [isUploading, setIsUploading] = useState<boolean>(false);
	const [imagesToRemove, setImagesToRemove] = useState<string[]>([]);

	const isEditing = !!existingReview;

	useEffect(() => {
		if (existingReview) {
			setRating(existingReview.rating);
			setContent(existingReview.content);
			setUploadedImages(existingReview.images || []);
		}
	}, [existingReview]);

	const handleRatingChange = (value: number) => {
		setRating(value);
	};

	const handleContentChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
		setContent(e.target.value);
	};

	const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		if (e.target.files) {
			const filesArray = Array.from(e.target.files);
			if (uploadedImages.length - imagesToRemove.length + selectedFiles.length + filesArray.length > 5) {
				toast.error("Chỉ được phép tải lên tối đa 5 ảnh");
				return;
			}

			setSelectedFiles(prev => [...prev, ...filesArray]);
		}
	};

	const handleRemoveFile = (index: number) => {
		setSelectedFiles(prev => prev.filter((_, i) => i !== index));
	};

	const handleRemoveExistingImage = (url: string) => {
		setImagesToRemove(prev => [...prev, url]);
	};

	const uploadImageToCloudinary = async (file: File): Promise<string> => {
		const formData = new FormData();
		formData.append("file", file);
		formData.append("upload_preset", CLOUDINARY_UPLOAD_PRESET);

		const response = await fetch(CLOUDINARY_URL, {
			method: "POST",
			body: formData,
		});

		if (!response.ok) {
			throw new Error("Failed to upload image");
		}

		const data = await response.json();
		return data.secure_url;
	};

	const uploadImages = async (): Promise<string[]> => {
		if (selectedFiles.length === 0) return [];

		try {
			setIsUploading(true);
			const uploadPromises = selectedFiles.map(file => uploadImageToCloudinary(file));
			const uploadedUrls = await Promise.all(uploadPromises);
			return uploadedUrls;
		} catch (error) {
			console.error("Image upload failed:", error);
			toast.error("Tải ảnh lên thất bại, vui lòng thử lại");
			throw error;
		} finally {
			setIsUploading(false);
		}
	};

	const submitReviewMutation = useMutation({
		mutationFn: async (reviewData: {
			id?: number;
			order_item_id: number;
			product_id: number;
			order_code: string;
			rating: number;
			content: string;
			images: string[];
			is_update?: boolean;
		}) => {
			await orderApi?.reviewsProducts(reviewData)
		},
		onSuccess: () => {
			toast.success(isEditing ? "Cập nhật đánh giá thành công!" : "Đánh giá sản phẩm thành công!");
			onClose();
			setRating(5);
			setContent("");
			setSelectedFiles([]);
			setUploadedImages([]);
			setImagesToRemove([]);
			refetch()
		},
		onError: () => {
			toast.error(isEditing ? "Cập nhật đánh giá thất bại, vui lòng thử lại sau" : "Đánh giá thất bại, vui lòng thử lại sau");
		},
	});

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();

		if (rating === 0) {
			toast.error("Vui lòng chọn số sao đánh giá");
			return;
		}

		if (content.trim() === "") {
			toast.error("Vui lòng nhập nội dung đánh giá");
			return;
		}

		try {
			const newImageUrls = selectedFiles.length > 0 ? await uploadImages() : [];

			const remainingImages = uploadedImages.filter(url => !imagesToRemove.includes(url));

			const allImages = [...remainingImages, ...newImageUrls];

			submitReviewMutation.mutate({
				...(isEditing && { id: existingReview.id }),
				order_item_id: orderItemId,
				product_id: productId,
				order_code: code,
				rating,
				content,
				images: allImages,
				is_update: isEditing,
			});
		} catch (error) {
			console.error("Error submitting review:", error);
		}
	};

	if (!isOpen) return null;

	return (
		<div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
			<div className="bg-white rounded-lg p-6 max-w-2xl w-full max-h-[90vh] overflow-y-auto">
				<div className="flex justify-between items-center mb-4">
					<h3 className="text-xl font-semibold">
						{isEditing ? "Chỉnh sửa đánh giá" : "Đánh giá sản phẩm"}
					</h3>
					<button
						onClick={onClose}
						className="text-gray-500 hover:text-gray-700"
					>
						✕
					</button>
				</div>

				<div className="mb-6 flex items-center gap-4">
					<img
						src={productImage}
						alt={productName}
						className="w-20 h-20 object-cover rounded-md"
					/>
					<div>
						<h4 className="font-medium">{productName}</h4>
					</div>
				</div>

				<form onSubmit={handleSubmit} className="space-y-6">
					<div>
						<label className="block text-sm font-medium text-gray-700 mb-2">
							Đánh giá của bạn
						</label>
						<div className="flex space-x-2">
							{[1, 2, 3, 4, 5].map((star) => (
								<button
									key={star}
									type="button"
									onClick={() => handleRatingChange(star)}
									className="text-3xl focus:outline-none"
								>
									<span className={star <= rating ? "text-yellow-400" : "text-gray-300"}>
										★
									</span>
								</button>
							))}
						</div>
					</div>

					<div>
						<label htmlFor="content" className="block text-sm font-medium text-gray-700 mb-2">
							Nhận xét của bạn
						</label>
						<textarea
							id="content"
							rows={4}
							className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
							placeholder="Nhập nhận xét của bạn về sản phẩm..."
							value={content}
							onChange={handleContentChange}
						></textarea>
					</div>

					<div>
						<label className="block text-sm font-medium text-gray-700 mb-2">
							Thêm hình ảnh (tối đa 5 ảnh)
						</label>

						{/* Existing images */}
						{uploadedImages.length > 0 && (
							<div className="mb-4">
								<p className="text-sm font-medium text-gray-700 mb-2">
									Hình ảnh hiện tại:
								</p>
								<div className="grid grid-cols-3 gap-4">
									{uploadedImages.map((imageUrl, index) => (
										!imagesToRemove.includes(imageUrl) && (
											<div key={`existing-${index}`} className="relative group">
												<img
													src={imageUrl}
													alt={`Review ${index}`}
													className="w-full h-24 object-cover rounded-md"
												/>
												<button
													type="button"
													onClick={() => handleRemoveExistingImage(imageUrl)}
													className="absolute z-9 top-1 right-1 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center"
												>
													✕
												</button>
											</div>
										)
									))}
								</div>
							</div>
						)}

						<div className="border-2 border-dashed border-gray-300 p-6 rounded-md text-center">
							<input
								type="file"
								accept="image/*"
								multiple
								onChange={handleFileChange}
								className="hidden"
								id="review-images"
								disabled={(uploadedImages.length - imagesToRemove.length + selectedFiles.length) >= 5}
							/>
							<label
								htmlFor="review-images"
								className={`inline-block px-4 py-2 bg-blue-500 text-white rounded-md cursor-pointer ${(uploadedImages.length - imagesToRemove.length + selectedFiles.length) >= 5
									? "opacity-50 cursor-not-allowed"
									: "hover:bg-blue-600"
									}`}
							>
								Chọn ảnh
							</label>
							<p className="text-xs text-gray-500 mt-2">
								Hỗ trợ: JPG, PNG, GIF (Tối đa 5MB/ảnh)
							</p>
						</div>

						{/* New images preview */}
						{selectedFiles.length > 0 && (
							<div className="mt-4">
								<p className="text-sm font-medium text-gray-700 mb-2">
									Hình ảnh mới:
								</p>
								<div className="grid grid-cols-3 gap-4">
									{selectedFiles.map((file, index) => (
										<div key={`new-${index}`} className="relative group">
											<img
												src={URL.createObjectURL(file)}
												alt={`Preview ${index}`}
												className="w-full h-24 object-cover rounded-md"
											/>
											<button
												type="button"
												onClick={() => handleRemoveFile(index)}
												className="absolute top-1 right-1 text-white rounded-full w-6 h-6 flex items-center justify-center transition-opacity"
											>
												✕
											</button>
										</div>
									))}
								</div>
							</div>
						)}
					</div>

					<div className="flex justify-end space-x-3">
						<button
							type="button"
							onClick={onClose}
							className="px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-md"
							disabled={submitReviewMutation.isLoading || isUploading}
						>
							Hủy
						</button>
						<button
							type="submit"
							className="px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-md"
							disabled={submitReviewMutation.isLoading || isUploading}
						>
							{submitReviewMutation.isLoading || isUploading ? (
								<span className="flex items-center">
									<svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
										<circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
										<path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
									</svg>
									Đang xử lý...
								</span>
							) : (
								isEditing ? "Cập nhật đánh giá" : "Gửi đánh giá"
							)}
						</button>
					</div>
				</form>
			</div>
		</div>
	);
};

export default ReviewModal;
