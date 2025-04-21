import { List, Avatar, Badge, Typography, Tag } from 'antd';
import { MessageSquare } from 'lucide-react';

const { Text } = Typography;

interface ChatListProps {
	conversations: any[];
	selectedChat: string | number;
	onSelectChat: (id: string | number) => void;
	tranferData: any[];
}

const ChatList = ({ conversations, selectedChat, onSelectChat, tranferData }: ChatListProps) => {
	return (
		<List
			className="conversations-list"
			itemLayout="horizontal"
			dataSource={conversations}
			renderItem={(conversation: any) => {
				const { user, last_message, last_message_time, status } = conversation;
				const isGuest = user?.type === 'guest';

				return (
					<List.Item
						className={`cursor-pointer hover:bg-gray-50 p-3 rounded-lg transition-colors ${selectedChat === conversation.id ? 'bg-blue-50' : ''
							}`}
						onClick={() => onSelectChat(conversation.id)}
					>
						<List.Item.Meta
							avatar={
								<Badge
									dot
									status={status === 'open' ? 'success' : 'default'}
									offset={[-4, 32]}
								>
									<Avatar
										src={user?.avatar}
										className="bg-blue-500"
										icon={!user?.avatar && <MessageSquare size={20} />}
									/>
								</Badge>
							}
							title={
								<div className="flex justify-between items-center">
									<div className="flex items-center gap-2">
										<Text strong>{user?.name || 'Khách vãng lai'}</Text>
										<Tag color={isGuest ? 'orange' : 'blue'} className="text-xs">
											{isGuest ? 'Khách' : 'Thành viên'}
										</Tag>
									</div>
									<Text className="text-xs text-gray-500">
										{last_message_time}
									</Text>
								</div>
							}
							description={
								<div className="flex flex-col gap-1">
									<Text className="text-sm text-gray-500 line-clamp-1">
										{last_message || 'Chưa có tin nhắn'}
									</Text>
									{user?.email && (
										<Text className="text-xs text-gray-400">{user.email}</Text>
									)}
								</div>
							}
						/>
					</List.Item>
				);
			}}
		/>
	);
};

export default ChatList; 