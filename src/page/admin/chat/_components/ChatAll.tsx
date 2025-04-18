import { Avatar, List, Typography, Tag, Badge } from 'antd';
import { MessageSquare } from 'lucide-react';

const { Text } = Typography;



interface ChatAllProps {
	conversations: any[];
	selectedChat: string | number;
	onSelectChat: (id: string | number) => void;
}

const ChatAll = ({ conversations, onSelectChat, selectedChat }: ChatAllProps) => {
	return (
		<List
			className="chat-list"
			itemLayout="horizontal"
			dataSource={conversations}
			renderItem={(conversation) => (
				<List.Item
					className={`cursor-pointer hover:bg-gray-50 p-3 rounded-lg transition-colors ${selectedChat === conversation.id ? 'bg-blue-50' : ''
						}`}
					onClick={() => onSelectChat(conversation.id)}
				>
					<List.Item.Meta
						avatar={
							<Badge
								dot
								color={conversation.status === 'open' ? 'green' : 'red'}
								offset={[-4, 4]}
							>
								<Avatar
									size="large"
									src={conversation.user.avatar}
									icon={!conversation.user.avatar && <MessageSquare size={24} />}
								/>
							</Badge>
						}
						title={
							<div className="flex items-center gap-2">
								<Text strong>{conversation.user.name || 'Khách vãng lai'}</Text>
								<Tag color={conversation.user.type === 'guest' ? 'orange' : 'blue'}>
									{conversation.user.type === 'guest' ? 'Khách' : 'Thành viên'}
								</Tag>
							</div>
						}
						description={
							<div className="space-y-1">
								<Text className="block text-sm text-gray-500">
									{conversation.user.email}
								</Text>
								{conversation.user.phone && (
									<Text className="block text-sm text-gray-500">
										SĐT: {conversation.user.phone}
									</Text>
								)}
								<div className="flex justify-between items-center">
									<Text className="text-sm text-gray-600 line-clamp-1">
										{conversation.last_message}
									</Text>
									<Text className="text-xs text-gray-400">
										{conversation.last_message_time}
									</Text>
								</div>
							</div>
						}
					/>
				</List.Item>
			)}
		/>
	);
};

export default ChatAll;
