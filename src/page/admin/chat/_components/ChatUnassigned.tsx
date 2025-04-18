import { List, Typography, Avatar, Button, Modal, Select } from 'antd';
import { MessageSquare } from 'lucide-react';
import { Tag } from 'antd';
import { useState } from 'react';

const { Text } = Typography;

interface User {
	name: string;
	email: string;
	phone: string;
	avatar: string | null;
	type: 'guest' | 'member';
}

interface Staff {
	id: number | null;
	name: string | null;
	avatar: string | null;
}

interface UnassignedChat {
	id: number;
	status: string;
	user: User;
	staff: Staff;
	last_message: string;
	last_message_time: string;
	updated_at: string;
	closed_at: string | null;
	close_note: string | null;
}

interface ChatUnassignedProps {
	unassignedData: {
		conversations: UnassignedChat[]
	};
	onClaimMsg: (id: string | number) => void;
	userId: any;
	employee: {
		data: any[]
	},
	changeEmployee: (data: any) => void;
	loadingEmployee: boolean
}

const ChatUnassigned = ({ unassignedData, onClaimMsg, userId, employee, changeEmployee, loadingEmployee }: ChatUnassignedProps) => {
	const [isModalOpen, setIsModalOpen] = useState(false);
	const [selectedEmployee, setSelectedEmployee] = useState<number | null>(null);
	const [selectedChatId, setSelectedChatId] = useState<number | null>(null);

	const handleChangeEmployee = () => {
		const data = {
			id: selectedChatId,
			employeeId: selectedEmployee
		}
		changeEmployee(
			data
		)
	}

	return (
		<>
			<List
				className="unassigned-chat-list"
				itemLayout="horizontal"
				dataSource={unassignedData?.conversations}
				renderItem={(chat: UnassignedChat) => (
					<List.Item className="hover:bg-gray-50 p-2 rounded-lg transition-colors">
						<List.Item.Meta
							avatar={
								<Avatar
									size="large"
									src={chat.user.avatar}
									icon={!chat.user.avatar && <MessageSquare size={24} />}
									className="bg-blue-500"
								/>
							}
							title={
								<div className="flex flex-col gap-1">
									<div className="flex items-center gap-2">
										<Text strong>{chat.user.name || 'Khách vãng lai'}</Text>
										<Tag color={chat.user.type === 'guest' ? 'orange' : 'blue'}>
											{chat.user.type === 'guest' ? 'Khách' : 'Thành viên'}
										</Tag>
										<Tag color={chat.status === 'open' ? 'green' : 'red'}>
											{chat.status === 'open' ? 'Đang mở' : 'Đã đóng'}
										</Tag>
									</div>
									<div className="flex items-center gap-4 text-sm text-gray-500">
										<Text>{chat.user.email}</Text>
										{chat.user.phone && <Text>SĐT: {chat.user.phone}</Text>}
									</div>
								</div>
							}
							description={
								<div>
									<div className="mt-2 flex justify-between items-center mb-2">
										<div className="flex flex-col gap-1">
											<Text className="text-gray-600">
												{chat.last_message}
											</Text>
											<Text className="text-xs text-gray-400">
												{chat.last_message_time}
											</Text>
										</div>
									</div>
									<div className='flex gap-2'>
										{chat.status === 'open' && (
											<Button
												type="primary"
												onClick={() => onClaimMsg(chat.id)}
												className="bg-blue-500 hover:bg-blue-600"
											>
												Nhận
											</Button>
										)}

										{userId?.role === 'admin' && (
											<Button
												variant='filled'
												color='danger'
												onClick={() => {
													setSelectedChatId(chat.id);
													setIsModalOpen(true);
												}}
												className="bg-blue-500 hover:bg-blue-600"
											>
												Gán cuộc trò chuyện
											</Button>
										)}
									</div>
								</div>
							}
						/>
					</List.Item>
				)}
			/>

			<Modal
				title="Gán cuộc trò chuyện"
				open={isModalOpen}
				onOk={handleChangeEmployee}
				onCancel={() => {
					setIsModalOpen(false);
					setSelectedEmployee(null);
					setSelectedChatId(null);
				}}
				okText="Xác nhận"
				cancelText="Hủy"
				okButtonProps={{ disabled: !selectedEmployee }}
				loading={loadingEmployee}
			>
				<div className="py-4">
					<Text className="block mb-2">Chọn nhân viên:</Text>
					<Select
						className="w-full"
						placeholder="Chọn nhân viên"
						value={selectedEmployee}
						onChange={(value) => setSelectedEmployee(value)}
						options={employee?.data?.map((emp) => ({
							value: emp.id,
							label: emp.name
						}))}
					/>
				</div>
			</Modal>
		</>
	);
};

export default ChatUnassigned; 