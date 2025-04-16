import React, { useState, useEffect } from 'react';
import { FaComment, FaTimes, FaPaperPlane, FaPlus } from 'react-icons/fa';
import { useCreateChatConversation, useGetChatConversation, useGetChatConversationMessages, useSendMessage } from '../../hook/chat';
import { generateUUID } from '../../utils/uuid';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import TailwindComponent from '../Tailwind/TailwinComponent';
import { useQueryClient } from 'react-query';
import ImageUpload from './ImageUpload';
import { token_auth } from '../../common/auth/getToken';

const guestFormSchema = z.object({
	guest_name: z.string().min(1, 'Vui lòng nhập tên'),
	guest_email: z.string().email('Email không hợp lệ'),
	guest_phone: z.string().regex(/^[0-9]{10}$/, 'Số điện thoại không hợp lệ'),
});

type GuestFormData = z.infer<typeof guestFormSchema>;

const Chat = () => {
	const [isOpen, setIsOpen] = useState(false);
	const [newMessage, setNewMessage] = useState('');
	const [isGuest, setIsGuest] = useState(false);
	const [guestId, setGuestId] = useState<string | null>(null);
	const [attachments, setAttachments] = useState<Array<{ url: string; type: string; name: string }>>([]);
	const queryClient = useQueryClient();
	const token_ = token_auth();
	const { data }: any = useGetChatConversation(guestId || '', {
		enabled: !!guestId || !!token_,
	});
	const { data: msg }: any = useGetChatConversationMessages(data?.data?.conversation?.id || '', {
		enabled: !!data?.data?.conversation?.id,
		onSuccess: (data: any) => {
			if (data?.messages) {
				const formattedMessages = data.messages.map((msg: any) => ({
					id: msg.id,
					content: msg.content,
					sender_type: msg.sender_type === 'system'
						? 'system'
						: msg.sender_type === 'customer' || msg.sender_type === 'user'
							? 'user'
							: 'bot',
					timestamp: msg.created_at,
					senderName: msg.sender_name,
					attachments: msg.attachments
				}));
			}
		}
	});

	const { register, handleSubmit, formState: { errors } } = useForm<GuestFormData>({
		resolver: zodResolver(guestFormSchema),
	});


	const { mutate: createChatConversation }: any = useCreateChatConversation({
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ['conversation', guestId] });
		},
	});

	const { mutate: sendMessage }: any = useSendMessage({
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ['conversation-messages', data?.data?.conversation?.id] });
		},
	});

	useEffect(() => {
		if (token_) {
			setGuestId(null);
		} else {
			const storedGuestId = localStorage.getItem('guest_id');
			if (storedGuestId) {
				setGuestId(storedGuestId);
			} else {
				const newGuestId = generateUUID();
				setGuestId(newGuestId);
				localStorage.setItem('guest_id', newGuestId);
			}
		}
	}, [token_]);

	const handleSendMessage = (e: React.FormEvent) => {
		e.preventDefault();
		if (newMessage.trim() || attachments.length > 0) {
			const dataMSG: any = {
				conversation_id: data?.data?.conversation?.id,
				content: newMessage,
				guest_id: token_ ? null : guestId,
				attachments: attachments
			}
			sendMessage(dataMSG);
			setNewMessage('');
			setAttachments([]);
		}
	};

	const handleCreateNewConversation = () => {
		if (token_) {
			createChatConversation({});
		} else {
			setIsGuest(true);
		}
	};

	const onSubmitGuestForm = (data: GuestFormData) => {
		const guestData: any = {
			guest_id: guestId,
			...data
		};
		createChatConversation(guestData);
		setIsGuest(false);
	};

	const handleUploadComplete = (uploadedAttachments: Array<{ url: string; type: string; name: string }>) => {
		setAttachments(uploadedAttachments);
	};

	const renderAttachments = (attachments: Array<{ url: string; type: string; name: string }>) => {
		return attachments.map((attachment, index) => (
			<div key={index} className="mt-2">
				{attachment.type === 'image' && (
					<img
						src={attachment.url}
						alt={attachment.name}
						className="max-w-[200px] rounded-lg"
					/>
				)}
				<div className="text-xs text-gray-500 mt-1">{attachment.name}</div>
			</div>
		));
	};

	const renderMessage = (message: any) => {
		if (message.sender_type === 'system') {
			return (
				<div className="flex justify-center mb-4">
					<div className="bg-gray-100 text-gray-600 text-sm px-4 py-2 rounded-lg max-w-xs">
						{message.content}
						{message.sender_name && (
							<div className="text-xs mt-1 text-gray-500">
								{message.sender_name}
							</div>
						)}
						{message.attachments && message.attachments.length > 0 && renderAttachments(message.attachments)}
					</div>
				</div>
			);
		}

		const isUser = message.sender_type === 'user' || message.sender_type === 'customer' || message.sender_type === 'guest';
		return (
			<div className={`mb-4 flex ${isUser ? 'justify-end' : 'justify-start'} w-full`}>
				<div className={`rounded-lg p-3 ${isUser
					? 'bg-blue-500 text-white ml-auto max-w-[80%]'
					: 'bg-white text-gray-800 shadow mr-auto max-w-[80%]'
					}`}>
					<div className="break-words">{message.content}</div>
					{message.attachments && message.attachments.length > 0 && renderAttachments(message.attachments)}
					<div className={`text-xs mt-1 ${isUser ? 'text-blue-100' : 'text-gray-500'}`}>
						{message.created_at ? new Date(message.created_at).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) : ''}
					</div>
				</div>
			</div>
		);
	};
	return (
		<TailwindComponent>
			<button
				onClick={() => setIsOpen(!isOpen)}
				className="fixed bottom-6 right-6 bg-blue-600 text-white p-4 rounded-full shadow-lg hover:bg-blue-700 transition-all duration-300 z-50"
			>
				{isOpen ? <FaTimes size={24} /> : <FaComment size={24} />}
			</button>

			{isOpen && (
				<div className="fixed bottom-24 right-6 w-96 bg-white rounded-lg shadow-xl z-50">
					<div className="bg-blue-600 text-white p-4 rounded-t-lg flex items-center justify-between">
						<div className="flex items-center">
							<div className="w-3 h-3 bg-green-400 rounded-full mr-2"></div>
							<h3 className="font-semibold text-white">Chat với chúng tôi</h3>
						</div>
						<button
							onClick={() => setIsOpen(false)}
							className="text-white hover:text-gray-200"
						>
							<FaTimes />
						</button>
					</div>

					{/* Chat Messages */}
					<div className="h-96 overflow-y-auto p-4 bg-gray-50">
						{!data?.data?.conversation && !data?.data?.conversation?.customer_id ? (
							<div className="flex flex-col items-center justify-center h-full">
								{isGuest ? (
									<form onSubmit={handleSubmit(onSubmitGuestForm)} className="w-full space-y-4">
										<div>
											<label className="block text-sm font-medium text-gray-700">Tên</label>
											<input
												{...register('guest_name')}
												className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
											/>
											{errors.guest_name && (
												<p className="mt-1 text-sm text-red-600">{errors.guest_name.message}</p>
											)}
										</div>
										<div>
											<label className="block text-sm font-medium text-gray-700">Email</label>
											<input
												type="email"
												{...register('guest_email')}
												className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
											/>
											{errors.guest_email && (
												<p className="mt-1 text-sm text-red-600">{errors.guest_email.message}</p>
											)}
										</div>
										<div>
											<label className="block text-sm font-medium text-gray-700">Số điện thoại</label>
											<input
												{...register('guest_phone')}
												className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
											/>
											{errors.guest_phone && (
												<p className="mt-1 text-sm text-red-600">{errors.guest_phone.message}</p>
											)}
										</div>
										<button
											type="submit"
											className="w-full flex items-center justify-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors duration-300"
										>
											<FaPlus />
											Bắt đầu trò chuyện
										</button>
									</form>
								) : (
									<button
										onClick={handleCreateNewConversation}
										className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors duration-300"
									>
										<FaPlus />
										Tạo cuộc trò chuyện mới
									</button>
								)}
							</div>
						) : (
							msg?.messages?.map((message: any) => renderMessage(message))
						)}
					</div>

					{/* Chat Input */}
					{data?.data?.conversation && (
						<form onSubmit={handleSendMessage} className="p-4 border-t">
							<div className="flex flex-col">
								<div className="flex items-center">
									<input
										type="text"
										value={newMessage}
										onChange={(e) => setNewMessage(e.target.value)}
										placeholder="Nhập tin nhắn..."
										className="flex-1 border rounded-l-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
									/>
									<button
										type="submit"
										className="bg-blue-600 text-white px-4 py-2 rounded-r-lg hover:bg-blue-700 transition-colors duration-300"
									>
										<FaPaperPlane />
									</button>
								</div>
								<ImageUpload onUploadComplete={handleUploadComplete} />
								{attachments.length > 0 && (
									<div className="mt-2 flex flex-wrap gap-2">
										{attachments.map((attachment, index) => (
											<div key={index} className="relative">
												<img
													src={attachment.url}
													alt={attachment.name}
													className="w-20 h-20 object-cover rounded-md"
												/>
												<div className="text-xs text-gray-500 mt-1 truncate max-w-[80px]">
													{attachment.name}
												</div>
											</div>
										))}
									</div>
								)}
							</div>
						</form>
					)}
				</div>
			)}
		</TailwindComponent>
	);
};

export default Chat;