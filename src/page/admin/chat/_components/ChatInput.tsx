import React from 'react';
import { Input, Button } from 'antd';
import { Send, Image as ImageIcon, Smile, Paperclip } from 'lucide-react';
import CloudinaryUpload from '../../../../components/CloudinaryUpload';

interface ChatInputProps {
	messageText: string;
	onMessageChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
	onSendMessage: () => void;
	onUploadSuccess: (data: any) => void
}

const ChatInput = ({ messageText, onMessageChange, onSendMessage, onUploadSuccess }: ChatInputProps) => {
	return (
		<div className="bg-white rounded-lg p-3 flex items-center gap-3 border-t">
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

export default ChatInput; 