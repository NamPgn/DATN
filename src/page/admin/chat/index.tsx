import React, { useState } from 'react';
import { Layout, List, Avatar, Input, Button, Badge, Tooltip, Typography } from 'antd';
import { MessageSquare, Phone, Video, MoreHorizontal, Search, Send, Image as ImageIcon, Smile, Paperclip } from 'lucide-react';
import { useGetChatConversations, useGetChatConversationMessages, useSendMessage } from '../../../hook/chat';
import TailwindComponent from '../../../components/Tailwind/TailwinComponent';

const { Header, Sider, Content } = Layout;
const { Search: SearchInput } = Input;
const { Text } = Typography;

const AdminChat = () => {
	const [selectedChat, setSelectedChat] = useState<string | null>(null);
	const [messageText, setMessageText] = useState('');
	const [searchQuery, setSearchQuery] = useState('');

	const { data: conversations }: any = useGetChatConversations({});
	const { data: messages }: any = useGetChatConversationMessages(selectedChat || '', {
		enabled: !!selectedChat
	});

	const { mutate: sendMessage }: any = useSendMessage({
		onSuccess: () => {
			setMessageText('');
		}
	});

	const handleSendMessage = () => {
		if (!messageText.trim() || !selectedChat) return;

		sendMessage({
			conversation_id: selectedChat,
			content: messageText,
			attachments: []
		});
	};

	const filteredConversations = conversations?.data?.filter((conv: any) =>
		conv.guest_name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
		conv.customer?.email?.toLowerCase().includes(searchQuery.toLowerCase())
	) || [];

	return (
		<TailwindComponent>
			<Layout className="h-screen">
				<Sider width={300} className="bg-white border-r">
					<div className="p-4">
						<SearchInput
							placeholder="Tìm kiếm cuộc trò chuyện..."
							onChange={(e) => setSearchQuery(e.target.value)}
							className="mb-4"
						/>
						<List
							className="conversations-list"
							itemLayout="horizontal"
							dataSource={filteredConversations}
							renderItem={(conversation: any) => {
								const isGuest = !!conversation.guest_id;
								const name = isGuest ? conversation.guest_name : conversation.customer?.email;
								const lastMessage = conversation.last_message;

								return (
									<List.Item
										className={`cursor-pointer hover:bg-gray-50 p-3 rounded-lg transition-colors ${selectedChat === conversation.id ? 'bg-blue-50' : ''
											}`}
										onClick={() => setSelectedChat(conversation.id)}
									>
										<List.Item.Meta
											avatar={
												<Badge
													dot
													status={conversation.is_active ? 'success' : 'default'}
													offset={[-4, 32]}
												>
													<Avatar
														className="bg-blue-500"
														icon={<MessageSquare size={20} />}
													/>
												</Badge>
											}
											title={
												<div className="flex justify-between items-center">
													<Text strong>{name || 'Khách vãng lai'}</Text>
													<Text className="text-xs text-gray-500">
														{lastMessage?.created_at &&
															new Date(lastMessage.created_at).toLocaleTimeString([], {
																hour: '2-digit',
																minute: '2-digit'
															})}
													</Text>
												</div>
											}
											description={
												<Text className="text-sm text-gray-500 line-clamp-1">
													{lastMessage?.content || 'Chưa có tin nhắn'}
												</Text>
											}
										/>
									</List.Item>
								);
							}}
						/>
					</div>
				</Sider>

				<Layout>
					{selectedChat ? (
						<>
							<Header className="bg-white p-4 border-b flex justify-between items-center">
								<div className="flex items-center gap-3">
									<Avatar
										size="large"
										className="bg-blue-500"
										icon={<MessageSquare size={24} />}
									/>
									<div>
										<Text strong className="text-lg">
											{filteredConversations.find((c: any) => c.id === selectedChat)?.guest_name ||
												'Khách vãng lai'}
										</Text>
										<Text className="block text-sm text-gray-500">Đang hoạt động</Text>
									</div>
								</div>
								<div className="flex gap-4">
									<Tooltip title="Gọi thoại">
										<Button type="text" icon={<Phone size={20} />} />
									</Tooltip>
									<Tooltip title="Gọi video">
										<Button type="text" icon={<Video size={20} />} />
									</Tooltip>
									<Tooltip title="Thêm">
										<Button type="text" icon={<MoreHorizontal size={20} />} />
									</Tooltip>
								</div>
							</Header>

							<Content className="bg-gray-50 p-6">
								<div className="h-full flex flex-col">
									<div className="flex-1 overflow-y-auto mb-4">
										<List
											itemLayout="horizontal"
											dataSource={messages?.messages || []}
											renderItem={(message: any) => {
												const isAdmin = message.sender_type === 'admin';
												return (
													<List.Item className={`flex ${isAdmin ? 'justify-end' : 'justify-start'}`}>
														<div
															className={`max-w-[70%] p-3 rounded-lg ${isAdmin
																? 'bg-blue-500 text-white'
																: 'bg-white text-gray-800'
																}`}
														>
															<Text className={isAdmin ? 'text-white' : ''}>
																{message.content}
															</Text>
															{message.attachments?.length > 0 && (
																<div className="mt-2 grid grid-cols-2 gap-2">
																	{message.attachments.map((att: any, index: number) => (
																		<img
																			key={index}
																			src={att.url}
																			alt={att.name}
																			className="rounded-lg max-w-full"
																		/>
																	))}
																</div>
															)}
															<Text
																className={`block text-xs mt-1 ${isAdmin ? 'text-blue-100' : 'text-gray-500'
																	}`}
															>
																{new Date(message.created_at).toLocaleTimeString([], {
																	hour: '2-digit',
																	minute: '2-digit'
																})}
															</Text>
														</div>
													</List.Item>
												);
											}}
										/>
									</div>

									<div className="bg-white rounded-lg p-3 flex items-center gap-3">
										<Button type="text" icon={<Paperclip size={20} />} />
										<Button type="text" icon={<ImageIcon size={20} />} />
										<Input
											placeholder="Nhập tin nhắn..."
											value={messageText}
											onChange={(e) => setMessageText(e.target.value)}
											onPressEnter={handleSendMessage}
											suffix={<Smile className="text-gray-400 cursor-pointer" size={20} />}
											bordered={false}
											className="flex-1"
										/>
										<Button
											type="primary"
											icon={<Send size={16} />}
											onClick={handleSendMessage}
											className="bg-blue-500"
										>
											Gửi
										</Button>
									</div>
								</div>
							</Content>
						</>
					) : (
						<div className="h-full flex items-center justify-center bg-gray-50">
							<div className="text-center text-gray-500">
								<MessageSquare size={48} className="mx-auto mb-4 opacity-50" />
								<Text className="text-lg">Chọn một cuộc trò chuyện để bắt đầu</Text>
							</div>
						</div>
					)}
				</Layout>
			</Layout>
		</TailwindComponent>
	);
};

export default AdminChat;
