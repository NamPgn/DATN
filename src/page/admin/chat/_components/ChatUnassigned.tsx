import { List, Typography, Avatar, Button } from 'antd';
import dayjs from 'dayjs';
import { UserOutlined } from '@ant-design/icons';

const { Text } = Typography;

interface UnassignedChat {
	id: number;
	guest_name: string;
	guest_email: string;
	guest_phone: string;
	status: string;
	created_at: string;
	latest_message: {
		content: string;
		created_at: string;
		sender_type: string;
	};
}

interface ChatUnassignedProps {
	unassignedData: {
		data: {
			data: UnassignedChat[]
		};
	};
	onClaimMsg: (id: string | number) => void
}

const ChatUnassigned = ({ unassignedData, onClaimMsg }: ChatUnassignedProps) => {
	const chats = unassignedData?.data?.data || [];
	return (
		<List
			className="unassigned-chat-list"
			itemLayout="horizontal"
			dataSource={chats}
			renderItem={(chat: UnassignedChat) => (
				<List.Item
					className="hover:bg-gray-50 p-2"
				>
					<List.Item.Meta
						avatar={
							<Avatar icon={<UserOutlined />} className="bg-blue-500" />
						}
						title={
							<div>
								<div className='flex items-center gap-2'>
									<Text strong>{chat.guest_name}</Text>
									<Text className="text-xs text-gray-500 ml-2">
										({chat.guest_email})
									</Text>
									<div className="mt-2">
										<Text className="text-xs px-2 py-1 bg-yellow-100 text-yellow-800 rounded-full">
											{chat.status}
										</Text>
									</div>
								</div>
								<Text className="text-xs text-gray-400">
									{dayjs(chat.latest_message.created_at).format('HH:mm - DD/MM/YYYY')}
								</Text>
								<Text className="text-xs text-gray-400 ml-4">
									SĐT: {chat.guest_phone}
								</Text>

							</div>
						}
						description={
							<div className='flex gap-2 items-center justify-between'>
								<Text className="text-gray-600">
									{chat.latest_message.content}
								</Text>
								<Button
									type="primary"
									onClick={() => onClaimMsg(chat.id)}
									className="bg-blue-500 hover:bg-blue-600"
								>
									Nhận
								</Button>
							</div>
						}
					/>
				</List.Item>
			)}
		/>
	);
};

export default ChatUnassigned; 