import { Button, Upload, message, Image } from 'antd';
import type { UploadFile, RcFile } from 'antd/es/upload/interface';
import { useState } from 'react';
import { ImageIcon, X } from 'lucide-react';

const CLOUDINARY_URL = "https://api.cloudinary.com/v1_1/dkrn3fe2o/upload";
const CLOUDINARY_UPLOAD_PRESET = "sevenstyle";

interface CloudinaryUploadProps {
	onUploadSuccess?: (urls: string[]) => void;
}

const CloudinaryUpload = ({ onUploadSuccess }: CloudinaryUploadProps) => {
	const [isLoading, setIsLoading] = useState(false);
	const [fileList, setFileList] = useState<UploadFile[]>([]);
	const [imageUrls, setImageUrls] = useState<string[]>([]);
	const beforeUpload = (file: RcFile, fileList: any) => {
		const isLt1M = file.size < 1024 * 1024;
		if (!isLt1M) {
			message.error('Ảnh phải nhỏ hơn 1MB!');
			return false;
		}
		if (fileList.length >= 2) {
			message.error('Chỉ được tải lên tối đa 2 ảnh!');
			return false;
		}
		return true;
	};

	const handleChange = ({ fileList: newFileList, file }: any) => {
		setFileList(newFileList);

		if (file.status === 'uploading') {
			setIsLoading(true);
		} else if (file.status === 'done') {
			const uploadedUrl = file.response;
			if (uploadedUrl) {
				setImageUrls(prev => [...prev, uploadedUrl]);
				if (onUploadSuccess) {
					onUploadSuccess([...imageUrls, uploadedUrl]);
				}
			}
			setIsLoading(false);
		} else if (file.status === 'error') {
			message.error('Tải ảnh thất bại!');
			setIsLoading(false);
		}
	};
	const handleRemoveImage = (index: number) => {
		const newUrls = [...imageUrls];
		newUrls.splice(index, 1);
		setImageUrls(newUrls);
		onUploadSuccess?.(newUrls);
	};
	return (
		<div className="flex flex-col gap-2">
			{imageUrls.length > 0 && (
				<div className="grid grid-cols-2 gap-2 max-w-[300px]">
					{imageUrls.map((url: any, index) => (
						<div className="relative group" key={index}>
							<Image
								src={url.secure_url}
								alt={`Uploaded ${index + 1}`}
								className="w-full h-[120px] object-cover rounded-lg"
								preview={{
									mask: false
								}}
							/>
							<Button
								type="text"
								size="small"
								className="absolute top-1 right-1 p-0 opacity-0 group-hover:opacity-100 transition-opacity duration-200 text-white bg-black/60 hover:bg-black/80 rounded-full"
								onClick={() => handleRemoveImage(index)}
								icon={<X size={16} />}
							/>
						</div>
					))}
				</div>
			)}

			<div>
				<Upload
					multiple
					action={CLOUDINARY_URL}
					fileList={fileList}
					onChange={handleChange}
					beforeUpload={beforeUpload}
					showUploadList={false}
					data={() => ({
						upload_preset: CLOUDINARY_UPLOAD_PRESET
					})}
				>
					{imageUrls.length < 2 && (
						<Button 
							type="text" 
							loading={isLoading} 
							icon={<ImageIcon size={20} />}
							className="hover:bg-gray-100 transition-colors"
						/>
					)}
				</Upload>
			</div>
		</div>
	);
};

export default CloudinaryUpload; 