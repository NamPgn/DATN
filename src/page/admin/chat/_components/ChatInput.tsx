import React, { useState } from 'react';
import { Input, Button, Modal, Rate, Typography } from 'antd';
import { Send, Smile } from 'lucide-react';
import CloudinaryUpload from '../../../../components/CloudinaryUpload';

const { Text, Title } = Typography;

interface ChatInputProps {
	messageText: string;
	onMessageChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
	onSendMessage: () => void;
	onUploadSuccess: (data: any) => void,
	conversation: any
	conversationsAdmin: any[];
	userId: any
}

const ChatInput = ({ messageText, onMessageChange, onSendMessage, onUploadSuccess, conversation, conversationsAdmin, userId }: ChatInputProps) => {
	const findByID = conversationsAdmin?.find((c: any) => c.staff?.id == userId?.id);
	const findStatus = conversationsAdmin?.find((c) => c?.status === 'closed')
	const [isModalOpen, setIsModalOpen] = useState(false);
	const renderChatInput = () => {
		if (conversation?.status === "closed" || findByID?.status === 'closed') {
			return (
				<div className="flex items-center gap-2">
					<span>Cuộc trò chuyện đã kết thúc</span>
					<Button type="primary" onClick={() => setIsModalOpen(true)}>
						Xem đánh giá
					</Button>
				</div>
			);
		}

		if (!findByID) {
			return (
				<div className="text-red-500">
					Bạn không có quyền truy cập cuộc trò chuyện này!
				</div>
			);
		}

		return (
			<div className="flex items-center gap-3 w-full">
				<CloudinaryUpload onUploadSuccess={onUploadSuccess} />
				<Input
					placeholder="Nhập tin nhắn..."
					value={messageText}
					onChange={onMessageChange}
					onPressEnter={onSendMessage}
					suffix={<Smile className="text-gray-400 cursor-pointer" size={20} />}
					bordered={false}
					className="flex-1"
				/>
				<Button
					type="primary"
					icon={<Send size={16} />}
					onClick={onSendMessage}
					className="bg-blue-500"
					disabled={!messageText.trim()}
				>
					Gửi
				</Button>
			</div>
		);
	};

	return (
		<>
			<div className="bg-white rounded-lg p-3 border-t">
				{renderChatInput()}
			</div>

			<Modal
				title="Đánh giá từ khách hàng"
				open={isModalOpen}
				onCancel={() => setIsModalOpen(false)}
				footer={[
					<Button key="close" onClick={() => setIsModalOpen(false)}>
						Đóng
					</Button>
				]}
			>
				<div className="py-4">
					{findStatus?.feedback ? (
						<div className="space-y-4">
							<div>
								<Text type="secondary">Người đánh giá:</Text>
								<Title level={5} className="mt-1">{findStatus.feedback.submitted_by}</Title>
							</div>
							<div>
								<Text type="secondary">Đánh giá:</Text>
								<div className="mt-1">
									<Rate disabled defaultValue={findStatus.feedback.rating} />
								</div>
							</div>
							<div>
								<Text type="secondary">Nhận xét:</Text>
								<Text className="block mt-1">{findStatus.feedback.comment}</Text>
							</div>
							<div>
								<Text type="secondary">Thời gian:</Text>
								<Text className="block mt-1">{findStatus.feedback.created_at}</Text>
							</div>
						</div>
					) : (
						<Text>Chưa có đánh giá từ khách hàng</Text>
					)}
				</div>
			</Modal>
		</>
	);
};

export default ChatInput; 